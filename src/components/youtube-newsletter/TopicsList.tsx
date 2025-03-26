
import React from 'react';
import { Check, CheckCircle2, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Topic {
  id: string;
  title: string;
  description: string;
}

interface TopicsListProps {
  topics: Topic[];
  selectedTopics: string[];
  onSelectTopic: (topicId: string) => void;
  onDownloadPDF?: () => void;
  isLoading: boolean;
}

const TopicsList: React.FC<TopicsListProps> = ({ 
  topics, 
  selectedTopics, 
  onSelectTopic,
  onDownloadPDF,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#171a2e] p-4 rounded-lg border border-[#2a2f45]">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="text-center p-6 text-gray-400">
        Générez une newsletter pour voir les sujets proposés
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {selectedTopics.length > 0 && onDownloadPDF && (
        <div className="flex justify-end mb-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 text-xs text-blue-400 border-blue-500/30 hover:bg-blue-500/10"
            onClick={onDownloadPDF}
          >
            <Download size={14} />
            Télécharger en PDF
          </Button>
        </div>
      )}
      
      {topics.map((topic) => {
        const isSelected = selectedTopics.includes(topic.id);
        
        return (
          <div 
            key={topic.id}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              isSelected 
                ? 'bg-[#1c2440] border-blue-500/50' 
                : 'bg-[#171a2e] border-[#2a2f45] hover:border-gray-500'
            }`}
            onClick={() => onSelectTopic(topic.id)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {isSelected ? (
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                ) : (
                  <div className="h-5 w-5 rounded-full border border-gray-500"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white mb-1">{topic.title}</h3>
                <p className="text-sm text-gray-400">{topic.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopicsList;
