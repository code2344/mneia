import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateDeckDialog } from "@/components/decks/create-deck-dialog";

type Deck = {
  id: string,
  title: string,
  description: string | null,
  subject_id: string | null,
  created_at: string,
  updated_at: string,
  archived_at: string | null;
};

export default function DecksPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDecks() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/decks`,
          {
            credentials: "include"
          },
        );
        if (!response.ok) {
          throw new Error("Could not load decks")
        }

        const data: { decks: Deck[] } = await response.json();
        setDecks(data.decks);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Could not load decks",
        );
      } finally {
        setIsLoading(false);
      }
    }
    void loadDecks();
  }, []);
  
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 p-8 md:p-10">
        <div>
          <h2 className="font-heading text-2xl font-semibold">
            My Decks
          </h2>
          <p className="text-muted-foreground mt-1">
            Your card collections.
          </p>
          <CreateDeckDialog
              onCreated={(deck) => {
                setDecks((current) => [deck, ...current]);
              }}
            />
        </div>
        {isLoading && <p>Loading your decks...</p>}

        {error && (
          <p className="text-destructive">
            {error}
          </p>
        )}

        {!isLoading && !error && decks.length === 0 && (
          <p className="text-muted-foreground">
            You haven't created any decks yet!
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <Card key={deck.id}>
              <CardHeader>
                <CardTitle>{deck.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {deck.description || "No description"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
