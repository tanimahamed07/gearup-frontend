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
import { updateUserStatus } from "../_action/updateUserStatus";

interface Props {
  userId: string;
  currentStatus: "ACTIVE" | "SUSPENDED";
}

export function UserStatusSelect({ userId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = (newStatus: "ACTIVE" | "SUSPENDED") => {
    setStatus(newStatus);
    startTransition(async () => {
      const res = await updateUserStatus(userId, newStatus);
      if (!res?.success) {
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
          handleStatusChange(val as "ACTIVE" | "SUSPENDED")
        }
      >
        <SelectTrigger className="w-30 h-8 text-xs font-medium">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ACTIVE">ACTIVE</SelectItem>
          <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
