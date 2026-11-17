import { getCards, getDeck } from "@/lib/api/decks";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Deck = {
  id: string;
  title: string;
  description: string | null;
};

type Card = {
  id: string;
  front: string;
  back: string;
};

export default function DeckPage() {
  
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { deckId } = useParams<{ deckId: string }>();
  
  useEffect(() => {
    if (typeof deckId !== "string") {
      setError("Invalid deck id");
      setIsLoading(false);
      return;
    }

    async function loadDeckPage(id: string) {
      try {
        const [deckData, cardData] = await Promise.all([
          getDeck(id),
          getCards(id),
        ]);
        setDeck(deckData.deck);
        setCards(cardData.cards);
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

    void loadDeckPage(deckId);
  }, [deckId]);

  if (isLoading) {
    return <p>Loading deck</p>;
  }
  if (error) {
    return <p className="text-destructive">{error}</p>;
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <h2 className="font-heading text-2xl font-semibold">
          {deck?.title}
        </h2>
        <p>{deck?.description}</p>
        <p>{cards.length} cards</p>
      </div>
    </div>
  );
};