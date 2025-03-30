import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  
  return <div className="space-y-16 w-full pb-12">
      <section className='space-y-6'>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-blue-400/20 p-2 rounded-full">
              <span className="text-2xl">🔍</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              Repérez vos futurs chantiers
            </h2>
          </div>
          <p className="text-gray-300 text-base max-w-3xl">
            Optimisez vos recherches, économisez du temps et de l'argent en ciblant les appels d'offres les plus pertinents.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card 
            className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md" 
            onClick={() => handleCardClick("Veille des Appels d'Offres", false)}
          >
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <img src="/lovable-uploads/5ae1f930-740e-4eee-874a-ce2949a7c012.png" alt="Detective" className="w-14 h-14" />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="new">New</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Veille des Appels d'Offres</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Une liste ciblée d'appels d'offres adaptés à votre entreprise pour repérer en un clin d'œil les opportunités qui comptent pour vous.
              </p>
            </CardContent>
          </Card>

          <Card 
            className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md" 
            onClick={() => handleCardClick("Analyse du DCE", false)}
          >
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">🧐</span>
                </div>
              </div>
              <CardTitle className="text-xl">Analyse rapide du DCE</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Un résumé clair et personnalisé des points clés et exigences techniques du DCE pour le comprendre sans y passer la journée.
              </p>
            </CardContent>
          </Card>

          <Card 
            className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md"
          >
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">⏳</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Estimation de l'Effort d'Étude</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Obtenez rapidement une estimation fiable du temps et des ressources nécessaires pour répondre efficacement à l'appel d'offres.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className='space-y-6'>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-blue-400/20 p-2 rounded-full">
              <span className="text-2xl">📂</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              Organisez clairement vos documents
            </h2>
          </div>
          <p className="text-gray-300 text-base max-w-3xl">
            Vos documents classés, votre dossier enrichi, vos échanges simplifiés
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">🗂️</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Réorganisation du DCE</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Disposez immédiatement d'un dossier clair, complet et ordonné, prêt à l'emploi pour faciliter votre analyse.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">📑</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Élaboration DPGF</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Transformez simplement votre CCTP en DPGF détaillée et immédiatement chiffrable pour gagner un temps précieux.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">💡</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Analyse Technique du Lot</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Identifiez directement contraintes et spécificités techniques pour adapter efficacement votre offre sans rien manquer.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className='space-y-6'>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-blue-400/20 p-2 rounded-full">
              <span className="text-2xl">💹</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              Affinez précisément vos quantités, coûts et plannings
            </h2>
          </div>
          <p className="text-gray-300 text-base max-w-3xl">
            Des métrés fiables, des chiffrages précis, des plannings réalistes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">📏</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Réalisation des Métrés</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Obtenez rapidement des métrés fiables grâce à l'appui de l'intelligence artificielle et gagnez en précision.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">📅</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Planning Prévisionnel</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Générez simplement un planning prévisionnel réaliste, immédiatement présentable et adaptable à votre organisation.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">💲</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Chiffrage</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Élaborez facilement des propositions cohérentes et compétitives, avec des alertes automatiques sur les points à surveiller.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className='space-y-6'>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-blue-400/20 p-2 rounded-full">
              <span className="text-2xl">✒️</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              Formalisez une offre percutante
            </h2>
          </div>
          <p className="text-gray-300 text-base max-w-3xl">
            Votre mémoire technique sur-mesure, votre administratif simplifié
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">🖋️</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Mémoire Technique</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Obtenez en quelques clics un mémoire parfaitement adapté aux attentes du maître d'ouvrage, précis et convaincant.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">✅</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Dossier Administratif</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Remplissage rapide et vérifications automatiques vous assurent un dossier administratif irr��prochable du premier coup.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">📬</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Relecture & Dépôt de l'Offre</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Dernières vérifications automatisées pour vous assurer de la cohérence et du respect complet des exigences de l'appel d'offres.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className='space-y-6'>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-blue-400/20 p-2 rounded-full">
              <span className="text-2xl">🤲</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              Concluez efficacement pour remporter vos marchés
            </h2>
          </div>
          <p className="text-gray-300 text-base max-w-3xl">
            Finalisez avec confiance, ajustez avec facilité, décrochez sereinement
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">📑</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Complétion Pièces Administratives</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Complétez sans effort les documents requis pour répondre efficacement à chaque AO et maximisez vos chances de succès.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">💬</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Négociation & Ajustements</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Modifiez simplement votre proposition selon les retours du maître d'ouvrage et optimisez vos chances de succès.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-lg bg-[#2C3C53] border-none text-white hover:bg-[#344562] transition-colors cursor-pointer shadow-md">
            <CardHeader className="pb-3 relative">
              <div className="flex items-start mb-4">
                <div className="mr-2">
                  <span className="text-5xl">⌛</span>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="coming">A venir</Badge>
                </div>
              </div>
              <CardTitle className="text-xl">Attente & Attribution</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-gray-300'>
              <p className="text-sm">
                Recevez des notifications en temps réel pour démarrer immédiatement en cas de succès et tirer des conclusions rapides en cas contraire.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>;
};

export default ToolsTab;
