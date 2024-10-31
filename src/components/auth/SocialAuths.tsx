import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function SocialAuths() {
  return (
    <>
      <section className="mt-7 flex items-center justify-center w-full">
        <Separator className="w-full bg-gray-300" />
        <p className="flex items-center justify-center bg-white rounded-full absolute w-6 h-6">
          <span className="text-xs">OR</span>
        </p>
      </section>
      <section className="mt-6 w-full flex flex-col gap-y-2">
        <Button
          className="w-full py-6 text-base text-black/80 justify-start"
          type="button"
          variant="outline"
        >
          <Image
            className="dark:invert"
            src="/google-logo.svg"
            alt="Google logo"
            width={20}
            height={20}
            priority
          />
          <span className="ml-2">Continue with Google</span>
        </Button>

        <Button
          className="w-full py-6 text-base text-black/80 justify-start"
          type="button"
          variant="outline"
        >
          <Image
            className="dark:invert"
            src="/microsoft-logo.svg"
            alt="Microsoft logo"
            width={20}
            height={20}
            priority
          />
          <span className="ml-2">Continue with Microsoft Account</span>
        </Button>

        <Button
          className="w-full py-6 text-base text-black/80 justify-start"
          type="button"
          variant="outline"
        >
          <Image
            className="dark:invert"
            src="/apple-logo.svg"
            alt="Apple logo"
            width={20}
            height={20}
            priority
          />
          <span className="ml-2">Continue with Apple</span>
        </Button>
      </section>
    </>
  );
}
