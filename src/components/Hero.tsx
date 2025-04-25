
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium">
              DCE Manager - Gestion des appels d'offres
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Le Logiciel SAAS qu'il vous faut pour vos soumissions aux appels d'offres
            </h1>
            
            <p className="text-lg text-gray-400">
              La plateforme la plus simple et efficace pour gérer vos dossiers de consultation des entreprises.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-gray-400">4.9/5 (150+ avis)</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <img 
              src="/lovable-uploads/6140a0d4-1816-458f-a0ba-4f595b0fe8d4.png"
              alt="DCE Manager Interface"
              className="rounded-lg shadow-2xl border border-gray-800"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
