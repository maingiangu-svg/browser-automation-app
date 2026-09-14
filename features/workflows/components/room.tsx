"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveObject } from "@liveblocks/client";

export function Room({
  children,
  roomId,
}: {
  children: ReactNode;
  roomId: string;
}) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider
        id={roomId}
        initialStorage={{
          nodes: new LiveList([
            new LiveObject({
              id: "1",
              type: "step",
              position: { x: 250, y: 150 },
              data: { label: "Initial Step" },
            }),
          ]),
          edges: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={<div>Loading workflow...</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}