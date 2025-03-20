import React from 'react';
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
const Hero = () => {
  return <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6">
      {/* Background stars */}
      <div className="stars absolute inset-0 overflow-hidden">
        {Array.from({
        length: 50
      }).map((_, i) => <div key={i} className="star" style={{
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`
      }} />)}
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8 max-w-3xl mx-auto relative z-10">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              Simplifiez la Gestion<br />de vos <span className="text-white">DCE</span>
            </h1>
            {/* Decorative angled line */}
            <div className="mt-3 h-1 w-40 oblique-line"></div>
          </div>
          
          <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto">
            DCE Manager optimise la gestion de vos dossiers de consultation des entreprises. Organisez, partagez et suivez vos documents en toute simplicité.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button className="w-full sm:w-auto glowing-button bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 font-medium text-lg">
              Commencer maintenant
            </Button>
            <Button variant="outline" className="w-full sm:w-auto hover-button font-medium px-8 py-6 text-lg group border-white/10 bg-white/5 hover:bg-white/10">
              Voir la démo
              <PlayCircle className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          
        </div>
        
        {/* Demo Screen Preview */}
        <div className="mt-16 max-w-4xl mx-auto animated-border-glow">
          
        </div>
      </div>
    </section>;
};
export default Hero;