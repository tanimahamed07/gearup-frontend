// app/payment/success/page.tsx (Server Component)
import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  searchParams: Promise<{
    session_id?: string;
    order_id?: string;
  }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const { session_id: sessionId, order_id: orderId } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Animated Icon */}
      <div className="h-20 w-20 bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <CheckCircle2 className="h-10 w-10" />
      </div>

      {/* Order ID Badge (If available) */}
      {orderId && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-emerald-50/80 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-medium">
          <Hash className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Order ID: #{orderId.slice(0, 12)}</span>
        </div>
      )}

      {/* Heading & Subtitle */}
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Payment Successful!
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Thank you for your rental order. Your payment has been confirmed, and
        the order status has been updated to{" "}
        <strong className="text-foreground">PAID</strong>.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" asChild className="gap-2">
          <Link href="/customer-dashboard/orders">
            View My Orders <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <Button size="lg" variant="outline" asChild className="gap-2">
          <Link href="/gears">
            <ShoppingBag className="h-4 w-4" /> Continue Browsing
          </Link>
        </Button>
      </div>
    </div>
  );
}
