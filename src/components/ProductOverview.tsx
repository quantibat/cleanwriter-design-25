
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, ArrowUpRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const ProductOverview = () => {
  const container: Variants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item: Variants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0
    }
  };

  return <section id="product" className="py-28 px-6 bg-[#0c101b]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left column - Image */}
          <motion.div 
            initial={{
              opacity: 0,
              x: -30
            }} 
            whileInView={{
              opacity: 1,
              x: 0
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 0.8
            }} 
            className="rounded-2xl overflow-hidden relative order-2 md:order-1"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-50"></div>
            <img 
              alt="Interface de DCE Manager" 
              src="/lovable-uploads/f41edebb-4664-4fe8-b966-cdca746d440f.png" 
              className="w-full h-full rounded-2xl relative z-10 border border-white/10 object-cover" 
            />
          </motion.div>
          
          {/* Right column - Text content */}
          <motion.div 
            variants={container} 
            initial="hidden" 
            whileInView="show" 
            viewport={{
              once: true
            }} 
            className="space-y-8 order-1 md:order-2"
          >
            <motion.div variants={item}>
              <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium">
                Gestion documentaire simplifiée
              </span>
            </motion.div>
            
            <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-white">
              Une gestion centralisée et intuitive de vos documents d'appel d'offres
            </motion.h2>
            
            <motion.p variants={item} className="text-blue-100/70 text-lg">
              Centralisez tous vos documents et procédures d'appel d'offres en un seul endroit sécurisé et accessible à tous les membres de votre équipe.
            </motion.p>
            
            <motion.ul variants={container} className="space-y-4">
              {["Organisation intuitive par projet et catégorie", "Suivi des versions et des modifications en temps réel", "Partage sécurisé avec contrôle d'accès personnalisable", "Collaboration en temps réel entre les équipes"].map((feature, index) => (
                <motion.li key={index} variants={item} className="flex gap-3 items-start">
                  <span className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-blue-400" />
                  </span>
                  <span className="text-blue-100/80">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.div variants={item}>
              <Button variant="outline" className="group border-white/10 bg-white/5 hover:bg-white/10 rounded-full">
                Voir en action
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};

export default ProductOverview;
