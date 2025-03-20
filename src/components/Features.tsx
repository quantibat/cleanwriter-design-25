
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Upload, LineChart, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Features = () => {
  const navigate = useNavigate();
  
  const handleCTAClick = () => {
    navigate('/dashboard');
  };
  
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            Fonctionnalités clés
          </h2>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour gérer efficacement vos dossiers de consultation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1 space-y-6 fade-up">
            <p className="text-lg text-blue-100/80">
              Notre plateforme vous permet de créer, organiser et suivre vos dossiers de consultation des entreprises de manière centralisée. Fini les échanges d'emails et les documents éparpillés.
            </p>
            
            <ul className="space-y-4">
              {[
                {
                  icon: <FileText className="h-5 w-5" />,
                  text: "Création de DCE en ligne avec formulaires personnalisables"
                },
                {
                  icon: <Upload className="h-5 w-5" />,
                  text: "Partage sécurisé avec les entreprises et contrôle des accès"
                },
                {
                  icon: <LineChart className="h-5 w-5" />,
                  text: "Suivi en temps réel des réponses et tableau de bord analytique"
                },
                {
                  icon: <Bell className="h-5 w-5" />,
                  text: "Automatisation des relances et des notifications"
                }
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 h-6 w-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-blue-400">{item.icon}</div>
                  </div>
                  <span className="text-blue-100/90">{item.text}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              onClick={handleCTAClick}
              className="mt-4 hover-button bg-blue-500 hover:bg-blue-600 text-white"
            >
              Découvrir toutes les fonctionnalités
            </Button>
          </div>
          
          <div className="order-1 md:order-2 animated-border-white fade-up">
            <Card className="overflow-hidden border-white/10 hover:border-blue-500/30 transition-all duration-300 bg-card/60">
              <img 
                src="/lovable-uploads/c51301c4-6875-4882-86b5-a9cd9cd773cd.png" 
                alt="Interface DCE Manager" 
                className="w-full object-cover"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
