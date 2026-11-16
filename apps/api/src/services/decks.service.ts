import { prisma } from "../db.js";

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