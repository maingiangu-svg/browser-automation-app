"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { RightSidebar } from "./right-sidebar";

interface WorkflowShellProps {
  workflowId: string;
}

export function WorkflowShell({ workflowId }: WorkflowShellProps) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Main Workspace (Canvas + Logs) chiếm toàn bộ diện tích còn lại */}
      <div className="flex-1 h-full overflow-hidden">
        <ResizablePanelGroup orientation="vertical" className="h-full w-full">
          {/* Canvas Placeholder */}
          <ResizablePanel defaultSize={70} minSize={30}>
            <div className="flex h-full items-center justify-center bg-background p-4">
              <span className="font-semibold text-muted-foreground">
                Canvas Placeholder ({workflowId})
              </span>
            </div>
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

      {/* Cột RightSidebar cố định độ rộng 320px (w-80) không lo bị bóp */}
      <div className="w-80 h-full border-l shrink-0 bg-background">
        <RightSidebar />
      </div>
    </div>
  );
}