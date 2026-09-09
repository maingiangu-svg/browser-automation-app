import { db } from "@/lib/db"
import { workflows } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function listWorkflows(organizationId: string) {
  return await db
    .select()
    .from(workflows)
    .where(eq(workflows.organizationId, organizationId))
}

export async function createWorkflow(organizationId: string, name: string) {
  const [newWorkflow] = await db
    .insert(workflows)
    .values({
      organizationId,
      name,
    })
    .returning()

  return newWorkflow
}