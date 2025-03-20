
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle2, Youtube, Sparkles } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const CreateDCE = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [generatingContent, setGeneratingContent] = useState(false);
  const { toast } = useToast();
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [videoChannel, setVideoChannel] = useState<string | null>(null);
  const [videoViews, setVideoViews] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<string | null>(null);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  
  const form = useForm({
    defaultValues: {
      youtubeUrl: '',
      outputLanguage: 'français',
      aiModel: 'gpt-4o',
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Données du formulaire:", data);
    
    // Simuler le traitement
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Traitement démarré",
        description: "Votre contenu sera bientôt prêt",
      });
      navigate('/dashboard');
    }, 1500);
  };

  const handleYoutubePreview = () => {
    const url = form.getValues('youtubeUrl');
    
    if (!url) {
      toast({
        title: "URL manquante",
        description: "Veuillez entrer une URL YouTube valide",
        variant: "destructive"
      });
      return;
    }
    
    // Simuler la récupération des données de la vidéo
    setVideoPreview(url);
    setVideoTitle('"DÉMOLITION" de JP Fanguin par Jm Corda');
    setVideoChannel('Jm Corda Business');
    setVideoViews('0 vues');
    setVideoDuration('36:49');
    setVideoThumbnail('/lovable-uploads/a78807b4-7e11-4066-8bbb-f9bb69bd0bd2.png');
  };

  const generateContent = () => {
    setGeneratingContent(true);
    
    // Simuler la génération de contenu
    setTimeout(() => {
      setGeneratingContent(false);
      toast({
        title: "Contenu généré",
        description: "Le contenu a été généré avec succès",
      });
    }, 2000);
  };

  const breadcrumbs = [
    { label: 'Projets', path: '/projects' },
    { label: 'YouTube to Newsletter', path: '/projects' },
    { label: 'Test' },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="min-h-full bg-[#0c101b] flex flex-col">
        <main className="flex-1 py-2">
          <div className="max-w-full mx-auto">
            <ResizablePanelGroup
              direction="horizontal"
              className="min-h-[calc(100vh-180px)]"
            >
              <ResizablePanel defaultSize={45} minSize={40}>
                <div className="h-full p-6 overflow-auto">
                  <div className="flex items-center mb-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-none bg-transparent hover:bg-[#1d2535]/30 p-0 h-6 w-6 mr-2"
                      onClick={() => navigate('/dashboard')}
                    >
                      <ArrowLeft size={18} className="text-white" />
                    </Button>
                    <div className="bg-[#1d2535] py-2 px-4 rounded-md w-full">
                      <Input 
                        value="Test" 
                        className="bg-transparent border-none h-auto p-0 text-white text-sm focus-visible:ring-0" 
                      />
                    </div>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <FormItem>
                          <FormLabel className="text-white text-sm">Lien de la vidéo Youtube</FormLabel>
                          <div className="relative">
                            <FormField
                              control={form.control}
                              name="youtubeUrl"
                              render={({ field }) => (
                                <FormControl>
                                  <div className="relative flex items-center">
                                    <Youtube size={18} className="absolute left-3 text-gray-400" />
                                    <Input 
                                      placeholder="https://www.youtube.com/watch?v=XLnGAzg2MuA" 
                                      {...field} 
                                      className="bg-[#1d2535] border-none text-white pl-10 py-5 rounded-l-md"
                                    />
                                    <Button 
                                      type="button" 
                                      className="h-full bg-[#1d2535] hover:bg-[#2a3343] border-none rounded-l-none rounded-r-md p-2"
                                      onClick={handleYoutubePreview}
                                    >
                                      <CheckCircle2 size={18} className="text-green-500" />
                                    </Button>
                                  </div>
                                </FormControl>
                              )}
                            />
                          </div>
                        </FormItem>
                        
                        {videoThumbnail && (
                          <div className="bg-[#1d2535] rounded-md p-2 flex items-start gap-3">
                            <div className="relative min-w-[100px] h-[56px] rounded overflow-hidden">
                              <img src={videoThumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
                              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                                {videoDuration}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-white text-sm font-medium line-clamp-2">
                                {videoTitle}
                              </h3>
                              <p className="text-gray-400 text-xs mt-1">{videoChannel}</p>
                              <p className="text-gray-400 text-xs">{videoViews}</p>
                            </div>
                          </div>
                        )}

                        <div className="pt-4">
                          <FormItem>
                            <FormLabel className="text-white text-sm">Langue de sortie</FormLabel>
                            <FormField
                              control={form.control}
                              name="outputLanguage"
                              render={({ field }) => (
                                <FormControl>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full overflow-hidden mr-1">
                                      <img 
                                        src="https://flagcdn.com/fr.svg" 
                                        alt="Drapeau français" 
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <SelectTrigger className="bg-[#1d2535] border-none text-white">
                                        <SelectValue placeholder="Choisir une langue" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-[#1d2535] border-[#1d2535] text-white">
                                        <SelectItem value="français">Français Formel (vous)</SelectItem>
                                        <SelectItem value="english">English (Formal)</SelectItem>
                                        <SelectItem value="español">Español (Formal)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </FormControl>
                              )}
                            />
                          </FormItem>
                        </div>

                        <div>
                          <FormItem>
                            <FormLabel className="text-white text-sm">Modèle d'IA</FormLabel>
                            <FormField
                              control={form.control}
                              name="aiModel"
                              render={({ field }) => (
                                <FormControl>
                                  <div>
                                    <Select 
                                      onValueChange={field.onChange} 
                                      defaultValue={field.value}
                                    >
                                      <SelectTrigger className="bg-[#1d2535] border-none text-white">
                                        <SelectValue placeholder="Choisir un modèle" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-[#1d2535] border-[#1d2535] text-white">
                                        <SelectItem value="gpt-4o">
                                          <div className="flex items-center justify-between w-full">
                                            <span>GPT-4o</span>
                                            <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded-full">
                                              Qualité
                                            </span>
                                          </div>
                                        </SelectItem>
                                        <SelectItem value="gpt-4o-mini">GPT-4o mini (Rapide)</SelectItem>
                                        <SelectItem value="claude-3">Claude 3 (Précis)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </FormControl>
                              )}
                            />
                          </FormItem>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button
                          type="button"
                          className="w-full bg-[#0099FF] hover:bg-[#0075FF] text-white py-5"
                          onClick={generateContent}
                          disabled={!videoPreview || generatingContent}
                        >
                          {generatingContent ? (
                            "Génération en cours..."
                          ) : (
                            <>
                              <Sparkles size={16} className="mr-2" />
                              Générez une newsletter
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-[#1d2535] text-gray-300 hover:bg-[#1d2535]/30"
                          onClick={() => navigate('/dashboard')}
                        >
                          Annuler
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle className="bg-[#1d2535]" />
              
              <ResizablePanel defaultSize={55}>
                <div className="h-full border border-dashed border-[#1d2535] rounded-md m-6 flex flex-col items-center justify-center">
                  <FileText className="h-16 w-16 text-gray-500 mb-4 opacity-30" />
                  <h3 className="text-lg font-medium text-white mb-2">Aucun contenu créé pour le moment</h3>
                  <p className="text-gray-400 text-center max-w-md px-6">
                    Suivez les étapes sur la gauche pour générer votre premier contenu.
                    <br />Tout le contenu apparaîtra ici.
                  </p>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default CreateDCE;
