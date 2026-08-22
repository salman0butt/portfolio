import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import Impact from '@/components/Impact';
import Projects from '@/components/Projects';
import AIEngineering from '@/components/AIEngineering';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Testimonials from '@/components/Testimonials';
import Authority from '@/components/Authority';
import BlogPreview from '@/components/blog/BlogPreview';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <Impact />
        <Projects />
        <AIEngineering />
        <Experience />
        <About />
        <Skills />
        <Testimonials />
        <Authority />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
