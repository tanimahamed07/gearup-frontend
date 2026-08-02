"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

type ActionState = {
  success: true;
  statusCode: number;
  message: string;
  data: Record<string, unknown>;
};

export const loginAction = async (
  redirectTo: string,
  prevState: LoginState,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    // Check if user account is suspended
    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    if (decodedToken?.status === "SUSPENDED") {
      return {
        success: false,
        statusCode: 403,
        message: "Your account has been suspended. Please contact support.",
        data: { accessToken: "", refreshToken: "" },
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    if (
      redirectTo &&
      typeof redirectTo === "string" &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      redirect(redirectTo);
    }

    redirect("/");
  }

  return result;
};

export const registerAction = async (
  prevState: ActionState,
  formData: FormData,
) => {
  const name = formData.get("name");
  const role = formData.get("role");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    name,
    role,
    phone,
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    redirect("/login");
  }

  return result;
};
