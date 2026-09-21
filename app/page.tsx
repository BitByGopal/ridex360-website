import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import ProblemSection from "@/components/ProblemSection";
import PlatformTabs from "@/components/PlatformTabs";
import LiveTrackingSection from "@/components/LiveTrackingSection";
import FeatureSlideshow from "@/components/FeatureSlideshow";
import SmartRoutingSection from "@/components/SmartRoutingSection";
import Industries from "@/components/Industries";
import Features from "@/components/Features";
import SafetySection from "@/components/SafetySection";
import WhyRideX360Section from "@/components/WhyRideX360Section";
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
      <PlatformTabs />
      <LiveTrackingSection />
      <FeatureSlideshow />
      <SmartRoutingSection />
      <Industries />
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