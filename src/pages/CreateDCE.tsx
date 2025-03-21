
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Youtube, FileText } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from '@/components/layouts/DashboardLayout';

const CreateDCE = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [generatingDocument, setGeneratingDocument] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title: 'Untitled Youtube to Newsletter',
      youtubeLink: '',
      option: '',
      language: 'english',
      aiModel: 'gpt-4'
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Données du formulaire:", data);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Newsletter créée avec succès",
        description: "Votre newsletter a été générée à partir de la vidéo YouTube",
      });
      navigate('/dashboard');
    }, 1500);
  };

  const generateNewsletter = () => {
    setGeneratingDocument(true);
    const formData = form.getValues();
    console.log("Génération de newsletter basée sur:", formData);
    
    setTimeout(() => {
      setGeneratingDocument(false);
      toast({
        title: "Newsletter générée",
        description: "Votre newsletter a été générée avec succès",
      });
    }, 2000);
  };

  const breadcrumbs = [
    { label: 'Projets', path: '/projects' },
    { label: 'Youtube to Newsletter', path: '/youtube-to-newsletter' },
    { label: 'Untitled Youtube to Newsletter' }
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="min-h-screen bg-[#0c101b]">
        <main className="w-full">
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[calc(100vh-150px)]"
          >
            <ResizablePanel defaultSize={50} minSize={40}>
              <div className="h-full p-6 overflow-auto">
                <div className="mb-6">
                  <Input 
                    type="text" 
                    value="Untitled Youtube to Newsletter" 
                    className="text-xl font-medium border-none bg-transparent text-white p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    readOnly
                  />
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Lien de la vidéo Youtube</label>
                    <div className="relative">
                      <Input 
                        type="text"
                        placeholder="Paste a youtube video link here"
                        className="pl-10 py-5 bg-[#171a2e] border border-[#2a2f45] text-gray-200 rounded-md focus-visible:ring-blue-500/40"
                      />
                      <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Option</label>
                    <div>
                      <Select>
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
                      <Select defaultValue="english">
                        <SelectTrigger className="py-5 bg-[#171a2e] border border-[#2a2f45] text-gray-200 rounded-md focus-visible:ring-blue-500/40">
                          <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-blue-100">
                              <span className="text-xs">🇬🇧</span>
                            </span>
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="bg-[#171a2e] border border-[#2a2f45] text-gray-200">
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Modèle d'IA</label>
                    <div>
                      <Select defaultValue="gpt-4">
                        <SelectTrigger className="py-5 bg-[#171a2e] border border-[#2a2f45] text-gray-200 rounded-md focus-visible:ring-blue-500/40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#171a2e] border border-[#2a2f45] text-gray-200">
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      type="button"
                      className="w-full py-6 bg-[#3a4059] hover:bg-[#424867] text-white flex items-center justify-center rounded-md"
                      onClick={generateNewsletter}
                      disabled={generatingDocument}
                    >
                      {generatingDocument ? (
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
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle className="bg-[#1d2535]" />
            
            <ResizablePanel defaultSize={50} minSize={30}>
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
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default CreateDCE;
