import { trim, z } from "zod";

export const createDeckSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Deck title is required")
    .max(100, "Deck title is too long; must be 100 characters or fewer"),

  description: z
    .string()
    .trim()
    .max(500, "Description must be 500 characters or fewer")
    .nullable()
    .optional(),
});