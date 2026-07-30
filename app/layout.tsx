import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const siteUrl = 'https://salman-butt.vercel.app';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Salman Butt — Senior Full-Stack & AI Engineer',
    template: '%s | Salman Butt',
  },
  description:
    'Senior full-stack and AI engineer with 7+ years building production SaaS, agent systems, APIs, enterprise web applications, and real-time platforms with TypeScript, React, Node.js, and modern AI infrastructure.',
  keywords: [
    'Senior Full-Stack Engineer',
    'AI Engineer',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'LangGraph',
    'LangChain',
    'RAG',
    'AI Agents',
    'PostgreSQL',
    'Redis',
    'RabbitMQ',
    'Remote Software Engineer',
  ],
  authors: [{ name: 'Salman Butt', url: siteUrl }],
  creator: 'Salman Butt',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Salman Butt — Senior Full-Stack & AI Engineer',
    description:
      'Production software across AI agents, SaaS, backend systems, enterprise frontend, and real-time platforms.',
    type: 'website',
    url: siteUrl,
    siteName: 'Salman Butt — Engineering Portfolio',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Salman Butt — Senior Full-Stack & AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salman Butt — Senior Full-Stack & AI Engineer',
    description:
      'Senior engineer building AI-powered products, scalable APIs, SaaS platforms, and real-time systems.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Salman Butt',
  url: siteUrl,
  jobTitle: 'Senior Full-Stack & AI Engineer',
  sameAs: [
    'https://github.com/salman0butt',
    'https://www.linkedin.com/in/salman0butt/',
  ],
  knowsAbout: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'LangGraph',
    'LangChain',
    'Retrieval-Augmented Generation',
    'AI Agents',
    'PostgreSQL',
    'Redis',
    'Event-Driven Architecture',
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
