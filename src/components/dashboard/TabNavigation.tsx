
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Briefcase, UsersRound } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="w-full border-b border-white/5 bg-background/20 backdrop-blur-md">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full justify-start bg-transparent h-14 p-0 space-x-2">
          <TabsTrigger 
            value="tools" 
            className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none px-4 h-full"
          >
            <Wrench className="h-4 w-4 mr-2" />
            Outils
          </TabsTrigger>
          <TabsTrigger 
            value="projects" 
            className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none px-4 h-full"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Projets
          </TabsTrigger>
          <TabsTrigger 
            value="contribute" 
            className="flex items-center data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-400 rounded-none px-4 h-full"
          >
            <UsersRound className="h-4 w-4 mr-2" />
            Contribuer
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabNavigation;
