
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const ToolsTab = () => {
  const {
    isPremiumUser
  } = useAuth();
  const navigate = useNavigate();
  
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
  
  return <div className="space-y-24 w-full pb-12">
      <section className='space-y-8'>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-white">
          🔍 Repérez vos futurs chantiers 
          </h2>
          <div className="items-center">
            <p className="text-sm text-gray-300">
              Gagnez du temps en ciblant les appels d'offres les plus pertinents.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md" onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex space-x-2 items-center">
                <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                  <span className='text-xl'>🔎</span>
                </div>
                <strong className='text-lg font-bold text-blue-100'>Veille des Appels d'Offres</strong>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Trouvez directement les AO faits pour vous</p>
              <p className="text-sm text-gray-300">Recevez une liste ciblée et actualisée des AO correspondant à votre activité, votre zone géographique et vos spécialités.</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md" onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex space-x-2 items-center">
                <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                  <span className='text-xl'>🧐</span>
                </div>
                <strong className='text-lg font-bold text-blue-100'>Analyse du DCE</strong>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Identifiez l'essentiel du lot sans perdre de temps</p>
              <p className="text-sm text-gray-300">
              Visualisez immédiatement les points clés et les exigences techniques pour décider rapidement et sereinement.</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>⏳</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Estimation de l'Effort d'Étude</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Obtenez rapidement une estimation fiable du temps et des ressources nécessaires</p>
              <p className="text-sm text-gray-300">Identifiez l'essentiel du lot sans perdre de temps</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className='space-y-8'>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-white">
          📂 Organisez clairement vos documents et appuyez-vous sur un suivi efficace
          </h2>
          <div className="items-center">
            <p className="text-sm text-gray-300">
            Vos documents classés, votre dossier enrichi, vos échanges simplifiés
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>🗂️</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Réorganisation du DCE</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Classez votre DCE automatiquement</p>
              <p className="text-sm text-gray-300">Disposez immédiatement d'un dossier clair, complet et ordonné, prêt à l'emploi.</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>📑</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Élaboration DPGF</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Créez une DPGF claire et prête à l'usage</p>
              <p className="text-sm text-gray-300">
              Transformez simplement votre CCTP en DPGF détaillée et immédiatement chiffrable.</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>💡</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Analyse Technique du Lot</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Repérez les points techniques essentiels en un instant</p>
              <p className="text-sm text-gray-300">Identifiez directement contraintes et spécificités techniques pour adapter efficacement votre offre.</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>🤝</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Consultation Fournisseurs</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Préparez facilement vos consultations</p>
              <p className="text-sm text-gray-300">Accédez immédiatement aux informations techniques nécessaires pour solliciter rapidement vos fournisseurs et sous-traitants.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className='space-y-8'>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-white">
          💹 Affinez précisément vos quantités, coûts et plannings
          </h2>
          <div className="items-center">
            <p className="text-sm text-gray-300">
            Des métrés fiables, des chiffrages précis, des plannings réalistes
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>📏</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Réalisation des Métrés</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Quantifiez précisément, sans effort</p>
              <p className="text-sm text-gray-300">Obtenez rapidement des métrés fiables grâce à l'appui de l'intelligence artificielle.</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>📅</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Planning Prévisionnel</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Établissez un planning clair en quelques clics</p>
              <p className="text-sm text-gray-300">
              Générez simplement un planning prévisionnel réaliste, immédiatement présentable et adaptable.</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>💲</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Chiffrage</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Chiffrez rapidement en toute confiance</p>
              <p className="text-sm text-gray-300">Élaborez facilement des propositions cohérentes et compétitives, avec des alertes automatiques sur les points à surveiller.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className='space-y-8'>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-white">
          ✒️ Formalisez une offre percutante
          </h2>
          <div className="items-center">
            <p className="text-sm text-gray-300">
            Votre mémoire technique sur-mesure, votre administratif simplifié
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>🖋️</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Mémoire Technique</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Rédigez un mémoire qui séduit immédiatement</p>
              <p className="text-sm text-gray-300">Obtenez en quelques clics un mémoire parfaitement adapté aux attentes du maître d'ouvrage, précis et convaincant</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>✅</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Dossier Administratif</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Constituez facilement un dossier impeccable</p>
              <p className="text-sm text-gray-300">
              Remplissage rapide et vérifications automatiques vous assurent un dossier administratif irréprochable du premier coup.</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>📬</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Relecture & Dépôt de l'Offre</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Déposez une offre irréprochable sereinement</p>
              <p className="text-sm text-gray-300">Dernières vérifications automatisées pour vous assurer de la cohérence et du respect complet des exigences.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className='space-y-8'>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-white">
          🤲 Concluez efficacement pour remporter vos marchés
          </h2>
          <div className="items-center">
            <p className="text-sm text-gray-300">
            Finalisez avec confiance, ajustez avec facilité, décrochez sereinement
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>📑</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Complétion Pièces Administratives</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Préparez instantanément vos pièces administratives</p>
              <p className="text-sm text-gray-300">Complétez sans effort les documents requis pour répondre efficacement à chaque AO.</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>💬</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Négociation & Ajustements</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Ajustez rapidement votre offre après remise</p>
              <p className="text-sm text-gray-300">
              Modifiez simplement votre proposition selon les retours du maître d'ouvrage et optimisez vos chances de succès.</p>
            </CardContent>
          </Card>
          <Card className="rounded-sm bg-[#1A1F2C] border-white/5 hover:bg-[#232836] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="p-2 rounded-full bg-blue-500/20 flex-shrink-0">
                    <span className='text-xl'>⌛</span>
                  </div>
                  <strong className='text-lg font-bold text-blue-100'>Attente & Attribution</strong>
                </div>
                <Badge variant="coming" className="ml-2">A venir</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4 w-full p-4'>
              <p className='font-bold text-sm text-blue-300'>Soyez prêt dès l'attribution</p>
              <p className="text-sm text-gray-300">Recevez des notifications en temps réel pour démarrer immédiatement en cas de succès et tirer des conclusions rapides en cas contraire.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>;
};

export default ToolsTab;
