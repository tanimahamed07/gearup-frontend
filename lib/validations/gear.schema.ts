import { z } from "zod";

export const gearFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand: z.string().min(1, "Brand is required"),
  categoryId: z.string().min(1, "Please select a category"),

  pricePerDay: z
    .number({ message: "Price must be a number" })
    .positive("Price must be greater than 0"),

  stock: z
    .number({ message: "Stock must be a number" })
    .int("Stock must be an integer")
    .min(1, "Stock must be at least 1"),

  image: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type GearFormData = z.infer<typeof gearFormSchema>;
