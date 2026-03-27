import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Capabilities } from '@/components/sections/Capabilities';
import { InteractiveShowcase } from '@/components/sections/InteractiveShowcase';
import { Results } from '@/components/sections/Results';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Automation } from '@/components/sections/Automation';
import { AISystems } from '@/components/sections/AISystems';
import { Creative } from '@/components/sections/Creative';
import { CardShowcase } from '@/components/sections/CardShowcase';
import { Process } from '@/components/sections/Process';
import { Trust } from '@/components/sections/Trust';
import { Conversion } from '@/components/sections/Conversion';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Capabilities />
      <InteractiveShowcase />
      <Results />
      <CaseStudies />
      <Automation />
      <AISystems />
      <Creative />
      <CardShowcase />
      <Process />
      <Trust />
      <Conversion />
      <Footer />
    </main>
  );
}
