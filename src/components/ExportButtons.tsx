
import React from 'react';
import { FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ExportButtonsProps {
  projectData: any;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ projectData }) => {
  const exportToWord = () => {
    // Simulation d'export vers Word
    console.log('Exporting to Word:', projectData);
    toast({
      title: "Export vers Word",
      description: "L'export vers Word sera bientôt disponible",
    });
  };

  const exportToExcel = () => {
    // Simulation d'export vers Excel
    console.log('Exporting to Excel:', projectData);
    toast({
      title: "Export vers Excel",
      description: "L'export vers Excel sera bientôt disponible",
    });
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={exportToWord}
        className="text-blue-500 border-blue-500/30 hover:bg-blue-500/10"
      >
        <FileText size={16} className="mr-2" />
        Export Word
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={exportToExcel}
        className="text-green-500 border-green-500/30 hover:bg-green-500/10"
      >
        <FileSpreadsheet size={16} className="mr-2" />
        Export Excel
      </Button>
    </div>
  );
};

export default ExportButtons;
