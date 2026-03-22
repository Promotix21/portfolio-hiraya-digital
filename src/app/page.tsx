import HeroSection from '@/components/HeroSection';
import CapabilityGrid from '@/components/CapabilityGrid';
import VerifiedResults from '@/components/VerifiedResults';
import CaseStudyEngine from '@/components/CaseStudyEngine';
import ScrollAnimations from '@/components/ScrollAnimations';
import AutomationShowcase from '@/components/AutomationShowcase';
import AISystems from '@/components/AISystems';
import CreativeGrid from '@/components/CreativeGrid';
import ProcessIntelligence from '@/components/ProcessIntelligence';
import TrustBuilder from '@/components/TrustBuilder';
import ConversionEngine from '@/components/ConversionEngine';
import ParallaxDivider from '@/components/ParallaxDivider';

export default function Home() {
  return (
    <>
      {/* Hero - Light */}
      <HeroSection />

      {/* Capabilities - Light Surface */}
      <CapabilityGrid />

      {/* Parallax Divider */}
      <ParallaxDivider
        text="engineering > marketing"
        subtext="Systems that compound over time"
      />

      {/* Verified Results - Dark Parallax */}
      <VerifiedResults />

      {/* Case Studies - Light */}
      <CaseStudyEngine />

      {/* GSAP Horizontal Scroll Showcase - Mixed */}
      <ScrollAnimations />

      {/* Automation - Dark Parallax */}
      <AutomationShowcase />

      {/* AI Systems - Light Surface */}
      <AISystems />

      {/* Parallax Divider */}
      <ParallaxDivider
        text="design × performance"
        subtext="Creative execution that converts"
      />

      {/* Creative Grid - Light */}
      <CreativeGrid />

      {/* Process - Dark Parallax */}
      <ProcessIntelligence />

      {/* Trust Builder - Light Surface */}
      <TrustBuilder />

      {/* Conversion Engine - Light */}
      <ConversionEngine />
    </>
  );
}
