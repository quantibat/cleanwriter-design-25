
import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Grid, FolderKanban, Gift, Users } from 'lucide-react';

interface SidebarNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SidebarNavigation = ({
  activeTab = 'tools',
  onTabChange
}: SidebarNavigationProps) => {
  const { open } = useSidebar();

  return (
    <div className="bg-[#1a1f2b] border-b border-white/5 py-3 px-6">
      <div className="flex items-center">
        <Link to="/dashboard" className="flex items-center gap-2 mr-12">
          <div className="bg-[#00a2ff] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
            <span className="text-xl">T</span>
          </div>
          <div className="text-white font-semibold text-xl">
            Tugan<span className="text-[#00a2ff]">.ai</span>
            <div className="text-[10px] text-gray-400 font-medium leading-none mt-0.5">ENHANCED</div>
          </div>
        </Link>

        <div className="flex items-center space-x-8">
          <Link to="/dashboard" 
            className={cn(
              "flex items-center gap-2 text-sm font-medium py-2 px-1",
              activeTab === 'tools' 
                ? "text-white border-b-2 border-[#00a2ff]" 
                : "text-gray-400 hover:text-white/80"
            )}
            onClick={() => onTabChange && onTabChange('tools')}
          >
            <Grid size={18} />
            <span>Outils</span>
          </Link>
          
          <Link to="/projects" 
            className={cn(
              "flex items-center gap-2 text-sm font-medium py-2 px-1",
              activeTab === 'projects' 
                ? "text-white border-b-2 border-[#00a2ff]" 
                : "text-gray-400 hover:text-white/80"
            )}
            onClick={() => onTabChange && onTabChange('projects')}
          >
            <FolderKanban size={18} />
            <span>Projets</span>
          </Link>
          
          <Link to="/contribute" 
            className={cn(
              "flex items-center gap-2 text-sm font-medium py-2 px-1",
              activeTab === 'contribute' 
                ? "text-white border-b-2 border-[#00a2ff]" 
                : "text-gray-400 hover:text-white/80"
            )}
            onClick={() => onTabChange && onTabChange('contribute')}
          >
            <Gift size={18} />
            <span>Contribuer</span>
          </Link>
          
          <Link to="/affiliate" 
            className={cn(
              "flex items-center gap-2 text-sm font-medium py-2 px-1",
              activeTab === 'affiliate' 
                ? "text-white border-b-2 border-[#00a2ff]" 
                : "text-gray-400 hover:text-white/80"
            )}
          >
            <Users size={18} />
            <span>Affiliation</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
