import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lưu Đức Huy • Full-Stack Engineer & Web Architect",
  description: "Building modern web applications, high-performance backends, e-commerce architectures, and distributed systems with Next.js & Go.",
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full w-full max-w-full overflow-x-hidden antialiased [scrollbar-width:none]`}
    >
      <body className="min-h-full w-full max-w-full overflow-x-hidden flex flex-col font-sans bg-[#08090a] text-[#ededef] selection:bg-indigo-500/30 selection:text-indigo-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </body>
    </html>
  );
}
