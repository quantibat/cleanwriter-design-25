
import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, Edit, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Breadcrumbs from '@/components/Breadcrumbs';

const ViewDCE = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  // Get project from location state or fetch it based on ID
  const project = location.state?.project || null;
  
  // If project not found, handle it
  if (!project) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Dossier non trouvé</h1>
            <p className="mb-6">Le dossier que vous cherchez n'existe pas ou a été supprimé.</p>
            <Button onClick={() => navigate('/dashboard')}>
              Retour au tableau de bord
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleEdit = () => {
    navigate(`/edit-dce/${id}`, { state: { project } });
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Détails du dossier' }
        ]} />
        
        {/* Header */}
        <header className="border-b border-white/5 bg-background/20 backdrop-blur-md py-4 px-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft size={16} />
              Retour
            </Button>
            <h1 className="text-xl font-semibold">Détails du dossier</h1>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEdit}
            >
              <Edit size={16} className="mr-2" />
              Modifier
            </Button>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 py-8 px-6 md:px-10">
          <div className="space-y-8">
            {/* Document header */}
            <div className="bg-card/20 backdrop-blur-sm border border-white/5 rounded-lg p-8 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="bg-blue-500/10 p-4 rounded-md">
                  <FileText className="h-10 w-10 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <div className="text-sm text-muted-foreground">Avancement</div>
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
            
            {/* Documents section */}
            <Card className="bg-card/30 border border-white/10">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Documents associés</h2>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Aucun document n'a encore été ajouté à ce dossier.</p>
                  <Button className="mt-4" variant="outline" onClick={handleEdit}>
                    Modifier ce dossier
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Retour au tableau de bord
              </Button>
              <Button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600">
                <Edit className="h-4 w-4 mr-2" />
                Modifier ce dossier
              </Button>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default ViewDCE;
