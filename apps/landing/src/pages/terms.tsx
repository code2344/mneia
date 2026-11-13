export default function TermsPage() {
  return (
    <main className="min-h-svh bg-background px-6 py-12 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <a href="/" className="font-heading text-lg font-semibold text-primary">
          mneia
        </a>

        <header className="mt-16 border-b border-border pb-8">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Legal
          </p>
          <h1 className="mt-3 font-heading text 4-xl font-semibold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Effective 13 November, 2026
          </p>
        </header>

        <div className="mt-10 space-y-10">
          <section>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-muted-foreground">
            These Terms of Service ("Terms") govern your use of the mneia website and waitlist. <br/> By using the website or joining the waitlist, you agree to these Terms. 
            </p>
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              1. About mneia
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              mneia is a study platform being developed to provide flashcards, spaced repetition, study planning, and other related services.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}