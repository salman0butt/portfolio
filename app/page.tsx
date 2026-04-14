import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import SkillsMatrix from '@/components/SkillsMatrix';
import Projects from '@/components/Projects';
import CaseStudies from '@/components/CaseStudies';
import Experience from '@/components/Experience';
import HowIWork from '@/components/HowIWork';
import Testimonials from '@/components/Testimonials';
import Certifications from '@/components/Certifications';
import TechnicalBlog from '@/components/TechnicalBlog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <SkillsMatrix />
        <Experience />
        <CaseStudies />
        <Projects />
        <HowIWork />
        <Testimonials />
        <Certifications />
        <TechnicalBlog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
