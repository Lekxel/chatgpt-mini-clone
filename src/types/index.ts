interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: string;
  conversation_id: string;
  prompt: string;
  response: string;
  created_at: string;
  updated_at: string;
  message_branch: Message[];
}
