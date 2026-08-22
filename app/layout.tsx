import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import './accessibility.css';

const siteUrl = 'https://salman-butt.vercel.app';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Salman Butt — Senior Full-Stack & Generative AI Engineer',
    template: '%s | Salman Butt',
  },
  description: 'Senior Full-Stack and Generative AI Engineer with 7+ years designing and shipping SaaS, IoT, Web3 and AI systems across international teams. React, Next.js, Node.js, Laravel, LangGraph, RAG and production agentic AI.',
  keywords: [
    'Senior Full Stack Engineer',
    'Generative AI Engineer',
    'GenAI Engineer',
    'LLM Engineer',
    'AI Agent Developer',
    'LangGraph Engineer',
    'Senior React Engineer',
    'Senior Node.js Engineer',
    'Next.js Engineer',
    'Node.js Engineer',
    'RAG Engineer',
  ],
  authors: [{ name: 'Salman Butt', url: siteUrl }],
  creator: 'Salman Butt',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Salman Butt — Senior Full-Stack & Generative AI Engineer',
    description: '7+ years designing and shipping scalable product systems, real-time platforms and production AI workflows.',
    type: 'profile',
    url: '/',
    siteName: 'Salman Butt — Engineering Portfolio',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Salman Butt — Senior Full-Stack & Generative AI Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salman Butt — Senior Full-Stack & Generative AI Engineer',
    description: 'Scalable product systems and production-grade AI agents.',
    images: ['/opengraph-image'],
  },
};

const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Salman Butt',
  url: siteUrl,
  jobTitle: 'Senior Full-Stack & Generative AI Engineer',
  sameAs: [
    'https://github.com/salman0butt',
    'https://www.linkedin.com/in/salman0butt/',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
  },
  knowsAbout: [
    'Full-Stack Engineering',
    'React',
    'Next.js',
    'Node.js',
    'Laravel',
    'System Design',
    'Generative AI',
    'LangGraph',
    'Retrieval-Augmented Generation',
    'Agentic AI',
  ],
};

const themeScript = `
  try {
    const savedTheme = localStorage.getItem('theme');
    const useDark = savedTheme !== 'light';
    document.documentElement.classList.toggle('dark', useDark);
    document.documentElement.style.colorScheme = useDark ? 'dark' : 'light';
  } catch (_) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
