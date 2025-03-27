
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ActiveContent } from '@/hooks/useActiveContent';

interface GeneratedContentCardProps {
  content: ActiveContent;
  onDownload?: () => void;
}

const GeneratedContentCard: React.FC<GeneratedContentCardProps> = ({ 
  content, 
  onDownload 
}) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{content.subject}</CardTitle>
          {onDownload && (
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="h-4 w-4 mr-1" /> Télécharger PDF
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap text-sm">
          {content.body}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneratedContentCard;
