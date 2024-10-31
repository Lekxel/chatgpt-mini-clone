"use client";
import { logout } from "@/app/action";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MenubarItem } from "@radix-ui/react-menubar";
import { ChevronDownIcon, SquarePenIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function Authenticated() {
  const { open } = useSidebar();

  return (
    <header className="flex items-center justify-between pt-2 px-3.5">
      <div className="flex flex-row items-center gap-x-1">
        {!open && (
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent
              className="bg-black text-white"
              side="bottom"
              sideOffset={8}
              arrowPadding={3}
              align="start"
            >
              <p>Open sidebar</p>
            </TooltipContent>
          </Tooltip>
        )}

        {!open && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="rounded-lg ml-1 px-2.5 py-2.5 hover:bg-gray-200/90"
              >
                <SquarePenIcon size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent
              className="bg-black text-white"
              side="bottom"
              sideOffset={8}
              arrowPadding={3}
              align="start"
            >
              <p>New chat</p>
            </TooltipContent>
          </Tooltip>
        )}
        <Menubar className="border-none px-0">
          <MenubarMenu>
            <MenubarTrigger
              asChild
              className="cursor-pointer data-[state=open]:text-black/70 focus:text-black/70"
            >
              <Button variant="ghost">
                <span className="font-extrabold text-lg text-black/70">
                  ChatGPT
                </span>
                <ChevronDownIcon
                  className="relative text-black/30"
                  aria-hidden="true"
                />
              </Button>
            </MenubarTrigger>
            <MenubarContent className="rounded-2xl py-6 px-3 w-80"></MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <Menubar asChild>
        <MenubarMenu>
          <MenubarTrigger className="bg-transparent cursor-pointer">
            <Avatar>
              <AvatarFallback className="bg-gray-200">CG</AvatarFallback>
            </Avatar>
          </MenubarTrigger>

          <MenubarContent className="min-w-[7rem] px-3 py-3">
            <MenubarItem>...</MenubarItem>
            <MenubarItem onClick={logout} className="cursor-pointer">
              Logout
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </header>
  );
}
