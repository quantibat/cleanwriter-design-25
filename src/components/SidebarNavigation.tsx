
import React from 'react';
import { Home, Briefcase, PlusCircle, Settings, Gift, BellIcon, Users, Zap } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';
import { useNotifications } from '@/contexts/NotificationContext';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

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
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();
  const { isPremiumUser, isAffiliate } = useAuth();
  
  const handleTabChange = (tab: string) => {
    onTabChange?.(tab);
  };
  
  const handlePremiumLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Vérifier si le lien concerne une fonctionnalité premium et si l'utilisateur n'est pas premium
    if (!isPremiumUser && (path === '/projects' || path === '/dashboard')) {
      e.preventDefault();
      toast({
        title: "Fonctionnalité premium",
        description: "Cette section nécessite un abonnement premium. Découvrez notre essai gratuit de 7 jours.",
        variant: "default"
      });
      navigate('/upgrade-plan');
    }
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

      {/* Menu */}
      <div className="flex-1 overflow-y-auto pt-5 px-3">
        <ul className="space-y-1">
          <li>
            <Link to="/dashboard" className={cn("block py-2.5 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/dashboard' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")} onClick={e => {
            handleTabChange('tools');
            handlePremiumLink(e, '/dashboard');
          }}>
              <Home className="h-5 w-5" />
              <span className={open ? "ml-3" : "hidden"}>Tableau de bord</span>
            </Link>
          </li>
          
          <li>
            
          </li>
          
          <li>
            
          </li>
          <li>
            <Link to="/projects" className={cn("block py-2.5 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/projects' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")} onClick={e => handlePremiumLink(e, '/projects')}>
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
          {isPremiumUser && (
            <li>
              <Link to="/affiliate" className={cn("block py-2.5 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/affiliate' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")}>
                <Users className="h-5 w-5" />
                <span className={open ? "ml-3" : "hidden"}>Affiliation</span>
              </Link>
            </li>
          )}
          <li>
            <Link to="/upgrade-plan" className={cn("block py-2.5 px-4 rounded-lg transition-colors", "flex items-center", location.pathname === '/upgrade-plan' ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/30 text-sidebar-foreground")}>
              <Zap className="h-5 w-5" />
              <span className={open ? "ml-3" : "hidden"}>Upgrader son plan</span>
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
