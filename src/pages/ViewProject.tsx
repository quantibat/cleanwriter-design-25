
import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, Edit, FileText, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Badge } from '@/components/ui/badge';

const ViewProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  // Get project from location state or fetch it based on ID
  const project = location.state?.project || null;
  
  // If project not found, handle it
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center w-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Projet non trouvé</h1>
          <p className="mb-6">Le projet que vous cherchez n'existe pas ou a été supprimé.</p>
          <Button onClick={() => navigate('/projects')}>
            Retour aux projets
          </Button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/edit-project/${id}`, { state: { project } });
  };

  const handleDelete = () => {
    navigate(`/delete-project/${id}`, { state: { project } });
  };

  const breadcrumbs = [
    { label: 'Projets', path: '/projects' },
    { label: project.title }
  ];

  const getIconForType = (type: string) => {
    switch(type) {
      case "Youtube to Newsletter":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Youtube to Newsletter</Badge>;
      case "Transcription":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Transcription</Badge>;
      case "Résumé":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Résumé</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">{type}</Badge>;
    }
  };

  return (
    <DashboardLayout activeTab="projects" breadcrumbs={breadcrumbs}>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1 mb-4 sm:mb-0"
            onClick={() => navigate('/projects')}
          >
            <ArrowLeft size={16} />
            Retour aux projets
          </Button>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEdit}
              className="w-full sm:w-auto"
            >
              <Edit size={16} className="mr-2" />
              Modifier
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDelete}
              className="w-full sm:w-auto text-red-500 hover:text-red-700 hover:bg-red-100/10"
            >
              <Trash2 size={16} className="mr-2" />
              Supprimer
            </Button>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Document header */}
          <div className="bg-card/20 backdrop-blur-sm border border-white/5 rounded-lg p-4 sm:p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="bg-blue-500/10 p-4 rounded-md">
                <FileText className="h-10 w-10 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                  <h1 className="text-2xl font-bold">{project.title}</h1>
                  {getIconForType(project.type)}
                </div>
                <p className="text-muted-foreground mb-6">{project.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Date de création</div>
                      <div>{project.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Progression</div>
                      <div>{project.progress}% terminé</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Collaborateurs</div>
                      <div>{project.collaborators} personnes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project details */}
          <Card className="bg-card/30 border border-white/10">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Description détaillée</h2>
              <p className="whitespace-pre-line text-muted-foreground">{project.details}</p>
            </CardContent>
          </Card>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" onClick={() => navigate('/projects')} className="w-full sm:w-auto">
              Retour aux projets
            </Button>
            <Button onClick={handleEdit} className="w-full sm:w-auto">
              <Edit className="h-4 w-4 mr-2" />
              Modifier ce projet
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewProject;
