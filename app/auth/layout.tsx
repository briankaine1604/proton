export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center min-h-screen items-center p-5 bg-gradient-to-r  to-[#f7f8fa] from-[#e2e8f0]">
      {children}
    </div>
  );
}
