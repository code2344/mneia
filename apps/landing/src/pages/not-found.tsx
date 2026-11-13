import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <p className="font-heading text-2xl font-semibold text-primary">
          mneia
        </p>

        <p className="mt-12 text-7xl font-semibold tracking-tight">404</p>

        <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight">
          This page doesn’t exist
        </h1>

        <p className="mt-4 text-muted-foreground">
          The page may have moved, or the address may be incorrect.
        </p>

        <Button className="mt-8" render={<a href="/" />}>
          Return home
        </Button>
      </div>
    </main>
  );
}