import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import Industries from "@/components/Industries";
import PlatformEcosystem from "@/components/PlatformEcosystem";
import Features from "@/components/Features";
import SafetySection from "@/components/SafetySection";
import ProductShowcase from "@/components/ProductShowcase";
import HowItWorks from "@/components/HowItWorks";
import AboutCompany from "@/components/AboutCompany";
import CTA from "@/components/CTA";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";
import FeatureSlideshow from "@/components/FeatureSlideshow";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeatureSlideshow />
      <Industries />
      <PlatformEcosystem />
      <Features />
      <SafetySection />
      <ProductShowcase />
      <HowItWorks />
      <AboutCompany />
      <CTA />
      <DemoSection />
      <Footer />
    </main>
  );
}
