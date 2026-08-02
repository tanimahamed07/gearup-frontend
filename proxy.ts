import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { jwtUtils } from "./utils/jwt";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/gears", "/about"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const cookieStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    // Access token has expired but refresh token is valid, get new access token from backend
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken;
      decodedAccessToken = jwtUtils.verifyToken(
        accessToken!,
        process.env.JWT_ACCESS_SECRET as string,
      );
    }
  }

  let userRole = null;
  let userStatus = null;

  if (!decodedAccessToken?.success) {
    // Token has expired or is invalid, clear the cookies
    cookieStore.delete("accessToken");
  } else if (decodedAccessToken.data) {
    const payload = decodedAccessToken.data as JwtPayload;

    console.log("=========>>>>>> JWT Payload:", payload);
    userRole = payload.role;
    userStatus = payload.status;

    // ALWAYS fetch user status from API since it's not in the token
    // This ensures we have the latest status even if user was suspended after token was issued
    if (accessToken) {
      try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
          headers: {
            Cookie: `accessToken=${accessToken}`,
          },
          cache: "no-store",
        });

        if (res.ok) {
          const userData = await res.json();
          console.log("=========>>>>>> API Response:", userData);

          // Handle different response structures
          if (userData?.data?.status) {
            userStatus = userData.data.status;
          } else if (userData?.status) {
            userStatus = userData.status;
          }

          console.log("=========>>>>>> User Status:", userStatus);
        } else {
          console.error("Failed to fetch user data, status:", res.status);
        }
      } catch (error) {
        // If API call fails, log the error but continue
        console.error("Failed to fetch user status:", error);
      }
    }
  }

  // 🔴 Handle Suspended User - Check after we have the status
  if (userStatus === "SUSPENDED") {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("suspended", "true");
    return NextResponse.redirect(loginUrl);
  }

  // User is logged in and trying to access login or register page, redirect to appropriate dashboard
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(new URL("/customer-dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userRole === "PROVIDER") {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Authenticated Pages Protection
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authorization: Role based access control
  if (pathname.startsWith("/customer-dashboard") && userRole !== "CUSTOMER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/provider-dashboard") &&
    userRole !== "PROVIDER"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
