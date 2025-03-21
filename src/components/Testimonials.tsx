
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-950/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ce que disent nos clients</h2>
          <p className="text-blue-100/80 max-w-2xl mx-auto">
            Découvrez comment DCE Manager aide les professionnels à optimiser leur gestion documentaire.
          </p>
        </div>
        
        <div className="relative px-10">
          {/* Navigation arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 p-2 rounded-full border border-white/10 text-white"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 p-2 rounded-full border border-white/10 text-white"
            aria-label="Témoignage suivant"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Testimonial card */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="cosmic-card hover:border-blue-500/20 h-full">
                    <CardContent className="p-8 md:p-10 flex flex-col items-center text-center">
                      <Quote className="h-10 w-10 text-blue-400 mb-6 opacity-50" />
                      
                      <p className="text-lg text-blue-100/90 mb-8 italic">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-white/5 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-blue-500/30">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.author} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{testimonial.author}</h4>
                          <p className="text-sm text-blue-100/70">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
