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
  const {
    open
  } = useSidebar();
  const location = useLocation();
  const {
    unreadCount
  } = useNotifications();
  const {
    user,
    isAffiliate
  } = useAuth();
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
  return;
};
export default SidebarNavigation;