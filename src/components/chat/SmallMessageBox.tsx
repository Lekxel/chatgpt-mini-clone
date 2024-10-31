"use client";
import { User } from "@supabase/supabase-js";
import { ArrowUpIcon, LoaderIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { Textarea } from "../ui/textarea";

export default function SmallMessageBox({
  user,
  conversation_id,
  addNewMessage,
}: {
  user: User | null;
  conversation_id: string;
  addNewMessage: (message: Message) => void;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message || !user) return;
    setLoading(true);
    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation_id,
          prompt: message,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        addNewMessage(result);
      }
      setMessage("");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex px-4 md:px-0 flex-col justify-center  items-center w-full">
      <section className="w-full md:w-[48rem] mt-7">
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
      </section>
    </div>
  );
}
