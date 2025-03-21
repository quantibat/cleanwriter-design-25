
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Zap, Award, Shield, BookOpen, Star, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import CreditDisplay from '@/components/dashboard/CreditDisplay';

const UpgradePlan = () => {
  const { user, isPremiumUser, userCredits, updateCredits } = useAuth();
  const navigate = useNavigate();
  
  const breadcrumbs = [
    { label: 'Mise à niveau' }
  ];
  
  const handleStartTrial = () => {
    if (isPremiumUser) {
      toast({
        title: "Déjà abonné",
        description: "Vous bénéficiez déjà de toutes les fonctionnalités premium.",
        variant: "default"
      });
      navigate('/dashboard');
      return;
    }

    // Simuler le démarrage de l'essai
    toast({
      title: "Essai gratuit activé",
      description: "Votre période d'essai de 7 jours démarre maintenant. Profitez de toutes les fonctionnalités premium!",
      variant: "default"
    });
    // Rediriger vers le tableau de bord après un court délai
    setTimeout(() => navigate('/dashboard'), 1500);
  };
  
  const handleBuyCredits = (amount: number, price: number) => {
    // Simuler l'achat de crédits
    updateCredits(userCredits + amount);
    
    toast({
      title: "Achat réussi",
      description: `Vous avez acheté ${amount} crédits pour ${price}€. Votre nouveau solde est de ${userCredits + amount} crédits.`,
      variant: "default"
    });
  };

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="w-full max-w-5xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            Rechargez vos crédits
          </h1>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
            Choisissez un forfait adapté à vos besoins et continuez à générer du contenu de qualité.
          </p>
        </section>
        
        <div className="mb-10">
          <CreditDisplay showButton={false} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cosmic-card relative p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 bg-card backdrop-blur-md hover:shadow-[0_0_20px_rgba(30,174,219,0.3)] transition-all">
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                  Basique
                </span>
              </div>
              <h3 className="text-xl font-bold mt-3">10 000 Crédits</h3>
              <div className="mb-4 mt-2">
                <span className="text-2xl font-bold">9,99€</span>
                <span className="text-muted-foreground ml-1">/achat unique</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Parfait pour les projets occasionnels ou pour tester le service.
              </p>
              <Button 
                variant="blue" 
                size="lg" 
                onClick={() => handleBuyCredits(10000, 9.99)} 
                className="w-full text-lg py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-[0_0_15px_rgba(30,174,219,0.5)]"
              >
                Acheter maintenant
                <ArrowRight className="ml-2" />
              </Button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-blue-400" />
                </div>
                <span className="text-card-foreground/90">10 000 crédits (≈ 10 000 mots)</span>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-blue-400" />
                </div>
                <span className="text-card-foreground/90">Accès à tous les types de génération</span>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-blue-400" />
                </div>
                <span className="text-card-foreground/90">Support client par email</span>
              </div>
            </div>
          </Card>
          
          <Card className="cosmic-card relative p-6 border-2 border-amber-500/50 shadow-lg shadow-amber-500/10 bg-card backdrop-blur-md hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all scale-105 z-10">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="px-4 py-1 bg-amber-500 text-black rounded-full text-sm font-medium">
                Plus populaire
              </span>
            </div>
            <div className="mb-4 mt-2">
              <div className="flex justify-between items-center">
                <div className="bg-amber-500/20 p-2 rounded-full">
                  <Award className="h-6 w-6 text-amber-400" />
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-medium">
                  Standard
                </span>
              </div>
              <h3 className="text-xl font-bold mt-3">30 000 Crédits</h3>
              <div className="mb-4 mt-2">
                <span className="text-2xl font-bold">24,99€</span>
                <span className="text-muted-foreground ml-1">/achat unique</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Idéal pour les créateurs de contenu réguliers. Notre offre la plus populaire.
              </p>
              <Button 
                variant="blue" 
                size="lg" 
                onClick={() => handleBuyCredits(30000, 24.99)} 
                className="w-full text-lg py-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              >
                Acheter maintenant
                <ArrowRight className="ml-2" />
              </Button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-amber-400" />
                </div>
                <span className="text-card-foreground/90">30 000 crédits (≈ 30 000 mots)</span>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-amber-400" />
                </div>
                <span className="text-card-foreground/90">Accès à tous les types de génération</span>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-amber-400" />
                </div>
                <span className="text-card-foreground/90">Support client prioritaire</span>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-amber-400" />
                </div>
                <span className="text-card-foreground/90">20% de réduction (30€ → 24,99€)</span>
              </div>
            </div>
          </Card>
          
          <Card className="cosmic-card relative p-6 border border-purple-500/30 shadow-lg shadow-purple-500/10 bg-card backdrop-blur-md hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all">
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <Star className="h-6 w-6 text-purple-400" />
                </div>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                  Pro
                </span>
              </div>
              <h3 className="text-xl font-bold mt-3">100 000 Crédits</h3>
              <div className="mb-4 mt-2">
                <span className="text-2xl font-bold">69,99€</span>
                <span className="text-muted-foreground ml-1">/achat unique</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Pour les professionnels qui ont besoin d'un volume important de contenu.
              </p>
              <Button 
                variant="blue" 
                size="lg" 
                onClick={() => handleBuyCredits(100000, 69.99)} 
                className="w-full text-lg py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]"
              >
                Acheter maintenant
                <ArrowRight className="ml-2" />
              </Button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-purple-400" />
                </div>
                <span className="text-card-foreground/90">100 000 crédits (≈ 100 000 mots)</span>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-purple-400" />
                </div>
                <span className="text-card-foreground/90">Accès à tous les types de génération</span>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-purple-400" />
                </div>
                <span className="text-card-foreground/90">Support client dédié 7j/7</span>
              </div>
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-purple-400" />
                </div>
                <span className="text-card-foreground/90">30% de réduction (100€ → 69,99€)</span>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mt-10 bg-[#1E2532]/60 border border-white/10 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-500/20 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Paiement sécurisé et garantie satisfait ou remboursé</h3>
              <p className="text-white/60">
                Nous utilisons des méthodes de paiement sécurisées et cryptées. Si vous n'êtes pas satisfait de nos services, nous vous remboursons intégralement pendant 14 jours.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <img src="https://via.placeholder.com/60x30" alt="Visa" className="h-8 rounded-md" />
                <img src="https://via.placeholder.com/60x30" alt="Mastercard" className="h-8 rounded-md" />
                <img src="https://via.placeholder.com/60x30" alt="PayPal" className="h-8 rounded-md" />
                <img src="https://via.placeholder.com/60x30" alt="Apple Pay" className="h-8 rounded-md" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          En achetant des crédits, vous acceptez nos {" "}
          <a href="/terms-of-service" className="text-blue-400 hover:underline">
            conditions d'utilisation
          </a> {" "}
          et notre {" "}
          <a href="/privacy-policy" className="text-blue-400 hover:underline">
            politique de confidentialité
          </a>.
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UpgradePlan;
