import { AppSidebar } from "@/components/AppSidebar";
import LargeMessageBox from "@/components/chat/LargeMessageBox";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <SidebarProvider>
      {user && <AppSidebar />}
      <div className="flex flex-col w-full">
        <Header />
        <Container centered>
          <LargeMessageBox user={user} />
        </Container>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
