
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sun, Moon,  Globe,  Grid, FolderArchive, UsersRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserDropdownMenu from './UserDropdownMenu';
import { Container } from "@/components/ui/container";

interface TopBarProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
  activeTab:string
}
const TopBar = ({
  onThemeToggle,
  isDarkMode,
  activeTab
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

  // Total credits and used credits
  const totalCredits = 30000;
  const usedCredits = 5000; // Example: 5000 credits used
  const remainingCredits = totalCredits - usedCredits;
  const percentUsed = Math.round(usedCredits / totalCredits * 100);
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  const handleUpgrade = () => {
    navigate('/upgrade-plan');
  };
  const handleThemeChange = () => {
    if (isDarkMode) {
      // Apply light theme
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');

      // Set light theme colors
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

      // Update TopBar specific styles
      document.documentElement.style.setProperty('--topbar-background', '#FFFFFF');
      document.documentElement.style.setProperty('--topbar-border', '#E4E4E7');
      document.documentElement.style.setProperty('--topbar-text', '#000000');
      document.documentElement.style.setProperty('--topbar-text-muted', '#71717A');
      document.documentElement.style.setProperty('--topbar-text-transparent', '#9CA3AF');
      document.documentElement.style.setProperty('--topbar-hover', '#F9FAFB');

      // Remove background image and transparency effects
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = '#FFFFFF';
    } else {
      // Maintain dark theme
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

      // Reset TopBar specific styles
      document.documentElement.style.removeProperty('--topbar-background');
      document.documentElement.style.removeProperty('--topbar-border');
      document.documentElement.style.removeProperty('--topbar-text');
      document.documentElement.style.removeProperty('--topbar-text-muted');
      document.documentElement.style.removeProperty('--topbar-text-transparent');
      document.documentElement.style.removeProperty('--topbar-hover');
    }
    onThemeToggle();
  };
  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage);
    console.log(`Language changed to: ${newLanguage}`);
    // Here you would implement the actual language change logic
  };
  return <div className="flex flex-col w-full border-b border-[var(--topbar-border)] bg-[var(--topbar-background)]">
      {/* Top div with logo and user controls */}
      <Container className="py-3 px-0">
        <div className="flex items-center justify-between mx-auto w-[85%]">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="text-[var(--topbar-text)] font-semibold text-xl">
                DCE<span className="text-[#00a2ff]">Manager</span>
              </div>
            </Link>
          </div>

          {/* Right: User controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" className="rounded-full" onClick={handleThemeChange}>
              {isDarkMode ? <Sun className="h-5 w-5 text-[var(--topbar-text-transparent)]" /> : <Moon className="h-5 w-5 text-[var(--topbar-text-transparent)]" />}
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe className="h-5 w-5 text-[var(--topbar-text-transparent)]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('fr')} className={language === 'fr' ? 'bg-[var(--topbar-hover)]' : ''}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('en')} className={language === 'en' ? 'bg-[var(--topbar-hover)]' : ''}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Dropdown Menu */}
            <UserDropdownMenu onSignOut={handleSignOut} />
          </div>
        </div>
      </Container>

      {/* Bottom div with navigation and credits */}
      <Container className="py-3 bg-[var(--topbar-background)] px-0">
        <div className="flex items-center justify-between mx-auto w-[85%]">
          {/* Left: Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className={`flex items-center gap-2 text-sm font-medium py-2 px-1 text-[var(--topbar-text-transparent)] hover:text-[var(--topbar-text)] 
              ${activeTab === 'tools' && "text-[var(--topbar-text)] border-b-2 border-[#00a2ff]"}`}>
              <Grid className="h-4 w-4" />
              <span>Outils</span>
            </Link>
            
            <Link to="/projects" className={`flex items-center gap-2 text-sm font-medium py-2 px-1 text-[var(--topbar-text-transparent)] hover:text-[var(--topbar-text)] ${activeTab === 'projects' && "text-[var(--topbar-text)] border-b-2 border-[#00a2ff]"}`}>
              <FolderArchive className="h-4 w-4" />
              <span>Projets</span>
            </Link>
            
            <Link to="/contribute" className={`flex items-center gap-2 text-sm font-medium py-2 px-1 text-[var(--topbar-text-transparent)] hover:text-[var(--topbar-text)] ${activeTab === 'contribute' && "text-[var(--topbar-text)] border-b-2 border-[#00a2ff]"}`}>
              <UsersRound className="h-4 w-4" />
              <span>Contribuer</span>
            </Link>
          </div>

          {/* Right: Credits Info and Upgrade Button */}
          <div className="flex items-center space-x-4">
            <Button size="sm" variant="blue" onClick={handleUpgrade} className="mt-2 text-xs py-1 h-8 bg-transparent">
              Mettre à niveau
            </Button>
          </div>
        </div>
      </Container>
    </div>;
};
export default TopBar;
