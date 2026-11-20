import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { getDueReviews, submitReview } from "../services/reviews.service.js";
import { submitReviewSchema } from "../validation/reviews.schemas.js";

const reviewsRouter = Router();

reviewsRouter.get("/due", requireAuth, async (request, response, next) => {
  const user = response.locals.user;

  const dueReviews = await getDueReviews(user.id);

  response.status(200).json({ dueReviews });
})

reviewsRouter.post("/", requireAuth, async (request, response, next) => {
  try {
    const result = submitReviewSchema.safeParse(request.body)
  
    if (!result.success) {
      response.status(400).json({
        error: result.error.issues[0]?.message ?? "Invalid review data",
      });
      return;
    }

    const { cardId, rating } = result.data;

    const review = await submitReview(
      response.locals.user.id,
      cardId,
      rating as 1 | 2 | 3 | 4
    );
    
  } catch (error) {
    next(error);
  }
  
})

export default reviewsRouter;