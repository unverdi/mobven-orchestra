import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Orchestra - AI-Powered Workflow Automation Platform",
  description: "Transform your business processes with intelligent AI agents and automated workflows",
  keywords: [
    "AI agents",
    "enterprise AI",
    "artificial intelligence",
    "automation",
    "machine learning",
    "quantum AI",
    "business automation",
    "intelligent agents",
    "enterprise software",
    "AI platform",
    "neural networks",
    "cognitive AI",
    "autonomous systems",
    "digital transformation",
    "enterprise solutions",
  ],
  authors: [{ name: "Orchestra Team" }],
  creator: "Orchestra",
  publisher: "Orchestra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orchestra.ai",
    siteName: "Orchestra",
    title: "Orchestra - AI-Powered Workflow Automation Platform",
    description: "Transform your business processes with intelligent AI agents and automated workflows",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Orchestra - Enterprise AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orchestra - AI-Powered Workflow Automation Platform",
    description: "Transform your business processes with intelligent AI agents and automated workflows",
    images: ["/twitter-image.jpg"],
    creator: "@orchestra",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://orchestra.ai",
  },
  category: "technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon Links */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme and Viewport */}
        <meta name="theme-color" content="#635bff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Orchestra",
              description:
                "Next-generation enterprise AI platform for deploying intelligent agents that think, learn, and evolve.",
              url: "https://orchestra.ai",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                price: "Contact for pricing",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "150",
              },
              author: {
                "@type": "Organization",
                name: "Orchestra",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>{children}</body>
    </html>
  )
}
