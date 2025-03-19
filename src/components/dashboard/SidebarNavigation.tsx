import React from 'react';
import { Home, Briefcase, PlusCircle, Settings, Gift, BellIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';
import { useNotifications } from '@/contexts/NotificationContext';
import { cn } from '@/lib/utils';
interface SidebarNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}
const SidebarNavigation = ({
  activeTab = 'tools',
  onTabChange
}: SidebarNavigationProps) => {
  const {
    open
  } = useSidebar();
  const location = useLocation();
  const {
    unreadCount
  } = useNotifications();
  const handleTabChange = (tab: string) => {
    onTabChange?.(tab);
  };
  return <div className={cn("h-screen border-r border-sidebar-border z-30 bg-sidebar/95 backdrop-blur-md", "transition-all duration-300 ease-in-out flex flex-col", open ? "w-64" : "w-16")}>
      {/* Brand logo */}
      <div className="flex items-center justify-center h-16 border-b border-sidebar-border shrink-0">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl text-foreground">
            <span className="text-blue-400">DCE</span>Manager
          </span>
        </Link>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto pt-5 px-3">
        <ul className="space-y-1">
          <li>
            <Link to="/dashboard" className={cn("block py-2.5 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/dashboard' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")} onClick={() => handleTabChange('tools')}>
              <Home className="h-5 w-5" />
              <span className={open ? "ml-3" : "hidden"}>Tableau de bord</span>
            </Link>
          </li>
          
          <li>
            
          </li>
          
          <li>
            <Link to="/create-dce" className={cn("block py-2.5 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/create-dce' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")}>
              <PlusCircle className="h-5 w-5" />
              <span className={open ? "ml-3" : "hidden"}>Nouveau DCE</span>
            </Link>
          </li>
          <li>
            <Link to="/projects" className={cn("block py-2.5 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/projects' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")}>
              <Briefcase className="h-5 w-5" />
              <span className={open ? "ml-3" : "hidden"}>Projets</span>
            </Link>
          </li>
          <li>
            <Link to="/contribute" className={cn("block py-2.5 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/contribute' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")} onClick={() => handleTabChange('contribute')}>
              <Gift className="h-5 w-5" />
              <span className={open ? "ml-3" : "hidden"}>Contribuer</span>
            </Link>
          </li>
          <li>
            
          </li>
        </ul>
      </div>
      
      {/* Footer */}
      <div className="shrink-0 border-t border-sidebar-border p-3">
        <p className="text-xs text-center text-muted-foreground">
          © {new Date().getFullYear()} DCEManager
        </p>
      </div>
    </div>;
};
export default SidebarNavigation;