"use client"

import * as React from "react"
import { useTransition } from "react"
import Link from "next/link"
import { PlusIcon, WorkflowIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { createWorkflowAction } from "@/features/workflows/actions"
import { generateSlug } from "@/features/workflows/lib/generate-slug"
import { Workflow } from "@/lib/db/schema"

interface WorkflowNavProps {
  workflows: Workflow[]
}

export function WorkflowNav({ workflows }: WorkflowNavProps) {
  const { state } = useSidebar()
  const [activeId, setActiveId] = React.useState<string | null>(
    workflows[0]?.id || null
  )
  const [isPending, startTransition] = useTransition()

  const handleCreate = () => {
    startTransition(async () => {
      const name = generateSlug()
      await createWorkflowAction(name)
    })
  }

  if (state === "collapsed") {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Popover>
            <PopoverTrigger asChild>
              <SidebarMenuButton tooltip="Workflows">
                <WorkflowIcon className="size-4" />
              </SidebarMenuButton>
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="w-56 p-2">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-semibold text-muted-foreground">
                  Workflows
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-6"
                  onClick={handleCreate}
                  disabled={isPending}
                >
                  <PlusIcon className="size-4" />
                </Button>
              </div>
              <SidebarSeparator className="my-1" />
              <div className="flex flex-col gap-1 pt-1">
                {workflows.map((wf) => (
                  <Button
                    key={wf.id}
                    asChild
                    variant={activeId === wf.id ? "secondary" : "ghost"}
                    className="justify-start text-xs h-8 truncate"
                    onClick={() => setActiveId(wf.id)}
                  >
                    <Link href={`/workflows/${wf.id}`}>
                      <span className="truncate">{wf.name}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workflows</SidebarGroupLabel>
      <SidebarGroupAction
        title="Add Workflow"
        onClick={handleCreate}
        disabled={isPending}
      >
        <PlusIcon className="size-4" />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {workflows.map((wf) => (
            <SidebarMenuItem key={wf.id}>
              <SidebarMenuButton
                isActive={activeId === wf.id}
                onClick={() => setActiveId(wf.id)}
                asChild
              >
                <Link href={`/workflows/${wf.id}`}>
                  <span className="truncate">{wf.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}