import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, LogOut, Globe, User, CreditCard, Settings, HelpCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface TopBarProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const TopBar = ({
  onThemeToggle,
  isDarkMode
}: TopBarProps) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  // Mock user data - in a real app, this would come from the user object or a separate API call
  const userData = {
    firstName: user?.user_metadata?.full_name?.split(' ')[0] || "John",
    lastName: user?.user_metadata?.full_name?.split(' ')[1] || "Doe",
    email: user?.email || "john.doe@example.com",
    address: user?.user_metadata?.address || "123 Rue de Paris, 75000 Paris"
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleThemeChange = () => {
    if (isDarkMode) {
      // Apply light theme - make everything white (without transparency)
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');

      // Set pure white background (no transparency) and black text for the entire application
      document.documentElement.style.setProperty('--background', '#FFFFFF');
      document.documentElement.style.setProperty('--foreground', '#000000');
      document.documentElement.style.setProperty('--card', '#FFFFFF');
      document.documentElement.style.setProperty('--card-foreground', '#000000');
      document.documentElement.style.setProperty('--popover', '#FFFFFF');
      document.documentElement.style.setProperty('--popover-foreground', '#000000');
      document.documentElement.style.setProperty('--sidebar-background', '#FFFFFF');
      document.documentElement.style.setProperty('--sidebar-foreground', '#000000');
      document.documentElement.style.setProperty('--muted', '#F9FAFB');
      document.documentElement.style.setProperty('--muted-foreground', '#71717A');
      document.documentElement.style.setProperty('--accent', '#F9FAFB');
      document.documentElement.style.setProperty('--accent-foreground', '#000000');
      document.documentElement.style.setProperty('--sidebar-accent', '#F9FAFB');
      document.documentElement.style.setProperty('--sidebar-accent-foreground', '#000000');
      document.documentElement.style.setProperty('--border', '#E4E4E7');
      document.documentElement.style.setProperty('--sidebar-border', '#E4E4E7');

      // Remove background image and transparency effects
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = '#FFFFFF';
    } else {
      // Maintain dark theme (current theme)
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');

      // Reset to default dark theme values
      document.documentElement.style.removeProperty('--background');
      document.documentElement.style.removeProperty('--foreground');
      document.documentElement.style.removeProperty('--card');
      document.documentElement.style.removeProperty('--card-foreground');
      document.documentElement.style.removeProperty('--popover');
      document.documentElement.style.removeProperty('--popover-foreground');
      document.documentElement.style.removeProperty('--sidebar-background');
      document.documentElement.style.removeProperty('--sidebar-foreground');
      document.documentElement.style.removeProperty('--muted');
      document.documentElement.style.removeProperty('--muted-foreground');
      document.documentElement.style.removeProperty('--accent');
      document.documentElement.style.removeProperty('--accent-foreground');
      document.documentElement.style.removeProperty('--sidebar-accent');
      document.documentElement.style.removeProperty('--sidebar-accent-foreground');
      document.documentElement.style.removeProperty('--border');
      document.documentElement.style.removeProperty('--sidebar-border');
    }
    onThemeToggle();
  };

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage);
    console.log(`Language changed to: ${newLanguage}`);
    // Here you would implement the actual language change logic
  };

  return (
    <div className="flex justify-end items-center h-16 pr-4 py-2 gap-4">
      {/* Theme Toggle */}
      <div className="flex items-center">
        <Switch 
          checked={isDarkMode} 
          onCheckedChange={handleThemeChange} 
          className="data-[state=checked]:bg-gray-700"
        />
        <Moon className="h-4 w-4 text-gray-400 ml-2" />
      </div>

      {/* Credit Section */}
      <div className="bg-[#1a222f] rounded-lg p-2 min-w-[250px]">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-300">Besoin de credits?</span>
          <Button 
            size="sm" 
            className="bg-[#00a2ff] text-white hover:bg-[#0089d6] rounded-full px-4 py-1 h-7 text-xs"
          >
            Mettre à niveau
          </Button>
        </div>
        <Progress value={0} className="h-2 w-full bg-gray-700" />
        <div className="text-xs text-gray-400 mt-1">0% de vos crédits utilisés</div>
      </div>

      {/* Profile Avatar */}
      {user && <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-700 p-0 h-9 w-9">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-gray-800 text-white">
                {userData.firstName[0]}{userData.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-popover">
          <div className="p-2 text-sm">
            <p className="font-medium">{userData.firstName} {userData.lastName}</p>
            <p className="text-muted-foreground">{userData.email}</p>
          </div>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild>
            <Link to="/account" className="cursor-pointer flex items-center w-full">
              <User className="h-4 w-4 mr-2" />
              Mon compte
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/billing" className="cursor-pointer flex items-center w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Facturation
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/usage" className="cursor-pointer flex items-center w-full">
              <Settings className="h-4 w-4 mr-2" />
              Utilisation
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/help" className="cursor-pointer flex items-center w-full">
              <HelpCircle className="h-4 w-4 mr-2" />
              Aide
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="cursor-pointer flex items-center justify-center py-2 text-destructive" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>}
    </div>
  );
};

export default TopBar;
