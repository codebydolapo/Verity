import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google'
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', "800", "900"]
})

export const metadata: Metadata = {
  title: "Verity",
  description: "Work in progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-[100vw] scrollbar-hidden overflow-x-hidden">
      <body
        className={`${poppins.className} w-[100vw] overflow-x-hidden`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
