import { WorkflowShell } from "@/features/workflows/components/workflow-shell";

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

export default async function WorkflowIdPage({ params }: PageProps) {
  const { workflowId } = await params;

  return <WorkflowShell workflowId={workflowId} />;
}