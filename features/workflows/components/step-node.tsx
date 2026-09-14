"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { NODE_REGISTRY, type StepNodeData } from "../nodes/node-registry";

export function StepNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as StepNodeData;
  const definition = NODE_REGISTRY[nodeData.type];

  if (!definition) {
    return null;
  }

  const Icon = definition.icon;
  const hasTarget = definition.kind !== "trigger";

  return (
    <div
      className={cn(
        "relative min-w-[200px] rounded-xl border bg-card p-3 shadow-sm transition-all",
        selected ? "border-primary ring-2 ring-primary/20" : "border-border"
      )}
    >
      {/* Target Handle (Chỉ dành cho Action Nodes - Nối từ node khác tới) */}
      {hasTarget && (
        <Handle
          type="target"
          position={Position.Top}
          className="!size-3 !border-2 !border-background !bg-muted-foreground"
        />
      )}

      {/* Node Header */}
      <div className="flex items-center gap-2.5">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg text-white",
            definition.accentColor
          )}
        >
          <Icon className="size-4" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="truncate text-xs font-semibold text-foreground">
            {nodeData.title || definition.title}
          </span>
          <span className="truncate text-[10px] text-muted-foreground">
            {definition.description}
          </span>
        </div>
      </div>

      {/* Source Handle (Tất cả node đều có để nối sang node tiếp theo) */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!size-3 !border-2 !border-background !bg-muted-foreground"
      />
    </div>
  );
}