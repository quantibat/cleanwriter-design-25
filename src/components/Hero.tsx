
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface HeroProps {
  onLearnMoreClick?: () => void;
}

const Hero = ({ onLearnMoreClick }: HeroProps) => {
  const navigate = useNavigate();
  
  const handleCTAClick = () => {
    navigate('/dashboard');
  };
  
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6">
      {/* Background stars */}
      <div className="stars absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              Gérez vos DCE facilement et rapidement
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl">
              Une plateforme intuitive pour créer, partager et gérer vos Dossiers de Consultation des Entreprises en toute sécurité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                onClick={handleCTAClick}
                className="w-full sm:w-auto glowing-button bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 font-medium text-lg"
              >
                Accéder à mes DCE
              </Button>
              <Button 
                variant="outline" 
                onClick={onLearnMoreClick}
                className="w-full sm:w-auto hover-button font-medium px-8 py-6 text-lg group border-white/10 bg-white/5 hover:bg-white/10"
              >
                En savoir plus
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          <div className="relative animated-border-glow">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-card shadow-2xl">
              <img 
                src="/lovable-uploads/0012ad36-938f-49c5-99e9-142f99106b74.png" 
                alt="DCE Manager Interface" 
                className="w-full object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
