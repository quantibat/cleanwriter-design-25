import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderPlus, ArrowRight, Youtube, Twitter, Linkedin, Mail, Globe, Facebook, Instagram } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const ToolsTab = () => {
  const { isPremiumUser } = useAuth();
  const navigate = useNavigate();
  const [selectedTitle, setSelectedTitle] = useState('');
  const [isSocialMediaOnly, setIsSocialMediaOnly] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const handleCreateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isPremiumUser) {
      e.preventDefault();
      toast({
        title: "Fonctionnalité premium",
        description: "Cette section nécessite un abonnement premium. Découvrez notre essai gratuit de 7 jours.",
        variant: "default"
      });
      navigate('/upgrade-plan');
    }
  };

  const handleCardClick = (title: string, isSocialMedia: boolean = false) => {
    if (isPremiumUser) {
      // Redirect to CreateDCE page with parameters
      const params = new URLSearchParams();
      params.append('title', title);
      params.append('isSocialMedia', isSocialMedia.toString());
      navigate(`/create-dce?${params.toString()}`);
    } else {
      toast({
        title: "Fonctionnalité premium",
        description: "Cette section nécessite un abonnement premium. Découvrez notre essai gratuit de 7 jours.",
        variant: "default"
      });
      navigate('/upgrade-plan');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Formulaire soumis",
      description: "Votre demande a été envoyée avec succès.",
      variant: "default"
    });
  };
  
  return (
    <div className="space-y-12 w-full">
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Youtube className="h-5 w-5 text-white bg-red-600 rounded-md p-1" />
          Transformation de contenu YouTube
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Stratégie Twitter à partir de vidéos YouTube", false)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-red-600 p-1.5 rounded-md">
                  <Youtube className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-500 p-1.5 rounded-md">
                  <Twitter className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Stratégie Twitter à partir de vidéos YouTube</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Contenu LinkedIn dérivé de YouTube", false)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-red-600 p-1.5 rounded-md">
                  <Youtube className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-500 p-1.5 rounded-md">
                  <Linkedin className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Contenu LinkedIn dérivé de YouTube</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Optimisation site web avec vidéos", false)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-red-600 p-1.5 rounded-md">
                  <Youtube className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-500 p-1.5 rounded-md">
                  <Globe className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Optimisation site web avec vidéos</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Campagne d'emailing basée sur YouTube", false)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-red-600 p-1.5 rounded-md">
                  <Youtube className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-500 p-1.5 rounded-md">
                  <Mail className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Campagne d'emailing basée sur YouTube</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Mail className="h-5 w-5 text-white bg-blue-500 rounded-md p-1" />
          Stratégies d'emailing avancées
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Intégration Twitter dans vos newsletters", false)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-blue-500 p-1.5 rounded-md">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-400 p-1.5 rounded-md">
                  <Twitter className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Intégration Twitter dans vos newsletters</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Génération de leads via newsletters", false)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-blue-500 p-1.5 rounded-md">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-700 p-1.5 rounded-md">
                  <Linkedin className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Génération de leads via newsletters</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Twitter className="h-5 w-5 text-white bg-blue-400 rounded-md p-1" />
          Stratégies avancées pour Twitter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Acquisition B2B via Twitter", true)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-blue-400 p-1.5 rounded-md">
                  <Twitter className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-700 p-1.5 rounded-md">
                  <Linkedin className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Acquisition B2B via Twitter</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Génération d'emails qualifiés via Twitter", true)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-blue-400 p-1.5 rounded-md">
                  <Twitter className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-500 p-1.5 rounded-md">
                  <Mail className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Génération d'emails qualifiés via Twitter</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Mail className="h-5 w-5 text-white bg-blue-500 rounded-md p-1" />
          Conversion par email
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Synergie Instagram-Email pour la vente", true)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-blue-500 p-1.5 rounded-md">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div className="bg-pink-500 p-1.5 rounded-md">
                  <Instagram className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Synergie Instagram-Email pour la vente</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Séquences d'emails automatisées pour conversion", true)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-blue-500 p-1.5 rounded-md">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-500 p-1.5 rounded-md">
                  <Globe className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Séquences d'emails automatisées pour conversion</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Linkedin className="h-5 w-5 text-white bg-blue-700 rounded-md p-1" />
          Expertise LinkedIn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Croissance de newsletter via LinkedIn", false)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-blue-700 p-1.5 rounded-md">
                  <Linkedin className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-500 p-1.5 rounded-md">
                  <Mail className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Croissance de newsletter via LinkedIn</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Trafic web qualifié depuis LinkedIn", false)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-blue-700 p-1.5 rounded-md">
                  <Linkedin className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-500 p-1.5 rounded-md">
                  <Globe className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Trafic web qualifié depuis LinkedIn</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Globe className="h-5 w-5 text-white bg-blue-500 rounded-md p-1" />
          Stratégies multicanal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("YouTube vers Instagram: contenu optimisé", true)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-red-600 p-1.5 rounded-md">
                  <Youtube className="h-4 w-4 text-white" />
                </div>
                <div className="bg-pink-600 p-1.5 rounded-md">
                  <Instagram className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">YouTube vers Instagram: contenu optimisé</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Tweets vers vidéos à fort engagement", true)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-blue-400 p-1.5 rounded-md">
                  <Twitter className="h-4 w-4 text-white" />
                </div>
                <div className="bg-red-500 p-1.5 rounded-md">
                  <Youtube className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Tweets vers vidéos à fort engagement</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Stratégie vidéo optimisée pour Facebook", true)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-red-600 p-1.5 rounded-md">
                  <Youtube className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-600 p-1.5 rounded-md">
                  <Facebook className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Stratégie vidéo optimisée pour Facebook</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Coordination Twitter-Facebook efficace", true)}
          >
            <CardHeader className="pb-2">
              <div className="flex space-x-2">
                <div className="bg-blue-400 p-1.5 rounded-md">
                  <Twitter className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-600 p-1.5 rounded-md">
                  <Facebook className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">Coordination Twitter-Facebook efficace</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {showForm && (
        <section id="content-form" className="mt-8 p-6 bg-[#1A1F2C] border border-white/10 rounded-lg">
          <h2 className="text-xl font-bold mb-6 text-white">
            {selectedTitle}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {isSocialMediaOnly ? (
              <div className="space-y-2">
                <label htmlFor="socialContent" className="block text-sm font-medium text-gray-300">
                  Description du contenu pour les réseaux sociaux
                </label>
                <Textarea 
                  id="socialContent"
                  placeholder="Décrivez le contenu que vous souhaitez générer pour les réseaux sociaux..."
                  className="w-full min-h-[150px] bg-[#0d1117] border-[#30363d] text-gray-200 focus-visible:ring-blue-500/40"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                  Titre
                </label>
                <Input 
                  id="title"
                  defaultValue={selectedTitle}
                  className="w-full bg-[#0d1117] border-[#30363d] text-gray-200 focus-visible:ring-blue-500/40"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="link" className="block text-sm font-medium text-gray-300">
                Lien (YouTube, site web, etc.)
              </label>
              <Input 
                id="link"
                placeholder="https://"
                className="w-full bg-[#0d1117] border-[#30363d] text-gray-200 focus-visible:ring-blue-500/40"
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit"
                className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(30,174,219,0.5)]"
              >
                Générer le contenu
              </Button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default ToolsTab;
