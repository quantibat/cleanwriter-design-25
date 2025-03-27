import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, Youtube, FileText, CheckCircle, Upload, Globe, FileCheck, Save, LinkIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TopicsList from '@/components/youtube-newsletter/TopicsList';
import ContentDisplay from '@/components/youtube-newsletter/ContentDisplay';
import { useNotificationsManager } from '@/hooks/useNotificationsManager';
import { useProjects } from '@/hooks/useProjects';
import { useActiveContent, ActiveContent } from '@/hooks/useActiveContent';
import { supabase } from '@/integrations/supabase/client';
import { extractYoutubeInfo } from '@/services/projectsService';

const MOCK_TOPICS = [
  {
    id: '1',
    title: 'La clé des vidéos virales : êtes-vous prêt ?',
    description: 'Découvrez les facteurs essentiels qui font le succès des vidéos virales sur les plateformes modernes.'
  },
  {
    id: '2',
    title: 'Les 4 piliers du succès sur YouTube',
    description: 'Analyse des quatre compétences fondamentales pour réussir et maintenir l\'intérêt de votre audience.'
  },
  {
    id: '3',
    title: 'Au-delà de l\'argent : ce qui fait vraiment une vie réussie',
    description: 'Réflexion sur l\'importance de l\'équilibre entre richesse, relations et authenticité.'
  }
];

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

const EditDCE = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [generatingTopics, setGeneratingTopics] = useState(false);
  const [generatingContent, setGeneratingContent] = useState(false);
  const [topics, setTopics] = useState<any[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const { activeContent, setActiveContent } = useActiveContent(null);
  const { toast } = useToast();
  const { notifySuccess } = useNotificationsManager();
  const { getProjectById, updateExistingProject } = useProjects();
  const [isSocialMediaOnly, setIsSocialMediaOnly] = useState(false);
  const [title, setTitle] = useState("Untitled Youtube to Newsletter");
  const [cardTitle, setCardTitle] = useState("Ma sélection de cartes");

  const totalCredits = 30000;
  const [usedCredits, setUsedCredits] = useState(0);
  const remainingCredits = totalCredits - usedCredits;
  const percentUsed = Math.round((usedCredits / totalCredits) * 100);

  const [videoMetadata, setVideoMetadata] = useState<any>(null);
  const [isValidYoutubeLink, setIsValidYoutubeLink] = useState(false);
  const [youtubeInfo, setYoutubeInfo] = useState<any>(null);
  const [fetchingMetadata, setFetchingMetadata] = useState(false);
  
  const [projectData, setProjectData] = useState<any>(location.state?.project || null);
  const [dbProject, setDbProject] = useState<any>(null);
  
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
    const fetchProject = async () => {
      if (id) {
        try {
          setIsFetching(true);
          const project = await getProjectById(id);
          
          if (project) {
            setDbProject(project);
            
            // Transform database project to UI format
            if (!projectData) {
              setProjectData({
                id: project.id,
                title: project.title,
                type: project.option_type || 'Youtube to Newsletter',
                elements: project.elements || 0,
                description: project.card_title || '',
                progress: project.progress || 0
              });
            }
            
            // Set form data
            setTitle(project.title || "Untitled Youtube to Newsletter");
            setCardTitle(project.card_title || "Ma sélection de cartes");
            setIsSocialMediaOnly(project.is_social_media_only || false);
            setUsedCredits(project.used_credits || 0);
            
            if (project.youtube_link) {
              setIsValidYoutubeLink(true);
              form.setValue('youtubeLink', project.youtube_link);
              
              // Fetch video metadata for the existing YouTube link
              try {
                const info = await extractYoutubeInfo(project.youtube_link);
                if (info) {
                  setYoutubeInfo(info);
                  setVideoMetadata({
                    title: info.title,
                    channel: info.channel,
                    views: info.views,
                    duration: info.duration
                  });
                }
              } catch (error) {
                console.error("Error fetching YouTube info for existing project:", error);
              }
            }
            
            if (project.option_type) {
              form.setValue('option', project.option_type);
            }
            
            if (project.output_language) {
              form.setValue('language', project.output_language);
            }
            
            if (project.ai_model) {
              form.setValue('aiModel', project.ai_model);
            }
            
            if (project.video_metadata) {
              // If we already have metadata in the project, use it
              setVideoMetadata(project.video_metadata);
            }
            
            if (project.topics && Array.isArray(project.topics) && project.topics.length > 0) {
              setTopics(project.topics);
            }
            
            if (project.selected_topics && Array.isArray(project.selected_topics)) {
              setSelectedTopics(project.selected_topics);
            }
            
            if (project.active_content) {
              // Fix for TypeScript error: ensure active_content has the right format
              if (typeof project.active_content === 'object' && 
                  project.active_content !== null &&
                  'subject' in project.active_content && 
                  'body' in project.active_content) {
                setActiveContent({
                  subject: project.active_content.subject as string,
                  body: project.active_content.body as string
                });
              }
            }
          } else {
            toast({
              title: "Erreur",
              description: "Impossible de trouver le projet demandé",
              variant: "destructive"
            });
            navigate('/projects');
          }
        } catch (error) {
          console.error("Error fetching project:", error);
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de la récupération du projet",
            variant: "destructive"
          });
        } finally {
          setIsFetching(false);
        }
      } else {
        setIsFetching(false);
      }
    };
    
    fetchProject();
  }, [id, navigate, toast, form, projectData, getProjectById, setActiveContent]);

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
      
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-topics', {
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
        const wordCount = data.topics.reduce((count: number, topic: any) => 
          count + (topic.title?.length || 0) + (topic.description?.length || 0), 0);
        setUsedCredits(prev => prev + wordCount);
        notifySuccess(
          'Sujets générés', 
          `${data.topics.length} sujets ont été générés avec succès à partir de la vidéo YouTube.`
        );
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
        return prev.filter(id => id !== topicId);
      }
      return [...prev, topicId];
    });
    
    setGeneratingContent(true);
    
    const wordCount = 500;
    setUsedCredits(prev => prev + wordCount);
    
    setTimeout(() => {
      // Fix the type issue by properly casting or creating a valid object
      const content = MOCK_CONTENT[topicId as keyof typeof MOCK_CONTENT];
      if (content) {
        setActiveContent({
          subject: content.subject,
          body: content.body
        });
      }
      setGeneratingContent(false);
    }, 1000);
  };

  const breadcrumbs = [
    { label: 'Projets', path: '/projects' },
    { label: title, path: `/view-project/${id}` },
    { label: 'Modifier' }
  ];

  const handleSubmit = async (data: FormData) => {
    if (!id) return;
    
    setIsLoading(true);
    
    try {
      // Update project in database
      const projectUpdate = {
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
        videoMetadata: videoMetadata,
        usedCredits: usedCredits,
        progress: topics.length > 0 ? (selectedTopics.length > 0 ? 75 : 40) : 10,
        elements: selectedTopics.length || topics.length
      };
      
      const updatedProject = await updateExistingProject(id, projectUpdate);
      
      if (updatedProject) {
        setTimeout(() => {
          setIsLoading(false);
          toast({
            title: "Modifications enregistrées",
            description: "Votre projet a été mis à jour avec succès.",
          });
          navigate('/projects');
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du projet",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handleUpgrade = () => {
    navigate('/upgrade-plan');
  };

  if (isFetching) {
    return (
      <DashboardLayout breadcrumbs={breadcrumbs} activeTab="projects">
        <div className="min-h-screen bg-[#0c101b] flex items-center justify-center">
          <p className="text-white">Chargement du projet...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout breadcrumbs={breadcrumbs} activeTab="projects">
      <div className="min-h-screen bg-[#0c101b]">
        <main className="w-full">
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[calc(100vh-150px)]"
          >
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full p-6 overflow-auto">
                <div className="mb-6">
                  {isSocialMediaOnly ? (
                    <Textarea 
                      placeholder="Description du contenu pour les réseaux sociaux..."
                      className="min-h-[100px] bg-[#0d1117] border-[#30363d] text-gray-200 focus-visible:ring-blue-500/40"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  ) : (
                    <Input 
                      type="text" 
                      value={title}
                      onChange={handleTitleChange}
                      className="text-xl font-medium border-none bg-transparent text-white p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  )}
                </div>
                
                <div className="mb-6 bg-[#1A1F2C] p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Crédits restants</span>
                    <span className="text-sm font-medium text-white">{remainingCredits.toLocaleString()} / {totalCredits.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={percentUsed} className="h-2 flex-grow" />
                    <span className="text-xs text-gray-400">{percentUsed}%</span>
                  </div>
                  {percentUsed > 80 && (
                    <div className="mt-2 flex justify-end">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs bg-transparent hover:bg-blue-500/20 text-blue-400 border-blue-500/50"
                        onClick={handleUpgrade}
                      >
                        Mise à niveau
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Titre de la sélection</label>
                  <Input 
                    type="text" 
                    value={cardTitle}
                    onChange={handleCardTitleChange}
                    className="w-full py-2 bg-[#171a2e] border border-[#2a2f45] text-gray-200 rounded-md focus-visible:ring-blue-500/40"
                    placeholder="Entrez le titre de votre sélection de cartes"
                  />
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
                        <Select onValueChange={(value) => form.setValue('option', value)}>
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
                        <Select 
                          defaultValue="french"
                          onValueChange={(value) => form.setValue('language', value)}
                        >
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
                        <Select 
                          defaultValue="gpt-4o"
                          onValueChange={(value) => form.setValue('aiModel', value)}
                        >
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
                        disabled={generatingTopics || !isValidYoutubeLink}
                      >
                        {generatingTopics ? (
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
                    
                    <TopicsList 
                      topics={topics} 
                      selectedTopics={selectedTopics} 
                      onSelectTopic={handleSelectTopic}
                      isLoading={generatingTopics}
                    />
                    
                    <Button
                      className="w-full py-6 bg-[#0099ff] hover:bg-[#0088ee] text-white flex items-center justify-center rounded-md mt-4"
                      onClick={() => {
                        handleSubmit(form.getValues());
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </Button>
                  </div>
                )}
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle className="bg-[#1d2535]" />
            
            <ResizablePanel defaultSize={50} minSize={30}>
              {activeContent ? (
                <ContentDisplay 
                  contents={[activeContent]} 
                  isLoading={generatingContent}
                />
              ) : (
                <div className="h-full p-6 overflow-auto border border-dashed border-[#1d2535] rounded-lg flex flex-col items-center justify-center">
                  <div className="text-center max-w-md">
                    <FileText className="h-16 w-16 text-gray-500 mb-4 mx-auto opacity-30" />
                    <h3 className="text-lg font-medium text-white mb-2">Aucun contenu créé pour le moment</h3>
                    <p className="text-gray-400">
                      Suivez les étapes sur la gauche pour générer votre premier contenu.
                      Tout le contenu apparaîtra ici.
                    </p>
                  </div>
                </div>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default EditDCE;
