import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronDownIcon, SquarePenIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function NotAuthenticated() {
  return (
    <header className="flex items-center justify-between pt-2 px-3.5">
      <div className="flex flex-row items-center gap-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="rounded-lg px-2.5 py-2.5 hover:bg-gray-200/90"
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
        <Menubar className="border-none">
          <MenubarMenu>
            <MenubarTrigger
              asChild
              className="cursor-pointer data-[state=open]:text-black/70 focus:text-black/70"
            >
              <Button variant="ghost">
                <span className="font-extrabold text-lg text-black/70">
                  ChatGPT 4o mini
                </span>
                <ChevronDownIcon
                  className="relative text-black/30"
                  aria-hidden="true"
                />
              </Button>
            </MenubarTrigger>

            <MenubarContent className="rounded-2xl py-6 px-3 w-80">
              <h3 className="font-semibold text-base">
                Log in to try advanced features
              </h3>
              <p className="text-black/70 mt-0.5 mb-4">
                Get smarter responses, upload files, analyze images, and more by
                logging in.
              </p>
              <Auths />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <Auths smallerSize />
    </header>
  );
}

const Auths = ({ smallerSize = false }: { smallerSize?: boolean }) => (
  <div className="flex flex-row items-center gap-x-2">
    <Button
      asChild
      className={`rounded-full px-3 font-bold ${smallerSize && "h-7"}`}
    >
      <Link href="/login">Log in</Link>
    </Button>
    <Button
      type="button"
      asChild
      variant="outline"
      className={`text-black/90 font-bold px-3 rounded-full ${
        smallerSize && "h-7"
      }`}
    >
      <Link href="/register">Sign up</Link>
    </Button>
  </div>
);
