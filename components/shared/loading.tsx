import { Loader2, LayoutDashboard } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] w-full">
      <div className="flex flex-col items-center gap-4 px-4">
        {/* Dashboard Icon with Spinner */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <LayoutDashboard className="h-8 w-8 text-primary/60" />
          </div>
          <Loader2 className="h-16 w-16 animate-spin text-primary/40" />
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h3 className="text-base font-semibold text-foreground">
            Loading Dashboard
          </h3>
          <p className="text-sm text-muted-foreground">
            Preparing your workspace...
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-1.5 mt-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:-0.3s]" />
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:-0.15s]" />
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
}
