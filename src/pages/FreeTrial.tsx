import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Moon, Sun, Cpu, Globe, Headphones, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const FreeTrial = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const {
    user,
    isPremiumUser
  } = useAuth();
  const navigate = useNavigate();
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Dans une implémentation réelle, cela basculerait une classe de mode sombre sur l'élément racine
  };
  const handleStartTrial = () => {
    if (!user) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      navigate('/signin', {
        state: {
          from: {
            pathname: '/free-trial'
          }
        }
      });
      return;
    }
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
  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };
  return <div className="min-h-screen bg-[#121824] text-white">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
        <div className="mb-6 text-right">
          
        </div>
        
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            Commencez votre essai gratuit de 7 jours maintenant
          </h1>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
            Accédez à toutes les fonctionnalités premium de DCEManager sans engagement. 
            Découvrez comment notre plateforme peut transformer votre gestion de projets.
          </p>
        </section>
        
        <div className="max-w-2xl mx-auto">
          <Card className="cosmic-card relative p-8 border border-blue-500/50 shadow-lg shadow-blue-500/10 animated-border-glow bg-[#1E2532]/80 backdrop-blur-md">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold text-white">Premium</h3>
                <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                  Essai gratuit
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-white">29€</span>
                  <span className="text-blue-100/70 ml-1">/mois</span>
                </div>
                <p className="text-blue-100/70 mt-2">Après la période d'essai de 7 jours</p>
              </div>
              <p className="text-blue-100/70 mb-6">
                Explorez toutes nos fonctionnalités avancées pendant 7 jours, sans engagement.
                Annulez à tout moment avant la fin de l'essai.
              </p>
              <Button variant="blue" size="lg" onClick={handleStartTrial} className="w-full text-lg py-6 bg-transparent">
                Commencer l'essai gratuit
                <ArrowRight className="ml-2" />
              </Button>
              <p className="text-sm text-blue-100/60 mt-3 text-center">
                Aucune carte bancaire requise pour l'essai
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-white">L'abonnement inclut :</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-blue-100/90">Accès à GPT-4 pour l'analyse des documents</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-blue-100/90">Génération illimitée de contenu IA</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-blue-100/90">Support multilingue pour tous vos documents</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-blue-100/90">Support client dédié 7j/7</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-blue-100/90">Accès prioritaire aux nouvelles fonctionnalités</span>
                </li>
              </ul>
            </div>
          </Card>
          
          <div className="mt-8 text-center text-sm text-blue-100/60">
            En commençant votre essai, vous acceptez nos {" "}
            <Link to="/terms-of-service" className="text-blue-400 hover:underline">
              conditions d'utilisation
            </Link> {" "}
            et notre {" "}
            <Link to="/privacy-policy" className="text-blue-400 hover:underline">
              politique de confidentialité
            </Link>.
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default FreeTrial;