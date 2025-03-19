
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Affiliate = () => {
  const [references, setReferences] = useState(7);
  const monthlyEarnings = 1243;
  const monthlyBonus = 104;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="py-20 px-6 relative text-center">
          <div className="max-w-5xl mx-auto relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Recevez jusqu'à <span className="text-blue-400">2 000 $</span> par mois grâce au marché à la croissance la plus rapide au monde
            </h1>
            
            <div className="mb-12 flex justify-center">
              <Button className="blue-shimmer-button bg-blue-500 hover:bg-blue-600 px-8 py-6 text-lg h-auto">
                Devenez un partenaire affilié maintenant !
              </Button>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-10">
                Pourquoi est-ce le meilleur moment pour promouvoir DCEManager ?
              </h2>
              
              <div className="space-y-8">
                <div className="cosmic-card p-8 text-left relative overflow-hidden group">
                  <div className="absolute top-8 left-8 text-4xl font-bold text-blue-400 opacity-80">1</div>
                  <div className="ml-16">
                    <p className="text-blue-100/90">
                      Le marché des DCE compte plus de 100 millions d'utilisateurs et le marché mondial est évalué à 196,6 milliards de dollars, avec un taux de croissance de 38,1% par an
                    </p>
                  </div>
                </div>
                
                <div className="cosmic-card p-8 text-left relative overflow-hidden group">
                  <div className="absolute top-8 left-8 text-4xl font-bold text-blue-400 opacity-80">2</div>
                  <div className="ml-16">
                    <p className="text-blue-100/90">
                      Les clients aiment tellement les outils de gestion des DCE qu'ils n'hésitent plus à souscrire à des produits comme DCEManager (même s'il s'agit d'un paiement récurrent)
                    </p>
                  </div>
                </div>
                
                <div className="cosmic-card p-8 text-left relative overflow-hidden group">
                  <div className="absolute top-8 left-8 text-4xl font-bold text-blue-400 opacity-80">3</div>
                  <div className="ml-16">
                    <p className="text-blue-100/90">
                      En faisant la promotion de DCEManager maintenant, vous saisissez l'opportunité d'être l'un des premiers, et être un des premiers à adopter peut conduire à des revenus plus élevés
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Gagnez <span className="text-blue-400">40 %</span> de commissions récurrentes à vie en faisant la promotion de DCEManager dès aujourd'hui !
              </h2>
            </div>
            
            <div className="cosmic-card p-8 mb-16 max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">
                Estimez vos revenus en faisant la promotion de DCEManager :
              </h3>
              
              <div className="mb-6">
                <label htmlFor="references" className="block text-sm font-medium mb-2">
                  Nombre de références
                </label>
                <div className="flex items-center">
                  <Input 
                    id="references"
                    type="number" 
                    value={references}
                    onChange={(e) => setReferences(parseInt(e.target.value) || 0)}
                    className="w-full rounded-r-none"
                  />
                  <Button className="rounded-l-none bg-blue-500">
                    =
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {monthlyEarnings} $
                  <span className="text-sm font-normal text-muted-foreground ml-2">/ mois</span>
                </div>
                <div className="text-blue-400 font-medium mb-4">
                  + {monthlyBonus} $ <span className="text-sm font-normal">par mois</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  *résultat sur l'abonnement mensuel de 37$ (taux de commission de 40%)
                </p>
              </div>
            </div>
            
            <Button className="blue-shimmer-button bg-blue-500 hover:bg-blue-600 px-8 py-6 text-lg h-auto mb-16">
              Devenez un partenaire affilié maintenant !
            </Button>
            
            <div className="mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-400/20 p-3 rounded-lg">
                  <Check className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold ml-3">
                  Oh, et j'ai presque oublié, nous avons préparé 3 vidéos de formation et des tonnes de ressources pour vous aider à promouvoir DCEManager !
                </h3>
              </div>
              
              <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/20">
                Obtenir des ressources d'affiliation maintenant !
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Affiliate;
