
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, FileText as FileTextIcon, File as FileIcon, Youtube as YoutubeIcon, Database } from "lucide-react";

interface ProjectsTableProps {
  projects: any[];
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects }) => {
  const navigate = useNavigate();

  const getIconForType = (type: string) => {
    switch(type) {
      case "newsletter":
      case "Youtube to Newsletter":
        return <YoutubeIcon className="h-4 w-4 text-red-500" />;
      case "transcript":
      case "Transcription":
        return <FileTextIcon className="h-4 w-4 text-blue-500" />;
      case "summary":
      case "Résumé":
        return <FileIcon className="h-4 w-4 text-green-500" />;
      default:
        return <Database className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Éléments</TableHead>
            <TableHead>Date de modification</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="cursor-pointer hover:bg-accent/50" onClick={() => navigate(`/view-project/${project.id}`, { state: { project } })}>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getIconForType(project.option_type)}
                  <span>{project.option_type || 'Non défini'}</span>
                </div>
              </TableCell>
              <TableCell>{project.elements || 0}</TableCell>
              <TableCell>{new Date(project.updated_at).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-project/${project.id}`, { state: { project } });
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/delete-project/${project.id}`, { state: { project } });
                    }}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsTable;
