
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

const Hero = () => {
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
        <div className="text-center space-y-8 max-w-3xl mx-auto relative z-10">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animated-text">
              Transformez Votre Contenu<br />Avec <span className="text-white">l'IA</span>
            </h1>
            {/* Decorative angled line */}
            <div className="mt-3 h-1 w-40 oblique-line"></div>
          </div>
          
          <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto">
            AI Writer utilise l'intelligence artificielle pour générer des textes de qualité en quelques secondes. Idéal pour les blogs, réseaux sociaux et plus encore.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button className="w-full sm:w-auto glowing-button bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 font-medium text-lg">
              Commencer gratuitement
            </Button>
            <Button variant="outline" className="w-full sm:w-auto hover-button font-medium px-8 py-6 text-lg group border-white/10 bg-white/5 hover:bg-white/10">
              Voir la démo
              <PlayCircle className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="pt-10 text-sm text-blue-100/60">
            <p>Aucune carte de crédit requise • Annulez à tout moment</p>
          </div>
        </div>
        
        {/* Demo Screen Preview */}
        <div className="mt-16 max-w-4xl mx-auto animated-border-glow">
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-card shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-8 bg-card flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
              </div>
              <div className="text-xs mx-auto text-white/50">AI Writer</div>
            </div>
            <div className="pt-8 p-4">
              <img 
                src="/lovable-uploads/0012ad36-938f-49c5-99e9-142f99106b74.png" 
                alt="AI Writer Interface" 
                className="rounded w-full object-cover"
                style={{ maxHeight: "350px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
