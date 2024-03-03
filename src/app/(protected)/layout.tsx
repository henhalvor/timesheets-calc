import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TimeSheets-Calc | Dashboard",
  description: "Overview of hours, compensations and travel.",
  keywords: ["dashboard", "hours worked", "payments received"]
};

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
