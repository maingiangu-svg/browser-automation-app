"use server";

import { redirect } from "next/navigation";
import { tasks } from "@trigger.dev/sdk";
import type { helloWorldTask } from "@/trigger/example";

// Thêm tham số name vào đây
export async function createWorkflowAction(name?: string) {
  // Logic tạo workflow của bạn (ví dụ tạo slug, lưu DB, redirect...)
  return { success: true };
}

export async function runWorkflowAction() {
  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message: "Hello from Right Sidebar!",
  });

  return {
    runId: handle.id,
    publicAccessToken: handle.publicAccessToken,
  };
}