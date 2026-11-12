import { useAuth } from "@/auth/auth-context";

function WelcomeSection() {
  const { user } = useAuth();
  return(
    <section className="space-y-2">
      <p className="text-sm text-muted-foreground">Good evening, {user?.firstName}</p>

      <h1 className="font-heading text-3xl font-semibold tracking-tight">
      What would you like to study?
      </h1>

      <p className="text-muted-foreground">
      You have 18 cards waiting today.
      </p>
    </section>
  )
}

export default WelcomeSection;
