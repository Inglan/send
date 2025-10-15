import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { SendDrawer } from "@/components/send-drawer";
import { SettingsDrawer } from "@/components/settings-drawer";
import { Loader } from "@/components/loader";
import { AutoAuth } from "@/components/auto-auth";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "send",
  description: "Transfer text between devices with a 4 character code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistMono.className} antialiased`}>
          <div vaul-drawer-wrapper="" className="bg-background min-h-[100vh]">
            <ConvexClientProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <AutoAuth />
                <SendDrawer />
                <SettingsDrawer />
                <Toaster />
                <Loader />
              </ThemeProvider>
            </ConvexClientProvider>
          </div>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
