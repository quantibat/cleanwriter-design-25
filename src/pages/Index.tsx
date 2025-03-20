
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
    const handleScroll = () => {
      const fadeElements = document.querySelectorAll('.fade-up');
      
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (elementTop < triggerPoint) {
          element.classList.add('visible');
        }
      });
    };
    
    // Create floating particles
    const createParticles = () => {
      const container = document.querySelector('.particles-container');
      if (!container) return;
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('star');
        
        // Random size
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
      }
    };
    
    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Offset for fixed header
            behavior: 'smooth'
          });
        }
      }
    };
    
    // Initial check
    handleScroll();
    createParticles();
    
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
    <div className="min-h-screen relative overflow-hidden">
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
