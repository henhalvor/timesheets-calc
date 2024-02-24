import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import Sidenav from "@/components/Shared/Sidenav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <main className="flex-1 flex justify-center items-center bg-white">
        {children}
      </main>

      <Footer />
    </>
  );
}
