
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
      // Set the selected title and show the form
      setSelectedTitle(title);
      setIsSocialMediaOnly(isSocialMedia);
      setShowForm(true);
      // Scroll to the form
      setTimeout(() => {
        const formElement = document.getElementById('content-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
          YouTube vers ce que vous souhaitez
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Convertissez l'audience YouTube en abonnés Twitter", false)}
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
              <p className="text-sm text-gray-300">Convertissez l'audience YouTube en abonnés Twitter</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Transformez des vues YouTube en leads LinkedIn", false)}
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
              <p className="text-sm text-gray-300">Transformez des vues YouTube en leads LinkedIn</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Dirigez le trafic YouTube vers votre site web", false)}
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
              <p className="text-sm text-gray-300">Dirigez le trafic YouTube vers votre site web</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Collectez des emails depuis vos vidéos YouTube", false)}
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
              <p className="text-sm text-gray-300">Collectez des emails depuis vos vidéos YouTube</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Mail className="h-5 w-5 text-white bg-blue-500 rounded-md p-1" />
          Dynamisez votre newsletter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Convertissez des abonnés en followers Twitter", false)}
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
              <p className="text-sm text-gray-300">Convertissez des abonnés en followers Twitter</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Augmentez vos connexions LinkedIn", false)}
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
              <p className="text-sm text-gray-300">Augmentez vos connexions LinkedIn</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Twitter className="h-5 w-5 text-white bg-blue-400 rounded-md p-1" />
          Développez votre compte Twitter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Convertissez des followers en connexions pro", true)}
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
              <p className="text-sm text-gray-300">Convertissez des followers en connexions pro</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Collectez des emails depuis Twitter", true)}
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
              <p className="text-sm text-gray-300">Collectez des emails depuis Twitter</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Mail className="h-5 w-5 text-white bg-blue-500 rounded-md p-1" />
          Vendez via email
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("De l'email au follow Instagram pour plus de ventes", true)}
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
              <p className="text-sm text-gray-300">De l'email au follow Instagram pour plus de ventes</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Email automation pour convertir et vendre", true)}
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
              <p className="text-sm text-gray-300">Email automation pour convertir et vendre</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Linkedin className="h-5 w-5 text-white bg-blue-700 rounded-md p-1" />
          Brillez sur LinkedIn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Convertissez des contacts en abonnés", false)}
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
              <p className="text-sm text-gray-300">Convertissez des contacts en abonnés</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Générez du trafic qualifié vers votre site", false)}
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
              <p className="text-sm text-gray-300">Générez du trafic qualifié vers votre site</p>
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
          Shine on Social Media
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("De YouTube à Instagram en un clic", true)}
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
              <p className="text-sm text-gray-300">De YouTube à Instagram en un clic</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Transformez vos tweets en contenu vidéo", true)}
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
              <p className="text-sm text-gray-300">Transformez vos tweets en contenu vidéo</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Maximisez l'impact de vos vidéos sur Facebook", true)}
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
              <p className="text-sm text-gray-300">Maximisez l'impact de vos vidéos sur Facebook</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer"
            onClick={() => handleCardClick("Synchronisez vos campagnes Twitter et Facebook", true)}
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
              <p className="text-sm text-gray-300">Synchronisez vos campagnes Twitter et Facebook</p>
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
