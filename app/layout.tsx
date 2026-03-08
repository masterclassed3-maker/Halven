import "./globals.css";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";

export const metadata = {
  title: "Halven",
  description: "Halven protocol frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}