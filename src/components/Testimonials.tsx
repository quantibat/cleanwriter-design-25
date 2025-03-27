
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";

interface Testimonial {
  content: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      content: "DCE Manager a révolutionné notre façon de gérer les appels d'offres. Nous avons réduit notre temps de préparation de 40% et amélioré la qualité de nos dossiers.",
      author: "Marie Dupont",
      position: "Directrice des Achats",
      company: "BTP Constructions",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      content: "La simplicité d'utilisation combinée à des fonctionnalités puissantes font de DCE Manager un outil indispensable pour notre cabinet d'architecture.",
      author: "Thomas Martin",
      position: "Architecte Principal",
      company: "Espace Design",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    },
    {
      content: "Grâce à DCE Manager, nous avons centralisé tous nos documents d'appels d'offres et amélioré la collaboration entre nos équipes dispersées géographiquement.",
      author: "Sophie Leroux",
      position: "Cheffe de Projet",
      company: "Mairie de Lyon",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop"
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const scrollToTestimonial = (index: number) => {
    setActiveIndex(index);
    if (testimonialsRef.current) {
      testimonialsRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };
  
  const nextTestimonial = () => {
    const newIndex = (activeIndex + 1) % testimonials.length;
    scrollToTestimonial(newIndex);
  };
  
  const prevTestimonial = () => {
    const newIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    scrollToTestimonial(newIndex);
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000); // Change testimonial every 8 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#030712] via-[#070f2a] to-[#040918]">
      {/* Background blur effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full filter blur-[120px] opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full filter blur-[120px] opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full filter blur-[150px]"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400">
            Ce que disent nos clients
          </h2>
          <p className="text-lg text-blue-100/70 max-w-2xl mx-auto">
            Découvrez comment DCE Manager aide les professionnels à optimiser leur gestion documentaire et à simplifier leurs processus d'appels d'offres.
          </p>
        </div>
        
        <div className="relative mt-20">
          {/* Testimonial cards */}
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl">
            <div 
              ref={testimonialsRef}
              className="flex transition-transform duration-700 ease-out"
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="transform transition-all duration-500 hover:scale-[1.02] h-full">
                    <div className="relative p-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 backdrop-blur-sm h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
                      <div className="bg-[#080e22]/80 backdrop-blur-sm rounded-xl p-8 md:p-10 h-full border border-white/5">
                        <div className="mb-8 flex justify-center">
                          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20">
                            <Quote className="h-6 w-6 text-blue-400" />
                          </span>
                        </div>
                        
                        <p className="text-xl leading-relaxed text-blue-100/90 mb-8 relative">
                          <span className="absolute -top-4 -left-2 text-6xl text-blue-500/10">"</span>
                          {testimonial.content}
                          <span className="absolute -bottom-10 -right-2 text-6xl text-blue-500/10">"</span>
                        </p>
                        
                        <div className="mt-10 flex items-center justify-center">
                          <div className="mr-4 h-14 w-14 overflow-hidden rounded-full border-2 border-blue-500/30 bg-gradient-to-b from-blue-500/10 to-indigo-500/10">
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.author}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-white text-lg">{testimonial.author}</h4>
                            <p className="text-blue-400/80 text-sm">
                              {testimonial.position}, <span className="text-blue-200/60">{testimonial.company}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons with improved styling */}
          <div className="flex justify-center mt-10 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-white/20"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-5 w-5 text-white group-hover:text-blue-400 transition-colors" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-white/20"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-5 w-5 text-white group-hover:text-blue-400 transition-colors" />
            </button>
          </div>
          
          {/* Indicators - redesigned */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToTestimonial(index)}
                className={`relative h-3 rounded-full transition-all ${
                  activeIndex === index 
                    ? 'w-10 bg-gradient-to-r from-blue-500 to-indigo-500' 
                    : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              >
                {activeIndex === index && (
                  <span className="absolute inset-0 rounded-full animate-pulse-light"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Add keyframes for custom animations */}
      <style>
        {`
          @keyframes pulse-light {
            0%, 100% { opacity: 0.7; box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            50% { opacity: 1; box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
          }
          .animate-pulse-light {
            animation: pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          .bg-grid-pattern {
            background-image: 
              linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
            background-size: 40px 40px;
          }
        `}
      </style>
    </section>
  );
};

export default Testimonials;
