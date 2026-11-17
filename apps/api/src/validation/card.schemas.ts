import { z } from "zod";

export const createCardSchema = z.object({
  front: z
    .string()
    .trim()
    .min(1, "Card front is required")
    .max(2000, "Front must be 2000 characters or less"),

  back: z
    .string()
    .trim()
    .min(1, "Card back is required")
    .max(10000, "Card back must be 10000 characters or less")
});