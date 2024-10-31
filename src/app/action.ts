"use server";

import { MODEL, SYSTEM_MESSAGE } from "@/utils/openai";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import OpenAI from "openai";

export async function newConversation(message: string) {
  message = message.trim();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: SYSTEM_MESSAGE,
      },
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 1,
    max_completion_tokens: 256,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  if (response.created) {
    const reply = response.choices[0].message.content;

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("conversation")
      .insert({
        user_id: user!.id,
        title: message.substring(0, 60),
      })
      .select();

    if (error) {
      redirect("/?error=something went wrong");
    }
    const conversation = data[0];

    const { error: err } = await supabase
      .from("message")
      .insert({
        conversation_id: conversation.id,
        prompt: message,
        response: reply,
      })
      .select();

    if (err) {
      redirect("/?error=something went wrong");
    }

    redirect(`/c/${conversation.id}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect(`/login?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
