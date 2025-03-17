
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
            Créez du contenu captivant avec <span className="text-brand-purple">l'IA</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            AI Writer utilise l'intelligence artificielle pour générer des textes de qualité en quelques secondes. Idéal pour les blogs, réseaux sociaux et plus encore.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button className="w-full sm:w-auto hover-button bg-brand-purple hover:bg-brand-purple-dark text-white px-8 py-6 font-medium text-lg">
              Commencer gratuitement
            </Button>
            <Button variant="outline" className="w-full sm:w-auto hover-button font-medium px-8 py-6 text-lg group">
              Voir la démo
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="pt-10 text-sm text-muted-foreground">
            <p>Aucune carte de crédit requise • Annulez à tout moment</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
