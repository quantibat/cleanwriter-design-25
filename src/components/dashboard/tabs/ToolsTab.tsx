
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import FavoritableCard from '@/components/Favoris';

import { BarChart2, Calendar, ClipboardCheck, Clock, Compass, DollarSign, FileSpreadsheet, FileText, FolderOpen, GalleryHorizontalEnd, Hand, HandCoins, Handshake, Lightbulb, MessageSquare, Pen, PenTool, Ruler, Search, Send, Star } from 'lucide-react';

const ToolsTab = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (card) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((fav) => fav.title === card.title);
      return exists ? prevFavorites : [...prevFavorites, card];
    });
  };
  
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

    {
      favorites && favorites.length > 0 && 
      <section className='space-y-6'>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star size={40} />
            <h2 className="text-3xl font-bold text-white ml-2">
              Favoris
            </h2>
          </div>
          <p className="text-gray-300 text-base w-full">
            Vos actions favoris
          </p>
        </div>
        
        <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          {favorites.map((fav) => (
            <FavoritableCard
              key={fav.title}
              title={fav.title}
              description={fav.description}
              isFavorite={true}
              isComing={fav.isComing}
              onAddToFavorites={addToFavorites}
              icon={fav.icon}
              url={fav.url}
            />
          ))}
        </div>
      </section>
    }

    <section className='space-y-6'>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
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
        <FavoritableCard
          title="Veille des Appels d'Offres"
          description="Une liste ciblée d'appels d'offres adaptés à votre entreprise pour repérer en un clin d'œil les opportunités qui comptent pour vous."
          isFavorite={false}
          isComing={false}
          onAddToFavorites={addToFavorites}
          icon={<Compass size={40} />}
          url={"/offres"}
        />
        
        <FavoritableCard
          title="Analyse rapide du DCE"
          description="Un résumé clair et personnalisé des points clés et exigences techniques du DCE pour le comprendre sans y passer la journée."
          isFavorite={false}
          isComing={false}
          onAddToFavorites={addToFavorites}
          icon={<BarChart2 size={40} />}
          url={"/offres"}
        />
        
        <FavoritableCard
          title="Evaluation d'une étude"
          description="Obtenez rapidement une estimation fiable du temps et des ressources nécessaires pour répondre efficacement à l'appel d'offres."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<Clock size={40} />}
          url={"/offres"}
        />
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
        <FavoritableCard
          title="Réorganisation du DCE"
          description="Disposez immédiatement d'un dossier clair, complet et ordonné, prêt à l'emploi pour faciliter votre analyse."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<FolderOpen size={40} />}
          url={"/offres"}
        />
        
        <FavoritableCard
          title="Élaboration DPGF"
          description="Transformez simplement votre CCTP en DPGF détaillée et immédiatement chiffrable pour gagner un temps précieux."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<FileSpreadsheet size={40} />}
          url={"/offres"}
        />
        
        <FavoritableCard
          title="Analyse Technique du Lot"
          description="Identifiez directement contraintes et spécificités techniques pour adapter efficacement votre offre sans rien manquer."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<Lightbulb size={40} />}
          url={"/offres"}
        />
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
        <FavoritableCard
          title="Réalisation des Métrés"
          description="Obtenez rapidement des métrés fiables grâce à l'appui de l'intelligence artificielle et gagnez en précision."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<Ruler size={40} />}
          url={"/offres"}
        />
        
        <FavoritableCard
          title="Planning Prévisionnel"
          description="Générez simplement un planning prévisionnel réaliste, immédiatement présentable et adaptable à votre organisation."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<Calendar size={40} />}
          url={"/offres"}
        />
        
        <FavoritableCard
          title="Chiffrage"
          description="Élaborez facilement des propositions cohérentes et compétitives, avec des alertes automatiques sur les points à surveiller."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<DollarSign size={40} />}
          url={"/offres"}
        />
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
        <FavoritableCard
          title="Mémoire Technique"
          description="Obtenez en quelques clics un mémoire parfaitement adapté aux attentes du maître d'ouvrage, précis et convaincant."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<PenTool size={40} />}
          url={"/offres"}
        />
        
        <FavoritableCard
          title="Dossier Administratif"
          description="Remplissage rapide et vérifications automatiques vous assurent un dossier administratif irrprochable du premier coup."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<ClipboardCheck size={40} />}
          url={"/offres"}
        />
        
        <FavoritableCard
          title="Relecture & Dépôt de l'Offre"
          description="Dernières vérifications automatisées pour vous assurer de la cohérence et du respect complet des exigences de l'appel d'offres."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<Send size={40} />}
          url={"/offres"}
        />
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
        <FavoritableCard
          title="Complétion Pièces Administratives"
          description="Complétez sans effort les documents requis pour répondre efficacement à chaque AO et maximisez vos chances de succès."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<FileText size={40} />}
          url={"/offres"}
        />
        
        <FavoritableCard
          title="Négociation & Ajustements"
          description="Modifiez simplement votre proposition selon les retours du maître d'ouvrage et optimisez vos chances de succès."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<MessageSquare size={40} />}
          url={"/offres"}
        />
        
        <FavoritableCard
          title="Attente & Attribution"
          description="Recevez des notifications en temps réel pour démarrer immédiatement en cas de succès et tirer des conclusions rapides en cas contraire."
          isFavorite={false}
          isComing={true}
          onAddToFavorites={addToFavorites}
          icon={<Clock size={40} />}
          url={"/offres"}
        />
      </div>
    </section>
  </div>;
};

export default ToolsTab;
