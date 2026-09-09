import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
])

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <h2 className="text-xl font-semibold">No workflow selected</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Select a workflow from the sidebar or create a new one to get started.
      </p>
    </div>
  )
}