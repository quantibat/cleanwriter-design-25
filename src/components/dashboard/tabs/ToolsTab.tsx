
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderPlus, ArrowRight } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const ToolsTab = () => {
  const { isPremiumUser } = useAuth();
  const navigate = useNavigate();

  const handleCreateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Si l'utilisateur n'est pas premium, on empêche la navigation par défaut
    // et on redirige vers la page d'essai gratuit
    if (!isPremiumUser) {
      e.preventDefault();
      toast({
        title: "Fonctionnalité premium",
        description: "Cette section nécessite un abonnement premium. Découvrez notre essai gratuit de 7 jours.",
        variant: "default"
      });
      navigate('/free-trial');
    }
  };

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-bold">Outils de gestion</h2>
      <p className="text-muted-foreground">Utilisez nos outils pour gérer efficacement vos dossiers de consultation.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors w-full">
          <CardHeader>
            <div className="bg-blue-500/20 p-2 rounded-md w-fit mb-3">
              <FolderPlus className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle>Créer un DCE</CardTitle>
            <CardDescription>Créez un nouveau dossier de consultation avec tous les documents nécessaires</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 mt-4" asChild>
              <Link to="/create-dce" onClick={handleCreateClick}>
                Créer <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ToolsTab;
