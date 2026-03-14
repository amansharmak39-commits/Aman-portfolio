import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import GlassCursor from "@/components/GlassCursor";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Aman Sharma | Graphic Designer",
  description: "Creative Graphic Designer & Illustrator with a focus on human-centered design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <SmoothScroll>
          <GlassCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
