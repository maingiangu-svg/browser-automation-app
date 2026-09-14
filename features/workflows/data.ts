import { db } from "@/lib/db";
import { workflows } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function listWorkflows(organizationId: string) {
  return await db
    .select()
    .from(workflows)
    .where(eq(workflows.organizationId, organizationId));
}

export async function createWorkflow(organizationId: string, name: string) {
  const [newWorkflow] = await db
    .insert(workflows)
    .values({
      organizationId,
      name,
    })
    .returning();

  return newWorkflow;
}

// Hàm lấy 1 workflow cho Bước 11 (Liveblocks Setup)
export async function getWorkflow(id: string, organizationId: string) {
  const [workflow] = await db
    .select()
    .from(workflows)
    .where(
      and(
        eq(workflows.id, id),
        eq(workflows.organizationId, organizationId)
      )
    );

  return workflow;
}