// app/payment/cancel/page.tsx (Server Component)
import Link from "next/link";
import { XCircle, RefreshCw, ShoppingBag, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  searchParams: Promise<{ order_id?: string }>;
}

export default async function PaymentCancelPage({ searchParams }: PageProps) {
  const { order_id: orderId } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="h-20 w-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
        <XCircle className="h-10 w-10" />
      </div>

      {orderId && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-muted border border-border text-xs font-mono font-medium text-muted-foreground">
          <Hash className="h-3.5 w-3.5 text-primary" />
          <span>Order ID: #{orderId.slice(0, 12)}</span>
        </div>
      )}

      <h1 className="text-3xl font-bold text-foreground mb-2">
        Payment Cancelled
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        You have cancelled the payment process. Don&apos;t worry, your order is
        still saved in your account.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="gap-2">
          <Link href="/customer-dashboard/orders">
            <RefreshCw className="h-4 w-4" /> Try Paying Again
          </Link>
        </Button>

        <Button variant="outline" asChild className="gap-2">
          <Link href="/gears">
            <ShoppingBag className="h-4 w-4" /> Continue Browsing
          </Link>
        </Button>
      </div>
    </div>
  );
}
