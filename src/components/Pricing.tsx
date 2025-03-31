import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
interface PricingCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  projectsCount?: string;
  revisionsCount?: string;
}
const PricingCard = ({
  title,
  price,
  originalPrice,
  period,
  description,
  features,
  popular = false,
  projectsCount,
  revisionsCount
}: PricingCardProps) => <div className={`relative rounded-xl p-8 flex flex-col h-full border ${popular ? 'border-blue-400/30' : 'border-white/5'} bg-transparent backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-white/5`}>
    {popular && <div className="absolute top-0 right-0 bg-blue-500 text-xs font-medium text-white px-3 py-1">
        Recommandé
      </div>}
    
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    
    <div className="mb-6">
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-white">{price}</span>
        {originalPrice && <span className="text-lg text-blue-100/50 line-through ml-2">{originalPrice}</span>}
      </div>
      <div className="text-blue-100/70 text-sm">/{period}</div>
    </div>
    
    <p className="text-blue-100/70 mb-6 text-sm">{description}</p>
    
    {(projectsCount || revisionsCount) && <div className="flex gap-4 mb-6">
        {projectsCount && <div className="bg-blue-500/10 rounded-lg px-3 py-2 text-center flex-1">
            <div className="text-lg font-bold text-white">{projectsCount}</div>
            <div className="text-xs text-blue-100/70">Projets</div>
          </div>}
        {revisionsCount && <div className="bg-blue-500/10 rounded-lg px-3 py-2 text-center flex-1">
            <div className="text-lg font-bold text-white">{revisionsCount}</div>
            <div className="text-xs text-blue-100/70">Révisions</div>
          </div>}
      </div>}
    
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => <li key={index} className="flex items-start text-blue-100/90">
          <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-sm">{feature}</span>
        </li>)}
    </ul>
    
    <div className="mt-auto">
      <Button variant={popular ? "default" : "outline"} className={`w-full ${popular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
        Réserver un rendez-vous
      </Button>
    </div>
  </div>;
const Pricing = () => {
  const pricingPlans = [{
    title: "Basique",
    price: "99€",
    originalPrice: "450€",
    period: "mois",
    description: "Notre forfait basique est conçu pour offrir une excellente valeur tout en fournissant les fonctionnalités essentielles pour bien démarrer.",
    projectsCount: "100+",
    revisionsCount: "75+",
    features: ["Tous les modèles débloqués", "Licences illimitées", "Mises à jour à vie", "Support par email", "Garantie satisfait ou remboursé de 30 jours"]
  }, {
    title: "Premium",
    price: "2 599€",
    period: "mois",
    description: "Notre forfait premium est conçu pour les entreprises à la recherche de fonctionnalités avancées et d'un support premium.",
    projectsCount: "650+",
    revisionsCount: "250+",
    features: ["Tous les modèles débloqués", "Licences illimitées", "Mises à jour à vie", "Support par email", "Garantie satisfait ou remboursé de 30 jours"],
    popular: true
  }, {
    title: "Entreprise",
    price: "Sur mesure",
    period: "devis",
    description: "Solutions personnalisées pour les organisations ayant des besoins spécifiques et des exigences pour des implémentations à grande échelle.",
    features: ["Toutes les fonctionnalités premium incluses", "Gestionnaire de compte dédié", "Intégrations personnalisées", "Support prioritaire 24/7", "Formation et intégration", "Accords SLA personnalisés"]
  }];
  return <section id="pricing" className="py-24 px-6 bg-[#06071b]">
      <div className="w-[85%] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-white md:text-5xl">Tarifs</h2>
          <p className="text-blue-100/80 max-w-2xl mx-auto">
            Nos forfaits tarifaires sont conçus pour rendre le démarrage aussi simple que possible. Avec des options flexibles adaptées à une variété de besoins et de budgets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => <PricingCard key={index} {...plan} />)}
        </div>
      </div>
    </section>;
};
export default Pricing;