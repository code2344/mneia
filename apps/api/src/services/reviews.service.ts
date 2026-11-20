import { prisma } from "../db.js";

class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
  }
}

export async function getDueReviews(userId: string) {
  
  const dueCards = await prisma.cards.findMany({
    where: {
      card_scheduling: {
        due_at: {
          lte: new Date(),
        },
      },
      decks: {
        user_id: userId,
      },
    },
    orderBy: {
      card_scheduling: {
        due_at: "asc",
      }
    },
    select: {
      id: true,
      deck_id: true,
      front: true,
      back: true,
      position: true,
      decks: {
        select: {
          title: true,
        },
      },
      card_scheduling: {
        select: {
          due_at: true,
          stability: true,
          difficulty: true,
          state: true,
          reps: true,
          lapses: true,
          last_reviewed_at: true,
          updated_at: true,
        },
      },
    },
  });

  return {
    cards: dueCards.map((card) => ({
      id: card.id,
      deckId: card.deck_id,
      deckTitle: card.decks.title,
      front: card.front,
      back: card.back,
      position: card.position,
      scheduling: card.card_scheduling
    })),
    count: dueCards.length,
  };
}