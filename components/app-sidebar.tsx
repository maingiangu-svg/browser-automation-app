import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { listWorkflows } from "@/features/workflows/data"
import { WorkflowNav } from "./workflow-nav"

export async function AppSidebar() {
  const { orgId } = await auth()
  const workflows = orgId ? await listWorkflows(orgId) : []

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
        <WorkflowNav workflows={workflows} />
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