import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://salman0butt.github.io/portfolio"),
  title: "Salman Butt — Senior Full Stack & Generative AI Engineer",
  description: "Senior Full Stack Engineer with 7+ years building scalable platforms across Web3, IoT, SaaS, and Generative AI. Expert in React, Next.js, Node.js, NestJS, LangChain, LangGraph, and Kubernetes. 50+ projects delivered across 5 countries.",
  keywords: "Senior Full Stack Engineer, Generative AI, LangChain, LangGraph, React, Next.js, Node.js, NestJS, Web3, IoT, Microservices, Kubernetes, TypeScript, Software Engineer",
  authors: [{ name: "Salman Butt" }],
  openGraph: {
    title: "Salman Butt — Senior Full Stack & Generative AI Engineer",
    description: "7+ years building scalable platforms across Web3, IoT, SaaS, and Generative AI. 50+ projects. 5 countries.",
    type: "website",
    url: "https://salman0butt.github.io/portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Salman Butt — Senior Full Stack & Generative AI Engineer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman Butt — Senior Full Stack & Generative AI Engineer",
    description: "7+ years building scalable platforms across Web3, IoT, SaaS, and Generative AI.",
    images: ["/og-image.png"]
  },
  robots: "index, follow"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
