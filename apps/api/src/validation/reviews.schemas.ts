import { z } from "zod";
import { idSchema } from "./id.schemas.js";

export const submitReviewSchema = z.object({
  cardId: idSchema,
  rating: z
    .number()
    .int()
    .min(1)
    .max(4)
});