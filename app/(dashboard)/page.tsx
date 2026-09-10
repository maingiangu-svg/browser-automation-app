import { WorkflowShell } from "@/features/workflows/components/workflow-shell";

interface WorkflowPageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { workflowId } = await params;

  return (
    <main className="flex h-full w-full flex-1 overflow-hidden">
      <WorkflowShell workflowId={workflowId} />
    </main>
  );
}