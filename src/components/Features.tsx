
import React from 'react';
import { Wand2, Zap, BarChart, MessageSquare } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-brand-purple/20">
    <div className="h-12 w-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-6">
      <div className="text-brand-purple">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Fonctionnalités principales</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des outils puissants pour créer du contenu exceptionnel
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            title="Génération de texte IA" 
            description="Créez des articles, des posts et des descriptions optimisés pour le SEO en quelques clics." 
            icon={<Wand2 size={24} />}
          />
          <FeatureCard 
            title="Rédaction rapide" 
            description="Obtenez du contenu de qualité en quelques secondes, peu importe le sujet ou la longueur." 
            icon={<Zap size={24} />}
          />
          <FeatureCard 
            title="Analyse de performance" 
            description="Suivez l'engagement et l'efficacité de votre contenu avec des statistiques détaillées." 
            icon={<BarChart size={24} />}
          />
          <FeatureCard 
            title="Multilinguisme" 
            description="Générez et traduisez du contenu dans plus de 20 langues différentes." 
            icon={<MessageSquare size={24} />}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
