
import React, { useRef } from 'react';
import { Copy, ThumbsUp, ThumbsDown, Save, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface ContentItem {
  topicId?: string;
  subject: string;
  body: string;
}

interface ContentDisplayProps {
  contents: ContentItem[] | null;
  content?: ContentItem | null; // Single content option
  isLoading: boolean;
  onDownloadPDF?: () => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ contents, content, isLoading, onDownloadPDF }) => {
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);

  // Convert single content to array if provided
  const contentItems = content ? [content] : contents;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Contenu copié",
      description: "Le contenu a été copié dans le presse-papier"
    });
  };

  if (isLoading) {
    return (
      <div className="h-full p-6 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/2 mb-6"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-4 bg-gray-700 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!contentItems || contentItems.length === 0) {
    return (
      <div className="h-full p-6 overflow-auto border border-dashed border-[#1d2535] rounded-lg flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <h3 className="text-lg font-medium text-white mb-2">Sélectionnez un sujet</h3>
          <p className="text-gray-400">
            Cliquez sur un sujet dans la liste à gauche pour voir le contenu généré.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-auto">
      {contentItems.map((item, index) => (
        <div key={index} className="mb-8 border border-[#1d2535] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1d2535]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-white">
                <span className="text-gray-400 mr-2">Subject:</span> {item.subject} 
                <span className="ml-2 text-yellow-400">✨</span>
              </h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleCopy(item.body)}>
                  <Copy size={16} className="mr-1" /> Copier
                </Button>
                {onDownloadPDF && (
                  <Button variant="ghost" size="sm" onClick={onDownloadPDF}>
                    <Download size={16} className="mr-1" /> PDF
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Save size={16} className="mr-1" /> Enregistrer
                </Button>
              </div>
            </div>
            <div className="flex space-x-1 mt-2">
              <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7 rounded-sm">
                <ThumbsUp size={14} className="mr-1" /> Améliorer
              </Button>
              <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7 rounded-sm">
                <span className="mr-1">↺</span> Régénérer
              </Button>
              <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7 rounded-sm">
                <span className="mr-1">✎</span> Modifier
              </Button>
              <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7 rounded-sm">
                <span className="mr-1">☼</span> Format
              </Button>
              <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7 rounded-sm">
                <span className="mr-1">☁</span> Ton
              </Button>
              <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7 rounded-sm">
                <span className="mr-1">♫</span> Style
              </Button>
              <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7 rounded-sm">
                <ThumbsDown size={14} className="mr-1" />
              </Button>
            </div>
          </div>
          <div className="p-6" ref={contentRef}>
            <div className="prose prose-invert max-w-full">
              {item.body.split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-4 text-gray-200">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-[#1d2535] text-sm flex justify-between text-gray-500">
              <div>{item.body.split(/\s+/).length} mots - {Math.max(1, Math.round(item.body.split(/\s+/).length / 200))} min de lecture</div>
              <div className="flex items-center gap-2">
                <span>16171 Crédits utilisés (1590 pour l'analyse de contenu et 270 pour la génération)</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentDisplay;
