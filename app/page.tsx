import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import LiveTrackingSection from "@/components/LivetrackingSection";
import FeatureSlideshow from "@/components/FeatureSlideshow";
import SmartRoutingSection from "@/components/SmartroutingSection";
import Industries from "@/components/Industries";
import PlatformEcosystem from "@/components/PlatformEcosystem";
import DashboardsSection from "@/components/Dashboardssection";
import Features from "@/components/Features";
import SafetySection from "@/components/SafetySection";
import WhyRideX360Section from "@/components/Whyridex360Section";
import ProductShowcase from "@/components/ProductShowcase";
import HowItWorks from "@/components/HowItWorks";
import AboutCompany from "@/components/AboutCompany";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeatureStrip />
      <ProblemSection />
      <SolutionSection />
      <LiveTrackingSection />
      <FeatureSlideshow />
      <SmartRoutingSection />
      <Industries />
      <PlatformEcosystem />
      <DashboardsSection />
      <Features />
      <SafetySection />
      <WhyRideX360Section />
      <ProductShowcase />
      <HowItWorks />
      <AboutCompany />
      <CTA />
      <FAQSection />
      <DemoSection />
      <Footer />
    </main>
  );
}