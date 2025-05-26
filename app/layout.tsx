import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google'
import Header from "@/components/Header";


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
    <html lang="en" className="scrollbar-hidden">
      <body
        className={`${poppins.className} scrollbar-hidden`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
