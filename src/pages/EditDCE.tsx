import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Breadcrumbs from '@/components/Breadcrumbs';

const EditDCE = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get project from location state or redirect if not available
  const project = location.state?.project;
  
  // Redirect if project is not found
  if (!project) {
    navigate('/dashboard');
    return null;
  }
  
  const [formData, setFormData] = useState({
    title: project.title || '',
    description: project.description || '',
    details: project.details || '',
    date: project.date || '',
    progress: project.progress || 0,
    collaborators: project.collaborators || 0,
  });

  useEffect(() => {
    // Update form data when the project prop changes
    setFormData({
      title: project.title || '',
      description: project.description || '',
      details: project.details || '',
      date: project.date || '',
      progress: project.progress || 0,
      collaborators: project.collaborators || 0,
    });
  }, [project]);

  const handleSave = () => {
    // Implement save functionality here (e.g., API call)
    console.log('Saving data:', formData);
    toast({
      title: "DCE mis à jour",
      description: "Les informations du dossier ont été mises à jour avec succès.",
    });
    navigate('/dashboard'); // Redirect to dashboard after save
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Modifier le DCE' }
        ]} />
        
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
              Annuler
            </Button>
            <h1 className="text-xl font-semibold">Modifier le DCE</h1>
            <Button 
              className="gap-1 bg-blue-500 hover:bg-blue-600"
              size="sm" 
              onClick={handleSave}
            >
              <Save size={16} />
              Enregistrer
            </Button>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 py-8 px-6">
          <div className="max-w-7xl mx-auto flex gap-6">
            {/* Form section - 50% width */}
            <div className="w-1/2">
              <Card className="bg-card/20 shadow-md">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Title input */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre du DCE</Label>
                      <Input 
                        id="title" 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Ex: Rénovation Mairie" 
                        className="bg-background/50"
                      />
                    </div>
                    
                    {/* Description input */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description courte</Label>
                      <Input 
                        id="description" 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Résumé du projet en quelques mots" 
                        className="bg-background/50"
                      />
                    </div>
                    
                    {/* Detailed description */}
                    <div className="space-y-2">
                      <Label htmlFor="details">Description détaillée</Label>
                      <Textarea 
                        id="details" 
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        placeholder="Entrez les détails du projet..." 
                        className="min-h-32 bg-background/50"
                      />
                    </div>
                    
                    {/* Date */}
                    <div className="space-y-2">
                      <Label htmlFor="date">Date de création</Label>
                      <Input 
                        id="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="JJ/MM/AAAA" 
                        className="bg-background/50"
                      />
                    </div>
                    
                    {/* Progression slider */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="progress">Progression</Label>
                        <span className="text-sm text-muted-foreground">{formData.progress}%</span>
                      </div>
                      <Slider
                        id="progress"
                        defaultValue={[formData.progress]}
                        max={100}
                        step={5}
                        className="w-full"
                        onValueChange={(value) => setFormData({ ...formData, progress: value[0] })}
                      />
                    </div>
                    
                    {/* Collaborators */}
                    <div className="space-y-2">
                      <Label htmlFor="collaborators">Nombre de collaborateurs</Label>
                      <Input 
                        id="collaborators" 
                        name="collaborators"
                        type="number"
                        value={formData.collaborators}
                        onChange={handleChange}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Preview section - 50% width */}
            <div className="w-1/2">
              <Card className="bg-card/20 shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Aperçu du DCE</h2>
                  
                  {formData.title ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold">{formData.title}</h3>
                        <p className="text-muted-foreground mt-1">{formData.description}</p>
                      </div>
                      
                      <div className="bg-card/30 p-4 rounded-md">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Date:</span>
                          <span>{formData.date || 'Non spécifiée'}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Progression:</span>
                          <span>{formData.progress}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Collaborateurs:</span>
                          <span>{formData.collaborators}</span>
                        </div>
                      </div>
                      
                      {formData.details && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Description détaillée:</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{formData.details}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Veuillez remplir le formulaire pour voir l'aperçu.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default EditDCE;
