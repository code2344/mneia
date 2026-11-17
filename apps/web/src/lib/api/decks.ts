const apiUrl = import.meta.env.VITE_API_URL;
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
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
    throw new Error("Could not load cards");
  }

  return response.json();
}