
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const CreateDCE = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate creating a DCE
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "DCE créé avec succès",
        description: "Votre nouveau dossier a été créé",
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="py-6 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft size={16} />
              Retour
            </Button>
            <h1 className="text-xl font-semibold mt-4">Créer un nouveau DCE</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Your form fields would go here */}
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Création en cours..." : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Créer le DCE
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateDCE;
