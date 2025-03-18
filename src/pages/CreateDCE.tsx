
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, FileText, FileCheck, FolderOpen, LayoutList } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useForm } from "react-hook-form";

const CreateDCE = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Formulaire avec React Hook Form
  const form = useForm({
    defaultValues: {
      title: '',
      project: '',
      description: '',
      type: '',
      documents: ''
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Données du formulaire:", data);
    // Simulation d'un délai de traitement
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const watchedValues = form.watch();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-background/20 backdrop-blur-md py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft size={16} />
            Retour
          </Button>
          <h1 className="text-xl font-semibold">Créer un nouveau DCE</h1>
          <div></div> {/* Spacer pour centrer le titre */}
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[calc(100vh-180px)]"
          >
            {/* Panneau du formulaire (gauche) */}
            <ResizablePanel defaultSize={60} minSize={40}>
              <div className="h-full p-4 overflow-auto">
                {/* Formulaire */}
                <div className="bg-card/20 backdrop-blur-sm border border-white/5 rounded-lg p-8 shadow-lg">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Section informations générales */}
                      <div className="space-y-6">
                        <div className="border-b border-white/10 pb-4">
                          <h2 className="text-lg font-medium">Informations générales</h2>
                          <p className="text-sm text-muted-foreground mt-1">
                            Informations de base pour votre dossier de consultation
                          </p>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Titre du DCE</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Ex: Construction d'un bâtiment commercial" 
                                  {...field} 
                                  className="bg-card/30"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="project"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Projet associé</FormLabel>
                              <FormControl>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="bg-card/30">
                                    <SelectValue placeholder="Sélectionner un projet" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="project1">Projet Centre Commercial</SelectItem>
                                    <SelectItem value="project2">Rénovation Bureaux Paris</SelectItem>
                                    <SelectItem value="project3">Construction Logements Lyon</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Décrivez brièvement l'objet de ce DCE..." 
                                  className="bg-card/30 min-h-[120px]" 
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {/* Section spécifications */}
                      <div className="space-y-6 pt-4">
                        <div className="border-b border-white/10 pb-4">
                          <h2 className="text-lg font-medium">Spécifications</h2>
                          <p className="text-sm text-muted-foreground mt-1">
                            Détails techniques du dossier de consultation
                          </p>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type de dossier</FormLabel>
                              <FormControl>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="bg-card/30">
                                    <SelectValue placeholder="Sélectionner un type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="public">Marché public</SelectItem>
                                    <SelectItem value="private">Marché privé</SelectItem>
                                    <SelectItem value="mixed">Mixte</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="documents"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Documents requis</FormLabel>
                              <FormControl>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="bg-card/30">
                                    <SelectValue placeholder="Sélectionner les documents" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="standard">Pack standard (CCTP, CCAP, RC)</SelectItem>
                                    <SelectItem value="full">Pack complet (CCTP, CCAP, RC, AE, plans)</SelectItem>
                                    <SelectItem value="custom">Personnalisé</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {/* Actions */}
                      <div className="pt-6 space-y-4">
                        <Button 
                          type="submit" 
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>Création en cours...</>
                          ) : (
                            <>
                              <Sparkles size={16} />
                              Créer le dossier
                            </>
                          )}
                        </Button>
                        
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => navigate('/dashboard')}
                          disabled={isLoading}
                        >
                          Annuler
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </ResizablePanel>
            
            {/* Poignée de redimensionnement */}
            <ResizableHandle withHandle />
            
            {/* Panneau de prévisualisation (droite) */}
            <ResizablePanel defaultSize={40} minSize={30}>
              <div className="h-full p-4 overflow-auto">
                <div className="bg-card/20 backdrop-blur-sm border border-white/5 rounded-lg p-8 shadow-lg h-full">
                  <div className="border-b border-white/10 pb-4 mb-6">
                    <h2 className="text-lg font-medium">Prévisualisation du dossier</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Aperçu des documents et de la structure de votre DCE
                    </p>
                  </div>
                  
                  {!watchedValues.title && !watchedValues.project && !watchedValues.type ? (
                    <div className="flex flex-col items-center justify-center h-[calc(100%-100px)] text-center">
                      <FolderOpen className="h-16 w-16 text-muted-foreground mb-4 opacity-30" />
                      <p className="text-muted-foreground">
                        Remplissez le formulaire pour voir la prévisualisation du dossier
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Informations du dossier */}
                      <Card className="bg-card/30 border border-white/10 overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-500/20 p-3 rounded-md">
                              <LayoutList className="h-6 w-6 text-blue-400" />
                            </div>
                            <div className="space-y-1 flex-1">
                              <h3 className="font-medium text-lg">
                                {watchedValues.title || "Titre du DCE"}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {watchedValues.description || "Description du projet..."}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                                  {watchedValues.project === 'project1' && "Projet Centre Commercial"}
                                  {watchedValues.project === 'project2' && "Rénovation Bureaux Paris"}
                                  {watchedValues.project === 'project3' && "Construction Logements Lyon"}
                                  {!watchedValues.project && "Projet non spécifié"}
                                </span>
                                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                                  {watchedValues.type === 'public' && "Marché public"}
                                  {watchedValues.type === 'private' && "Marché privé"}
                                  {watchedValues.type === 'mixed' && "Mixte"}
                                  {!watchedValues.type && "Type non spécifié"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Documents */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Documents inclus</h3>
                        
                        {watchedValues.documents && (
                          <div className="space-y-3">
                            {/* CCTP */}
                            <Card className="bg-card/30 border border-white/10">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="bg-blue-500/10 p-2 rounded-md">
                                    <FileText className="h-4 w-4 text-blue-400" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">CCTP</h4>
                                    <p className="text-xs text-muted-foreground">
                                      Cahier des Clauses Techniques Particulières
                                    </p>
                                  </div>
                                  <div className="ml-auto">
                                    <FileCheck className="h-4 w-4 text-green-400" />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            {/* CCAP */}
                            <Card className="bg-card/30 border border-white/10">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="bg-blue-500/10 p-2 rounded-md">
                                    <FileText className="h-4 w-4 text-blue-400" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">CCAP</h4>
                                    <p className="text-xs text-muted-foreground">
                                      Cahier des Clauses Administratives Particulières
                                    </p>
                                  </div>
                                  <div className="ml-auto">
                                    <FileCheck className="h-4 w-4 text-green-400" />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            {/* RC */}
                            <Card className="bg-card/30 border border-white/10">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="bg-blue-500/10 p-2 rounded-md">
                                    <FileText className="h-4 w-4 text-blue-400" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">RC</h4>
                                    <p className="text-xs text-muted-foreground">
                                      Règlement de Consultation
                                    </p>
                                  </div>
                                  <div className="ml-auto">
                                    <FileCheck className="h-4 w-4 text-green-400" />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            {/* Documents supplémentaires pour le pack complet */}
                            {watchedValues.documents === 'full' && (
                              <>
                                {/* AE */}
                                <Card className="bg-card/30 border border-white/10">
                                  <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                      <div className="bg-blue-500/10 p-2 rounded-md">
                                        <FileText className="h-4 w-4 text-blue-400" />
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium">AE</h4>
                                        <p className="text-xs text-muted-foreground">
                                          Acte d'Engagement
                                        </p>
                                      </div>
                                      <div className="ml-auto">
                                        <FileCheck className="h-4 w-4 text-green-400" />
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                                
                                {/* Plans */}
                                <Card className="bg-card/30 border border-white/10">
                                  <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                      <div className="bg-blue-500/10 p-2 rounded-md">
                                        <FileText className="h-4 w-4 text-blue-400" />
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium">Plans</h4>
                                        <p className="text-xs text-muted-foreground">
                                          Plans techniques du projet
                                        </p>
                                      </div>
                                      <div className="ml-auto">
                                        <FileCheck className="h-4 w-4 text-green-400" />
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </>
                            )}
                          </div>
                        )}
                        
                        {!watchedValues.documents && (
                          <div className="py-6 text-center text-muted-foreground">
                            <p>Sélectionnez le type de documents pour voir l'aperçu</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
    </div>
  );
};

export default CreateDCE;
