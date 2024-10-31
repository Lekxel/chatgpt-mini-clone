export default function Container({
  children,
  centered,
}: Readonly<{
  children: React.ReactNode;
  centered?: boolean;
}>) {
  return (
    <main
      className={`flex-grow flex flex-col items-center pt-2 ${
        centered && "justify-center"
      }`}
    >
      {children}
    </main>
  );
}
