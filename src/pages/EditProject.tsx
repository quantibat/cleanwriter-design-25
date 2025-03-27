
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, Youtube, Clock, RefreshCw, FileText, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useForm } from "react-hook-form";
import { useProjects } from '@/hooks/useProjects';
import { useToast } from "@/hooks/use-toast";
import { Json } from '@/integrations/supabase/types';
import TopicsList from '@/components/youtube-newsletter/TopicsList';
import ContentDisplay from '@/components/youtube-newsletter/ContentDisplay';

const EditProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { toast } = useToast();
  
  const { 
    isLoading: isProjectLoading, 
    getProjectById, 
    updateExistingProject,
    transformDbProjectToUiModel
  } = useProjects();
  
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState<any>(location.state?.project || null);
  const [progress, setProgress] = useState(project?.progress || 0);
  const [videoMetadata, setVideoMetadata] = useState<any>(null);
  const [isValidYoutubeLink, setIsValidYoutubeLink] = useState(false);
  const [currentTab, setCurrentTab] = useState("edit");
  const [topics, setTopics] = useState<any[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [activeContent, setActiveContent] = useState<any>(null);
  const [generatedContents, setGeneratedContents] = useState<any[]>([]);
  
  const form = useForm({
    defaultValues: {
      title: project?.title || '',
      youtubeLink: project?.youtubeLink || '',
      option: project?.type || 'Youtube to Newsletter',
      language: project?.language || 'french',
      aiModel: project?.aiModel || 'gpt-4o',
      description: project?.description || '',
      details: project?.details || '',
      collaborators: project?.collaborators?.toString() || '1',
    }
  });

  useEffect(() => {
    const fetchProject = async () => {
      if (!location.state?.project && id) {
        try {
          setIsLoading(true);
          const fetchedProject = await getProjectById(id);
          
          if (fetchedProject) {
            const transformedProject = transformDbProjectToUiModel(fetchedProject);
            setProject(transformedProject);
            form.reset({
              title: fetchedProject.title || '',
              youtubeLink: fetchedProject.youtube_link || '',
              option: fetchedProject.option_type || 'Youtube to Newsletter',
              language: fetchedProject.output_language || 'french',
              aiModel: fetchedProject.ai_model || 'gpt-4o',
              description: fetchedProject.card_title || '',
              details: transformedProject.details || '',
              collaborators: '1',
            });
            setProgress(fetchedProject.progress || 0);
            
            // Load topics and selected topics if they exist
            if (fetchedProject.topics) {
              const topicsArray = Array.isArray(fetchedProject.topics) 
                ? fetchedProject.topics 
                : typeof fetchedProject.topics === 'object' && fetchedProject.topics !== null 
                  ? Object.values(fetchedProject.topics) 
                  : [];
              setTopics(topicsArray);
            }

            if (fetchedProject.selected_topics) {
              setSelectedTopics(fetchedProject.selected_topics);
            }

            // Load active content if it exists
            if (fetchedProject.active_content) {
              setActiveContent(fetchedProject.active_content);
            }

            // Load generated contents if they exist
            if (fetchedProject.generated_contents) {
              const contentsArray = Array.isArray(fetchedProject.generated_contents) 
                ? fetchedProject.generated_contents 
                : typeof fetchedProject.generated_contents === 'object' && fetchedProject.generated_contents !== null 
                  ? Object.values(fetchedProject.generated_contents) 
                  : [];
              setGeneratedContents(contentsArray);
            }
            
            if (fetchedProject.youtube_link) {
              setIsValidYoutubeLink(true);
              
              // Handle video metadata correctly
              const metadata = fetchedProject.video_metadata as Json || {};
              setVideoMetadata({
                title: typeof metadata === 'object' && metadata !== null ? (metadata as any).title || 'Titre de la vidéo' : 'Titre de la vidéo',
                channel: typeof metadata === 'object' && metadata !== null ? (metadata as any).channel || 'Chaîne YouTube' : 'Chaîne YouTube',
                views: typeof metadata === 'object' && metadata !== null ? (metadata as any).views || '0 vues' : '0 vues',
                duration: typeof metadata === 'object' && metadata !== null ? (metadata as any).duration || '00:00' : '00:00'
              });
            }
          } else {
            navigate('/projects');
          }
        } catch (error) {
          console.error("Error fetching project:", error);
          navigate('/projects');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchProject();
  }, [id, location.state, navigate, getProjectById, transformDbProjectToUiModel, form]);

  const handleYoutubeLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    form.setValue('youtubeLink', link);
    const isValid = link.includes('youtube.com/watch') || link.includes('youtu.be/');
    setIsValidYoutubeLink(isValid);
    
    if (isValid && !videoMetadata) {
      setVideoMetadata({
        title: "Titre de la vidéo",
        channel: "Chaîne YouTube",
        views: "0 vues",
        duration: "00:00"
      });
    }
  };

  const onSubmit = async (data: any) => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      // Update database project
      const updated = await updateExistingProject(id, {
        title: data.title,
        option_type: data.option,
        card_title: data.description,
        youtube_link: data.youtubeLink,
        output_language: data.language,
        ai_model: data.aiModel,
        progress,
        topics,
        selected_topics: selectedTopics,
        active_content: activeContent,
        generated_contents: generatedContents
      });
      
      if (updated) {
        // Transform updated project to UI format for state navigation
        const updatedProject = {
          ...project,
          ...data,
          progress,
          type: data.option
        };
        
        toast({
          title: "Projet mis à jour",
          description: "Votre projet a été mis à jour avec succès."
        });
        
        navigate('/view-project/' + id, { state: { project: updatedProject } });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du projet",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopics(prevSelected => {
      if (prevSelected.includes(topicId)) {
        // Remove topic if already selected
        return prevSelected.filter(id => id !== topicId);
      } else {
        // Add topic
        return [...prevSelected, topicId];
      }
    });

    // Find the content associated with this topic
    const content = generatedContents.find(content => content.topicId === topicId);
    if (content) {
      setActiveContent(content);
    }
  };

  const handleDownloadPDF = () => {
    // Implement PDF download functionality if needed
    toast({
      title: "Téléchargement",
      description: "Fonction de téléchargement en cours d'implémentation"
    });
  };

  if (!project && !isLoading && !isProjectLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center w-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Projet non trouvé</h1>
          <p className="mb-6">Le projet que vous cherchez n'existe pas ou a été supprimé.</p>
          <Button onClick={() => navigate('/projects')}>
            Retour aux projets
          </Button>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Projets', path: '/projects' },
    { label: project?.title, path: `/view-project/${id}` },
    { label: 'Modifier' }
  ];

  if ((isLoading || isProjectLoading) && !project) {
    return (
      <DashboardLayout activeTab="projects" breadcrumbs={breadcrumbs}>
        <div className="w-full max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
          <p>Chargement du projet...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeTab="projects" breadcrumbs={breadcrumbs}>
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            size="sm"
            className="gap-1"
            onClick={() => navigate(`/view-project/${id}`, { state: { project } })}
          >
            <ArrowLeft size={16} />
            Retour au projet
          </Button>
          
          <h1 className="text-2xl font-bold">Modifier le projet</h1>
        </div>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="edit">Édition</TabsTrigger>
            <TabsTrigger value="generated-content">Contenu généré</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit">
            <div className="space-y-6">
              <Input 
                type="text" 
                value={form.watch('title')} 
                onChange={(e) => form.setValue('title', e.target.value)}
                className="text-xl font-medium border-none bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0" 
              />
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lien de la vidéo Youtube</label>
                  <div className="relative">
                    <Input 
                      type="text" 
                      placeholder="Coller un lien YouTube ici" 
                      className="pl-10 py-5"
                      onChange={handleYoutubeLinkChange} 
                      value={form.watch('youtubeLink')} 
                    />
                    <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    {isValidYoutubeLink && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
                    )}
                  </div>
                </div>
                
                {videoMetadata && isValidYoutubeLink && (
                  <div className="bg-card border rounded-md p-3 flex gap-3">
                    <div className="relative w-24 h-16 flex-shrink-0 bg-black rounded overflow-hidden">
                      <img 
                        src="https://i.ytimg.com/vi/XLnGAzg2MuA/hqdefault.jpg" 
                        alt="Video thumbnail" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {videoMetadata.duration}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium line-clamp-2">
                          {videoMetadata.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {videoMetadata.channel}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {videoMetadata.views} •
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type de projet</label>
                  <div>
                    <Select 
                      defaultValue={form.watch('option')} 
                      onValueChange={(value) => form.setValue('option', value)}
                    >
                      <SelectTrigger className="py-5">
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Youtube to Newsletter">Youtube to Newsletter</SelectItem>
                        <SelectItem value="Transcription">Transcription</SelectItem>
                        <SelectItem value="Résumé">Résumé</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Langue</label>
                  <div>
                    <Select 
                      defaultValue={form.watch('language')} 
                      onValueChange={(value) => form.setValue('language', value)}
                    >
                      <SelectTrigger className="py-5">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-blue-100">
                            <span className="text-xs">🇫🇷</span>
                          </span>
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="french">Français Formel (vous)</SelectItem>
                        <SelectItem value="french_informal">Français Informel (tu)</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Modèle d'IA</label>
                  <div>
                    <Select 
                      defaultValue={form.watch('aiModel')} 
                      onValueChange={(value) => form.setValue('aiModel', value)}
                    >
                      <SelectTrigger className="py-5">
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-200 text-purple-800 text-xs py-0.5 px-2 rounded-full">Qualité</span>
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
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
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    placeholder="Décrivez brièvement votre projet" 
                    value={form.watch('description')}
                    onChange={(e) => form.setValue('description', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Détails du projet</label>
                  <Textarea 
                    placeholder="Ajoutez des détails supplémentaires sur le projet" 
                    className="min-h-32"
                    value={form.watch('details')}
                    onChange={(e) => form.setValue('details', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Progression</label>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <Slider
                    defaultValue={[progress]}
                    value={[progress]}
                    max={100}
                    step={5}
                    onValueChange={(values) => setProgress(values[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre de collaborateurs</label>
                  <Input 
                    type="number" 
                    min={1} 
                    max={10} 
                    value={form.watch('collaborators')}
                    onChange={(e) => form.setValue('collaborators', e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate(`/view-project/${id}`, { state: { project } })}
                    disabled={isLoading}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="generated-content">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Sujets générés</h3>
                  <TopicsList 
                    topics={topics.map((topic: any) => ({
                      id: topic.id,
                      title: topic.title,
                      description: topic.description
                    }))} 
                    selectedTopics={selectedTopics} 
                    onSelectTopic={handleSelectTopic}
                    onDownloadPDF={handleDownloadPDF}
                    isLoading={false}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Contenu</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <ContentDisplay 
                      content={activeContent} 
                      isLoading={false}
                      onDownloadPDF={handleDownloadPDF}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(`/view-project/${id}`, { state: { project } })}
                >
                  Retour au projet
                </Button>
                <Button 
                  type="submit" 
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EditProject;
