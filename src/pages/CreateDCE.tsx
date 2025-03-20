
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, FileText, LinkIcon, Upload, Globe, FileCheck, PlusCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

const CreateDCE = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [generatingDocument, setGeneratingDocument] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title: '',
      sourceMaterials: '',
      category: '',
      subcategory: '',
      language: 'french',
      format: 'pdf',
      additionalNotes: ''
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Données du formulaire:", data);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Document créé avec succès",
        description: "Le document technique a été ajouté au DCE",
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

  return (
    <div className="min-h-screen bg-[#0c101b] flex flex-col">
      <header className="border-b border-[#1d2535] bg-[#0c101b] py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1 border-[#1d2535] bg-transparent text-gray-300 hover:bg-[#1d2535]/30"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft size={16} />
            Retour
          </Button>
          <h1 className="text-xl font-semibold text-white">Créer un document technique</h1>
          <div></div>
        </div>
      </header>
      
      <main className="flex-1 py-8 px-6 md:px-10 bg-[#0c101b]">
        <div className="max-w-7xl mx-auto">
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[calc(100vh-180px)]"
          >
            <ResizablePanel defaultSize={50} minSize={40}>
              <div className="h-full p-6 overflow-auto border border-[#1d2535] rounded-lg bg-[#111827]/50">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-6">
                      <div className="border-b border-[#1d2535] pb-4">
                        <h2 className="text-lg font-medium text-white">Informations du document</h2>
                        <p className="text-sm text-gray-400 mt-1">
                          Définissez les informations de base du document technique
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
                                className="bg-[#111827] border-[#1d2535] text-gray-200 focus-visible:ring-blue-500/40"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
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
                                  className="bg-[#111827] border-[#1d2535] text-gray-200 focus-visible:ring-blue-500/40 min-h-[80px]" 
                                  {...field}
                                />
                                <div className="flex gap-2">
                                  <Button 
                                    type="button" 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-xs border-[#1d2535] text-gray-300 hover:bg-[#1d2535]/30"
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
                                    className="text-xs border-[#1d2535] text-gray-300 hover:bg-[#1d2535]/30"
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
                      <div className="border-b border-[#1d2535] pb-4">
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
                                  <SelectTrigger className="bg-[#111827] border-[#1d2535] text-gray-200">
                                    <SelectValue placeholder="Sélectionner une catégorie" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#111827] border-[#1d2535] text-gray-200">
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
                                  <SelectTrigger className="bg-[#111827] border-[#1d2535] text-gray-200">
                                    <SelectValue placeholder={watchedValues.category ? "Sélectionner une sous-catégorie" : "Choisissez d'abord une catégorie"} />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#111827] border-[#1d2535] text-gray-200">
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
                      <div className="border-b border-[#1d2535] pb-4">
                        <h2 className="text-lg font-medium text-white">Format et options</h2>
                        <p className="text-sm text-gray-400 mt-1">
                          Définissez le format et les options du document
                        </p>
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
                                  <SelectTrigger className="bg-[#111827] border-[#1d2535] text-gray-200">
                                    <SelectValue placeholder="Sélectionner une langue" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#111827] border-[#1d2535] text-gray-200">
                                    <SelectItem value="french">Français</SelectItem>
                                    <SelectItem value="english">Anglais</SelectItem>
                                    <SelectItem value="german">Allemand</SelectItem>
                                    <SelectItem value="spanish">Espagnol</SelectItem>
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
                                  <SelectTrigger className="bg-[#111827] border-[#1d2535] text-gray-200">
                                    <SelectValue placeholder="Sélectionner un format" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#111827] border-[#1d2535] text-gray-200">
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
                            <FormLabel className="text-gray-300">Notes additionnelles</FormLabel>
                            <FormDescription className="text-gray-500">
                              Ajoutez des informations spécifiques ou instructions pour ce document
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="Informations complémentaires, consignes spécifiques..." 
                                className="bg-[#111827] border-[#1d2535] text-gray-200 focus-visible:ring-blue-500/40 min-h-[120px]" 
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
                          className="w-full mb-4 bg-[#0075FF]/10 border-[#0075FF]/20 text-[#0099FF] hover:bg-[#0075FF]/20"
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
                        className="w-full bg-[#0099FF] hover:bg-[#0075FF] text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>Enregistrement en cours...</>
                        ) : (
                          <>
                            <PlusCircle size={16} className="mr-2" />
                            Créer le document
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full border-[#1d2535] text-gray-300 hover:bg-[#1d2535]/30" 
                        onClick={() => navigate('/dashboard')}
                        disabled={isLoading}
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle className="bg-[#1d2535]" />
            
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full p-6 overflow-auto border border-[#1d2535] rounded-lg bg-[#111827]/50">
                {!watchedValues.title && !watchedValues.category ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6 border-2 border-dashed border-[#1d2535] rounded-lg">
                    <FileText className="h-16 w-16 text-gray-500 mb-4 opacity-30" />
                    <h3 className="text-lg font-medium text-white mb-2">Aucun contenu créé pour le moment</h3>
                    <p className="text-gray-400 max-w-md">
                      Suivez les étapes sur la gauche pour générer votre premier contenu.
                      Tout le contenu apparaîtra ici.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="border-b border-[#1d2535] pb-4 mb-6">
                      <h2 className="text-lg font-medium text-white">Prévisualisation du document</h2>
                      <p className="text-sm text-gray-400 mt-1">
                        Aperçu du document technique en cours de création
                      </p>
                    </div>
                    
                    <Card className="bg-[#111827] border border-[#1d2535] overflow-hidden">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#0075FF]/10 p-2 rounded-md">
                              <FileText className="h-6 w-6 text-[#0099FF]" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-lg line-clamp-1 text-white">
                                {watchedValues.title || "Titre du document"}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                {watchedValues.category && (
                                  <span className="text-xs bg-[#0075FF]/20 text-[#0099FF] px-2 py-1 rounded-full">
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
                                {watchedValues.language === 'english' && "Anglais"}
                                {watchedValues.language === 'german' && "Allemand"}
                                {watchedValues.language === 'spanish' && "Espagnol"}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-[#111827] border border-[#1d2535]">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {watchedValues.title && (
                            <div className="border-b border-[#1d2535] pb-3">
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
                                    <span className="text-[#0099FF] underline">{link}</span>
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
                    
                    <div className="bg-[#111827] border border-[#1d2535] rounded-lg p-4">
                      <h5 className="text-sm font-medium mb-2 text-gray-300">Informations sur le format</h5>
                      
                      <div className="space-y-2 text-xs text-gray-400">
                        <div className="flex justify-between">
                          <span>Type de fichier:</span>
                          <span className="font-medium text-gray-300">
                            {watchedValues.format === 'pdf' && "Document PDF"}
                            {watchedValues.format === 'docx' && "Document Microsoft Word"}
                            {watchedValues.format === 'xlsx' && "Feuille de calcul Microsoft Excel"}
                            {watchedValues.format === 'md' && "Document Markdown"}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Langue:</span>
                          <span className="font-medium text-gray-300">
                            {watchedValues.language === 'french' && "Français"}
                            {watchedValues.language === 'english' && "Anglais"}
                            {watchedValues.language === 'german' && "Allemand"}
                            {watchedValues.language === 'spanish' && "Espagnol"}
                          </span>
                        </div>
                        
                        {watchedValues.category && (
                          <div className="flex justify-between">
                            <span>Catégorie:</span>
                            <span className="font-medium text-gray-300">
                              {watchedValues.category === 'technique' && "Document technique"}
                              {watchedValues.category === 'administratif' && "Document administratif"}
                              {watchedValues.category === 'planning' && "Planning et délais"}
                              {watchedValues.category === 'financier' && "Document financier"}
                            </span>
                          </div>
                        )}
                        
                        {watchedValues.subcategory && (
                          <div className="flex justify-between">
                            <span>Type de document:</span>
                            <span className="font-medium text-gray-300">{watchedValues.subcategory}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
    </div>
  );
};

export default CreateDCE;
