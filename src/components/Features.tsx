import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Compass, BarChart2, UsersRound, ShieldCheck, FolderOpen, FileText, Lightbulb, Users, CalendarClock, DollarSign, PenTool, ClipboardCheck, Send, FileSpreadsheet, MessageSquare, Clock } from "lucide-react";
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  color: string;
  slug: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  delay,
  color,
  slug
}: FeatureCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay * 0.1, duration: 0.6 }}
    className={`neon-border bg-white/5 backdrop-blur-sm border border-${color}/20 rounded-xl p-6 hover:bg-white/8 transition-all duration-300 group relative h-full flex flex-col`}
    style={{
      boxShadow: `0 0 10px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.05)`
    }}
  >
    <div className={`h-12 w-12 bg-${color}/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-${color}/30 transition-colors duration-300`}>
      <div className={`text-${color}`}>{icon}</div>
    </div>
    <h3 className={`text-xl font-semibold mb-3 text-white neon-text-${color === 'neon-purple' ? 'purple' : (color === 'neon-pink' ? 'pink' : 'blue')}`}>{title}</h3>
    <p className="text-blue-100/70 mb-4">{description}</p>
    <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Link to={`/features/${slug}`}>
        <Button variant="blue" size="sm" className="w-full">
          Découvrir
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  </motion.div>
);

const Features = () => {
  const allFeatures = [
    // Category 1: Repérez vos futurs chantiers
    {
      title: "Veille des Appels d'Offres",
      description: "Une liste ciblée d'appels d'offres adaptés à votre entreprise pour repérer en un clin d'œil les opportunités qui comptent pour vous.",
      icon: <Compass size={24} />,
      color: "neon-purple",
      slug: "veille-appels-offres",
      category: "search"
    },
    {
      title: "Analyse rapide du DCE",
      description: "Un résumé clair et personnalisé des points clés et exigences techniques du DCE pour le comprendre sans y passer la journée.",
      icon: <BarChart2 size={24} />,
      color: "neon-pink",
      slug: "analyse-rapide-dce",
      category: "search"
    },
    {
      title: "Estimation de l'Effort d'Étude",
      description: "Obtenez rapidement une estimation fiable du temps et des ressources nécessaires pour répondre efficacement à l'appel d'offres.",
      icon: <Clock size={24} />,
      color: "neon-blue",
      slug: "estimation-effort-etude",
      category: "search"
    },
    
    // Category 2: Organisez clairement vos documents
    {
      title: "Réorganisation du DCE",
      description: "Disposez immédiatement d'un dossier clair, complet et ordonné, prêt à l'emploi pour faciliter votre analyse.",
      icon: <FolderOpen size={24} />,
      color: "neon-purple",
      slug: "reorganisation-dce",
      category: "organize"
    },
    {
      title: "Élaboration DPGF",
      description: "Transformez simplement votre CCTP en DPGF détaillée et immédiatement chiffrable pour gagner un temps précieux.",
      icon: <FileSpreadsheet size={24} />,
      color: "neon-pink",
      slug: "elaboration-dpgf",
      category: "organize"
    },
    {
      title: "Analyse Technique du Lot",
      description: "Identifiez directement contraintes et spécificités techniques pour adapter efficacement votre offre sans rien manquer.",
      icon: <Lightbulb size={24} />,
      color: "neon-blue",
      slug: "analyse-technique-lot",
      category: "organize"
    },
    
    // Category 3: Affinez précisément vos quantités, coûts et plannings
    {
      title: "Réalisation des Métrés",
      description: "Obtenez rapidement des métrés fiables grâce à l'appui de l'intelligence artificielle et gagnez en précision.",
      icon: <Users size={24} />,
      color: "neon-purple",
      slug: "realisation-metres",
      category: "costs"
    },
    {
      title: "Planning Prévisionnel",
      description: "Générez simplement un planning prévisionnel réaliste, immédiatement présentable et adaptable à votre organisation.",
      icon: <CalendarClock size={24} />,
      color: "neon-pink",
      slug: "planning-previsionnel",
      category: "costs"
    },
    {
      title: "Chiffrage",
      description: "Élaborez facilement des propositions cohérentes et compétitives, avec des alertes automatiques sur les points à surveiller.",
      icon: <DollarSign size={24} />,
      color: "neon-blue",
      slug: "chiffrage",
      category: "costs"
    },
    
    // Category 4: Formalisez une offre percutante
    {
      title: "Mémoire Technique",
      description: "Obtenez en quelques clics un mémoire parfaitement adapté aux attentes du maître d'ouvrage, précis et convaincant.",
      icon: <PenTool size={24} />,
      color: "neon-purple",
      slug: "memoire-technique",
      category: "formalize"
    },
    {
      title: "Dossier Administratif",
      description: "Remplissage rapide et vérifications automatiques vous assurent un dossier administratif irrprochable du premier coup.",
      icon: <ClipboardCheck size={24} />,
      color: "neon-pink",
      slug: "dossier-administratif",
      category: "formalize"
    },
    {
      title: "Relecture & Dépôt de l'Offre",
      description: "Dernières vérifications automatisées pour vous assurer de la cohérence et du respect complet des exigences de l'appel d'offres.",
      icon: <Send size={24} />,
      color: "neon-blue",
      slug: "relecture-depot-offre",
      category: "formalize"
    },
    
    // Category 5: Concluez efficacement pour remporter vos marchés
    {
      title: "Complétion Pièces Administratives",
      description: "Complétez sans effort les documents requis pour répondre efficacement à chaque AO et maximisez vos chances de succès.",
      icon: <FileText size={24} />,
      color: "neon-purple",
      slug: "completion-pieces-administratives",
      category: "conclude"
    },
    {
      title: "Négociation & Ajustements",
      description: "Modifiez simplement votre proposition selon les retours du maître d'ouvrage et optimisez vos chances de succès.",
      icon: <MessageSquare size={24} />,
      color: "neon-pink",
      slug: "negociation-ajustements",
      category: "conclude"
    },
    {
      title: "Attente & Attribution",
      description: "Recevez des notifications en temps réel pour démarrer immédiatement en cas de succès et tirer des conclusions rapides en cas contraire.",
      icon: <Clock size={24} />,
      color: "neon-blue",
      slug: "attente-attribution",
      category: "conclude"
    },
  ];

  // Group features by category
  const featuresGroups = [
    {
      title: "Repérez vos futurs chantiers",
      icon: <Compass className="w-5 h-5 mr-2" />,
      description: "Optimisez vos recherches, économisez du temps et de l'argent en ciblant les appels d'offres les plus pertinents.",
      features: allFeatures.filter(feature => feature.category === "search")
    },
    {
      title: "Organisez clairement vos documents",
      icon: <FolderOpen className="w-5 h-5 mr-2" />,
      description: "Vos documents classés, votre dossier enrichi, vos échanges simplifiés",
      features: allFeatures.filter(feature => feature.category === "organize")
    },
    {
      title: "Affinez précisément vos quantités, coûts et plannings",
      icon: <DollarSign className="w-5 h-5 mr-2" />,
      description: "Des métrés fiables, des chiffrages précis, des plannings réalistes",
      features: allFeatures.filter(feature => feature.category === "costs")
    },
    {
      title: "Formalisez une offre percutante",
      icon: <PenTool className="w-5 h-5 mr-2" />,
      description: "Votre mémoire technique sur-mesure, votre administratif simplifié",
      features: allFeatures.filter(feature => feature.category === "formalize")
    },
    {
      title: "Concluez efficacement pour remporter vos marchés",
      icon: <ShieldCheck className="w-5 h-5 mr-2" />,
      description: "Finalisez avec confiance, ajustez avec facilité, décrochez sereinement",
      features: allFeatures.filter(feature => feature.category === "conclude")
    }
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
        
        {featuresGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-16 last:mb-0">
            <div className="mb-8">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <div className="p-2 rounded-full bg-blue-500/20 flex items-center justify-center">
                  {group.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {group.title}
                </h3>
              </div>
              <p className="text-blue-100/70 text-center md:text-start max-w-3xl mx-auto md:mx-0">
                {group.description}
              </p>
            </div>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {group.features.map((feature, index) => (
                  <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3 pl-4">
                    <FeatureCard
                      key={index}
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      delay={index}
                      color={feature.color}
                      slug={feature.slug}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end gap-2 mt-4">
                <CarouselPrevious className="relative static h-10 w-10 bg-blue-500/20 border-blue-500/40 text-white" />
                <CarouselNext className="relative static h-10 w-10 bg-blue-500/20 border-blue-500/40 text-white" />
              </div>
            </Carousel>
          </div>
        ))}
        
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
