
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Brain, MessageSquare, Code } from "lucide-react";

const ToolsTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Outils d'IA</h2>
      <p className="text-muted-foreground">Utilisez nos outils alimentés par l'IA pour créer et améliorer votre contenu.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader>
            <div className="bg-blue-500/20 p-2 rounded-md w-fit mb-3">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle>Rédacteur de texte</CardTitle>
            <CardDescription>Créez du contenu engageant et optimisé pour le SEO</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 mt-4">
              Commencer <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader>
            <div className="bg-blue-500/20 p-2 rounded-md w-fit mb-3">
              <Brain className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle>Assistant analytique</CardTitle>
            <CardDescription>Analysez et interprétez vos données avec l'IA</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 mt-4">
              Analyser <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader>
            <div className="bg-blue-500/20 p-2 rounded-md w-fit mb-3">
              <MessageSquare className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle>Chatbot IA</CardTitle>
            <CardDescription>Discutez avec notre IA pour générer des idées</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 mt-4">
              Discuter <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader>
            <div className="bg-blue-500/20 p-2 rounded-md w-fit mb-3">
              <Code className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle>Assistant de code</CardTitle>
            <CardDescription>Générer et déboguer du code avec l'IA</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 mt-4">
              Coder <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ToolsTab;
