
import React from 'react';
import { FolderOpen, BarChart3, Users, Shield, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  color: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  delay,
  color
}: FeatureCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay * 0.1, duration: 0.6 }}
    className={`neon-border bg-white/5 backdrop-blur-sm border border-${color}/20 rounded-xl p-6 hover:bg-white/8 transition-all duration-300 group`}
    style={{
      boxShadow: `0 0 10px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.05)`
    }}
  >
    <div className={`h-12 w-12 bg-${color}/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-${color}/30 transition-colors duration-300`}>
      <div className={`text-${color}`}>{icon}</div>
    </div>
    <h3 className={`text-xl font-semibold mb-3 text-white neon-text-${color === 'neon-purple' ? 'purple' : (color === 'neon-pink' ? 'pink' : 'blue')}`}>{title}</h3>
    <p className="text-blue-100/70">{description}</p>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      title: "Organisation intelligente",
      description: "Classez et structurez vos documents par projet, par lot ou par type pour retrouver rapidement les informations essentielles.",
      icon: <FolderOpen size={24} />,
      color: "neon-purple"
    },
    {
      title: "Analyses et rapports",
      description: "Générez des tableaux de bord et des rapports détaillés pour suivre l'état d'avancement de vos projets et optimiser vos processus.",
      icon: <BarChart3 size={24} />,
      color: "neon-pink"
    },
    {
      title: "Collaboration d'équipe",
      description: "Travaillez ensemble efficacement avec des outils de communication intégrés et des permissions d'accès personnalisables.",
      icon: <Users size={24} />,
      color: "neon-blue"
    },
    {
      title: "Sécurité avancée",
      description: "Protégez vos données sensibles avec un chiffrement de bout en bout et des contrôles d'accès granulaires.",
      icon: <Shield size={24} />,
      color: "neon-green"
    },
  ];

  return (
    <section id="features" className="py-24 px-6 relative bg-[#06071b]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 via-neon-pink/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1.5 bg-neon-pink/10 text-neon-pink rounded-full text-sm font-medium inline-flex items-center justify-center mx-auto">
            <Sparkles className="w-4 h-4 mr-2" /> Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white neon-text-pink">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-blue-100/70 max-w-2xl mx-auto text-lg">
            Découvrez comment DCE Manager peut transformer votre gestion documentaire et améliorer l'efficacité de vos appels d'offres.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button className="neon-button px-8 py-6 rounded-full text-white flex items-center mx-auto">
            <Zap className="mr-2 h-5 w-5 text-neon-pink" />
            Découvrir toutes les fonctionnalités
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
