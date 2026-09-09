"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { createWorkflow } from "./data"

export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("Unauthorized")
  }

  const workflow = await createWorkflow(orgId, name)

  redirect(`/workflows/${workflow.id}`)
}