
import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { TableView } from '@/components/TableView';
import { SidebarProject } from '@/components/SideBarProject';

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
  const projets = [
    {
      id: 1,
      title: "Refonte du site vitrine",
      date: "2025-03-10",
      created_at: "2025-01-15",
      status: "En cours",
      collaborateur: "Julie Martin",
      type: "Projet Web",
    },
    {
      id: 2,
      title: "Application mobile RH",
      date: "2025-01-22",
      created_at: "2024-12-01",
      status: "Terminé",
      collaborateur: "Thomas Dupont",
      type: "Application Mobile",
    },
    {
      id: 3,
      title: "Application mobile RH",
      date: "2025-01-22",
      created_at: "2024-12-01",
      status: "Terminé",
      collaborateur: "Thomas Dupont",
      type: "Application Mobile",
    },
    {
      id: 4,
      title: "Campagne marketing Printemps",
      date: "2025-02-15",
      created_at: "2025-01-05",
      status: "En attente",
      collaborateur: "Laura Bernard",
      type: "Communication",
    },
    {
      id: 5,
      title: "Intégration maquette Figma",
      date: "2025-02-02",
      created_at: "2025-01-10",
      status: "Terminé",
      collaborateur: "Alice Moreau",
      type: "Intégration Web",
    }
  ];

  return (
    <DashboardLayout activeTab="projects" breadcrumbs={breadcrumbs}>
      <div className="flex mt-4 gap-4">
        <SidebarProject/>
        <TableView folders={projets}/>
      </div>
    </DashboardLayout>
  );
};

export default ViewProject;
