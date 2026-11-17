import { ArrowLeft, FileX } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router"

export default function DeckNotFound() {
  <div className="flex min-h-[calc(100svh-2rem)] items-center justify-center p-8">
    <div className="max-w-md text-center">
      <FileX />
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-3 font-heading text-3xl font-semibold">
        Deck not found
      </h1>

      <p className="mt-3 text-muted-foreground">
        This deck may have been deleted, moved, or you may not have access to it.
      </p>

      <Button className="mt-6" render={<Link to="/decks" />}>
        <ArrowLeft />
        Back to decks
      </Button>
    </div>
  </div>
}