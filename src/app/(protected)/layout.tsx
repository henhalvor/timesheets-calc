import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import Sidenav from "@/components/Shared/Sidenav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* Body needed an extra wrapper inside to make elements expand to full height and width */
    <div id="page-wrapper">
      <Navbar />
      <div className="flex h-full w-full">
        <Sidenav />
        <main className="flex flex-1 bg-red-600">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
