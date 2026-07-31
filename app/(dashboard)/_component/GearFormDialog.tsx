"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Package } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  gearFormSchema,
  type GearFormData,
} from "@/lib/validations/gear.schema";
import { postGearItem } from "../_action/postGearItem";

export type ICategory = {
  id: string;
  name: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

interface GearFormDialogProps {
  categories: ICategory[];
  mode?: "create" | "edit";
  initialData?: Partial<GearFormData>;
}

export function GearFormDialog({
  categories = [],
  mode = "create",
  initialData,
}: GearFormDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GearFormData>({
    resolver: zodResolver(gearFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      brand: initialData?.brand || "",
      categoryId: initialData?.categoryId || "",
      pricePerDay: (initialData?.pricePerDay as number) || 0,
      stock: initialData?.stock || 1,
      image: initialData?.image || "",
      description: initialData?.description || "",
    },
  });

  const onSubmit = async (values: GearFormData) => {
    try {
      if (mode === "create") {
        // Type assertion to match IGearItem structure
        const res = await postGearItem(
          values as unknown as import("@/lib/types/types").IGearItem,
        );

        if (res?.success) {
          toast.success("Gear item created successfully!");
          reset();
          setOpen(false);
        } else {
          toast.error(res?.message || "Failed to create gear item.");
        }
      } else {
        // TODO: Update gear action handle logic
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleOpenChange = (newOpenState: boolean) => {
    setOpen(newOpenState);
    if (!newOpenState) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm rounded-lg">
          <Plus className="h-4 w-4" /> Add New Gear
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            {mode === "create" ? "Add New Gear" : "Edit Gear Details"}
          </DialogTitle>
          <DialogDescription>
            Provide details about the equipment to list it for rental in your
            inventory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Gear Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Gear Name</Label>
            <Input
              id="name"
              placeholder="e.g. Professional Camping Tent - 4 Person"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="categoryId">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <p className="text-sm text-destructive">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                placeholder="e.g. Coleman / Sony"
                {...register("brand")}
              />
              {errors.brand && (
                <p className="text-sm text-destructive">
                  {errors.brand.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Daily Price */}
            <div className="space-y-2">
              <Label htmlFor="pricePerDay">Price Per Day ($)</Label>
              <Input
                id="pricePerDay"
                type="number"
                step="0.01"
                placeholder="25.00"
                {...register("pricePerDay", { valueAsNumber: true })}
              />
              {errors.pricePerDay && (
                <p className="text-sm text-destructive">
                  {errors.pricePerDay.message}
                </p>
              )}
            </div>

            {/* Stock Quantity */}
            <div className="space-y-2">
              <Label htmlFor="stock">Total Stock Units</Label>
              <Input
                id="stock"
                type="number"
                placeholder="5"
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && (
                <p className="text-sm text-destructive">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="https://images.unsplash.com/..."
              {...register("image")}
            />
            {errors.image && (
              <p className="text-sm text-destructive">{errors.image.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Describe the gear, features, and condition..."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : mode === "create"
                  ? "Add Gear"
                  : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
