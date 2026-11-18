import { createHash, randomUUID } from "crypto";
import { prisma } from "../../db.js";
import argon2 from "argon2";
import { createSessionToken, hashSessionToken } from "../../services/auth.service.js";

export async function createTestUser() {
  return prisma.users.create({
    data: {
      first_name: "Test",
      email: `test-${randomUUID()}@example.com`,
      password_hash: await argon2.hash("password"),
    },
    select: {
      id: true,
      first_name: true,
      email: true,
    }
  });
}

export async function createTestUserSession(userId: string) {
  const sessionToken = createSessionToken();
  const tokenHash = hashSessionToken(sessionToken);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await prisma.sessions.create({
    data: {
      user_id: userId,
      token_hash: tokenHash,
      expires_at: expiresAt,
    },
  });

  return sessionToken;
}

export async function createTestDeck(userId: string) {
  return prisma.decks.create({
    data: {
      user_id: userId,
      title: `Test deck ${randomUUID()}`,
      description: "test deck",
    }
  })
}

export async function createTestCard(
  deckId: string,
  position: number,
  front: string,
  back: string,
) {
  return prisma.cards.create({
    data: {
      deck_id: deckId,
      position,
      front,
      back,
    },
  });
}

export async function resetDatabase() {
  await prisma.$transaction([
    prisma.card_scheduling.deleteMany(),
    prisma.reviews.deleteMany(),
    prisma.cards.deleteMany(),
    prisma.decks.deleteMany(),
    prisma.subjects.deleteMany(),
    prisma.sessions.deleteMany(),
    prisma.users.deleteMany(),
  ]);
}

export async function findDeckById(userId: string) {
  return prisma.decks.findFirst({
    where: {
      user_id: userId,
    },
    select: {
      user_id: true,
      id: true,
      description: true,
      title: true,
      created_at: true,
      subject_id: true,
      updated_at: true,
      archived_at: true,
    }
  });
}