import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { getMe } from "@/service/getMe";
import React from "react";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
