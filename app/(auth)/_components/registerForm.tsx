"use client";

import React, { useState, startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, User, Lock, Phone, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/validations/auth.schema";
import { registerAction } from "../_action/authAction";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "CUSTOMER",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const [state, formAction, isPending] = useActionState(registerAction, {
    success: false,
    statusCode: 0,
    message: "",
  });

  const onSubmit = (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("name", data.fullName); // Backend expects "name"
    formData.append("email", data.email);
    formData.append("role", data.role);
    if (data.phone) formData.append("phone", data.phone);
    formData.append("password", data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Backend Error Message */}
      {state && !state.success && state.message && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {state.message}
        </div>
      )}

      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="fullName"
            placeholder="John Doe"
            className="pl-10"
            {...register("fullName")}
            disabled={isPending}
          />
        </div>
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="pl-10"
            {...register("email")}
            disabled={isPending}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Input (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="01700000000"
            className="pl-10"
            {...register("phone")}
            disabled={isPending}
          />
        </div>
      </div>

      {/* Role Selection */}
      <div className="space-y-2">
        <Label>I want to register as a</Label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-accent">
            <input
              type="radio"
              value="CUSTOMER"
              {...register("role")}
              disabled={isPending}
              className="accent-primary"
            />
            <span className="text-sm font-medium">Customer</span>
          </label>
          <label className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-accent">
            <input
              type="radio"
              value="PROVIDER"
              {...register("role")}
              disabled={isPending}
              className="accent-primary"
            />
            <span className="text-sm font-medium">Provider</span>
          </label>
        </div>
        {errors.role && (
          <p className="text-sm text-destructive">{errors.role.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10 pr-10"
            {...register("password")}
            disabled={isPending}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            disabled={isPending}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password Input */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10 pr-10"
            {...register("confirmPassword")}
            disabled={isPending}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            disabled={isPending}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className="space-y-1 pt-2">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeTerms"
            checked={watch("agreeTerms")}
            onCheckedChange={(checked) =>
              setValue("agreeTerms", !!checked, { shouldValidate: true })
            }
            disabled={isPending}
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
        {errors.agreeTerms && (
          <p className="text-sm text-destructive">
            {errors.agreeTerms.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full shadow-md" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
