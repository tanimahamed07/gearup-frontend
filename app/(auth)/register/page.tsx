"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import RegisterForm from "../_components/registerForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mb-8 transition-transform hover:scale-105"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Dumbbell className="h-7 w-7 stroke-[2.5]" />
          </div>
          <span className="text-3xl font-black tracking-tight text-foreground">
            Gear<span className="text-primary">Up</span>
          </span>
        </Link>

        {/* Main Card */}
        <Card className="shadow-lg border">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Create an Account
            </CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Form */}
            <RegisterForm></RegisterForm>
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-semibold"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
