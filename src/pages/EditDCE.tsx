
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, FileText, LinkIcon, Upload, Globe, FileCheck, Save, Youtube } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from '@/components/layouts/DashboardLayout';

const EditDCE = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [generatingDocument, setGeneratingDocument] = useState(false);
  const { toast } = useToast();
  const [videoMetadata, setVideoMetadata] = useState<any>(null);
  const [isValidYoutubeLink, setIsValidYoutubeLink] = useState(false);
  
  const projectData = location.state?.project || null;
  
  useEffect(() => {
    if (!projectData) {
      toast({
        title: "Erreur",
        description: "Impossible de trouver le dossier demandé",
        variant: "destructive"
      });
      navigate('/dashboard');
    }
  }, [projectData, navigate, toast]);

  const getInitialFormValues = () => {
    if (!projectData) return {
      title: '',
      sourceMaterials: '',
      youtubeLink: '',
      category: '',
      subcategory: '',
      language: 'french',
      format: 'pdf',
      additionalNotes: '',
      option: '',
      aiModel: 'gpt-4o'
    };

    return {
      title: projectData.title || '',
      sourceMaterials: '',
      youtubeLink: projectData.youtubeLink || '',
      category: 'technique',
      subcategory: 'CCTP',
      language: 'french',
      format: 'pdf',
      additionalNotes: projectData.details || '',
      option: projectData.option || '',
      aiModel: projectData.aiModel || 'gpt-4o'
    };
  };
  
  const form = useForm({
    defaultValues: getInitialFormValues()
  });

  const handleYoutubeLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    form.setValue('youtubeLink', link);
    
    const isValid = link.includes('youtube.com/watch') || link.includes('youtu.be/');
    setIsValidYoutubeLink(isValid);
    
    if (isValid) {
      // Extract video ID from the link
      let videoId;
      if (link.includes('youtube.com/watch')) {
        videoId = new URL(link).searchParams.get('v');
      } else if (link.includes('youtu.be/')) {
        videoId = link.split('youtu.be/')[1].split('?')[0];
      }
      
      if (videoId) {
        // Set preview with actual YouTube thumbnail
        setVideoMetadata({
          title: "Chargement...",
          channel: "Chargement...",
          views: "Chargement...",
          duration: "00:00",
          videoId: videoId
        });
        
        // In a real implementation, you might want to fetch video metadata from YouTube API
        // For demonstration purposes, we'll just set some sample data
        setTimeout(() => {
          setVideoMetadata({
            title: "Vidéo YouTube",
            channel: "Chaîne YouTube",
            views: "1000 vues",
            duration: "10:30",
            videoId: videoId
          });
        }, 500);
      }
    } else {
      setVideoMetadata(null);
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Données du formulaire:", data);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Document mis à jour avec succès",
        description: "Les modifications ont été enregistrées",
      });
      navigate('/dashboard');
    }, 1500);
  };

  const generateWithAI = () => {
    setGeneratingDocument(true);
    const formData = form.getValues();
    console.log("Génération IA basée sur:", formData);
    
    setTimeout(() => {
      setGeneratingDocument(false);
      form.setValue('additionalNotes', 'Document généré automatiquement en utilisant les paramètres spécifiés. Ce document contient des spécifications techniques conformes aux normes en vigueur.');
      toast({
        title: "Document généré par IA",
        description: "Un document a été généré en fonction de vos paramètres",
      });
    }, 2000);
  };

  const watchedValues = form.watch();

  const categories = {
    "technique": ["CCTP", "Mémoire technique", "Notes de calcul", "Spécifications"],
    "administratif": ["CCAP", "RC", "AE", "Annexes administratives"],
    "planning": ["Planning général", "Phasage", "Jalons", "Délais d'exécution"],
    "financier": ["Bordereau de prix", "Détail quantitatif", "Estimation", "Budget prévisionnel"]
  };

  const subcategoryOptions = watchedValues.category ? categories[watchedValues.category as keyof typeof categories] : [];

  const breadcrumbs = [
    { label: 'Projets', path: '/projects' },
    { label: 'Dossiers', path: '/dce' },
    { label: 'Modifier le dossier' }
  ];

  if (!projectData) {
    return null;
  }

  return (
    <DashboardLayout breadcrumbs={breadcrumbs} toolType="dce">
      <div className="min-h-screen bg-[#0d1117] flex flex-col">
        <header className="border-b border-[#1f2937]/20 bg-[#0d1117]/80 backdrop-blur-md py-4 px-6 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 border-[#30363d] bg-transparent text-gray-300 hover:bg-[#30363d]/30"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft size={16} />
              Retour
            </Button>
            <h1 className="text-xl font-semibold text-white">Modifier le dossier</h1>
            <div></div>
          </div>
        </header>
        
        <main className="flex-1 py-8 px-6 md:px-10 bg-[#0d1117]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="w-full md:w-1/2 p-4 overflow-auto border border-[#30363d] rounded-lg bg-[#161b22]/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(30,174,219,0.5)] hover:border-[#33C3F0]/50">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-6">
                      <div className="border-b border-[#30363d]/80 pb-4">
                        <h2 className="text-lg font-medium text-white">Informations du document</h2>
                        <p className="text-sm text-gray-400 mt-1">
                          Modifiez les informations de base du document technique
                        </p>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Nom du document</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Ex: Cahier des charges techniques - Lot 01" 
                                {...field} 
                                className="bg-[#0d1117] border-[#30363d] text-gray-200 focus-visible:ring-blue-500/40 transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="youtubeLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Lien YouTube</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  type="text"
                                  placeholder="Collez un lien YouTube ici"
                                  className="pl-10 py-5 bg-[#0d1117] border-[#30363d] text-gray-200 rounded-md focus-visible:ring-blue-500/40 transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]"
                                  value={field.value}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleYoutubeLinkChange(e);
                                  }}
                                />
                                <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      {videoMetadata && (
                        <div className="bg-[#171a2e] border border-[#2a2f45] rounded-md p-3 flex gap-3">
                          <div className="relative w-24 h-16 flex-shrink-0 bg-black rounded overflow-hidden">
                            <img
                              src={`https://img.youtube.com/vi/${videoMetadata.videoId}/hqdefault.jpg`}
                              alt="Video thumbnail"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                              {videoMetadata.duration}
                            </div>
                          </div>
                          <div className="flex flex-col justify-between">
                            <div>
                              <h3 className="text-sm font-medium text-white line-clamp-2">
                                {videoMetadata.title}
                              </h3>
                              <p className="text-xs text-gray-400">
                                {videoMetadata.channel}
                              </p>
                            </div>
                            <div className="text-xs text-gray-500">
                              {videoMetadata.views} •
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <FormField
                        control={form.control}
                        name="sourceMaterials"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Liens ou fichiers sources</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Textarea 
                                  placeholder="Liens vers documents ou ressources existants (un par ligne)" 
                                  className="bg-[#0d1117] border-[#30363d] text-gray-200 focus-visible:ring-blue-500/40 min-h-[80px] transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]" 
                                  {...field}
                                />
                                <div className="flex gap-2">
                                  <Button 
                                    type="button" 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-xs border-[#30363d] text-gray-300 hover:bg-[#30363d]/30 transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]"
                                    onClick={() => toast({
                                      title: "Fonctionnalité à venir",
                                      description: "L'import de fichiers sera disponible prochainement",
                                    })}
                                  >
                                    <Upload size={14} className="mr-1" />
                                    Importer un fichier
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-xs border-[#30363d] text-gray-300 hover:bg-[#30363d]/30 transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]"
                                    onClick={() => toast({
                                      title: "Fonctionnalité à venir",
                                      description: "L'ajout de liens externes sera disponible prochainement",
                                    })}
                                  >
                                    <LinkIcon size={14} className="mr-1" />
                                    Ajouter un lien
                                  </Button>
                                </div>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-6 pt-4">
                      <div className="border-b border-[#30363d]/80 pb-4">
                        <h2 className="text-lg font-medium text-white">Catégorisation</h2>
                        <p className="text-sm text-gray-400 mt-1">
                          Classez votre document pour une meilleure organisation
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Catégorie</FormLabel>
                              <FormControl>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="bg-[#0d1117] border-[#30363d] text-gray-200 transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]">
                                    <SelectValue placeholder="Sélectionner une catégorie" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#161b22] border-[#30363d] text-gray-200">
                                    <SelectItem value="technique">Document technique</SelectItem>
                                    <SelectItem value="administratif">Document administratif</SelectItem>
                                    <SelectItem value="planning">Planning et délais</SelectItem>
                                    <SelectItem value="financier">Document financier</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="subcategory"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Sous-catégorie</FormLabel>
                              <FormControl>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  disabled={!watchedValues.category}
                                >
                                  <SelectTrigger className="bg-[#0d1117] border-[#30363d] text-gray-200 transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]">
                                    <SelectValue placeholder={watchedValues.category ? "Sélectionner une sous-catégorie" : "Choisissez d'abord une catégorie"} />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#161b22] border-[#30363d] text-gray-200">
                                    {subcategoryOptions.map((option) => (
                                      <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-6 pt-4">
                      <div className="border-b border-[#30363d]/80 pb-4">
                        <h2 className="text-lg font-medium text-white">Format et options</h2>
                        <p className="text-sm text-gray-400 mt-1">
                          Définissez le format et les options du document
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="option"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Option</FormLabel>
                              <FormControl>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="bg-[#0d1117] border-[#30363d] text-gray-200 transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]">
                                    <SelectValue placeholder="Aucune option sélectionnée" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#161b22] border-[#30363d] text-gray-200">
                                    <SelectItem value="summary">Résumé</SelectItem>
                                    <SelectItem value="transcript">Transcription</SelectItem>
                                    <SelectItem value="newsletter">Newsletter</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="aiModel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Modèle d'IA</FormLabel>
                              <FormControl>
                                <Select 
                                  defaultValue={field.value || "gpt-4o"}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className="bg-[#0d1117] border-[#30363d] text-gray-200 transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]">
                                    <div className="flex items-center gap-2">
                                      <span className="bg-purple-200 text-purple-800 text-xs py-0.5 px-2 rounded-full">Qualité</span>
                                      <SelectValue />
                                    </div>
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#161b22] border-[#30363d] text-gray-200">
                                    <SelectItem value="gpt-4o">
                                      <div className="flex items-center gap-2">
                                        <span className="bg-purple-200 text-purple-800 text-xs py-0.5 px-2 rounded-full">Qualité</span>
                                        <span>GPT-4o</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="language"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Langue du document</FormLabel>
                              <FormControl>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="bg-[#0d1117] border-[#30363d] text-gray-200 transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]">
                                    <div className="flex items-center space-x-2">
                                      <span className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-blue-100">
                                        <span className="text-xs">🇫🇷</span>
                                      </span>
                                      <SelectValue />
                                    </div>
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#161b22] border-[#30363d] text-gray-200">
                                    <SelectItem value="french">Français Formel (vous)</SelectItem>
                                    <SelectItem value="french_informal">Français Informel (tu)</SelectItem>
                                    <SelectItem value="english">English</SelectItem>
                                    <SelectItem value="spanish">Español</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="format"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Format du document</FormLabel>
                              <FormControl>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="bg-[#0d1117] border-[#30363d] text-gray-200 transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]">
                                    <SelectValue placeholder="Sélectionner un format" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#161b22] border-[#30363d] text-gray-200">
                                    <SelectItem value="pdf">PDF</SelectItem>
                                    <SelectItem value="docx">Microsoft Word (.docx)</SelectItem>
                                    <SelectItem value="xlsx">Microsoft Excel (.xlsx)</SelectItem>
                                    <SelectItem value="md">Markdown (.md)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="additionalNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Description détaillée</FormLabel>
                            <FormDescription className="text-gray-500">
                              Modifiez la description détaillée de ce dossier
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="Informations détaillées sur ce dossier" 
                                className="bg-[#0d1117] border-[#30363d] text-gray-200 focus-visible:ring-blue-500/40 min-h-[120px] transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]" 
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full mb-4 border-[#0ea5e9]/30 bg-[#0ea5e9]/10 text-[#38bdf8] hover:bg-[#0ea5e9]/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(30,174,219,0.5)]"
                          onClick={generateWithAI}
                          disabled={generatingDocument}
                        >
                          {generatingDocument ? (
                            <>Génération en cours...</>
                          ) : (
                            <>
                              <Sparkles size={16} className="mr-2" />
                              Générer avec IA
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-6 space-y-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(30,174,219,0.5)]"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>Enregistrement en cours...</>
                        ) : (
                          <>
                            <Save size={16} className="mr-2" />
                            Enregistrer les modifications
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full border-[#30363d] text-gray-300 hover:bg-[#30363d]/30 transition-all duration-300 hover:shadow-[0_0_10px_rgba(30,174,219,0.3)]" 
                        onClick={() => navigate('/dashboard')}
                        disabled={isLoading}
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
              
              <div className="w-full md:w-1/2 p-4 overflow-auto border border-[#30363d] rounded-lg bg-[#161b22]/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(30,174,219,0.5)] hover:border-[#33C3F0]/50">
                <div className="rounded-lg p-8 h-full overflow-hidden">
                  <div className="border-b border-[#30363d]/80 pb-4 mb-6">
                    <h2 className="text-lg font-medium text-white">Prévisualisation du document</h2>
                    <p className="text-sm text-gray-400 mt-1">
                      Aperçu du document technique en cours de modification
                    </p>
                  </div>
                  
                  {!watchedValues.title && !watchedValues.category ? (
                    <div className="flex flex-col items-center justify-center h-[calc(100%-100px)] text-center">
                      <FileText className="h-16 w-16 text-gray-500 mb-4 opacity-30" />
                      <p className="text-gray-400">
                        Remplissez le formulaire pour voir la prévisualisation du document
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <Card className="bg-[#0d1117] border border-[#30363d] overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(30,174,219,0.5)] hover:border-[#33C3F0]/50">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-[#0ea5e9]/10 p-2 rounded-md">
                                <FileText className="h-6 w-6 text-[#38bdf8]" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-lg line-clamp-1 text-white">
                                  {watchedValues.title || "Titre du document"}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                  {watchedValues.category && (
                                    <span className="text-xs bg-[#0ea5e9]/20 text-[#38bdf8] px-2 py-1 rounded-full">
                                      {watchedValues.category === 'technique' && "Document technique"}
                                      {watchedValues.category === 'administratif' && "Document administratif"}
                                      {watchedValues.category === 'planning' && "Planning et délais"}
                                      {watchedValues.category === 'financier' && "Document financier"}
                                    </span>
                                  )}
                                  {watchedValues.subcategory && (
                                    <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full">
                                      {watchedValues.subcategory}
                                    </span>
                                  )}
                                  {watchedValues.format && (
                                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full flex items-center gap-1">
                                      <FileCheck className="h-3 w-3" />
                                      {watchedValues.format === 'pdf' && "PDF"}
                                      {watchedValues.format === 'docx' && "Word"}
                                      {watchedValues.format === 'xlsx' && "Excel"}
                                      {watchedValues.format === 'md' && "Markdown"}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {watchedValues.language && (
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Globe className="h-4 w-4" />
                                <span>
                                  {watchedValues.language === 'french' && "Français"}
                                  {watchedValues.language === 'french_informal' && "Français (informel)"}
                                  {watchedValues.language === 'english' && "Anglais"}
                                  {watchedValues.language === 'spanish' && "Espagnol"}
                                </span>
                              </div>
                            )}
                            
                            {watchedValues.youtubeLink && videoMetadata && (
                              <div className="bg-[#171a2e] border border-[#2a2f45] rounded-md p-3 flex gap-3 mt-2">
                                <div className="relative w-24 h-16 flex-shrink-0 bg-black rounded overflow-hidden">
                                  <img
                                    src={`https://img.youtube.com/vi/${videoMetadata.videoId}/hqdefault.jpg`}
                                    alt="Video thumbnail"
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                                    {videoMetadata.duration}
                                  </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                  <div>
                                    <h3 className="text-sm font-medium text-white line-clamp-2">
                                      {videoMetadata.title}
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                      {videoMetadata.channel}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-400">Aperçu du contenu</h3>
                        
                        <Card className="bg-[#0d1117] border border-[#30363d] transition-all duration-300 hover:shadow-[0_0_15px_rgba(30,174,219,0.5)] hover:border-[#33C3F0]/50">
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              {watchedValues.title && (
                                <div className="border-b border-[#30363d]/80 pb-3">
                                  <h4 className="text-lg font-bold text-white">{watchedValues.title}</h4>
                                </div>
                              )}
                              
                              {watchedValues.subcategory && (
                                <div className="space-y-2">
                                  <h5 className="font-medium text-gray-200">1. Introduction</h5>
                                  <p className="text-sm text-gray-400">
                                    Ce document détaille les spécifications techniques pour {watchedValues.subcategory.toLowerCase()}. 
                                    Il fait partie intégrante du dossier de consultation des entreprises.
                                  </p>
                                </div>
                              )}
                              
                              {watchedValues.sourceMaterials && (
                                <div className="space-y-2">
                                  <h5 className="font-medium text-gray-200">2. Documents de référence</h5>
                                  <div className="text-sm text-gray-400">
                                    {watchedValues.sourceMaterials.split('\n').map((link, index) => (
                                      <div key={index} className="flex items-center gap-2 ml-2">
                                        <LinkIcon className="h-3 w-3" />
                                        <span className="text-[#38bdf8] underline">{link}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {watchedValues.additionalNotes && (
                                <div className="space-y-2">
                                  <h5 className="font-medium text-gray-200">3. Informations complémentaires</h5>
                                  <p className="text-sm text-gray-400">
                                    {watchedValues.additionalNotes}
                                  </p>
                                </div>
                              )}
                              
                              {(!watchedValues.additionalNotes && !watchedValues.sourceMaterials) && (
                                <p className="text-sm text-gray-500 italic">
                                  Complétez le formulaire pour générer un aperçu du contenu du document...
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default EditDCE;
