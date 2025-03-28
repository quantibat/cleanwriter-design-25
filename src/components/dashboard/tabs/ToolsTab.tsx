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
      <section className='gap-4'>
        <h2 className="text-3xl font-bold flex items-center gap-2 text-white mb-3">
        🔍 Repérez vos futurs chantiers 
        </h2>
        <div className="col-start-auto items-center mb-3">
          <p className="text-sm text-gray-300">
            Gagnez du temps en ciblant les appels d’offres les plus pertinents.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer  space-y-4"
            onClick={() => handleCardClick("Veille des Appels d’Offres", false)}
          >
            <CardHeader className="pb-2 w-full">
              <div className="flex space-x-2">
                <strong className='text-lg'>🔎 Veille des Appels d'Offres</strong>
              </div>
            </CardHeader>
            <CardContent className='space-y-2 w-full'>
              <p className='font-bold text-sm '>Trouvez directement les AO faits pour vous</p>
              <p className="text-sm text-gray-300">Recevez une liste ciblée et actualisée des AO correspondant à votre activité, votre zone géographique et vos spécialités.</p>
            </CardContent>
          </Card>
          <Card 
            className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer  space-y-4"
            onClick={() => handleCardClick("Veille des Appels d’Offres", false)}
          >
            <CardHeader className="pb-2 w-full">
              <div className="flex space-x-2">
                <strong className='text-lg'>🧐 Analyse du DCE
                </strong>
              </div>
            </CardHeader>
            <CardContent className='space-y-2 w-full'>
              <p className='font-bold text-sm '>Identifiez l’essentiel du lot sans perdre de temps</p>
              <p className="text-sm text-gray-300">
              Visualisez immédiatement les points clés et les exigences techniques pour décider rapidement et sereinement.</p>
            </CardContent>
          </Card>
          <Card 
            className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer  space-y-4"
            onClick={() => handleCardClick("Veille des Appels d’Offres", false)}
          >
            <CardHeader className="pb-2 w-full">
              <div className="flex space-x-2">
                <strong className='text-lg'>⏳ Estimation de l’Effort d’Étude
                </strong>
              </div>
            </CardHeader>
            <CardContent className='space-y-2 w-full'>
              <p className='font-bold text-sm'> Obtenez rapidement une estimation fiable du temps et des ressources nécessaires pour répondre efficacement</p>
              <p className="text-sm text-gray-300">Identifiez l’essentiel du lot sans perdre de temps</p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className='gap-4'>
        <h2 className="text-3xl font-bold flex items-center gap-2 text-white mb-3">
        📂 Organisez clairement vos documents et appuyez-vous sur un suivi efficace
        </h2>
        <div className="col-start-auto items-center mb-3">
          <p className="text-sm text-gray-300">
          Vos documents classés, votre dossier enrichi, vos échanges simplifiés
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer  space-y-4"
            onClick={() => handleCardClick("Veille des Appels d’Offres", false)}
          >
            <CardHeader className="pb-2 w-full">
              <div className="flex space-x-2">
                <strong className='text-lg'>🗂️ Réorganisation du DCE</strong>
              </div>
            </CardHeader>
            <CardContent className='space-y-2 w-full'>
              <p className='font-bold text-sm '>Classez votre DCE automatiquement</p>
              <p className="text-sm text-gray-300">Disposez immédiatement d’un dossier clair, complet et ordonné, prêt à l'emploi.</p>
            </CardContent>
          </Card>
          <Card 
            className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer  space-y-4"
            onClick={() => handleCardClick("Veille des Appels d’Offres", false)}
          >
            <CardHeader className="pb-2 w-full">
              <div className="flex space-x-2">
                <strong className='text-lg'>📑 Élaboration DPGF
                </strong>
              </div>
            </CardHeader>
            <CardContent className='space-y-2 w-full'>
              <p className='font-bold text-sm '>Créez une DPGF claire et prête à l’usage</p>
              <p className="text-sm text-gray-300">
              Transformez simplement votre CCTP en DPGF détaillée et immédiatement chiffrable.</p>
            </CardContent>
          </Card>
          <Card 
            className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer  space-y-4"
            onClick={() => handleCardClick("Veille des Appels d’Offres", false)}
          >
            <CardHeader className="pb-2 w-full">
              <div className="flex space-x-2">
                <strong className='text-lg'>💡 Analyse Technique du Lot
                </strong>
              </div>
            </CardHeader>
            <CardContent className='space-y-2 w-full'>
              <p className='font-bold text-sm'>Repérez les points techniques essentiels en un instant</p>
              <p className="text-sm text-gray-300">Identifiez directement contraintes et spécificités techniques pour adapter efficacement votre offre.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ToolsTab;

