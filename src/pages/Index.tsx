
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductOverview from '@/components/ProductOverview';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQContact from '@/components/FAQContact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Parallax effect for the hero section
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroImage = document.querySelector('.hero-image') as HTMLElement | null;
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      
      // Fade in animations
      const fadeElements = document.querySelectorAll('.fade-up');
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (elementTop < triggerPoint) {
          element.classList.add('visible');
        }
      });
    };
    
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 80, // Offset for fixed header
              behavior: 'smooth'
            });
          }
        }
      }
    };
    
    // Initial check
    handleScroll();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    document.body.addEventListener('click', handleAnchorClick);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#06071b]">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-blue-900/20 via-indigo-900/10 to-transparent opacity-40 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl rounded-full opacity-20 pointer-events-none"></div>
      <div className="particles-container fixed inset-0 z-0 pointer-events-none"></div>
      <Navbar />
      <main>
        <Hero />
        <ProductOverview />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQContact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
