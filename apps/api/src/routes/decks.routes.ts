import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { getDecksForUser, createDeckForUser, getDeckForUser, getCardsInDeck, createCardInDeck, deleteCardInDeck } from "../services/decks.service.js";
import { createDeckSchema } from "../validation/deck.schemas.js";
import { createCardSchema } from "../validation/card.schemas.js";


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

decksRouter.get("/:deckId", requireAuth, async (request, response, next) => {
  try {
    const { deckId } = request.params;
    if (typeof deckId != "string") {
      response.status(400).json({
        error: "Invalid deck ID",
      });
      return;
    }
    
    const deck = await getDeckForUser(
      response.locals.user.id,
      deckId,
    );

    if (!deck) {
      response.status(404).json({
        error: "Deck not found",
      });
      return;
    }
    response.json({ deck });
  } catch (error) {
    next(error);
  }
});

decksRouter.get("/:deckId/cards", requireAuth, async (request, response, next) => {
  try {
    const { deckId } = request.params;
    if (typeof deckId != "string") {
      response.status(400).json({
        error: "Invalid deck ID",
      });
      return;
    }
    
    const cards = await getCardsInDeck(
      response.locals.user.id,
      deckId,
    );

    response.json({ cards });
  } catch (error) {
    next(error);
  }
});

decksRouter.post("/:deckId/cards", requireAuth, async (request, response, next) => {
  try {
    const { deckId } = request.params;
    
    if (typeof deckId != "string") {
      response.status(400).json({
        error: "Invalid deck ID",
      });
      return;
    }

    const result = createCardSchema.safeParse(request.body)
    if (!result.success) {
      response.status(400).json({
        error: result.error.issues[0]?.message ?? "Invalid card data",
      });
      return;
    }
    
    const card = await createCardInDeck(response.locals.user.id, deckId, result.data)

    response.status(201).json({ card });
    
    
  } catch (error) {
    next(error);
  }
})

decksRouter.delete("/:deckId/cards/:cardId", requireAuth, async (request, response, next) => {
  try {
    const { deckId, cardId } = request.params;

    if (typeof deckId !== "string" || typeof cardId !== "string") {
      response.status(400).json({
        error: "Invalid deck or card ID"
      });
      return;
    }

    await deleteCardInDeck(response.locals.user.id, deckId, cardId);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
})

export default decksRouter;