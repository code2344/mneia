import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { getDueReviews } from "../services/reviews.service.js";

const reviewsRouter = Router();

reviewsRouter.get("/due", requireAuth, async (request, response, next) => {
  const user = response.locals.user;

  const dueReviews = getDueReviews(user.id);

  response.status(200).json({ dueReviews });
})
