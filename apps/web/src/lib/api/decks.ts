const apiUrl = import.meta.env.VITE_API_URL;

export async function getDeck(deckId: string) {
  const response = await fetch(`${apiUrl}/decks/${deckId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Could not load deck");
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