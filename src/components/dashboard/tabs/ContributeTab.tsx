
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HandHeart, Users, MessageSquare, Lightbulb, Share2 } from "lucide-react";

const ContributeTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Contribuer à la communauté</h2>
        <p className="text-muted-foreground">Participez au développement de notre communauté et partagez votre expertise</p>
      </div>
      
      <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <HandHeart className="h-5 w-5 mr-2 text-blue-400" />
            Pourquoi contribuer?
          </CardTitle>
          <CardDescription className="text-base">
            En contribuant à la communauté, vous participez à l'amélioration de l'outil tout en développant votre réseau et vos compétences.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader>
            <div className="bg-blue-500/20 p-2 rounded-md w-fit mb-3">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle>Rejoindre la communauté</CardTitle>
            <CardDescription>Échangez avec d'autres utilisateurs passionnés et partagez vos expériences</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 mt-4">
              Rejoindre le forum
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader>
            <div className="bg-blue-500/20 p-2 rounded-md w-fit mb-3">
              <MessageSquare className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle>Soumettre des retours</CardTitle>
            <CardDescription>Partagez vos idées et suggestions pour améliorer l'expérience utilisateur</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 mt-4">
              Donner mon avis
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader>
            <div className="bg-blue-500/20 p-2 rounded-md w-fit mb-3">
              <Lightbulb className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle>Proposer des idées</CardTitle>
            <CardDescription>Soumettez vos idées de fonctionnalités ou d'améliorations pour nos outils</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 mt-4">
              Soumettre une idée
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader>
            <div className="bg-blue-500/20 p-2 rounded-md w-fit mb-3">
              <Share2 className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle>Partager l'outil</CardTitle>
            <CardDescription>Aidez-nous à développer notre communauté en partageant l'outil sur vos réseaux</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 mt-4">
              Partager
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContributeTab;
