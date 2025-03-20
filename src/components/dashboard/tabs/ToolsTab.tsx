import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderPlus, ArrowRight, Youtube, Twitter, Linkedin, Mail, Globe, Facebook, Instagram } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
const ToolsTab = () => {
  const {
    isPremiumUser
  } = useAuth();
  const navigate = useNavigate();
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
  return <div className="space-y-12 w-full">
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Youtube className="h-5 w-5 text-white bg-red-600 rounded-md p-1" />
          YouTube vers ce que vous souhaitez
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <FolderPlus className="h-5 w-5 text-white bg-blue-500 rounded-md p-1" />
          Création de projets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Globe className="h-5 w-5 text-white bg-blue-500 rounded-md p-1" />
          Shine on Social Media
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
          
          <Card className="bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors">
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
    </div>;
};
export default ToolsTab;