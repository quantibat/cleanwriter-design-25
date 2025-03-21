
import React from 'react';
import { Copy, Save, ThumbsUp, ThumbsDown, RefreshCw, Edit, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Content {
  id: string;
  title: string;
  body: string;
  wordCount: number;
  creditsUsed: number;
}

interface ContentDisplayProps {
  content: Content | null;
  isLoading: boolean;
  onSave: (content: Content) => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, isLoading, onSave }) => {
  const { userCredits, updateCredits } = useAuth();
  
  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content.body);
      toast({
        title: "Contenu copié",
        description: "Le contenu a été copié dans le presse-papier.",
      });
    }
  };
  
  const handleSave = () => {
    if (content) {
      onSave(content);
      toast({
        title: "Contenu enregistré",
        description: "Le contenu a été enregistré dans vos projets.",
      });
    }
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

  if (!content) {
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
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-[#1d2535]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium text-white">
            <span className="text-gray-400 mr-2">Titre:</span> {content.title} 
            <span className="ml-2 text-yellow-400">✨</span>
          </h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCopy} className="hover:bg-blue-500/10 hover:text-blue-400">
              <Copy size={16} className="mr-1" /> Copier
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSave} className="hover:bg-green-500/10 hover:text-green-400">
              <Save size={16} className="mr-1" /> Enregistrer
            </Button>
          </div>
        </div>
        <div className="flex space-x-1 mt-2">
          <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7 rounded-sm hover:bg-blue-500/10 hover:text-blue-400">
            <ThumbsUp size={14} className="mr-1" /> Améliorer
          </Button>
          <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7 rounded-sm hover:bg-purple-500/10 hover:text-purple-400">
            <RefreshCw size={14} className="mr-1" /> Régénérer
          </Button>
          <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7 rounded-sm hover:bg-amber-500/10 hover:text-amber-400">
            <Edit size={14} className="mr-1" /> Modifier
          </Button>
          <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7 rounded-sm hover:bg-red-500/10 hover:text-red-400">
            <ThumbsDown size={14} className="mr-1" />
          </Button>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <div className="prose prose-invert max-w-full">
          {content.body.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-200">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-8 pt-4 border-t border-[#1d2535] text-sm flex justify-between text-gray-500">
          <div>{content.wordCount} mots - {Math.round(content.wordCount / 200)} min de lecture</div>
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-amber-500" />
            <span>{content.creditsUsed} Crédits utilisés</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDisplay;
