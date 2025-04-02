
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { BarChart2, Calculator, Calendar, ClipboardCheck, Clock, Compass, DollarSign, FileSpreadsheet, FileText, FolderOpen, GalleryHorizontalEnd, GitGraph, Hand, HandCoins, Handshake, Heading2, Lightbulb, MessageSquare, Pen, PenTool, Ruler, Search, Send } from 'lucide-react';
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
  
  return <div className="space-y-12 w-full pb-12">
      <section className='space-y-6'>
        <div className="space-y-3">
          <div className="flex items-center gap-2\n">
            <Search size={40} />
            <h2 className="text-3xl font-bold text-white ml-2">
              Repérez vos futurs chantiers
            </h2>
          </div>
          <p className="text-gray-300 text-base w-full">
            Optimisez vos recherches, économisez du temps et de l'argent en ciblant les appels d'offres les plus pertinents.
          </p>
        </div>
        
        <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                  <Compass size={40} />
                </div>
              </div>
              <CardTitle className="text-lg">Veille des Appels d'Offres</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Une liste ciblée d'appels d'offres adaptés à votre entreprise pour repérer en un clin d'œil les opportunités qui comptent pour vous.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
          <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <BarChart2 size={40} />
                </div>
              </div>
              <CardTitle className="text-lg">Analyse rapide du DCE</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
            <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Un résumé clair et personnalisé des points clés et exigences techniques du DCE pour le comprendre sans y passer la journée.
              </p>
            </CardContent>
          </Card>

          <Card className="h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
          <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <Clock size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Evaluation d'une étude</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Obtenez rapidement une estimation fiable du temps et des ressources nécessaires pour répondre efficacement à l'appel d'offres.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className='space-y-6'>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full px-0 py-0">
              <FolderOpen size={40} />
            </div>
            <h2 className="text-3xl font-bold text-white ml-2">
              Organisez clairement vos documents
            </h2>
          </div>
          <p className="text-gray-300 text-base w-full">
            Vos documents classés, votre dossier enrichi, vos échanges simplifiés
          </p>
        </div>
        
        <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <FolderOpen size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Réorganisation du DCE</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Disposez immédiatement d'un dossier clair, complet et ordonné, prêt à l'emploi pour faciliter votre analyse.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                 <FileSpreadsheet size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Élaboration DPGF</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Transformez simplement votre CCTP en DPGF détaillée et immédiatement chiffrable pour gagner un temps précieux.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <Lightbulb size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Analyse Technique du Lot</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Identifiez directement contraintes et spécificités techniques pour adapter efficacement votre offre sans rien manquer.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className='space-y-6'>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full px-0 py-0">
              <GalleryHorizontalEnd size={40} />
            </div>
            <h2 className="text-3xl font-bold text-white ml-2">
              Affinez précisément vos quantités, coûts et plannings
            </h2>
          </div>
          <p className="text-gray-300 text-base max-w-3xl">
            Des métrés fiables, des chiffrages précis, des plannings réalistes
          </p>
        </div>
        
        <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <Ruler size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Réalisation des Métrés</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Obtenez rapidement des métrés fiables grâce à l'appui de l'intelligence artificielle et gagnez en précision.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <Calendar size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Planning Prévisionnel</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Générez simplement un planning prévisionnel réaliste, immédiatement présentable et adaptable à votre organisation.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <DollarSign size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Chiffrage</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Élaborez facilement des propositions cohérentes et compétitives, avec des alertes automatiques sur les points à surveiller.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className='space-y-6'>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full py-0 px-0">
              <Pen size={40} />
            </div>
            <h2 className="text-3xl font-bold text-white ml-2">
              Formalisez une offre percutante
            </h2>
          </div>
          <p className="text-gray-300 text-base w-full">
            Votre mémoire technique sur-mesure, votre administratif simplifié
          </p>
        </div>
        
        <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <PenTool size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Mémoire Technique</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Obtenez en quelques clics un mémoire parfaitement adapté aux attentes du maître d'ouvrage, précis et convaincant.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <ClipboardCheck size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Dossier Administratif</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Remplissage rapide et vérifications automatiques vous assurent un dossier administratif irrprochable du premier coup.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <Send size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Relecture & Dépôt de l'Offre</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Dernières vérifications automatisées pour vous assurer de la cohérence et du respect complet des exigences de l'appel d'offres.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className='space-y-6'>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full px-0 py-0">
              <Handshake size={40} />
            </div>
            <h2 className="text-3xl font-bold text-white ml-2">
              Concluez efficacement pour remporter vos marchés
            </h2>
          </div>
          <p className="text-gray-300 text-base max-w-3xl">
            Finalisez avec confiance, ajustez avec facilité, décrochez sereinement
          </p>
        </div>
        
        <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <FileText size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Complétion Pièces Administratives</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Complétez sans effort les documents requis pour répondre efficacement à chaque AO et maximisez vos chances de succès.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <MessageSquare size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Négociation & Ajustements</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Modifiez simplement votre proposition selon les retours du maître d'ouvrage et optimisez vos chances de succès.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer h-[16rem]  group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454] " onClick={() => handleCardClick("Veille des Appels d'Offres", false)}>
            <CardHeader className="pb-3 relative">
              <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
                <div className="text-neon-blue">
                <Clock size={40} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">Attente & Attribution</CardTitle>
            </CardHeader>
            <CardContent className='text-gray-300'>
              <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">
                Recevez des notifications en temps réel pour démarrer immédiatement en cas de succès et tirer des conclusions rapides en cas contraire.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>;
};
export default ToolsTab;
