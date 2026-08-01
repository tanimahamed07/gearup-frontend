import { Loader2, Lock } from "lucide-react";

export default function AuthLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="flex flex-col items-center gap-4 px-4">
        {/* Lock Icon with Spinner */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock className="h-7 w-7 text-primary/70" />
          </div>
          <Loader2 className="h-14 w-14 animate-spin text-primary/50" />
          <div className="absolute inset-0 h-14 w-14 animate-pulse rounded-full bg-primary/10 blur-lg" />
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h3 className="text-base font-semibold text-foreground">
            Authenticating
          </h3>
          <p className="text-sm text-muted-foreground">
            Securing your session...
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex gap-1.5 mt-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </div>
  );
}
