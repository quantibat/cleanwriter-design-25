
import React from 'react';
import { Home, Briefcase, PlusCircle, Settings, Gift, BellIcon, Users, Zap, UserRound } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';
import { useNotifications } from '@/contexts/NotificationContext';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SidebarNavigation = ({
  activeTab = 'tools',
  onTabChange
}: SidebarNavigationProps) => {
  const { open } = useSidebar();
  const location = useLocation();
  const { unreadCount } = useNotifications();
  const { user, isAffiliate } = useAuth();
  
  const handleTabChange = (tab: string) => {
    onTabChange?.(tab);
  };
  
  // Get avatar URL from user metadata
  const getAvatarUrl = () => {
    if (user?.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url;
    } else if (user?.app_metadata?.provider === 'google' && user?.user_metadata?.picture) {
      return user.user_metadata.picture;
    }
    return null;
  };
  
  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name[0].toUpperCase();
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };
  
  return (
    <div className={cn("h-screen border-r border-sidebar-border z-30 bg-sidebar/95 backdrop-blur-md", "transition-all duration-300 ease-in-out flex flex-col", open ? "w-64" : "w-16")}>
      {/* Brand logo */}
      <div className="flex items-center justify-center h-16 border-b border-sidebar-border shrink-0">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl text-foreground">
            <span className="text-blue-400">DCE</span>Manager
          </span>
        </Link>
      </div>

      {/* User profile */}
      {user && (
        <div className={cn(
          "flex items-center px-3 py-4 border-b border-sidebar-border",
          open ? "justify-start" : "justify-center"
        )}>
          <Link to="/account" className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={getAvatarUrl()} />
              <AvatarFallback className="bg-blue-500 text-white">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            {open && (
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[150px]">
                  {user.user_metadata?.full_name || user.email}
                </span>
                <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                  {user.email}
                </span>
              </div>
            )}
          </Link>
        </div>
      )}

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
            <Link to="/affiliate" className={cn("block py-2.5 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/affiliate' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")}>
              <Users className="h-5 w-5" />
              <span className={open ? "ml-3" : "hidden"}>Affiliation</span>
            </Link>
          </li>
          <li>
            <Link to="/upgrade-plan" className={cn("block py-2.5 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/upgrade-plan' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")}>
              <Zap className="h-5 w-5" />
              <span className={open ? "ml-3" : "hidden"}>Upgrader son plan</span>
            </Link>
          </li>
          <li>
            <Link to="/account" className={cn("block py-2.5 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/account' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")}>
              <UserRound className="h-5 w-5" />
              <span className={open ? "ml-3" : "hidden"}>Mon compte</span>
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Footer */}
      <div className="shrink-0 border-t border-sidebar-border p-3">
        <p className="text-xs text-center text-muted-foreground">
          © {new Date().getFullYear()} DCEManager
        </p>
      </div>
    </div>
  );
};

export default SidebarNavigation;
