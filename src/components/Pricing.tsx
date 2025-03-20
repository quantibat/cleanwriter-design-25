
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

const PricingCard = ({
  title,
  price,
  description,
  features,
  popular = false
}: PricingCardProps) => (
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
    <Button variant={popular ? "blue" : "outline"} className={`w-full hover-button ${!popular && 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
      {popular ? "Commencer maintenant" : "Essayer gratuitement"}
    </Button>
  </div>
);

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Basique",
      price: "Gratuit",
      description: "Pour les petits projets et les débutants",
      features: [
        "3 projets maximum",
        "Stockage limité à 500 Mo",
        "Collaboration avec 2 utilisateurs",
        "Export en PDF",
        "Support par email"
      ]
    },
    {
      title: "Pro",
      price: "39€",
      description: "Pour les équipes et projets multiples",
      features: [
        "Projets illimités",
        "Stockage jusqu'à 10 Go",
        "Collaboration jusqu'à 10 utilisateurs",
        "Exports en tous formats",
        "Support prioritaire",
        "Historique des versions",
        "Modèles personnalisés"
      ],
      popular: true
    },
    {
      title: "Entreprise",
      price: "99€",
      description: "Pour les grandes organisations",
      features: [
        "Projets et utilisateurs illimités",
        "Stockage jusqu'à 100 Go",
        "Administration avancée",
        "Intégration API complète",
        "Support dédié 24/7",
        "Contrôles de sécurité avancés",
        "Formations personnalisées"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Des tarifs adaptés à vos besoins</h2>
          <p className="text-blue-100/80 max-w-2xl mx-auto">
            Choisissez le forfait qui correspond à votre niveau d'utilisation et aux fonctionnalités dont vous avez besoin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <PricingCard {...plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
