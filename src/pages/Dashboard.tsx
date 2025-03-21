
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import CreditDisplay from '@/components/dashboard/CreditDisplay';
import ContentGenerationCard, { getCardsByType } from '@/components/dashboard/ContentGenerationCard';
import YoutubeForm from '@/components/dashboard/YoutubeForm';
import SocialForm from '@/components/dashboard/SocialForm';
import TopicsList, { Topic } from '@/components/dashboard/TopicsList';
import ContentDisplay, { Content } from '@/components/dashboard/ContentDisplay';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

type ContentCardType = 'youtube' | 'social';
type FormStep = 'cards' | 'form' | 'topics';

// Fonction pour générer des sujets fictifs (dans une vraie application, cela viendrait d'une API)
const generateMockTopics = (count = 10): Topic[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: uuidv4(),
    title: `Sujet ${i + 1}: Titre intéressant pour un article`,
    description: `Description du sujet ${i + 1} qui explique brièvement le contenu et l'angle d'approche.`
  }));
};

// Fonction pour générer du contenu fictif (dans une vraie application, cela viendrait d'une API)
const generateMockContent = (topicId: string): Content => {
  const wordCount = Math.floor(Math.random() * 300) + 200; // Entre 200 et 500 mots
  return {
    id: uuidv4(),
    title: `Contenu généré pour le sujet ${topicId}`,
    body: `Voici un exemple de contenu généré pour le sujet ${topicId}. Dans une application réelle, ce contenu serait généré par une IA et serait pertinent par rapport au sujet sélectionné.\n\nCe paragraphe illustre comment le contenu serait formaté, avec des sauts de ligne pour une meilleure lisibilité.\n\nVous pouvez ajouter autant de paragraphes que nécessaire pour atteindre la longueur de contenu souhaitée. Le contenu généré par l'IA pourrait inclure des conseils, des analyses, des faits, etc. en fonction du type de contenu demandé.`,
    wordCount: wordCount,
    creditsUsed: wordCount // 1 crédit par mot
  };
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tools');
  const { isPremiumUser, userCredits, updateCredits } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<FormStep>('cards');
  const [selectedCardType, setSelectedCardType] = useState<ContentCardType | null>(null);
  const [sourceData, setSourceData] = useState<{ type: string, data: any } | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<Content | null>(null);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  
  // Effet pour vérifier si l'utilisateur est premium
  useEffect(() => {
    if (!isPremiumUser) {
      toast({
        title: "Crédits limités",
        description: "Vous disposez de crédits limités. Rechargez pour bénéficier de toutes les fonctionnalités premium.",
        variant: "default"
      });
    }
  }, [isPremiumUser, navigate]);
  
  // Gérer le clic sur une carte
  const handleCardClick = (type: ContentCardType) => {
    setSelectedCardType(type);
    setStep('form');
  };
  
  // Gérer le retour aux cartes
  const handleBackToCards = () => {
    setStep('cards');
    setSelectedCardType(null);
    setSourceData(null);
    setTopics([]);
    setSelectedTopics([]);
    setGeneratedContent(null);
  };
  
  // Gérer la soumission du formulaire YouTube
  const handleYoutubeSubmit = (videoId: string, videoTitle: string) => {
    setSourceData({
      type: 'youtube',
      data: { videoId, videoTitle }
    });
    setIsLoadingTopics(true);
    
    // Simuler le chargement des sujets
    setTimeout(() => {
      setTopics(generateMockTopics(15));
      setIsLoadingTopics(false);
      setStep('topics');
    }, 2000);
  };
  
  // Gérer la soumission du formulaire Social
  const handleSocialSubmit = (description: string) => {
    setSourceData({
      type: 'social',
      data: { description }
    });
    setIsLoadingTopics(true);
    
    // Simuler le chargement des sujets
    setTimeout(() => {
      setTopics(generateMockTopics(10));
      setIsLoadingTopics(false);
      setStep('topics');
    }, 2000);
  };
  
  // Gérer la sélection d'un sujet
  const handleSelectTopic = (topicId: string) => {
    setSelectedTopics((prev) => {
      const isAlreadySelected = prev.includes(topicId);
      
      if (isAlreadySelected) {
        return prev.filter(id => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
    
    // Charger le contenu lors de la première sélection ou si aucun contenu n'est chargé
    if (!generatedContent || generatedContent.id !== topicId) {
      setIsLoadingContent(true);
      
      // Simuler le chargement du contenu
      setTimeout(() => {
        const newContent = generateMockContent(topicId);
        setGeneratedContent(newContent);
        setIsLoadingContent(false);
        
        // Mettre à jour les crédits
        updateCredits(userCredits - newContent.creditsUsed);
      }, 1500);
    }
  };
  
  // Gérer l'enregistrement du contenu
  const handleSaveContent = (content: Content) => {
    // Dans une vraie application, cela enregistrerait le contenu dans une base de données
    toast({
      title: "Contenu enregistré",
      description: "Le contenu a été enregistré dans vos projets.",
    });
    
    // Rediriger vers la page des projets
    navigate('/projects');
  };
  
  // Afficher le contenu en fonction de l'étape actuelle
  const renderContent = () => {
    switch (step) {
      case 'cards':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {getCardsByType(handleCardClick)}
          </div>
        );
        
      case 'form':
        return selectedCardType === 'youtube' ? (
          <YoutubeForm onBack={handleBackToCards} onSubmit={handleYoutubeSubmit} />
        ) : (
          <SocialForm onBack={handleBackToCards} onSubmit={handleSocialSubmit} />
        );
        
      case 'topics':
        return (
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            <div className="lg:w-1/3">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setStep('form')}
                    className="mr-2"
                  >
                    Retour
                  </Button>
                  <h2 className="text-lg font-semibold">Sujets suggérés</h2>
                </div>
                <div className="text-sm text-white/60">
                  {selectedTopics.length} sélectionnés
                </div>
              </div>
              <TopicsList 
                topics={topics} 
                selectedTopics={selectedTopics} 
                onSelectTopic={handleSelectTopic}
                isLoading={isLoadingTopics}
              />
              
              {selectedTopics.length > 0 && (
                <div className="mt-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    onClick={() => navigate('/projects')}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Enregistrer les sujets sélectionnés
                  </Button>
                </div>
              )}
            </div>
            
            <div className="lg:w-2/3 bg-[#1a1d2d] rounded-lg border border-[#2a2f45] overflow-hidden relative min-h-[600px]">
              <ContentDisplay 
                content={generatedContent} 
                isLoading={isLoadingContent}
                onSave={handleSaveContent}
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Définir les breadcrumbs
  const getBreadcrumbs = () => {
    if (step === 'cards') {
      return [{ label: 'Outils' }];
    } else if (step === 'form') {
      return [
        { label: 'Outils', path: '/dashboard' },
        { label: selectedCardType === 'youtube' ? 'YouTube' : 'Réseaux Sociaux' }
      ];
    } else if (step === 'topics') {
      return [
        { label: 'Outils', path: '/dashboard' },
        { label: selectedCardType === 'youtube' ? 'YouTube' : 'Réseaux Sociaux', path: '/dashboard' },
        { label: 'Sujets' }
      ];
    }
    return [{ label: 'Outils' }];
  };

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      breadcrumbs={getBreadcrumbs()}
    >
      <div className="w-full space-y-6">
        {/* En-tête avec affichage des crédits */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tableau de bord</h1>
            <p className="text-white/60">Générez et gérez vos contenus en quelques clics</p>
          </div>
          
          <CreditDisplay />
        </div>
        
        {/* Contenu principal */}
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
