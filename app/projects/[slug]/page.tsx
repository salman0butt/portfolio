import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudyPage from '@/components/CaseStudyPage';
import { caseStudies, getCaseStudy } from '@/lib/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return { robots: { index: false, follow: false } };

  return {
    title: `${project.title} — Engineering Case Study`,
    description: `${project.summary} ${project.impact}`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — Engineering Case Study`,
      description: project.summary,
      type: 'article',
      url: `/projects/${project.slug}`,
      images: [{ url: '/opengraph-image' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Engineering Case Study`,
      description: project.summary,
      images: ['/opengraph-image'],
    },
  };
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.title,
    description: project.summary,
    url: `https://salman-butt.vercel.app/projects/${project.slug}`,
    author: {
      '@type': 'Person',
      name: 'Salman Butt',
      url: 'https://salman-butt.vercel.app',
    },
    about: project.tech,
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <CaseStudyPage project={project} />
      </main>
      <Footer />
    </div>
  );
}
