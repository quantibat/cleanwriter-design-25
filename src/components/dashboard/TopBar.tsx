
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
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const {
    toggleSidebar
  } = useSidebar();

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
    <div className="flex flex-col w-full border-b border-[#2A3047] bg-[#121520]">
      {/* Top div with logo and user controls */}
      <div className="flex items-center justify-between w-full px-6 py-3">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="bg-[#00a2ff] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              <span className="text-xl">D</span>
            </div>
            <div className="text-white font-semibold text-xl">
              DCE<span className="text-[#00a2ff]">Manager</span>
            </div>
          </Link>
        </div>

        {/* Right: User controls */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleThemeChange}>
            {isDarkMode ? <Sun className="h-5 w-5 text-gray-400" /> : <Moon className="h-5 w-5 text-gray-400" />}
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="h-5 w-5 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange('fr')} className={language === 'fr' ? 'bg-accent' : ''}>
                Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('en')} className={language === 'en' ? 'bg-accent' : ''}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Avatar + Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt={userData.firstName} />
                  <AvatarFallback>{userData.firstName.charAt(0)}{userData.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userData.firstName} {userData.lastName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link to="/account">Mon compte</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <Link to="/billing">Facturation</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <Link to="/settings">Paramètres</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <Link to="/help">Aide</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bottom div with navigation and credits */}
      <div className="flex items-center justify-between w-full px-6 py-3 bg-[#1a1f2b]">
        {/* Left: Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium py-2 px-1 text-white border-b-2 border-[#00a2ff]">
            <span className="text-white">Outils</span>
          </Link>
          
          <Link to="/projects" className="flex items-center gap-2 text-sm font-medium py-2 px-1 text-gray-400 hover:text-white/80">
            <span>Projets</span>
          </Link>
          
          <Link to="/contribute" className="flex items-center gap-2 text-sm font-medium py-2 px-1 text-gray-400 hover:text-white/80">
            <span>Contribuer</span>
          </Link>
          
          <Link to="/affiliate" className="flex items-center gap-2 text-sm font-medium py-2 px-1 text-gray-400 hover:text-white/80">
            <span>Affiliation</span>
          </Link>
        </div>

        {/* Right: Credits Info and Upgrade Button */}
        <div className="flex items-center space-x-4">
          <div className="bg-[#1e2333] rounded-lg p-3">
            <div className="flex flex-col">
              <div className="text-sm text-gray-400 mb-1">Besoin de crédits?</div>
              <div className="flex items-center space-x-2">
                <Progress value={65} className="w-24 h-2" />
                <span className="text-white text-xs">65% de vos crédits utilisés</span>
              </div>
              <Button size="sm" variant="blue" className="mt-2 text-xs py-1 h-8">
                Mettre à niveau
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
