import { Liveblocks } from "@liveblocks/node";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const secret = process.env.LIVEBLOCKS_SECRET_KEY;

if (!secret || !secret.startsWith("sk_")) {
  throw new Error("LIVEBLOCKS_SECRET_KEY is missing or invalid in .env.local");
}

const liveblocks = new Liveblocks({ secret });

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.firstName ?? "Anonymous",
      avatar: user.imageUrl,
    },
  });

  const { room } = await request.json();
  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  return new NextResponse(body, { status });
}