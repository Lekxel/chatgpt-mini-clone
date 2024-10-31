import { MODEL, SYSTEM_MESSAGE } from "@/utils/openai";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const params = await request.json();

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: SYSTEM_MESSAGE,
      },
      {
        role: "user",
        content: params.prompt.trim(),
      },
    ],
    temperature: 1,
    max_completion_tokens: 256,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  if (response.created) {
    const conversation_id = params.conversation_id;
    const reply = response.choices[0].message.content;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("message")
      .insert({
        conversation_id,
        prompt: params.prompt,
        response: reply,
      })
      .select();

    if (error) {
      console.error(error);
      return NextResponse.error();
    }
    return NextResponse.json(data?.[0] || {});
  }
  return NextResponse.error();
}

export async function PUT(request: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const params = await request.json();

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: SYSTEM_MESSAGE,
      },
      {
        role: "user",
        content: params.prompt.trim(),
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
    const { data: msg, error } = await supabase
      .from("message")
      .select()
      .eq("id", params.message_id)
      .single();

    if (error) {
      console.error(error);
      return NextResponse.error();
    }

    const { data, error: err } = await supabase
      .from("message_branch")
      .insert({
        message_id: params.message_id,
        prompt: params.prompt,
        response: reply,
      })
      .select();

    if (err) {
      console.error(error);
      return NextResponse.error();
    }

    return NextResponse.json(data?.[0] || {});
  }
  return NextResponse.error();
}
