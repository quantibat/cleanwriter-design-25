import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
const Hero = () => {
  return <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 bg-[#06071b]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-indigo-900/5 to-transparent pointer-events-none"></div>
      
      {/* Background stars/dots */}
      <div className="stars absolute inset-0 overflow-hidden pointer-events-none">
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
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-left md:text-center space-y-8 max-w-3xl mx-auto relative z-10">
          <div className="flex flex-col items-start md:items-center space-y-4">
            <motion.span initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.2,
            duration: 0.6
          }} className="px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
              DCE Manager v1.0
            </motion.span>
            
            <motion.h1 initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.4,
            duration: 0.8
          }} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Gestion intelligente <br /> de vos dossiers d'appel d'offres
            </motion.h1>
          </div>
          
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.6,
          duration: 0.8
        }} className="text-lg md:text-xl text-blue-100/70 max-w-2xl mx-auto">
            Simplifiez la gestion de vos dossiers de consultation des entreprises. Organisez, partagez et suivez vos documents en toute simplicité.
          </motion.p>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.8,
          duration: 0.6
        }} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 font-medium text-lg rounded-full group">
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="w-full sm:w-auto font-medium px-8 py-6 text-lg group border-white/10 bg-white/5 hover:bg-white/10 rounded-full">
              Découvrir les fonctionnalités
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Demo Screen Preview */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1,
        duration: 0.8
      }} className="mt-20 max-w-5xl mx-auto relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl blur opacity-30"></div>
          <img alt="DCE Manager Dashboard" className="w-full h-full object-cover relative z-10 rounded-2xl border border-white/10 shadow-2xl" src="/lovable-uploads/6efa4977-b5a4-4c98-a242-0067f8ad1b2d.png" />
        </motion.div>
      </div>
    </section>;
};
export default Hero;