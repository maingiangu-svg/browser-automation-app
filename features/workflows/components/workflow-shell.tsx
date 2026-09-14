"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { RightSidebar } from "./right-sidebar";
import { Canvas } from "./canvas";

interface WorkflowShellProps {
  workflowId: string;
}

export function WorkflowShell({ workflowId }: WorkflowShellProps) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Workspace khu vực Canvas + Logs */}
      <div className="flex-1 h-full overflow-hidden">
        <ResizablePanelGroup orientation="vertical" className="h-full w-full">
          {/* Canvas Component */}
          <ResizablePanel defaultSize={70} minSize={30}>
            <Canvas />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Logs Placeholder */}
          <ResizablePanel defaultSize={30} minSize={15}>
            <div className="flex h-full items-center justify-center bg-muted/30 p-4">
              <span className="font-semibold text-muted-foreground">
                Logs Placeholder
              </span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Right Sidebar cố định w-80 */}
      <div className="w-80 h-full border-l shrink-0 bg-background">
        <RightSidebar />
      </div>
    </div>
  );
}