import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Search, LogOut, Menu, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const TopBar = ({ onThemeToggle, isDarkMode }: TopBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
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
    <div className="w-full bg-sidebar/95 backdrop-blur-md px-2 sm:px-4 md:px-6 border-b border-sidebar-border flex items-center h-16 sticky top-0">
      {/* Menu toggle button for mobile */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Search (responsive) */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-2 hidden sm:flex">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="w-full pl-10 bg-sidebar-accent/30 border-sidebar-border focus-visible:ring-sidebar-primary focus-visible:border-sidebar-primary transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      {/* Mobile search button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="sm:hidden ml-2"
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Actions (Right) */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-sidebar-accent/30">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Select language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            <DropdownMenuItem 
              onClick={() => handleLanguageChange('fr')}
              className={language === 'fr' ? "bg-accent/50" : ""}
            >
              Français
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleLanguageChange('en')}
              className={language === 'en' ? "bg-accent/50" : ""}
            >
              English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Sun className="h-4 w-4 text-muted-foreground" />
          <Switch 
            checked={isDarkMode}
            onCheckedChange={handleThemeChange}
          />
          <Moon className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* User Actions */}
        {user ? (
          <Button 
            variant="ghost" 
            size="sm"
            className="hover:bg-sidebar-accent/30 text-sidebar-foreground hidden sm:flex"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Déconnexion</span>
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm"
            className="hover:bg-sidebar-accent/30 text-sidebar-foreground hidden sm:flex"
            asChild
          >
            <Link to="/signin">Se connecter</Link>
          </Button>
        )}
        
        {/* Mobile sign out icon button */}
        {user ? (
          <Button 
            variant="ghost" 
            size="icon"
            className="sm:hidden"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon"
            className="sm:hidden"
            asChild
          >
            <Link to="/signin"><LogOut className="h-5 w-5" /></Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
