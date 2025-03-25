
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import NotificationBell from './NotificationBell';
import TabNavigation from './TabNavigation';
import { supabase } from '@/integrations/supabase/client';

interface TopBarProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onThemeToggle, isDarkMode, activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };
  
  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };
  
  const userInitials = user?.email 
    ? user.email.substring(0, 2).toUpperCase() 
    : 'DC';
  
  return (
    <header className="flex flex-wrap items-center justify-between bg-[#151f30] px-4 py-3 shadow-md">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-white">
          <span className="text-blue-400">DCE</span>Manager
        </h1>
      </div>
      
      <div className="flex-grow mx-4">
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-300 hover:text-white"
          onClick={onThemeToggle}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        
        <NotificationBell />
        
        <div className="flex items-center space-x-2">
          <Avatar className="h-9 w-9 cursor-pointer" onClick={() => navigate('/account')}>
            <AvatarImage src="" />
            <AvatarFallback className="bg-blue-600 text-white">{userInitials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
