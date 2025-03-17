
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
  <div className={`rounded-xl p-8 ${popular ? 'bg-brand-purple/5 border-brand-purple' : 'bg-white border-gray-200'} border-2 flex flex-col h-full relative`}>
    {popular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-purple text-white px-4 py-1 rounded-full text-sm font-medium">
        Le plus populaire
      </div>
    )}
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <div className="mb-4">
      <span className="text-3xl font-bold">{price}</span>
      {price !== 'Gratuit' && <span className="text-muted-foreground">/mois</span>}
    </div>
    <p className="text-muted-foreground mb-6">{description}</p>
    <ul className="space-y-3 mb-8 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-5 w-5 text-brand-purple mr-2 flex-shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button className={`w-full ${popular ? 'bg-brand-purple hover:bg-brand-purple-dark text-white' : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'} hover-button`}>
      {popular ? "Commencer maintenant" : "Essayer gratuitement"}
    </Button>
  </div>
);

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tarifs simples et transparents</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
