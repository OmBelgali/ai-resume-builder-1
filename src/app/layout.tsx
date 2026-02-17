import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ResumeProvider } from "@/context/ResumeContext";
import { TemplateProvider } from "@/context/TemplateContext";
import { AppNav } from "@/components/AppNav";
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
  title: "AI Resume Builder",
  description: "Build a resume that gets read.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f7f6f3] text-[#2b2118] min-h-screen flex flex-col`}
      >
        <ResumeProvider>
          <TemplateProvider>
            <AppNav />
            <main className="flex-1">{children}</main>
          </TemplateProvider>
        </ResumeProvider>
      </body>
    </html>
  );
}
