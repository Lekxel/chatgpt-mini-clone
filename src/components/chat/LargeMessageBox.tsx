"use client";
import { newConversation } from "@/app/action";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import {
  ArrowUpIcon,
  FileTextIcon,
  GraduationCapIcon,
  LightbulbIcon,
  LoaderIcon,
  SquareTerminalIcon,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Textarea } from "../ui/textarea";

export default function LargeMessageBox({ user }: { user: User | null }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message || !user) return;
    setLoading(true);
    try {
      newConversation(message);
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex px-4 md:px-0 flex-col items-center w-full md:w-[48rem]">
      <h1 className="font-bold text-black text-3xl text-center">
        What can I help with?
      </h1>
      <section className="w-full mt-7">
        <form className="relative" onSubmit={handleSendMessage}>
          <Textarea
            className="rounded-[26px] min-h-[50px] max-h-[25dvh] border-none placeholder:font-medium placeholder:text-black/70 placeholder:text-base bg-gray-100 focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-8 py-3 resize-none"
            placeholder="Message ChatGPT"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            disabled={!message || loading}
            className="rounded-full right-4 bottom-2.5 absolute flex items-center justify-center h-8 w-8 bg-black text-white disabled:opacity-20"
          >
            {loading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <ArrowUpIcon size={20} />
            )}
          </button>
        </form>

        <Suggestions />
      </section>
    </div>
  );
}

const Suggestions = () => (
  <div className="mt-7 flex-wrap grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
    {suggestions.map((suggestion) => (
      <Button
        key={suggestion.content}
        variant="outline"
        className="rounded-full"
      >
        <span className={suggestion.iconColor}>{suggestion.icon}</span>
        {suggestion.content}
      </Button>
    ))}
  </div>
);

const suggestions = [
  {
    content: "Get advice",
    icon: <GraduationCapIcon />,
    iconColor: "text-blue-300",
  },
  {
    content: "Make a plan",
    icon: <LightbulbIcon />,
    iconColor: "text-yellow-400",
  },
  {
    content: "Summarize text",
    icon: <FileTextIcon />,
    iconColor: "text-orange-500",
  },
  {
    content: "Code",
    icon: <SquareTerminalIcon />,
    iconColor: "text-blue-500",
  },
  {
    content: "More",
    icon: null,
    iconColor: "",
  },
];
