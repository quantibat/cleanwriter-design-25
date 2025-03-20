
import React from 'react';
import { FolderOpen, BarChart3, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard = ({
  title,
  description,
  icon,
  delay
}: FeatureCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay * 0.1, duration: 0.6 }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
  >
    <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors duration-300">
      <div className="text-blue-400">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-blue-100/70">{description}</p>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      title: "Organisation intelligente",
      description: "Classez et structurez vos documents par projet, par lot ou par type pour retrouver rapidement les informations essentielles.",
      icon: <FolderOpen size={24} />,
    },
    {
      title: "Analyses et rapports",
      description: "Générez des tableaux de bord et des rapports détaillés pour suivre l'état d'avancement de vos projets et optimiser vos processus.",
      icon: <BarChart3 size={24} />,
    },
    {
      title: "Collaboration d'équipe",
      description: "Travaillez ensemble efficacement avec des outils de communication intégrés et des permissions d'accès personnalisables.",
      icon: <Users size={24} />,
    },
    {
      title: "Sécurité avancée",
      description: "Protégez vos données sensibles avec un chiffrement de bout en bout et des contrôles d'accès granulaires.",
      icon: <Shield size={24} />,
    },
  ];

  return (
    <section id="features" className="py-28 px-6 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-900/5 to-background pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium">
            Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
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
      </div>
    </section>
  );
};

export default Features;
