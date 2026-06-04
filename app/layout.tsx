import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Luxe Estate",
  description: "Premium real estate discover screen with curated mock properties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        <Suspense
          fallback={
            <header className="sticky top-0 z-50 border-b border-[rgba(25,50,47,0.08)] bg-[rgba(238,246,246,0.92)] backdrop-blur-md">
              <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="h-8 w-32 rounded-full bg-[rgba(25,50,47,0.08)]" />
                <div className="hidden h-8 w-72 rounded-full bg-[rgba(25,50,47,0.06)] md:block" />
                <div className="h-10 w-10 rounded-full bg-[rgba(25,50,47,0.08)]" />
              </div>
            </header>
          }
        >
          <SiteNavbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
