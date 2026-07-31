import Link from "next/link";
import { format } from "date-fns";
import {
  CreditCard,
  ExternalLink,
  CheckCircle2,
  Clock,
  XCircle,
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
          <Badge className="gap-1 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25 border-emerald-500/30">
            <CheckCircle2 className="h-3 w-3" /> Paid
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="gap-1 bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25 border-amber-500/30">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="gap-1 bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30">
            <XCircle className="h-3 w-3" /> Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Payment History
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          View all your completed and pending transactions
        </p>
      </div>

      {/* Payment Table Card */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="border-b border-border/40 bg-muted/20 px-6 py-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Transactions ({payments.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-56">Transaction ID</TableHead>
                    <TableHead className="w-40">Date & Time</TableHead>
                    <TableHead className="w-32">Order Ref</TableHead>
                    <TableHead className="w-28">Method</TableHead>
                    <TableHead className="w-28">Amount</TableHead>
                    <TableHead className="w-32">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => {
                    const displayDate = payment.paidAt || payment.createdAt;

                    return (
                      <TableRow
                        key={payment.id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        {/* Transaction ID */}
                        <TableCell>
                          <span className="font-mono text-xs font-semibold bg-muted px-2 py-1 rounded border border-border">
                            {payment.transactionId}
                          </span>
                        </TableCell>

                        {/* Date & Time */}
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {format(new Date(displayDate), "MMM dd, yyyy")}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(displayDate), "hh:mm a")}
                            </span>
                          </div>
                        </TableCell>

                        {/* Order Reference */}
                        <TableCell>
                          <span className="font-mono text-xs text-muted-foreground">
                            #{payment.rentalOrderId.slice(0, 8)}...
                          </span>
                        </TableCell>

                        {/* Payment Method */}
                        <TableCell>
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {payment.method}
                          </span>
                        </TableCell>

                        {/* Amount */}
                        <TableCell>
                          <span className="text-sm font-bold text-foreground">
                            ${Number(payment.amount).toFixed(2)}
                          </span>
                        </TableCell>

                        {/* Status Badge */}
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>

                        {/* Action Link to Order Details */}
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            className="gap-1"
                          >
                            <Link
                              href={`/customer-dashboard/orders/${payment.rentalOrderId}`}
                            >
                              View Order{" "}
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No payment records</h3>
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
