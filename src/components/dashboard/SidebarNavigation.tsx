
import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface SidebarNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SidebarNavigation = ({
  activeTab = 'tools',
  onTabChange
}: SidebarNavigationProps) => {
  const { open } = useSidebar();

  return <div className={cn("h-16 border-b border-sidebar-border z-30 bg-sidebar/95 backdrop-blur-md w-full", "transition-all duration-300 ease-in-out flex items-center justify-center")}>
      {/* Brand logo */}
      <div className="flex items-center h-full px-6 border-r border-sidebar-border shrink-0">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl text-foreground">
            <span className="text-blue-400">DCE</span>Manager
          </span>
        </Link>
      </div>

      {/* Empty space where navigation used to be */}
      <div className="flex-1 h-full flex items-center px-4">
        {/* Navigation items have been moved to DashboardLayout breadcrumb section */}
      </div>
    </div>;
};

export default SidebarNavigation;
