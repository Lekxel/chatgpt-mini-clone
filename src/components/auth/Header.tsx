import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-center mb-36 pt-8">
      <Image
        className="dark:invert"
        src="/openai-logo.svg"
        alt="Openai logo"
        width={32}
        height={32}
        priority
      />
    </header>
  );
}
