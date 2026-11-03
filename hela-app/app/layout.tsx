import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TelegramProvider } from "@/components/telegram-provider";

// Шрифт лежит в проекте (не качается с Google): грузится всегда, в том числе в Telegram.
const plusJakarta = localFont({
  src: "./fonts/PlusJakartaSans-latin-variable.woff2",
  variable: "--font-sans",
  weight: "200 800",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: "Hela",
  description: "Hela mini app",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hela",
  },
}


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning // telegram-web-app.js дописывает style/атрибуты в <html> до гидратации
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", plusJakarta.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <TelegramProvider />
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
