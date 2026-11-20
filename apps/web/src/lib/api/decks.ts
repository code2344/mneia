const apiUrl = import.meta.env.VITE_API_URL;
import { ApiError } from "./errors";

export async function getDecks() {
  const response = await fetch(`${apiUrl}/decks`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new ApiError(
      response.status === 500
        ? "Error loading decks"
        : "Could not load decks",
      response.status,
    );
  }

  return response.json();
}

export async function getDeck(deckId: string) {
  const response = await fetch(`${apiUrl}/decks/${deckId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new ApiError(
      response.status === 404
        ? "Deck not found"
        : "Could not load deck",
      response.status,
    );
  }

  return response.json();
}

export async function getCards(deckId: string) {
  const response = await fetch(`${apiUrl}/decks/${deckId}/cards`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new ApiError(
      response.status === 404
        ? "Deck not found"
        : "Could not load cards",
      response.status,
    );
  }

  return response.json();
}