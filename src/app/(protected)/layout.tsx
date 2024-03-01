import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex justify-center items-center bg-background">
        {children}
      </main>
      <Footer />
      <Toaster /> {/* Toast for using useToast hook */}
    </>
  );
}
