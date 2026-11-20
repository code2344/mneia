import { Button } from "@/components/ui/button";
import mneiaIcon from "../assets/mneia-icon.svg";
import { Link } from "react-router";

export default function StudyPage() {
  return (
    <div className="min-h-svh bg-background">
      <header className="flex h-20 items-center justify-between border-b px-6 lg:px-16">
        <div>
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src={mneiaIcon} alt="" className="size-10"/>
            <span className="text-lg font-semibold">mneia</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-5xl flex-col items-center px-6 py-10">
        <div className="w-full max-w-2xl">
          <div className="mb-3 flex items-center justify-between text-base text-muted-foreground">
            <span>Card 4 of 18</span>
            <span>14 remaining</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/4 bg-primary" />
          </div>
        </div>
        <section className="my-auto w-full max-w-3xl rounded-2xl border bg-card p-8 shadow-sm sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Question
          </p>

          <div className="flex min-h-64 items-center justify-center text-center">
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {/* Question itself */}
              What is photosynthesis?
            </h1>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Once you've thought of your answer, reveal the back.
          </p>
        </section>

        <div className="mt-8 mb-4 flex flex-col items-center gap-4">
          <Button size="lg">Show answer</Button>
          <p className="text-sm text-muted-foreground">
            or press space to reveal
          </p>
        </div>
      </main>
    </div>
  )
}