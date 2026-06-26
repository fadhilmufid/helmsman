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

const SITE_URL = "https://helmsman-agent.dev";
const TITLE = "Helmsman · A playbook for your AI coding assistant";
const DESCRIPTION =
  "Helmsman is a folder of instructions you add to any project. It teaches AI coding agents to plan first, follow shared rules, write things down, and verify their work — for steady, production-ready results across every repo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Helmsman",
  },
  description: DESCRIPTION,
  keywords: [
    "AI coding agent",
    "Cursor",
    "Claude Code",
    "GitHub Copilot",
    "Windsurf",
    "AGENTS.md",
    "coding agent instructions",
    "agent workflow",
    "prompt engineering",
    "software engineering",
    "developer tools",
  ],
  authors: [{ name: "Helmsman" }],
  creator: "Helmsman",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Helmsman",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfbfa",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-50"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
