import { getCards, getDeck } from "@/lib/api/decks";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { de } from "zod/v4/locales";

export default function DeckPage() {
  const { deckId } = useParams<{ deckId: string }>();
  
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!deckId) return;

    async function loadDeckPage() {
      try {
        const [deckData, cardData] = await Promise.all([
          getDeck(deckId),
          getCards(deckId),
        ]);
        setDeck(deckData.deck);
        setCards(deckData.cards);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Could not load deck",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadDeckPage();
  }, [deckId]);

  if (isLoading) {
    return <p>Loading deck</p>;
  }
  if (error) {
    return <p className="text-destructive">{error}</p>;
  }
  return (
    <main>
      <h2 className="font-heading text-2xl font-semibold">
        {deck?.title}
      </h2>
      <p>{deck?.description}</p>
      <p>{cards.length} cards</p>
    </main>
  );
};