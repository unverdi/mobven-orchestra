import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Orchestra - AI-Powered Productivity Platform",
  description: "Streamline your business processes with AI agents, workflow automation, and intelligent integrations.",
  keywords: ["AI", "productivity", "automation", "workflow", "agents", "business"],
  authors: [{ name: "Orchestra Team" }],
  creator: "Orchestra",
  publisher: "Orchestra",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orchestra.ai",
    title: "Orchestra - AI-Powered Productivity Platform",
    description:
      "Streamline your business processes with AI agents, workflow automation, and intelligent integrations.",
    siteName: "Orchestra",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orchestra - AI-Powered Productivity Platform",
    description:
      "Streamline your business processes with AI agents, workflow automation, and intelligent integrations.",
    creator: "@orchestra",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
