import Link from "next/link";
import { format } from "date-fns";
import {
  CreditCard,
  ExternalLink,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
} from "lucide-react";

import { getPaymentHistory } from "@/service/dashboard/customer/getPaymentHistory";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CopyButton } from "@/components/ui/copy-button";

// Type definitions matching your Backend API response
export interface IPayment {
  id: string;
  transactionId: string;
  amount: string | number;
  method: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
  paidAt?: string | null;
  createdAt: string;
  rentalOrderId: string;
  userId?: string;
}

export default async function PaymentHistoryPage() {
  // Fetching data using Server Action / Service
  const response = await getPaymentHistory();
  const payments: IPayment[] = response?.data || [];

  // Helper function for status badges
  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
      case "PAID":
        return (
          <Badge className="gap-1 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 whitespace-nowrap">
            <CheckCircle2 className="h-3 w-3" /> Paid
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="gap-1 bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25 border border-amber-500/30 whitespace-nowrap">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="gap-1 bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30 whitespace-nowrap">
            <XCircle className="h-3 w-3" /> Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="whitespace-nowrap">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          Payment History
          <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500/20" />
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          View all your completed, pending, and failed transactions
        </p>
      </div>

      {/* Payment Table Card */}
      <Card className="border border-border/60 shadow-sm rounded-xl overflow-hidden bg-card">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Transactions ({payments.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {payments.length > 0 ? (
            <Table className="min-w-[850px]">
              <TableHeader className="bg-muted/40">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-64 whitespace-nowrap">
                    Transaction ID
                  </TableHead>
                  <TableHead className="w-44 whitespace-nowrap">
                    Date & Time
                  </TableHead>
                  <TableHead className="w-52 whitespace-nowrap">
                    Order Ref
                  </TableHead>
                  <TableHead className="w-28 whitespace-nowrap">
                    Method
                  </TableHead>
                  <TableHead className="w-32 whitespace-nowrap">
                    Amount
                  </TableHead>
                  <TableHead className="w-32 whitespace-nowrap">
                    Status
                  </TableHead>
                  <TableHead className="text-right whitespace-nowrap pr-6">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => {
                  const displayDate = payment.paidAt || payment.createdAt;

                  return (
                    <TableRow
                      key={payment.id}
                      className="hover:bg-muted/40 transition-colors"
                    >
                      {/* Transaction ID with Copy Button */}
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-muted border border-border/80 text-foreground break-all">
                            {payment.transactionId}
                          </span>
                          <CopyButton value={payment.transactionId} />
                        </div>
                      </TableCell>

                      {/* Date & Time */}
                      <TableCell className="whitespace-nowrap">
                        <div className="flex flex-col space-y-0.5">
                          <span className="text-xs font-semibold text-foreground">
                            {format(new Date(displayDate), "MMM dd, yyyy")}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {format(new Date(displayDate), "hh:mm a")}
                          </span>
                        </div>
                      </TableCell>

                      {/* Order Reference with Copy Button */}
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-semibold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded border border-border/50">
                            #{payment.rentalOrderId.slice(0, 8)}...
                          </span>
                          <CopyButton value={payment.rentalOrderId} />
                        </div>
                      </TableCell>

                      {/* Payment Method */}
                      <TableCell className="whitespace-nowrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                          {payment.method || "ONLINE"}
                        </span>
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="whitespace-nowrap">
                        <span className="text-sm font-extrabold text-foreground tracking-tight">
                          ${Number(payment.amount).toFixed(2)}
                        </span>
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell className="whitespace-nowrap">
                        {getStatusBadge(payment.status)}
                      </TableCell>

                      {/* Action Link to Order Details */}
                      <TableCell className="text-right whitespace-nowrap pr-6">
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="gap-1.5 hover:bg-primary hover:text-primary-foreground"
                        >
                          <Link
                            href={`/customer-dashboard/orders/${payment.rentalOrderId}`}
                          >
                            View Order <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 shadow-inner">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-1">No payment records</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                You haven&apos;t completed any payment transactions yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
