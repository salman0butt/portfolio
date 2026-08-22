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
  if (!project) return {};
  return {
    title: `${project.title} — Case Study | Salman Butt`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: `${project.title} — Case Study`, description: project.summary, type: 'article', url: `/projects/${project.slug}` },
  };
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content"><CaseStudyPage project={project} /></main>
      <Footer />
    </div>
  );
}
