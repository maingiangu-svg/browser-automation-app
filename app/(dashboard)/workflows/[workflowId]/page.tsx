import { Room } from "@/features/workflows/components/room";
import { WorkflowShell } from "@/features/workflows/components/workflow-shell";

interface PageProps {
  params: Promise<{ workflowId: string }>;
}

export default async function WorkflowPage({ params }: PageProps) {
  const { workflowId } = await params;

  return (
    <Room roomId={workflowId}>
      <WorkflowShell workflowId={workflowId} />
    </Room>
  );
}