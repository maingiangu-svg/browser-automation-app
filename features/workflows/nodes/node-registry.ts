import { LucideIcon, Globe, Play } from "lucide-react";

export type StepNodeKind = "trigger" | "action";

export interface NodeField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder?: string;
  description?: string;
}

export interface NodeDefinition {
  type: string;
  title: string;
  description: string;
  icon: LucideIcon;
  kind: StepNodeKind;
  accentColor: string;
  fields: NodeField[];
}

export const NODE_REGISTRY: Record<string, NodeDefinition> = {
  start: {
    type: "start",
    title: "Start Workflow",
    description: "The entry point of your workflow",
    icon: Play,
    kind: "trigger",
    accentColor: "bg-emerald-500",
    fields: [],
  },
  "open-url": {
    type: "open-url",
    title: "Open URL",
    description: "Navigate to a URL in the browser",
    icon: Globe,
    kind: "action",
    accentColor: "bg-blue-500",
    fields: [
      {
        name: "url",
        label: "URL",
        type: "text",
        placeholder: "https://youtube.com",
      },
    ],
  },
};

export type NodeType = keyof typeof NODE_REGISTRY;

export interface StepNodeData {
  [key: string]: unknown; // Thêm dòng này để thỏa mãn Record<string, unknown> của React Flow
  type: NodeType;
  kind: StepNodeKind;
  title: string;
  values?: Record<string, unknown>;
}

export interface StepNodeType {
  id: string;
  type: "step";
  position: { x: number; y: number };
  data: StepNodeData;
}