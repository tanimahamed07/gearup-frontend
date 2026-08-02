import { Loader2, Package } from "lucide-react";

export default function PublicLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center gap-4 px-4">
        {/* Package Icon with Spinner */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="h-8 w-8 text-primary/60 animate-pulse" />
          </div>
          <Loader2 className="h-16 w-16 animate-spin text-primary/40" />
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h3 className="text-base font-semibold text-foreground">
            Loading Gear Catalog
          </h3>
          <p className="text-sm text-muted-foreground">
            Fetching available equipment...
          </p>
        </div>

        {/* Shimmer Effect */}
        <div className="flex gap-2 mt-2">
          <div className="h-1 w-8 rounded-full bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 animate-pulse" />
          <div className="h-1 w-8 rounded-full bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 animate-pulse [animation-delay:0.2s]" />
          <div className="h-1 w-8 rounded-full bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 animate-pulse [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}
