export default function AppLoading() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background">
      <div className="absolute -left-24 -top-24 size-72 rounded-full bg-primary/5" />
      <div className="absolute -bottom-32 -right-24 size-96 rounded-full bg-primary/5" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="font-heading text-2xl font-semibold tracking-tight">
          mneia
        </div>
        <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary" aria-label="Loading">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    </div>
  )
}