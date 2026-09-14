"use client";

import { useSyncExternalStore, useCallback } from "react";
import { useTheme } from "next-themes";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  type Connection,
  type Edge,
  type ColorMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Fix lỗi Hydration Mismatch bằng SyncExternalStore
const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Start Workflow" },
  },
  {
    id: "2",
    position: { x: 100, y: 250 },
    data: { label: "Open Page" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
  },
];

export function Canvas() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: "smoothstep", animated: true },
          eds
        )
      ),
    [setEdges]
  );

  // Đồng bộ theme với next-themes
  const colorMode: ColorMode = mounted
    ? (resolvedTheme as ColorMode) || "dark"
    : "dark";

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={colorMode}
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "var(--border)", strokeWidth: 2 },
        }}
        maxZoom={1}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}