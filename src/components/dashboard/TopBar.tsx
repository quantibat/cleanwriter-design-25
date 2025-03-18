
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Search, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/components/ui/sidebar';

interface TopBarProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const TopBar = ({ onThemeToggle, isDarkMode }: TopBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
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
        {/* Theme Toggle */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Sun className="h-4 w-4 text-muted-foreground" />
          <Switch 
            checked={isDarkMode}
            onCheckedChange={onThemeToggle}
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
