import { useAuth } from "@/auth/use-auth";
import { getDueReviews } from "@/lib/api/reviews";

async function WelcomeSection() {
  const { user } = useAuth();
  const { reviews } = await getDueReviews()
  return(
    <section className="space-y-2">
      <p className="text-sm text-muted-foreground">Good evening, {user?.firstName}</p>

      <h1 className="font-heading text-3xl font-semibold tracking-tight">
      What would you like to study?
      </h1>

      <p className="text-muted-foreground">
      You have {reviews?.count} cards waiting today.
      </p>
    </section>
  )
}

export default WelcomeSection;
