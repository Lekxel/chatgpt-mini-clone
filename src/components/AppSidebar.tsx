import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquarePenIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ConversationList from "./ConversationList";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="pt-2 flex flex-row items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger />
          </TooltipTrigger>
          <TooltipContent
            className="bg-black text-white"
            side="right"
            sideOffset={8}
            arrowPadding={3}
            align="start"
          >
            <p className="font-bold">Close sidebar</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="rounded-lg px-2.5 py-2.5 hover:bg-gray-200/90"
            >
              <SquarePenIcon size={20} />
            </Link>
          </TooltipTrigger>
          <TooltipContent
            className="bg-black text-white"
            side="bottom"
            sideOffset={8}
            arrowPadding={3}
            align="center"
          >
            <p className="font-bold">New chat</p>
          </TooltipContent>
        </Tooltip>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link
                  href="/"
                  className="flex h-9 px-2 hover:bg-gray-200/90 flex-row items-center justify-between group/item rounded-lg"
                >
                  <span className="flex flex-row items-center gap-x-2">
                    <span className="bg-white border rounded-full p-0.5">
                      <Image
                        className="dark:invert"
                        src="/openai-logo.svg"
                        alt="Openai logo"
                        width={18}
                        height={18}
                        priority
                      />
                    </span>
                    <span>ChatGPT</span>
                  </span>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="px-2.5 py-2.5 hidden group-hover/item:block">
                        <SquarePenIcon size={16} />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-black text-white"
                      side="right"
                      sideOffset={20}
                      arrowPadding={3}
                      align="center"
                    >
                      <p>New chat</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </SidebarMenuItem>
              <ConversationList />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-14 hover:bg-gray-200/90">
              <span className="bg-white p-1 border rounded-full">
                <Image
                  className="dark:invert"
                  src="/upgrade-icon.svg"
                  alt="upgrade icon"
                  width={18}
                  height={18}
                  priority
                />
              </span>
              <div>
                <p className="text-black/90 font-medium">Upgrade plan</p>
                <p className="text-black/50 text-xs mt-0.5 font-light">
                  More access to the best models
                </p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
