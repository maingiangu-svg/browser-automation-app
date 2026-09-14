import { LiveList, LiveObject } from "@liveblocks/client";

// Khai báo kiểu dữ liệu Node & Edge của React Flow
export type NodeData = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, any>;
};

export type EdgeData = {
  id: string;
  source: string;
  target: string;
};

declare global {
  interface Liveblocks {
    Presence: {
      cursor?: { x: number; y: number } | null;
    };

    // Khai báo Storage tree chứa nodes & edges
    Storage: {
      nodes: LiveList<LiveObject<NodeData>>;
      edges: LiveList<LiveObject<EdgeData>>;
    };

    UserMeta: {
      id: string;
      info: {
        name: string;
        avatar?: string;
      };
    };

    RoomEvent: {};
    ThreadMetadata: {};
    RoomInfo: {};
  }
}

export {};