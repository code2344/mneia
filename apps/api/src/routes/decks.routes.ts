import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { getDecksForUser, createDeckForUser } from "../services/decks.service.js";
import { createDeckSchema } from "../validation/deck.schemas.js";


const decksRouter = Router();

decksRouter.get("/", requireAuth, async (request, response, next) => {
  const user = response.locals.user;
  const decks = await getDecksForUser(user.id);

  response.json({ decks });
});

decksRouter.post("/", requireAuth, async (request, response, next) => {
  const user = response.locals.user;
  const result = createDeckSchema.safeParse(request.body);
  
  if (!result.success) {
    response.status(400).json({
      error: result.error.issues[0]?.message ?? "Invalid deck data",
    });
    return;
  }

  const deck = await createDeckForUser(
    user.id,
    result.data,
  );

  response.status(201).json({ deck });
  
});

export default decksRouter;