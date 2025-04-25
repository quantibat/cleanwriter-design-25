
import React from 'react';
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative py-20">
        <Container className="mx-auto w-[85%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium"
              >
                DCE Manager - Gestion des appels d'offres
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-white"
              >
                Le Logiciel SAAS qu'il vous faut pour vos soumissions aux appels d'offres
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg text-gray-400"
              >
                La plateforme la plus simple et efficace pour gérer vos dossiers de consultation des entreprises et remporter plus de marchés publics.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-gray-400">4.9/5 (150+ avis)</span>
                </div>
              </motion.div>
            </div>
            
            <div className="relative">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src="/lovable-uploads/6140a0d4-1816-458f-a0ba-4f595b0fe8d4.png"
                alt="DCE Manager Interface"
                className="rounded-lg shadow-2xl border border-gray-800"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gradient-to-b from-cyan-500 to-blue-500 relative overflow-hidden">
        <Container className="mx-auto w-[85%] relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Les avantages
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Le seul logiciel dont vous avez besoin pour gérer vos DCE en toute simplicité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sans DCE Manager */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Sans DCE Manager</h3>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2 text-white/80">
                  <div className="h-5 w-5 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-500">✕</span>
                  </div>
                  <span>Processus manuel et chronophage</span>
                </div>
              ))}
            </div>

            {/* Avec DCE Manager */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Avec DCE Manager</h3>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Automatisation intelligente</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-600/20"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container className="mx-auto w-[85%]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Découvrez comment DCE Manager simplifie votre gestion des appels d'offres
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-gray-700 to-gray-800 border-[#384454] border p-6 rounded-lg"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-400 font-bold">{i}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Étape {i}</h3>
                <p className="text-gray-400">
                  Description détaillée de l'étape {i} pour utiliser efficacement DCE Manager.
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <Pricing />
      
      {/* FAQ Section */}
      <FAQ items={[]} />
    </div>
  );
};

export default Index;
