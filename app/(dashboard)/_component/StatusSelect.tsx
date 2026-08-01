"use client";

import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";
import {
  RentalOrderStatusType,
  updateRentalOrderStatus,
} from "../_action/updateOrderStatus";

interface StatusSelectProps {
  orderId: string;
  currentStatus: string;
}

export function StatusSelect({ orderId, currentStatus }: StatusSelectProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = (newStatus: RentalOrderStatusType) => {
    setStatus(newStatus);
    startTransition(async () => {
      const res = await updateRentalOrderStatus(orderId, newStatus);
      if (!res?.success) {
        // Rollback on error
        setStatus(currentStatus);
        alert(res?.message || "Failed to update status");
      }
    });
  };

  return (
    <div className="flex items-center gap-2 justify-end">
      {isPending && (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
      )}
      <Select
        disabled={isPending}
        value={status}
        onValueChange={(val) =>
          handleStatusChange(val as RentalOrderStatusType)
        }
      >
        <SelectTrigger className="w-32.5 h-8 text-xs font-medium">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
          <SelectItem value="PICKED_UP">PICKED_UP</SelectItem>
          <SelectItem value="RETURNED">RETURNED</SelectItem>
          <SelectItem value="CANCELLED">CANCELLED</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
