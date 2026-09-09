"use client"

import * as React from "react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { PlusIcon, WorkflowIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const dummyWorkflows = [
  { id: "1", name: "My First Workflow" },
  { id: "2", name: "Customer Onboarding" },
]

function WorkflowNav() {
  const { state } = useSidebar()
  const [activeId, setActiveId] = React.useState("1")

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
                <Button size="icon" variant="ghost" className="size-6">
                  <PlusIcon className="size-4" />
                </Button>
              </div>
              <SidebarSeparator className="my-1" />
              <div className="flex flex-col gap-1 pt-1">
                {dummyWorkflows.map((wf) => (
                  <Button
                    key={wf.id}
                    variant={activeId === wf.id ? "secondary" : "ghost"}
                    className="justify-start text-xs h-8"
                    onClick={() => setActiveId(wf.id)}
                  >
                    {wf.name}
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
      <SidebarGroupAction title="Add Workflow">
        <PlusIcon className="size-4" />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {dummyWorkflows.map((wf) => (
            <SidebarMenuItem key={wf.id}>
              <SidebarMenuButton
                isActive={activeId === wf.id}
                onClick={() => setActiveId(wf.id)}
              >
                <span>{wf.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="flex flex-row items-center justify-between group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
        <div className="group-data-[collapsible=icon]:hidden">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: "flex w-full",
                organizationSwitcherTrigger: "w-full justify-between",
              },
            }}
          />
        </div>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <WorkflowNav />
      </SidebarContent>

      <SidebarFooter className="flex items-center group-data-[collapsible=icon]:justify-center">
        <UserButton
          appearance={{
            elements: {
              rootBox: "flex w-full justify-center",
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}