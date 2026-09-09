import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"

interface WorkflowPageProps {
  params: Promise<{
    workflowId: string
  }>
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { workflowId } = await params
  const { orgId } = await auth()

  if (!orgId) {
    return notFound()
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Workflow Detail</h1>
      <p className="text-muted-foreground">ID: {workflowId}</p>
      {/* Nơi này về sau sẽ chứa Canvas / Visual Editor để kéo thả node */}
    </div>
  )
}