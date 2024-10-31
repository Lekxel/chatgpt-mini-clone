import { createClient } from "@/utils/supabase/server";
import Authenticated from "./Authenticated";
import NotAuthenticated from "./NotAuthenticated";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <Authenticated /> : <NotAuthenticated />;
}
