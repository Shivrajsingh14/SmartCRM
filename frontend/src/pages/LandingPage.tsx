import React from 'react';
import { Box } from '@chakra-ui/react';
import AnimatedNavbar from '../components/AnimatedNavbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <Box minH="100vh">
      <AnimatedNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </Box>
  );
};

export default LandingPage;
