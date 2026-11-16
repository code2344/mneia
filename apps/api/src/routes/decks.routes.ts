import { Router } from "express";
import { getCurrentUser } from "../services/auth.service.js";
import { requireAuth } from "../middleware/require-auth.js";
import { getDecksForUser } from "../services/decks.service.js";


const decksRouter = Router();

decksRouter.get("/", requireAuth, async (request, response, next) => {
  const user = response.locals.user;
  const decks = getDecksForUser(user.id);

  response.json({ decks });
});