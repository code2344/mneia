import { getCards, getDeck } from "@/lib/api/decks";
import { ArrowLeft, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/deck/table/data-table";
import AddCardDialog from "@/components/deck/table/add-card-dialog";
import AppLoading from "@/components/app-loading";
import type { Card } from "@/types/card";

type Deck = {
  id: string;
  title: string;
  description: string | null;
};

export default function DeckPage() {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { deckId } = useParams<{ deckId: string }>();

  const dueCount = cards.filter((card) => {
    const dueAt = card.scheduling?.due_at;

    if (!dueAt) return false;

    const dueDate = new Date(dueAt);
    const now = new Date();

    return (
      dueDate.getFullYear() === now.getFullYear() &&
      dueDate.getMonth() === now.getMonth() &&
      dueDate.getDate() === now.getDate()
    );
  }).length;
  
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
    return <AppLoading />;
  }
  if (error) {
    return <p className="text-destructive">{error}</p>;
  }
  if (typeof deckId !== "string") {
    return <p className="text-destructive">Invalid deck ID</p>;
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-2 p-8 md:gap-6 md:p-10">
          <Button variant="ghost" className="w-fit" render={<Link to="/decks" />}>
            <ArrowLeft className="size-4" />
            Back to decks
          </Button>
          <section className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
            <h2 className="mt-2 font-heading text-3xl font-semibold">
              {deck?.title}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {deck?.description}
            </p>
            
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <AddCardDialog
                  deckId={deckId}
                  onCreated={(card) => {
                    setCards((current) => [...current, card]);
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("card-import")?.click()}>
                  <Upload />
                  Import cards
                </Button>
                
                <input
                  id="card-import"
                  type="file"
                  accept=".csv,.txt,.apkg"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                
                    if (!file) return;
                
                    // Parse and upload the file here.
                    console.log(file);
                
                    event.target.value = "";
                  }}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-8 border-t pt-5">
              <div>
                <p className="text-2xl font-semibold">{cards.length}</p>
                <p className="text-sm text-muted-foreground">Cards</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{dueCount}</p>
                <p className="text-sm text-muted-foreground">Due today</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">0%</p>
                <p className="text-sm text-muted-foreground">Mastered</p>
              </div>
            </div>
          </section>
        </div>
        
        <DataTable data={cards} deckId={deckId} />
      </div>
    </div>
  );
};