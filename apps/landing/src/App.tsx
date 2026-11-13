import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function App() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-16">
      <Card className="w-full max-w-2xl border-0 bg-transparent p-8 text-center shadow-none">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          mneia
        </p>

        <h1 className="font-heading text-5xl font-semibold tracking-tight md:text-7xl">
          Study better.
          <br />
          Remember longer.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          A focused space for flashcards, spaced repetition, and steady
          progress.
        </p>

        <Button className="mt-8">
          Join the waitlist
        </Button>
      </Card>
    </main>
  );
}

export default App;