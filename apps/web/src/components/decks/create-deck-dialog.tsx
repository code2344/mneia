import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
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

type Deck = {
  id: string;
  title: string;
  description: string | null;
  subject_id: string | null;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
};

type CreateDeckDialogProps = {
  onCreated: (deck: Deck) => void;
};

export function CreateDeckDialog({
  onCreated,
}: CreateDeckDialogProps) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);
  
    const title = String(formData.get("title") ?? "");
    const descriptionValue = String(formData.get("description") ?? "");
  
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/decks`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: descriptionValue || null,
        }),
      },
    );
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.error ?? "Could not create deck");
    }
  
    onCreated(data.deck);
    event.currentTarget.reset();
    setOpen(false);
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger render={<Button variant="outline" />}>
        Create deck
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form className="contents" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create new Deck</DialogTitle>
            <DialogDescription>something idk yet</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm">
              Deck title
              <input
                className=""
                defaultValue="Year 9 Science"
                name="title"
                type="text"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Description
              <input
                className=""
                defaultValue="This deck is the cards for my year 9 science class!"
                name="description"
                type="text"
              />
            </label>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Create Deck</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
};
