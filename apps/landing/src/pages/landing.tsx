import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logo from "@/assets/mneia-icon.svg";
import { useState } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";


export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    setStatus("loading");
    setMessage("");
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/waitlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message ?? "Unable to join the waitlist");
      }
  
      setStatus("success");
      setMessage("You're on the waitlist.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }
  
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex flex-1 items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl text-center">
          <Card className="w-full max-w-2xl border-0 bg-transparent p-8 text-center shadow-none">
            <div className="flex items-center gap-3 justify-center">
              <img src={logo} alt="" className="size-9" />
              <span className="font-heading text-2xl font-semibold">mneia</span>
            </div>
    
            <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Study better.
              <br />
              Remember longer.
            </h1>
    
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              A focused space for flashcards, spaced repetition, and steady
              progress.
            </p>
    
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
              />
            
              <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Joining…" : "Join the waitlist"}
              </Button>
            </form>
            
            {message && (
              <p
                className={
                  status === "error"
                    ? "mt-3 text-sm text-destructive"
                    : "mt-3 text-sm text-muted-foreground"
                }
                role="status">
                {message}
              </p>
            )}
          </Card>
        </div>
      </main>
      <footer className="shrink-0 border-t border-border px-6 py-6">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 mneia</p>
      
            <nav className="flex gap-4">
              <a className="hover:text-foreground" href="/terms">
                Terms
              </a>
              <a className="hover:text-foreground" href="/privacy">
                Privacy
              </a>
              <a className="hover:text-foreground" href="mailto:hello@mneia.net">
                Contact
              </a>
            </nav>
          </div>
        </footer>
      </div>
  );
}