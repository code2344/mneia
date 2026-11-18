import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../../app.js";
import { createTestUser, createTestCard, createTestDeck, createTestUserSession } from "./fixtures.js"

import { beforeEach } from "vitest";
import { resetDatabase } from "./fixtures.js";

beforeEach(async () => {
  await resetDatabase();
});

// GET / does getDecksForUser
// POST / does createDeckForUser
// GET /:deckID gets a deck by id
// GET /:deckId/cards gets cards in a deck
// POST /:deckId/cards creates a card in a a deck
// DELETE /:deckId/cards/:cardId deletes a specific card

describe("GET /decks", () => {
  it("requires authentication to list decks", async () => {
    const response = await request(app).get("/decks");

    expect(response.status).toBe(401);
  });

  it("lists decks if authenticated", async () => {
    const user = await createTestUser();
    const cookie = await createTestUserSession(user.id);
    const deck = createTestDeck(user.id);

    const card = await createTestCard((await deck).id, 0, "front text", "back text")

    const response = await request(app).get("/decks").set("Cookie", `mneia_session=${cookie}`);
    expect(response.status).toBe(200);
    expect(response.body.decks).toHaveLength(1);
  });

  it("does not have any other user's decks", async () => {
    const user1 = await createTestUser();
    const user2 = await createTestUser();

    const cookie1 = await createTestUserSession(user1.id);

    const deck1 = await createTestDeck(user1.id)
    const deck2 = await createTestDeck(user2.id)

    const response = await request(app).get("/decks").set("Cookie", `mneia_session=${cookie1}`);

    expect(response.status).toBe(200);
    expect(response.body.decks.length).toBeGreaterThan(0);
    
    expect(
      response.body.decks.every(
        (deck: { user_id: string }) => deck.user_id === user1.id,
      ),
    ).toBe(true);
  })

  it("returns an empty list when the user has no decks", async () => {
    
  })
  
});

describe("POST /decks", () => {
  it("requires authentication to create a deck", async () => {
    
  })
  
  it("succeeds with a valid title", async () => {
    
  })
  
  it("returns an id and correct title", async () => {
    
  })

  it("stores the description when provided", async () => {
    
  })

  it("returns 400 when missing a title", async () => {
    
  })

  it("returns 400 when the title is blank", async () => {
    
  })

  it("returns 400 when the title is too long", async () => {
    
  })

  it("returns 400 when the description is too long", async () => {
    
  })

  it("creates a deck which belongs to the authenticated user", async () => {
    
  })
})
