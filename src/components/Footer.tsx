import { createClient } from "@/utils/supabase/server";

export default async function Footer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <footer className="flex items-center justify-center gap-x-2 mb-2 pt-5 text-sm text-black/80">
      {user ? (
        <>ChatGPT can make mistakes. Check important info.</>
      ) : (
        <>
          By messaging ChatGPT, you agree to our
          <a className="underline text-black" href="#">
            Terms
          </a>
          and have read our
          <a className="underline text-black" href="#">
            Privacy Policy.
          </a>
        </>
      )}
    </footer>
  );
}
