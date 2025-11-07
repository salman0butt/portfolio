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
  title: "Salman - Full-Stack Developer | Next.js, Nest.js, AWS Expert",
  description: "Experienced Full-Stack Developer specializing in Next.js, React, Nest.js, Node.js, and AWS. Building scalable, elegant web applications with modern technologies.",
  keywords: "Full-Stack Developer, Next.js, Nest.js, React, Node.js, AWS, TypeScript, Web Development, Software Engineer",
  authors: [{ name: "Salman" }],
  openGraph: {
    title: "Salman - Full-Stack Developer Portfolio",
    description: "Building scalable, elegant web applications using Next.js, Nest.js, and AWS.",
    type: "website",
    url: "https://yourusername.github.io",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Salman - Full-Stack Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman - Full-Stack Developer",
    description: "Building scalable, elegant web applications using Next.js, Nest.js, and AWS.",
    images: ["/og-image.png"]
  },
  viewport: "width=device-width, initial-scale=1",
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
      >
        {children}
      </body>
    </html>
  );
}
