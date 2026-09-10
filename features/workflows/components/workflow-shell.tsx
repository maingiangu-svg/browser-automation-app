"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface WorkflowShellProps {
  workflowId: string;
}

export function WorkflowShell({ workflowId }: WorkflowShellProps) {
  return (
    <div className="flex h-full w-full flex-col">
      <ResizablePanelGroup orientation="horizontal" className="h-full w-full">
        {/* Main Workspace (Canvas + Logs) */}
        <ResizablePanel defaultSize={80} minSize={30}>
          <ResizablePanelGroup orientation="vertical">
            {/* Top Panel: Canvas Placeholder */}
            <ResizablePanel defaultSize={70} minSize={30}>
              <div className="flex h-full items-center justify-center bg-background p-4">
                <span className="font-semibold text-muted-foreground">
                  Canvas Placeholder ({workflowId})
                </span>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Bottom Panel: Logs Placeholder */}
            <ResizablePanel defaultSize={30} minSize={15}>
              <div className="flex h-full items-center justify-center bg-muted/30 p-4">
                <span className="font-semibold text-muted-foreground">
                  Logs Placeholder
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Sidebar: Inspector */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
          <div className="flex h-full items-center justify-center bg-background p-4">
            <span className="font-semibold text-muted-foreground">
              Inspector Panel
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}