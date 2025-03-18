
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-background/20 backdrop-blur-md py-4 px-6">
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
      <main className="flex-1 py-12 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
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
      </main>
    </div>
  );
};

export default CreateDCE;
