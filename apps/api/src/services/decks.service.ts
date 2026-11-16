import { prisma } from "../db.js";

type CreateDeckInput = {
  title: string;
  description?: string | null;
};

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
  return prisma.cards.findMany({
    where: {
      deck_id: deckId
    },
    select: {
      id: true,
      deck_id: true,
      front: true,
      back: true,
      position: true,
      created_at: true,
      updated_at: true,
    },
  });
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