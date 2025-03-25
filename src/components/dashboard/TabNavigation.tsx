
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tool, FolderKanban, Lightbulb } from 'lucide-react';

interface TabNavigationProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab = 'tools', onTabChange }) => {
  const handleValueChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };
  
  return (
    <Tabs 
      value={activeTab} 
      className="w-full" 
      onValueChange={handleValueChange}
    >
      <TabsList className="bg-[#0d1320]/80 p-1">
        <TabsTrigger 
          value="tools" 
          className="flex items-center data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
        >
          <Tool size={16} className="mr-2" />
          <span className="hidden sm:inline-block">Outils</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="projects" 
          className="flex items-center data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
        >
          <FolderKanban size={16} className="mr-2" />
          <span className="hidden sm:inline-block">Projets</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="contribute" 
          className="flex items-center data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
        >
          <Lightbulb size={16} className="mr-2" />
          <span className="hidden sm:inline-block">Contribuer</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabNavigation;
