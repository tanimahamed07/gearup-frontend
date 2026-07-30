"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Loader2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

interface BookingModalProps {
  gearItemId: string;
  pricePerDay: number;
  stock: number; // 👈 স্টকের সংখ্যা পাস করা হলো
  isAvailable?: boolean;
}

export default function BookingModal({
  gearItemId,
  pricePerDay,
  stock,
  isAvailable = true,
}: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // 👈 Dynamic Quantity State
  const router = useRouter();

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

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Quantity বাড়ানোর হ্যান্ডলার
  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error(`Only ${stock} items available in stock!`);
    }
  };

  // Quantity কমানোর হ্যান্ডলার
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const calculateTotal = () => {
    if (!startDate || !endDate) return { days: 0, total: 0 };
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    if (diffDays <= 0) return { days: 0, total: 0 };
    return {
      days: diffDays,
      // 👈 দিন x পার ডে প্রাইস x মোট কোয়ান্টিটি
      total: diffDays * pricePerDay * quantity,
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
            quantity: quantity, // 👈 ১ এর জায়গায় ডাইনামিক Quantity
          },
        ],
      };

      const res = await bookOrder(payload);

      if (res?.success) {
        toast.success(
          "Booking created! Please complete payment from your orders.",
        );
        reset();
        setQuantity(1);
        setIsOpen(false);
        router.push("/customer-dashboard/orders");
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
      setQuantity(1);
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

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Gear</DialogTitle>
          <DialogDescription>
            Select rental dates and quantity to proceed with booking.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-3">
          {/* Start Date & End Date Inputs */}
          <div className="grid grid-cols-2 gap-3">
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

          {/* 👈 Quantity Selection Field */}
          <div className="flex items-center justify-between border-t border-b border-border/50 py-3">
            <div>
              <label className="text-xs font-semibold text-foreground block">
                Quantity
              </label>
              <span className="text-[11px] text-muted-foreground">
                Max available: {stock}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-md"
                onClick={handleDecrease}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm font-semibold">
                {quantity}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-md"
                onClick={handleIncrease}
                disabled={quantity >= stock}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Total Price Summary Box */}
          {totalAmount > 0 && (
            <div className="rounded-lg border border-border/60 bg-muted/40 p-3 space-y-1.5 text-sm">
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Duration & Quantity:</span>
                <span className="font-medium text-foreground">
                  {totalDays} {totalDays === 1 ? "Day" : "Days"} × {quantity}{" "}
                  Item(s)
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-border/40 pt-1.5">
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
