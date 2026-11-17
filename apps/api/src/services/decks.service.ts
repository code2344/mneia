import { prisma } from "../db.js";

type CreateDeckInput = {
  title: string;
  description?: string | null;
};

type CreateCardInput = {
  front: string;
  back: string;
}

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
  }
}

export async function getDecksForUser(userId: string) {
  const decks = await prisma.decks.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      updated_at: "desc",
    }
  });

  return decks;
}

export async function getDeckForUser(userId: string, deckId: string) {
  return prisma.decks.findFirst({
    where: {
      id: deckId,
      user_id: userId,
    },
    select: {
      id: true,
      user_id: true,
      subject_id: true,
      title: true,
      description: true,
      created_at: true,
      updated_at: true,
      archived_at: true,
    },
  });
}

export async function getCardsInDeck(
  userId: string, deckId: string
) {
  const deck = await prisma.decks.findFirst({
    where: {
      id: deckId
    },
    select: {
      id: true,
    },
  });

  if (!deck) {
    throw new AppError("Deck not found", 404)
  }
  
  const cards = await prisma.cards.findMany({
    where: {
      deck_id: deckId,
      decks: {
        user_id: userId,
      }
    },
    orderBy: {
      position: "asc",
    },
    select: {
      id: true,
      deck_id: true,
      front: true,
      back: true,
      position: true,
      created_at: true,
      updated_at: true,
      card_scheduling: {
        select: {
          due_at: true,
          stability: true,
          difficulty: true,
          state: true,
          reps: true,
          lapses: true,
          last_reviewed_at: true
        },
      },
    },
  });

  return cards.map(({ card_scheduling, ...card }) => ({
    ...card,
    scheduling: card_scheduling,
  }));
}

export async function createDeckForUser(
  userId: string,
  input: CreateDeckInput,
) {
  const title = input.title.trim();
  const description = input.description?.trim() || null;

  if (!title) {
    throw new Error("Deck title is required")
  }

  if (title.length > 100) {
    throw new Error("Deck title is too long; must be 100 characters or fewer")
  }

  if (description && description.length > 500) {
    throw new Error("Description must be 500 characters or fewer")
  }

  return prisma.decks.create({
    data: {
      user_id: userId,
      title,
      description,
    },
    select: {
      id: true,
      title: true,
      description: true,
      subject_id: true,
      created_at: true,
      updated_at: true,
      archived_at: true,
    },
  });
}

export async function createCardInDeck(
  userId: string,
  deckId: string,
  input: CreateCardInput,
) {
  const front = input.front.trim();
  const back = input.back.trim();

  if (!front || !back) {
    throw new Error("Front and back are required")
  }

  if (front.length > 2000) {
    throw new Error("Front must be 2000 characters or less")
  }
  if (back.length > 10000) {
    throw new Error("Back must be 10000 characters or less")
  }

  const deck = await prisma.decks.findFirst({
    where: {
      id: deckId,
      user_id: userId,
    },
    select: {
      id: true,
    },
  });

  if (!deck) {
    throw new AppError("Deck not found", 404)
  }

  
  return prisma.$transaction(async (transaction) => {
    const lastCard = await prisma.cards.findFirst({
      where: {
        deck_id: deckId,
      },
      orderBy: {
        position: "desc",
      },
      select: {
        position: true,
      },
    });
    
    const position = lastCard ? lastCard.position + 1 : 0;

    const card = await prisma.cards.create({
      data: {
        deck_id: deckId,
        front: front,
        back: back,
        position: position,
        card_scheduling: {
          create: {}
        }
      },
      select: {
        id: true,
        deck_id: true,
        front: true,
        back: true,
        position: true,
        created_at: true,
        updated_at: true,
        card_scheduling: {
          select: {
            due_at: true,
            stability: true,
            difficulty: true,
            state: true,
            reps: true,
            lapses: true,
            last_reviewed_at: true,
            updated_at: true
          },
        },
      },
    });

    return {
      ...card,
      scheduling: card.card_scheduling,
    };
  })
}

export async function deleteCardInDeck(
  userId: string,
  deckId: string,
  cardId: string
) {
  const result = await prisma.cards.deleteMany({
    where: {
      id: cardId,
      deck_id: deckId,
      decks: {
        user_id: userId,
      },
    },
  });

  if (result.count === 0) {
    throw new AppError("Card not found", 404)
  }
}