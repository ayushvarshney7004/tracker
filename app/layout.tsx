import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/navbar";
import { Theme, Container } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import AuthProvider from "./auth/provider";
import QueryClientProvider from "./queryClientProvider";
import { Toaster } from "react-hot-toast";
import ThemeClient from "./component/themeClient";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <Toaster />
            <ThemeClient>
              <Theme accentColor="green">
                <Navbar />
                <main className="p-5">
                  <Container>{children}</Container>
                  <SpeedInsights />
                  <Analytics />
                </main>
              </Theme>
            </ThemeClient>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
