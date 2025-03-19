
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderPlus, ArrowRight } from "lucide-react";

const ToolsTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Outils de gestion</h2>
      <p className="text-muted-foreground">Utilisez nos outils pour gérer efficacement vos dossiers de consultation.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader>
            <div className="bg-blue-500/20 p-2 rounded-md w-fit mb-3">
              <FolderPlus className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle>Créer un DCE</CardTitle>
            <CardDescription>Créez un nouveau dossier de consultation avec tous les documents nécessaires</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 mt-4"
              asChild
            >
              <Link to="/create-dce">
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
