import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Benefits from '../components/home/Benefits';
import Newsletter from '../components/home/Newsletter';
import Testimonials from '../components/home/Testimonials';
import TrustSection from '../components/home/TrustSection';
import FAQSection from '../components/home/FAQSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <Benefits />
      <FeaturedProducts />
      <TrustSection />
      <Testimonials />
      <FAQSection />
      <Newsletter />
    </div>
  );
};

export default HomePage;
