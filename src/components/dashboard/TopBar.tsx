
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Search, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';

interface TopBarProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const TopBar = ({ onThemeToggle, isDarkMode }: TopBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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
    <div className="w-full bg-background/20 backdrop-blur-md py-3 px-4 md:px-6 border-b border-white/5 flex items-center justify-between">
      {/* Logo (Left) */}
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold text-foreground flex items-center">
          <span className="text-blue-400">AI</span>Writer
        </Link>
      </div>

      {/* Search (Center) */}
      <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="w-full pl-10 bg-white/5 border-white/10 focus-visible:ring-blue-400 focus-visible:border-blue-400 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      {/* Actions (Right) */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <div className="flex items-center space-x-2">
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
            className="hover:bg-white/10"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm"
            className="hover:bg-white/10"
            asChild
          >
            <Link to="/signin">Se connecter</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
