import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import PromotionSection from '@/components/sections/PromotionSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <PromotionSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
