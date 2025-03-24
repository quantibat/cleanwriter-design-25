
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const UpgradePlan = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const breadcrumbs = [{
    label: 'Votre plan'
  }];
  
  const handleStartTrial = () => {
    // Tous les utilisateurs sont premium par défaut
    toast({
      title: "Accès Premium",
      description: "Vous bénéficiez déjà de toutes les fonctionnalités premium.",
      variant: "default"
    });
    navigate('/dashboard');
  };
  
  return <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="w-full max-w-5xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            Vous avez accès à toutes les fonctionnalités
          </h1>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
            Profitez de toutes les fonctionnalités premium de DCEManager sans restriction.
            Découvrez comment notre plateforme peut transformer votre gestion de projets.
          </p>
        </section>
        
        <div className="max-w-2xl mx-auto">
          <Card className="cosmic-card relative p-8 border border-blue-500/50 shadow-lg shadow-blue-500/10 bg-card backdrop-blur-md">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold">Premium</h3>
                <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                  Accès complet
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-3xl font-bold">Gratuit</span>
                </div>
                <p className="text-muted-foreground mt-2">Accès à toutes les fonctionnalités</p>
              </div>
              <p className="text-muted-foreground mb-6">
                Explorez toutes nos fonctionnalités avancées sans limitation.
              </p>
              <Button variant="blue" size="lg" onClick={handleStartTrial} className="w-full text-lg py-6 bg-transparent">
                Retourner au tableau de bord
                <ArrowRight className="ml-2" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">L'abonnement inclut :</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-card-foreground/90">Accès à GPT-4 pour l'analyse des documents</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-card-foreground/90">Génération illimitée de contenu IA</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-card-foreground/90">Support multilingue pour tous vos documents</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-card-foreground/90">Support client dédié 7j/7</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-card-foreground/90">Accès prioritaire aux nouvelles fonctionnalités</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>;
};

export default UpgradePlan;
