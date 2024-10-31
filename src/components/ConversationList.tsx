import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createClient } from "@/utils/supabase/server";
import { EllipsisIcon } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";

export default async function ConversationList() {
  const supabase = await createClient();

  const { data: conversations } = await supabase
    .from("conversation")
    .select("*");

  const formattedConversations = conversations?.reduce(
    (acc: any, conversation: any) => {
      const date = conversation.created_at;
      const formattedDate = DateTime.fromISO(date).toFormat("yyyy-MM-dd");

      const today = DateTime.now().toFormat("yyyy-MM-dd");

      if (formattedDate === today) {
        acc["Today"].push(conversation);
      } else if (
        DateTime.fromISO(date).diffNow("days").days <= -1 &&
        DateTime.fromISO(date).diffNow("days").days >= -7
      ) {
        acc["Previous 7 Day"].push(conversation);
      } else {
        acc["Previous 30 Days"].push(conversation);
      }

      return acc;
    },
    {
      Today: [],
      "Previous 7 Days": [],
      "Previous 30 Days": [],
    }
  ) || {
    Today: [],
    "Previous 7 Days": [],
    "Previous 30 Days": [],
  };

  return (
    <>
      <SidebarGroupLabel className="mt-7 text-black/80 font-semibold">
        Today
      </SidebarGroupLabel>
      {formattedConversations["Today"].map((conversation: Conversation) => (
        <SidebarMenuItem>
          <SidebarMenuButton className="flex h-8 hover:bg-gray-200/90 flex-row items-center justify-between group/item">
            <Link
              href={`/c/${conversation.id}`}
              className="text-nowrap text-ellipsis overflow-hidden"
            >
              {conversation.title}
            </Link>
            <Menubar asChild>
              <MenubarMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MenubarTrigger
                      className="bg-transparent cursor-pointer hidden group-hover/item:block"
                      asChild
                    >
                      <button type="button">
                        <EllipsisIcon size={16} />
                      </button>
                    </MenubarTrigger>
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-black text-white"
                    side="top"
                    sideOffset={3}
                    arrowPadding={3}
                    align="center"
                  >
                    <p>Options</p>
                  </TooltipContent>
                </Tooltip>
                <MenubarContent className="min-w-[7rem]">
                  <MenubarItem>Share</MenubarItem>
                  <MenubarItem>Rename</MenubarItem>
                  <MenubarItem>Archive</MenubarItem>
                  <MenubarItem className="text-red-500">Delete</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}

      {formattedConversations["Previous 7 Days"].length ? (
        <SidebarGroupLabel className="mt-5 text-black/80 font-semibold">
          Previous 7 Days
        </SidebarGroupLabel>
      ) : null}
      {formattedConversations["Previous 7 Days"].map(
        (conversation: Conversation) => (
          <SidebarMenuItem>
            <SidebarMenuButton className="flex h-8 hover:bg-gray-200/90 flex-row items-center justify-between group/item">
              <Link
                href={`/c/${conversation.id}`}
                className="text-nowrap text-ellipsis overflow-hidden"
              >
                {conversation.title}
              </Link>
              <Menubar asChild>
                <MenubarMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <MenubarTrigger
                        className="bg-transparent cursor-pointer hidden group-hover/item:block"
                        asChild
                      >
                        <button type="button">
                          <EllipsisIcon size={16} />
                        </button>
                      </MenubarTrigger>
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-black text-white"
                      side="top"
                      sideOffset={3}
                      arrowPadding={3}
                      align="center"
                    >
                      <p>Options</p>
                    </TooltipContent>
                  </Tooltip>
                  <MenubarContent className="min-w-[7rem]">
                    <MenubarItem>Share</MenubarItem>
                    <MenubarItem>Rename</MenubarItem>
                    <MenubarItem>Archive</MenubarItem>
                    <MenubarItem className="text-red-500">Delete</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      )}

      {formattedConversations["Previous 30 Days"].length ? (
        <SidebarGroupLabel className="mt-5 text-black/80 font-semibold">
          Previous 30 Days
        </SidebarGroupLabel>
      ) : null}
      {formattedConversations["Previous 30 Days"].map(
        (conversation: Conversation) => (
          <SidebarMenuItem>
            <SidebarMenuButton className="flex h-8 hover:bg-gray-200/90 flex-row items-center justify-between group/item">
              <Link
                href={`/c/${conversation.id}`}
                className="text-nowrap text-ellipsis overflow-hidden"
              >
                {conversation.title}
              </Link>
              <Menubar asChild>
                <MenubarMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <MenubarTrigger
                        className="bg-transparent cursor-pointer hidden group-hover/item:block"
                        asChild
                      >
                        <button type="button">
                          <EllipsisIcon size={16} />
                        </button>
                      </MenubarTrigger>
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-black text-white"
                      side="top"
                      sideOffset={3}
                      arrowPadding={3}
                      align="center"
                    >
                      <p>Options</p>
                    </TooltipContent>
                  </Tooltip>
                  <MenubarContent className="min-w-[7rem]">
                    <MenubarItem>Share</MenubarItem>
                    <MenubarItem>Rename</MenubarItem>
                    <MenubarItem>Archive</MenubarItem>
                    <MenubarItem className="text-red-500">Delete</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      )}
    </>
  );
}
