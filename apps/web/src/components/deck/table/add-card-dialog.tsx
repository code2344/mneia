import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Card } from "@/types/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

type AddCardDialogProps = {
  deckId: string;
  onCreated: (card: Card) => void;
};

export default function AddCardDialog({
  deckId,
  onCreated,
}: AddCardDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
  
    const front = String(formData.get("front") ?? "").trim();
    const back = String(formData.get("back") ?? "").trim();
  
    if (!front || !back) {
      setError("Both sides of the card are required.");
      return;
    }
  
    setIsSubmitting(true);
    setError(null);
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/decks/${deckId}/cards`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ front, back }),
        },
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error ?? "Could not create card");
      }
  
      onCreated(data.card);
      form.reset();
      setOpen(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not create card",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        <Plus />
        <span className="hidden lg:inline">Add card</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form className="contents" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create new card</DialogTitle>
            <DialogDescription>
              Create a new 2-sided flashcard in this deck.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm">
              Front (Question)
              <textarea
                className="h-9 rounded-lg border border-input bg-transparent px-3"
                name="front"
                placeholder="What is mitosis?"
                />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Back (Answer)
              <textarea
                className="h-9 rounded-lg border border-input bg-transparent px-3"
                name="back"
                placeholder="A type of cell division in which a single parent cell divides to produce two genetically identical daughter cells."
                />
            </label>
          </div>
          {error && (
            <p className="text-sm text-destructive">
              {error}
            </p>
          )}
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add card"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
