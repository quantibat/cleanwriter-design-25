import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HandHeart, Users, MessageSquare, Lightbulb, Share2 } from "lucide-react";
const ContributeTab = () => {
  return <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Collaborer sur les DCE</h2>
        <p className="text-muted-foreground">Travaillez en équipe sur vos dossiers de consultation et partagez votre expertise</p>
      </div>
      
      <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <HandHeart className="h-5 w-5 mr-2 text-blue-400" />
            Pourquoi collaborer?
          </CardTitle>
          <CardDescription className="text-base">
            La collaboration sur vos DCE permet d'améliorer la qualité des dossiers, d'accélérer leur traitement et de centraliser les informations importantes.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        
        
        
        
        
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader>
            <div className="bg-blue-500/20 p-2 rounded-md w-fit mb-3">
              <Share2 className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle>Partage externe</CardTitle>
            <CardDescription>Partagez vos dossiers avec des intervenants externes de manière sécurisée</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 mt-4">
              Configurer le partage
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default ContributeTab;