import { getCards, getDeck } from "@/lib/api/decks";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/deck/table/data-table";
import type { Card } from "@/types/card";

type Deck = {
  id: string;
  title: string;
  description: string | null;
};

const testCards: Card[] = [
  {
    deck_id: "biology",
    id: "1",
    front: "What is photosynthesis?",
    back: "The process plants use to make glucose.",
    position: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    scheduling: {
      due_at: new Date().toISOString(),
      stability: 2,
      difficulty: 4,
      state: 2,
      reps: 3,
      lapses: 0,
      last_reviewed_at: new Date().toISOString(),
    },
  },
];

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
        <div className="flex flex-col gap-2 p-8 md:gap-6 md:p-10">
          <Button variant="ghost" className="w-fit" render={<Link to="/decks" />}>
            <ArrowLeft className="size-4" />
            Back to decks
          </Button>
          <h2 className="font-heading text-2xl font-semibold">
            {deck?.title}
          </h2>
          <p>{deck?.description}</p>
          <p>{cards.length} cards</p>
        </div>
        <DataTable data={testCards} deckId={deckId} />
      </div>
    </div>
  );
};