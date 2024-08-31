import { Footer } from "@/components/footer";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className={cn("h-full w-full")}>
        <Navbar />
        <div className="mt-16">{children}</div>
        <Footer />
      </main>
    </div>
  );
}
