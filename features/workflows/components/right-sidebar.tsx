"use client";

import { useState } from "react";
import { useRealtimeRun } from "@trigger.dev/react-hooks";
import { Button } from "@/components/ui/button";
import { runWorkflowAction } from "@/features/workflows/actions";

function RunStatus({
  runId,
  publicAccessToken,
}: {
  runId: string;
  publicAccessToken: string;
}) {
  const runState = useRealtimeRun(runId, {
    accessToken: publicAccessToken,
  });

  const run = (runState as any)?.run ?? runState;

  return (
    <div className="mt-4 rounded-lg border bg-muted/50 p-3 text-xs space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-muted-foreground">Status:</span>
        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono uppercase text-primary">
          {run?.status ?? "LOADING..."}
        </span>
      </div>
      {run?.output && (
        <div>
          <span className="mb-1 block font-semibold text-muted-foreground">
            Output:
          </span>
          <pre className="overflow-x-auto rounded border bg-background p-2 font-mono text-[10px]">
            {JSON.stringify(run.output, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export function RightSidebar() {
  const [isPending, setIsPending] = useState(false);
  const [runData, setRunData] = useState<{
    runId: string;
    publicAccessToken: string;
  } | null>(null);

  const handleRun = async () => {
    setIsPending(true);
    try {
      const res = await runWorkflowAction();
      setRunData(res);
    } catch (error) {
      console.error("Failed to run workflow:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <aside className="flex h-full w-full flex-col justify-between bg-background p-4">
      <div className="flex w-full flex-col gap-2">
        <Button onClick={handleRun} disabled={isPending} className="w-full">
          {isPending ? "Triggering..." : "Run Workflow"}
        </Button>

        {runData?.runId && runData?.publicAccessToken && (
          <RunStatus
            runId={runData.runId}
            publicAccessToken={runData.publicAccessToken}
          />
        )}
      </div>
      <span className="text-center text-xs font-semibold text-muted-foreground">
        Inspector Panel
      </span>
    </aside>
  );
}