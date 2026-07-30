"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { bookOrder } from "../_action/bookOrder";
import {
  BookingFormValues,
  bookingSchema,
} from "@/lib/validations/order.schema";
import { useRouter } from "next/router";

interface BookingModalProps {
  gearItemId: string;
  pricePerDay: number;
  isAvailable?: boolean;
}

export default function BookingModal({
  gearItemId,
  pricePerDay,
  isAvailable = true,
}: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter()

  const todayStr = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const calculateTotal = () => {
    if (!startDate || !endDate) return { days: 0, total: 0 };
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    if (diffDays <= 0) return { days: 0, total: 0 };
    return {
      days: diffDays,
      total: diffDays * pricePerDay,
    };
  };

  const { days: totalDays, total: totalAmount } = calculateTotal();

  const onSubmit = async (data: BookingFormValues) => {
    try {
      const payload = {
        startDate: new Date(`${data.startDate}T00:00:00`).toISOString(),
        endDate: new Date(`${data.endDate}T00:00:00`).toISOString(),
        items: [
          {
            gearItemId,
            quantity: 1,
          },
        ],
      };

      const res = await bookOrder(payload);
      console.log(res);

      if (res?.success) {
        toast.success(
          "Booking created! Please complete payment from your orders.",
        );
        route.push("/customer-dashboard/orders");
        reset();
        setIsOpen(false);
      } else {
        toast.error(res?.message || "Failed to place order.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error booking gear:", error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          disabled={!isAvailable}
          className="w-full text-sm font-semibold shadow-md transition-all h-11 gap-2"
        >
          <Calendar className="h-4 w-4" />
          {isAvailable ? "Book This Gear" : "Currently Unavailable"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Book Gear</DialogTitle>
          <DialogDescription>
            Select your rental start and end dates to proceed with booking.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Start Date */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Start Date
              </label>
              <input
                type="date"
                min={todayStr}
                className="w-full rounded-md border border-input bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                {...register("startDate")}
              />
              {errors.startDate && (
                <p className="text-xs text-destructive mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                End Date
              </label>
              <input
                type="date"
                min={startDate || todayStr}
                className="w-full rounded-md border border-input bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                {...register("endDate")}
              />
              {errors.endDate && (
                <p className="text-xs text-destructive mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Total Price Summary Box */}
          {totalAmount > 0 && (
            <div className="rounded-lg border border-border/60 bg-muted/40 p-3 space-y-1 text-sm">
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Duration:</span>
                <span className="font-medium text-foreground">
                  {totalDays} {totalDays === 1 ? "Day" : "Days"}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-border/40 pt-1">
                <span className="text-muted-foreground font-medium">
                  Estimated Total:
                </span>
                <span className="font-bold text-primary text-base">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Confirm Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
