import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Sparkles, Youtube, FileText, CheckCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TopicsList from '@/components/youtube-newsletter/TopicsList';
import ContentDisplay from '@/components/youtube-newsletter/ContentDisplay';
import { useNotificationsManager } from '@/hooks/useNotificationsManager';
import { Textarea } from "@/components/ui/textarea";
import { createProject, extractYoutubeInfo, ProjectFormData } from '@/services/projectsService';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const MOCK_CONTENT = {
  '1': {
    subject: 'La clé des vidéos virales : êtes-vous prêt ? ✨ 🚀',
    body: `**Objet : Découvrez la clé du succès cachée derrière l'écran**

Bonjour,

Savez-vous ce qui se cache vraiment derrière une vidéo virale ?

Imaginez un jongleur qui garde en l'air quatre balles : charisme, humour, ambition, et culture.

Ces quatre compétences sont essentielles pour captiver et maintenir l'intérêt.

Un peu comme un chef d'orchestre qui dirige une symphonie, chaque élément doit être parfaitement accordé.

Prenons l'exemple de l'argent.

Il ne suffit pas d'en avoir pour être heureux.

Un millionnaire sans amour ni passion est comme un arbre sans feuilles.

Les relations, elles aussi, nécessitent une attention constante.

Comme un jardin qui doit être entretenu pour fleurir.

Et si vous pensez que la richesse garantit le bonheur, détrompez-vous.

C'est comme croire qu'une belle couverture rend un livre intéressant.

Enfin, l'authenticité est votre meilleur allié.

Dans un monde où les façades sont légion, être vrai est un acte de liberté et de sagesse.

Souvenez-vous que la richesse véritable se mesure à la qualité de vos relations, à votre capacité à vivre selon vos valeurs et à la paix intérieure que vous cultivez jour après jour.

À méditer.

Bien à vous,

[Votre Nom]`
  },
  '2': {
    subject: 'Les 4 piliers du succès sur YouTube révélés',
    body: `Chers créateurs de contenu,

Si vous avez déjà tenté l'aventure YouTube, vous savez que le succès ne vient pas du jour au lendemain. Au-delà des vues et des likes, quatre piliers fondamentaux soutiennent toute carrière réussie sur la plateforme.

Le premier pilier est indéniablement le contenu de qualité. Un contenu qui informe, divertit ou inspire votre audience. C'est la fondation sur laquelle tout le reste s'appuie.

Le deuxième pilier est la régularité. Publier de façon constante est essentiel pour maintenir l'engagement de votre communauté et favoriser la croissance de votre chaîne.

Le troisième pilier est l'authenticité. Dans un océan de créateurs qui essaient d'imiter les tendances, votre voix unique est votre atout le plus précieux.

Enfin, le quatrième pilier est l'adaptabilité. Les algorithmes changent, les tendances évoluent, et seuls ceux qui savent s'adapter pourront maintenir leur pertinence sur le long terme.

J'espère que ces insights vous aideront dans votre parcours de créateur.

À votre succès !`
  },
  '3': {
    subject: 'Au-delà de l\'argent : les vraies clés du bonheur',
    body: `Cher lecteur,

Dans notre société actuelle, le succès est souvent mesuré à l'aune de la richesse matérielle. Pourtant, derrière les façades luxueuses se cachent parfois des vies dénuées de sens.

L'argent, aussi important soit-il pour assurer notre confort, n'est qu'un outil. Un outil qui peut nous offrir des opportunités, mais qui ne garantit en rien l'épanouissement personnel.

Les relations authentiques, qu'elles soient familiales, amicales ou amoureuses, constituent le véritable terreau dans lequel s'enracine notre bonheur. Ces connexions humaines nécessitent du temps, de l'attention et de la sincérité pour s'épanouir.

La passion et le sens sont également des composantes essentielles d'une vie accomplie. Trouver ce qui nous anime et y consacrer notre énergie nous permet de nous sentir vivants et utiles.

Enfin, l'authenticité est peut-être la qualité la plus précieuse. Dans un monde où les apparences règnent en maître, avoir le courage d'être soi-même est un acte de liberté et de sagesse.

Souvenez-vous que la richesse véritable se mesure à la qualité de vos relations, à votre capacité à vivre selon vos valeurs et à la paix intérieure que vous cultivez jour après jour.

À méditer, n'est-ce pas ?

Cordialement,`
  }
};

type FormData = {
  title: string;
  youtubeLink: string;
  option: string;
  language: string;
  aiModel: string;
};

const CreateDCE = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [generatingTopics, setGeneratingTopics] = useState(false);
  const [generatingContent, setGeneratingContent] = useState(false);
  const [topics, setTopics] = useState<any[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [activeContent, setActiveContent] = useState<{
    subject: string;
    body: string;
  } | null>(null);
  const [selectedContents, setSelectedContents] = useState<any[]>([]);
  const [generatedContents, setGeneratedContents] = useState<any[]>([]);
  const { toast } = useToast();
  const { notifySuccess } = useNotificationsManager();
  const [isSocialMediaOnly, setIsSocialMediaOnly] = useState(false);
  const [title, setTitle] = useState("Untitled Youtube to Newsletter");
  const [cardTitle, setCardTitle] = useState("Ma sélection de cartes");
  
  const [videoMetadata, setVideoMetadata] = useState<any>(null);
  const [isValidYoutubeLink, setIsValidYoutubeLink] = useState(false);
  const [youtubeInfo, setYoutubeInfo] = useState<any>(null);
  const [fetchingMetadata, setFetchingMetadata] = useState(false);
  
  const form = useForm<FormData>({
    defaultValues: {
      title: 'Untitled Youtube to Newsletter',
      youtubeLink: '',
      option: '',
      language: 'french',
      aiModel: 'gpt-4o'
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const titleParam = params.get('title');
    const isSocialMediaParam = params.get('isSocialMedia');
    if (titleParam) {
      setTitle(titleParam);
      form.setValue('title', titleParam);
    }
    if (isSocialMediaParam) {
      setIsSocialMediaOnly(isSocialMediaParam === 'true');
    }
  }, [location.search, form]);

  const totalCredits = 30000;
  const [usedCredits, setUsedCredits] = useState(0);
  const remainingCredits = totalCredits - usedCredits;
  const percentUsed = Math.round(usedCredits / totalCredits * 100);

  const handleYoutubeLinkChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    form.setValue('youtubeLink', link);
    
    if (!link) {
      setIsValidYoutubeLink(false);
      setVideoMetadata(null);
      setYoutubeInfo(null);
      return;
    }
    
    setFetchingMetadata(true);
    try {
      const info = await extractYoutubeInfo(link);
      setYoutubeInfo(info);
      
      if (info) {
        setIsValidYoutubeLink(true);
        setVideoMetadata({
          title: info.title,
          channel: info.channel,
          views: info.views,
          duration: info.duration
        });
      } else {
        setIsValidYoutubeLink(false);
        setVideoMetadata(null);
      }
    } catch (error) {
      console.error("Error extracting YouTube info:", error);
      setIsValidYoutubeLink(false);
    } finally {
      setFetchingMetadata(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    form.setValue('title', newTitle);
  };

  const handleCardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(e.target.value);
  };

  const generateTopics = async () => {
    if (!isValidYoutubeLink) {
      toast({
        title: "Lien YouTube invalide",
        description: "Veuillez entrer un lien YouTube valide pour générer des sujets",
        variant: "destructive"
      });
      return;
    }
    setGeneratingTopics(true);
    try {
      const formData = form.getValues();

      const {
        data,
        error
      } = await supabase.functions.invoke('generate-topics', {
        body: {
          youtubeLink: formData.youtubeLink,
          option: formData.option,
          language: formData.language,
          isSocialMediaOnly: isSocialMediaOnly,
          title: title
        }
      });
      if (error) {
        throw new Error(error.message);
      }

      if (data && data.topics && Array.isArray(data.topics)) {
        setTopics(data.topics);
        const wordCount = data.topics.reduce((count: number, topic: any) => count + (topic.title?.length || 0) + (topic.description?.length || 0), 0);
        setUsedCredits(prev => prev + wordCount);
        
        if (data.contents && Array.isArray(data.contents)) {
          const typedContents = data.contents.map((content: any) => ({
            topicId: content.topicId,
            subject: content.subject,
            body: content.body
          }));
          setGeneratedContents(typedContents);
        }
        
        notifySuccess('Sujets générés', `${data.topics.length} sujets ont été générés avec succès à partir de la vidéo YouTube.`);
      } else {
        throw new Error("Format de réponse inattendu");
      }
    } catch (err: any) {
      console.error("Error generating topics:", err);
      toast({
        title: "Erreur de génération",
        description: err.message || "Une erreur est survenue lors de la génération des sujets",
        variant: "destructive"
      });
    } finally {
      setGeneratingTopics(false);
    }
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicId)) {
        setSelectedContents(prevContents => prevContents.filter(content => content.topicId !== topicId));
        return prev.filter(id => id !== topicId);
      }
      
      setGeneratingContent(true);
      const wordCount = 500;
      setUsedCredits(prev => prev + wordCount);
      
      setTimeout(() => {
        const content = MOCK_CONTENT[topicId as keyof typeof MOCK_CONTENT];
        if (content) {
          setSelectedContents(prevContents => [
            ...prevContents, 
            {
              topicId: topicId,
              subject: content.subject,
              body: content.body
            }
          ]);
        }
        setGeneratingContent(false);
      }, 1000);
      
      return [...prev, topicId];
    });
  };

  const breadcrumbs = [{
    label: 'Projets',
    path: '/projects'
  }, {
    label: 'Youtube to Newsletter',
    path: '/youtube-to-newsletter'
  }, {
    label: title
  }];

  const handleSubmit = async (data: ProjectFormData) => {
    if (!isValidYoutubeLink) {
      toast({
        title: "Lien YouTube invalide",
        description: "Veuillez entrer un lien YouTube valide",
        variant: "destructive"
      });
      return;
    }

    if (topics.length === 0) {
      setGeneratingTopics(true);
      try {
        await generateTopics();
      } catch (error) {
        console.error("Error generating topics:", error);
        setGeneratingTopics(false);
        return;
      }
    }
    try {
      setIsLoading(true);
      const projectData = {
        title: title,
        youtubeLink: data.youtubeLink,
        option: data.option,
        language: data.language,
        aiModel: data.aiModel,
        cardTitle: cardTitle,
        isSocialMediaOnly: isSocialMediaOnly,
        topics: topics,
        selectedTopics: selectedTopics,
        activeContent: activeContent,
        generatedContents: selectedContents.length > 0 ? selectedContents : generatedContents,
        videoMetadata: videoMetadata,
        usedCredits: usedCredits,
        progress: 10,
        elements: topics.length
      };
      
      console.log("Saving project with generated contents:", projectData.generatedContents);
      const project = await createProject(projectData);
      
      if (project) {
        notifySuccess('Projet créé', 'Votre projet a été créé avec succès et les sujets ont été générés.');

        navigate(`/edit-project/${project.id}`, {
          state: {
            project: {
              id: project.id,
              title: project.title,
              type: project.option_type || 'Youtube to Newsletter',
              elements: project.elements,
              description: project.card_title,
              date: new Date(project.created_at).toLocaleDateString('fr-FR'),
              lastModified: 'Aujourd\'hui',
              progress: project.progress,
              collaborators: 1,
              details: `Projet basé sur la vidéo YouTube: ${project.youtube_link || 'Non spécifié'}`
            }
          }
        });
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du projet",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = () => {
    navigate('/upgrade-plan');
  };

  return (
    <DashboardLayout breadcrumbs={breadcrumbs} activeTab="projects">
      <div className="min-h-screen bg-[#0c101b]">
        <main className="w-full">
          <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-150px)]">
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full p-6 overflow-auto border-2 rounded-xl">
                <div className="mb-6">
                  {isSocialMediaOnly ? <Textarea placeholder="Description du contenu pour les réseaux sociaux..." className="min-h-[100px] bg-[#0d1117] border-[#30363d] text-gray-200 focus-visible:ring-blue-500/40" value={title} onChange={e => setTitle(e.target.value)} /> : <Input type="text" value={title} onChange={handleTitleChange} className="text-xl font-medium border-none bg-transparent text-white p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0" />}
                </div>
                
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Titre de la sélection</label>
                  <Input type="text" value={cardTitle} onChange={handleCardTitleChange} className="w-full py-2 bg-[#171a2e] border border-[#2a2f45] text-gray-200 rounded-md focus-visible:ring-blue-500/40" placeholder="Entrez le titre de votre sélection de cartes" />
                </div>
                
                {topics.length === 0 ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Lien de la vidéo Youtube</label>
                      <div className="relative">
                        <Input 
                          type="text" 
                          placeholder="Paste a youtube video link here" 
                          className="pl-10 py-5 bg-[#171a2e] border border-[#2a2f45] text-gray-200 rounded-md focus-visible:ring-blue-500/40" 
                          onChange={handleYoutubeLinkChange} 
                          value={form.watch('youtubeLink')} 
                        />
                        <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                        {isValidYoutubeLink && !fetchingMetadata && (
                          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
                        )}
                        {fetchingMetadata && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {isValidYoutubeLink && youtubeInfo && (
                      <div className="bg-[#171a2e] border border-[#2a2f45] rounded-md p-3 flex gap-3">
                        <div className="relative w-24 h-16 flex-shrink-0 bg-black rounded overflow-hidden">
                          <img 
                            src={youtubeInfo.thumbnailUrl} 
                            alt="Video thumbnail" 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                            {videoMetadata?.duration || "00:00"}
                          </div>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                          <div>
                            <h3 className="text-sm font-medium text-white line-clamp-2">
                              {videoMetadata?.title || "Loading title..."}
                            </h3>
                            <p className="text-xs text-gray-400">
                              {videoMetadata?.channel || "Loading channel..."}
                            </p>
                          </div>
                          <div className="text-xs text-gray-500">
                            {videoMetadata?.views || "Views unavailable"}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Option</label>
                      <div>
                        <Select onValueChange={value => form.setValue('option', value)}>
                          <SelectTrigger className="py-5 bg-[#171a2e] border border-[#2a2f45] text-gray-200 rounded-md focus-visible:ring-blue-500/40">
                            <SelectValue placeholder="Aucune option sélectionnée" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#171a2e] border border-[#2a2f45] text-gray-200">
                            <SelectItem value="summary">Résumé</SelectItem>
                            <SelectItem value="transcript">Transcription</SelectItem>
                            <SelectItem value="newsletter">Newsletter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Langue de sortie</label>
                      <div>
                        <Select defaultValue="french" onValueChange={value => form.setValue('language', value)}>
                          <SelectTrigger className="py-5 bg-[#171a2e] border border-[#2a2f45] text-gray-200 rounded-md focus-visible:ring-blue-500/40">
                            <div className="flex items-center space-x-2">
                              <span className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-blue-100">
                                <span className="text-xs">🇫🇷</span>
                              </span>
                              <SelectValue />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="bg-[#171a2e] border border-[#2a2f45] text-gray-200">
                            <SelectItem value="french">Français Formel (vous)</SelectItem>
                            <SelectItem value="french_informal">Français Informel (tu)</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Español</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Modèle d'IA</label>
                      <div>
                        <Select defaultValue="gpt-4o" onValueChange={value => form.setValue('aiModel', value)}>
                          <SelectTrigger className="py-5 bg-[#171a2e] border border-[#2a2f45] text-gray-200 rounded-md focus-visible:ring-blue-500/40">
                            <div className="flex items-center gap-2">
                              <span className="bg-purple-200 text-purple-800 text-xs py-0.5 px-2 rounded-full">Qualité</span>
                              <SelectValue />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="bg-[#171a2e] border border-[#2a2f45] text-gray-200">
                            <SelectItem value="gpt-4o">
                              <div className="flex items-center gap-2">
                                <span className="bg-purple-200 text-purple-800 text-xs py-0.5 px-2 rounded-full">Qualité</span>
                                <span>GPT-4o</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="button" 
                        className="w-full py-6 bg-[#0099ff] hover:bg-[#0088ee] text-white flex items-center justify-center rounded-md" 
                        onClick={() => generateTopics()} 
                        disabled={generatingTopics || !isValidYoutubeLink || isLoading}
                      >
                        {generatingTopics || isLoading ? (
                          <>Génération en cours...</>
                        ) : (
                          <>
                            <Sparkles size={18} className="mr-2" />
                            Générez une newsletter
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-[#171a2e] border border-[#2a2f45] rounded-md p-3 flex gap-3 mb-4">
                      <div className="relative w-24 h-16 flex-shrink-0 bg-black rounded overflow-hidden">
                        <img 
                          src={youtubeInfo?.thumbnailUrl || "https://i.ytimg.com/vi/XLnGAzg2MuA/hqdefault.jpg"} 
                          alt="Video thumbnail" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {videoMetadata?.duration || "00:00"}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium text-white line-clamp-2">
                          {videoMetadata?.title || "Video Title Unavailable"}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {videoMetadata?.channel || "Channel Unavailable"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {videoMetadata?.views || "Views unavailable"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-medium">{cardTitle}</h3>
                      <span className="text-sm text-gray-400">{selectedTopics.length} sélectionné(s)</span>
                    </div>
                    
                    <TopicsList topics={topics} selectedTopics={selectedTopics} onSelectTopic={handleSelectTopic} isLoading={generatingTopics} />
                    
                    <Button className="w-full py-6 bg-[#0099ff] hover:bg-[#0088ee] text-white flex items-center justify-center rounded-md mt-4" onClick={async () => {
                      setIsLoading(true);
                      try {
                        const projectData = {
                          title: title,
                          youtubeLink: form.getValues().youtubeLink,
                          option: form.getValues().option,
                          language: form.getValues().language,
                          aiModel: form.getValues().aiModel,
                          cardTitle: cardTitle,
                          isSocialMediaOnly: isSocialMediaOnly,
                          topics: topics,
                          selectedTopics: selectedTopics,
                          activeContent: activeContent,
                          generatedContents: selectedContents.length > 0 ? selectedContents : generatedContents,
                          videoMetadata: videoMetadata,
                          usedCredits: usedCredits,
                          progress: 60,
                          elements: selectedTopics.length
                        };
                        const project = await createProject(projectData);
                        if (project) {
                          toast({
                            title: "Génération terminée",
                            description: `${selectedTopics.length} newsletter(s) générée(s) avec succès`
                          });

                          navigate('/projects');
                        }
                      } catch (error) {
                        console.error('Error saving project:', error);
                      } finally {
                        setIsLoading(false);
                      }
                    }} disabled={selectedTopics.length === 0 || isLoading}>
                      {isLoading ? 'Enregistrement...' : `Générer le contenu pour ${selectedTopics.length} sujet(s)`}
                    </Button>
                  </div>
                )}
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle className="bg-[#1d2535]" />
            
            <ResizablePanel defaultSize={50} minSize={30}>
              {topics.length === 0 ? <div className="h-full p-6 overflow-auto border border-dashed border-[#1d2535] rounded-lg flex flex-col items-center justify-center">
                  <div className="text-center max-w-md">
                    <FileText className="h-16 w-16 text-gray-500 mb-4 mx-auto opacity-30" />
                    <h3 className="text-lg font-medium text-white mb-2">Aucun contenu créé pour le moment</h3>
                    <p className="text-gray-400">
                      Suivez les étapes sur la gauche pour générer votre premier contenu.
                      Tout le contenu apparaîtra ici.
                    </p>
                  </div>
                </div> : <ContentDisplay 
                  contents={selectedContents} 
                  isLoading={generatingContent} 
                />}
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default CreateDCE;
