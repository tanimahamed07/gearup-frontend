import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Please select at least 1 star." })
    .max(5),
  comment: z
    .string()
    .trim()
    .min(5, { message: "Comment must be at least 5 characters long." })
    .max(500, { message: "Comment cannot exceed 500 characters." }),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
