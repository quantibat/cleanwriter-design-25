
import React from 'react';
import { Wand2, Zap, BarChart, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
}

const FeatureCard = ({ title, description, icon, image, alt, reverse = false }: FeatureCardProps) => (
  <Card className={`cosmic-card overflow-hidden border-white/10 hover:border-blue-500/30 transition-all duration-300 bg-card/60`}>
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
      <div className="md:w-1/2 h-64 overflow-hidden">
        <img 
          src={image} 
          alt={alt} 
          className="w-full h-full object-cover object-center" 
        />
      </div>
      <CardContent className={`p-8 md:w-1/2`}>
        <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
          <div className="text-blue-400">{icon}</div>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-blue-100/70">{description}</p>
      </CardContent>
    </div>
  </Card>
);

const Features = () => {
  // Feature images
  const featureImages = [
    "/lovable-uploads/c51301c4-6875-4882-86b5-a9cd9cd773cd.png",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  ];

  return (
    <section id="features" className="py-20 px-6 relative">
      {/* Background dots */}
      <div className="absolute inset-0 cosmic-dots opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">Fonctionnalités principales</h2>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
            Des outils puissants pour créer du contenu exceptionnel
          </p>
        </div>
        
        <div className="flex flex-col space-y-8">
          <FeatureCard 
            title="Génération de texte IA" 
            description="Créez des articles, des posts et des descriptions optimisés pour le SEO en quelques clics. Notre technologie avancée analyse les tendances et génère du contenu pertinent."
            icon={<Wand2 size={24} />}
            image={featureImages[0]}
            alt="IA Text Generation"
          />
          
          <FeatureCard 
            title="Rédaction rapide" 
            description="Obtenez du contenu de qualité en quelques secondes, peu importe le sujet ou la longueur. Gagnez du temps et augmentez votre productivité avec notre outil de rédaction rapide."
            icon={<Zap size={24} />}
            image={featureImages[1]}
            alt="Fast Writing"
            reverse={true}
          />
          
          <FeatureCard 
            title="Analyse de performance" 
            description="Suivez l'engagement et l'efficacité de votre contenu avec des statistiques détaillées. Obtenez des insights précieux pour améliorer votre stratégie de contenu."
            icon={<BarChart size={24} />}
            image={featureImages[2]}
            alt="Performance Analysis"
          />
          
          <FeatureCard 
            title="Multilinguisme" 
            description="Générez et traduisez du contenu dans plus de 20 langues différentes. Étendez votre audience et touchez des marchés internationaux sans barrière linguistique."
            icon={<MessageSquare size={24} />}
            image={featureImages[3]}
            alt="Multilingual Support"
            reverse={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
