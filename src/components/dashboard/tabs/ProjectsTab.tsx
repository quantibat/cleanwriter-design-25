
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderPlus, Calendar, Clock, Users, MoreHorizontal } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Article sur l'IA générative",
    description: "Analyse des dernières avancées en IA générative et leur impact sur l'industrie.",
    date: "15 juin 2023",
    progress: 75,
    collaborators: 3
  },
  {
    id: 2,
    title: "Campagne marketing Q3",
    description: "Planification de la stratégie marketing pour le troisième trimestre 2023.",
    date: "22 juin 2023",
    progress: 30,
    collaborators: 5
  },
  {
    id: 3,
    title: "Rapport annuel 2022",
    description: "Compilation et analyse des résultats financiers de l'année 2022.",
    date: "10 mai 2023",
    progress: 100,
    collaborators: 2
  }
];

const ProjectsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vos projets</h2>
          <p className="text-muted-foreground">Gérez et suivez l'avancement de vos projets</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <FolderPlus className="h-4 w-4 mr-2" />
          Nouveau projet
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {project.progress}% terminé
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm text-muted-foreground">{project.collaborators} collaborateurs</span>
              </div>
              <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/10">
                Ouvrir
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTab;
