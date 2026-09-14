"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import {
  ReactFlow,
  Controls,
  ConnectionLineType,
  type ColorMode,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-flow/styles.css";

import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow";
import { useStorage, useMutation } from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";
import { StepNode } from "./step-node";

const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const nodeTypes: NodeTypes = {
  step: StepNode,
};

export function Canvas() {
  const { theme } = useTheme();
  const isMounted = useMounted();

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useLiveblocksFlow();

  // Đọc danh sách nodes trực tiếp từ Storage cây Liveblocks
  const storageNodes = useStorage((root) => root.nodes);

  // Mutation ghi trực tiếp node ban đầu vào Storage nếu chưa có
  const ensureInitialNode = useMutation(({ storage }) => {
    const liveNodes = storage.get("nodes");
    if (liveNodes && liveNodes.length === 0) {
      liveNodes.push(
        new LiveObject({
          id: "initial-start-node",
          type: "step",
          position: { x: 250, y: 150 },
          data: {
            label: "Start Workflow",
            type: "INITIAL",
          },
        })
      );
    }
  }, []);

  // Tự động kích hoạt khi Canvas mount và storageNodes rỗng
  useEffect(() => {
    if (storageNodes && storageNodes.length === 0) {
      ensureInitialNode();
    }
  }, [storageNodes, ensureInitialNode]);

  const colorMode: ColorMode =
    isMounted && theme === "dark" ? "dark" : "light";

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        nodes={(nodes ?? []) as any[]}
        edges={edges ?? []}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        colorMode={colorMode}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Controls />
        <Cursors />
      </ReactFlow>
    </div>
  );
}