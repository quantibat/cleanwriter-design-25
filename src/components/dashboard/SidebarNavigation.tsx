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
  const {
    open
  } = useSidebar();
  return;
};
export default SidebarNavigation;