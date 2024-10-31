"use client";
import { User } from "@supabase/supabase-js";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Volume2Icon,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import Container from "../Container";
import { Button } from "../ui/button";
import SmallMessageBox from "./SmallMessageBox";

export default function ConversationMessages({
  user,
  conversation_id,
  initialMessages,
}: {
  user: User | null;
  conversation_id: string;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState([...initialMessages]);
  const addNewMessage = (message: Message) => {
    setMessages((m) => [...m, message]);
  };

  return (
    <>
      <Container>
        <div className="w-full text-black text-base font-medium md:w-[48rem]">
          {messages?.map((message: Message) => (
            <SingleMessage message={message} />
          ))}
        </div>
      </Container>
      <SmallMessageBox
        user={user}
        conversation_id={conversation_id}
        addNewMessage={addNewMessage}
      />
    </>
  );
}

const BotActions = () => (
  <div className="flex flex-row mt-1 items-center gap-x-2">
    <Button variant="ghost" className="px-0.5 py-0 text-black/70" size="sm">
      <Volume2Icon />
    </Button>
    <Button variant="ghost" className="px-0.5 py-0 text-black/70" size="sm">
      <CopyIcon />
    </Button>
    <Button variant="ghost" className="px-0.5 py-0 text-black/70" size="sm">
      <ThumbsUpIcon />
    </Button>
    <Button variant="ghost" className="px-0.5 py-0 text-black/70" size="sm">
      <ThumbsDownIcon />
    </Button>
    <Button variant="ghost" className="px-0.5 py-0 text-black/70" size="sm">
      <RefreshCwIcon />
      <ChevronDownIcon className="-ml-1" />
    </Button>
  </div>
);

const SingleMessage = ({ message }: { message: Message }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const [currentBranch, setCurrentBranch] = useState(0);
  const [branches, setBranches] = useState([
    message,
    ...(message?.message_branch || []),
  ]);

  const addNewBranchMessage = (message: Message) => {
    setBranches((prev) => [...prev, message]);
    setCurrentBranch(branches.length);
  };

  const prevBranch = () => {
    if (currentBranch === 0) return;
    setCurrentBranch((prev) => prev - 1);
  };
  const nextBranch = () => {
    if (currentBranch === branches.length - 1) return;
    setCurrentBranch((prev) => prev + 1);
  };

  const startEditing = () => {
    setIsEditing(true);
    ref.current?.focus();
  };
  const closeEditing = () => setIsEditing(false);

  const editMessage = async () => {
    if (!message.id || !ref.current?.innerText) return;
    setLoading(true);

    try {
      const response = await fetch("/api/chatgpt", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message_id: message.id,
          prompt: ref.current?.innerText,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        addNewBranchMessage(result);

        setIsEditing(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={message.id}>
      <div className="flex group/msg flex-row mb-7 gap-x-2 justify-end">
        {!isEditing && (
          <Button
            onClick={startEditing}
            variant="ghost"
            className="h-8 w-8 mt-1.5 hidden group-hover/msg:inline-flex rounded-full text-black/70"
            size="icon"
          >
            <PencilIcon />
          </Button>
        )}
        <div
          className={`flex flex-col items-end gap-y-1 ${
            !isEditing && "max-w-[70%]"
          }`}
        >
          <div className="flex flex-col bg-gray-100 rounded-3xl py-3 px-4">
            <p
              suppressContentEditableWarning={true}
              contentEditable={isEditing}
              ref={ref}
              className="outline-none"
            >
              {branches[currentBranch].prompt}
            </p>
            {isEditing && (
              <div className="flex mt-5 gap-x-2.5 items-center self-end">
                <Button
                  disabled={loading}
                  onClick={closeEditing}
                  className="rounded-full"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  onClick={editMessage}
                  className="rounded-full"
                  variant="default"
                >
                  Send
                </Button>
              </div>
            )}
          </div>
          {!isEditing && branches?.length > 1 ? (
            <div className="text-sm flex flex-row items-center gap-x-1 text-black/70 ">
              <Button
                disabled={currentBranch === 0}
                onClick={prevBranch}
                className="rounded-full"
                size="icon"
                variant="ghost"
              >
                <ChevronLeftIcon />
              </Button>
              <span className="font-bold">
                {currentBranch + 1}/{branches.length}
              </span>
              <Button
                disabled={currentBranch === branches.length - 1}
                onClick={nextBranch}
                size="icon"
                className="rounded-full"
                variant="ghost"
              >
                <ChevronRightIcon />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex gap-x-4 flex-row">
        <div className="h-8 bg-white border rounded-full flex items-center justify-center w-8">
          <Image
            className="dark:invert"
            src="/openai-logo.svg"
            alt="Openai logo"
            width={18}
            height={18}
            priority
          />
        </div>
        <div className="pt-1">
          <p>{branches[currentBranch].response}</p>
          <BotActions />
        </div>
      </div>
    </div>
  );
};
