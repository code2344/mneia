import { useAuth } from "@/auth/use-auth";
import { getDueReviews } from "@/lib/api/reviews";
import { useState, useEffect } from "react";

function WelcomeSection() {
  const [dueCount, setDueCount] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    let cancelled = false;

    async function loadDueReviews() {
      try {
        const reviews = await getDueReviews();

        if (!cancelled) {
          setDueCount(reviews.dueReviews.count);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      }
    }

    void loadDueReviews();

    return () => {
      cancelled = true;
    };
  }, []);
  
  return(
    <section className="space-y-2">
      <p className="text-sm text-muted-foreground">Good evening, {user?.firstName}</p>

      <h1 className="font-heading text-3xl font-semibold tracking-tight">
      What would you like to study?
      </h1>

      <p className="text-muted-foreground">
        {error
          ? "We couldn't load your review queue."
          : dueCount === null
            ? "Loading your review queue..."
            : `You have ${dueCount} cards waiting today.`}
      </p>
    </section>
  )
}

export default WelcomeSection;
