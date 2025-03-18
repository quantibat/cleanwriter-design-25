
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const PricingCard = ({ title, price, description, features, popular = false }: PricingCardProps) => (
  <div className={`cosmic-card p-8 flex flex-col h-full relative ${popular ? 'popular-plan' : 'border-white/5'} transition-all duration-300 hover:shadow-blue-500/10 hover:shadow-lg`}>
    {popular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
        Le plus populaire
      </div>
    )}
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <div className="mb-4">
      <span className="text-3xl font-bold text-white">{price}</span>
      {price !== 'Gratuit' && <span className="text-blue-100/70">/mois</span>}
    </div>
    <p className="text-blue-100/70 mb-6">{description}</p>
    <ul className="space-y-3 mb-8 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start text-blue-100/90">
          <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button className={`w-full hover-button ${popular ? 'blue-shimmer-button bg-blue-500 hover:bg-blue-600 text-white' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
      {popular ? "Commencer maintenant" : "Essayer gratuitement"}
    </Button>
  </div>
);

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">Tarifs simples et transparents</h2>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
            Choisissez l'offre qui correspond à vos besoins
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard 
            title="Débutant" 
            price="Gratuit" 
            description="Parfait pour découvrir l'outil"
            features={[
              "5 000 mots par mois",
              "Accès aux modèles de base",
              "Génération d'idées de contenu",
              "Support email"
            ]}
          />
          
          <PricingCard 
            title="Professionnel" 
            price="19 €" 
            description="Idéal pour les créateurs de contenu"
            features={[
              "50 000 mots par mois",
              "Accès à tous les modèles",
              "Correcteur orthographique avancé",
              "Pas de filigrane",
              "Support prioritaire"
            ]}
            popular
          />
          
          <PricingCard 
            title="Entreprise" 
            price="49 €" 
            description="Pour les équipes et agences"
            features={[
              "Usage illimité",
              "Utilisateurs multiples",
              "API d'intégration",
              "Contenu personnalisé selon votre marque",
              "Support dédié 24/7"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
