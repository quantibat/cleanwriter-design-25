
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

const ProductOverview = () => {
  return (
    <section id="product" className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-950/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Une gestion simplifiée de vos documents de consultation
            </h2>
            
            <p className="text-blue-100/80 text-lg">
              Centralisez tous vos documents et procédures d'appel d'offres en un seul endroit sécurisé et accessible à tous les membres de votre équipe.
            </p>
            
            <ul className="space-y-4">
              {[
                "Organisation intuitive par projet et catégorie",
                "Suivi des versions et des modifications en temps réel",
                "Partage sécurisé avec contrôle d'accès personnalisable",
                "Collaboration en temps réel entre les équipes"
              ].map((item, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <span className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                  </span>
                  <span className="text-blue-100/90">{item}</span>
                </li>
              ))}
            </ul>
            
            <div>
              <Button variant="outline" className="group border-white/10 bg-white/5 hover:bg-white/10">
                <Play className="mr-2 h-4 w-4" />
                Voir en action
              </Button>
            </div>
          </div>
          
          {/* Right column - Image */}
          <div className="rounded-xl overflow-hidden animated-border-glow fade-up">
            <img 
              src="https://framerusercontent.com/images/AX9CZ2I24YK31pBfKrdXgFLrto.png" 
              alt="Interface de DCE Manager" 
              className="w-full h-full object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
