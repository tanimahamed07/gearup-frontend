"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Dumbbell, Mail, User, Lock } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Register Data Submitted:", formData);
    // Submit logic add korun
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, agreeTerms: !!checked }))
                  }
                  required
                  className="mt-1"
                />
                <Label
                  htmlFor="agreeTerms"
                  className="text-sm font-normal cursor-pointer leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-primary hover:underline font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full shadow-md">
                Create Account
              </Button>
            </form>
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
