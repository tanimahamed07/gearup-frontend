import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-border/60 shadow-xl bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 px-6 text-center space-y-6">
          {/* Icon Badge */}
          <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 text-destructive flex items-center justify-center relative">
            <SearchX className="h-10 w-10" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-destructive"></span>
            </span>
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <h1 className="text-6xl font-extrabold tracking-tight text-foreground">
              404
            </h1>
            <h2 className="text-xl font-semibold tracking-tight text-foreground/90">
              Page or Resource Not Found
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sorry, the page you are looking for doesn&apos;t exist, was
              removed, or you don&apos;t have authorization to access it.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              asChild
              variant="default"
              className="w-full gap-2 font-medium"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Return Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full gap-2 font-medium"
            >
              <Link href="/customer-dashboard">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
