import Container from "@/components/Container";
import Footer from "@/components/auth/Footer";
import Header from "@/components/auth/Header";
import SocialAuths from "@/components/auth/SocialAuths";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { login } from "./action";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <Container>
        <div className="flex flex-col items-center w-80">
          <h1 className="font-bold text-3xl">Welcome back</h1>
          <form
            className="w-full mt-5 flex flex-col items-center"
            method="post"
          >
            <Input
              className="h-12 text-base"
              type="email"
              placeholder="Email address*"
              name="email"
              required
            />
            <Input
              className="h-12 text-base mt-3.5"
              type="password"
              placeholder="Password*"
              name="password"
              required
            />
            <Button
              formAction={login}
              className="w-full mt-5 py-6 bg-primary hover:bg-primary/90 text-base"
            >
              Continue
            </Button>

            <p className="mt-4">
              <span>Don't have an account?</span>
              <Link href="/register" className="ml-1 text-primary">
                Sign Up
              </Link>
            </p>
          </form>
          <SocialAuths />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
