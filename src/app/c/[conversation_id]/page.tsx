import { AppSidebar } from "@/components/AppSidebar";
import ConversationMessages from "@/components/chat/ConversationMessages";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";

export default async function Conversation({
  params,
}: {
  params: Promise<{ conversation_id: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const conversation_id = (await params).conversation_id;

  const { data: messages, error } = await supabase
    .from("message")
    .select(
      `
      id,
      conversation_id,
      prompt,
      response,
      created_at,
      message_branch ( id, prompt, response, created_at )`
    )
    .eq("conversation_id", conversation_id);

  return (
    <SidebarProvider>
      {user && <AppSidebar />}
      <div className="flex flex-col w-full">
        <Header />
        <ConversationMessages
          conversation_id={conversation_id}
          initialMessages={messages as Message[]}
          user={user}
        />
        <Footer />
      </div>
    </SidebarProvider>
  );
}
