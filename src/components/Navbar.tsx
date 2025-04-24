import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, Grid, FolderArchive, UsersRound } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import UserDropdownMenu from './dashboard/UserDropdownMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    signOut,
    isPremiumUser,
    isAffiliate
  } = useAuth();

  const handleTrialButtonClick = e => {
    e.preventDefault();
    if (!user) {
      navigate('/dashboard');
    } else if (!isPremiumUser) {
      navigate('/upgrade-plan');
      toast({
        title: "Accès limité",
        description: "Cette fonctionnalité nécessite un abonnement premium",
        variant: "destructive"
      });
    } else {
      navigate('/dashboard');
    }
  };

  return <nav className="py-6 px-6 md:px-10 w-full bg-background/20 backdrop-blur-md fixed top-0 z-50 border-b border-white/5 w-full">
      <div className="mx-auto w-[85%] flex items-center justify-between">
        {/* Logo (Left) */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/924fcfc3-6408-45d7-bda1-adf074245eb7.png" 
              alt="DCE Manager Logo"
              className="h-12 w-auto" // Increased from h-8 to h-12
            />
          </Link>
        </div>

        {/* Navigation Menu (Center) - Updated to be centered */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
          <a href="./" className="text-sm font-medium transition-colors hover:text-blue-400 flex items-center gap-2">
            <span>Accueil</span>
          </a>

          <a href="./#features" className="text-sm font-medium transition-colors hover:text-blue-400 flex items-center gap-2">
            <span>Fonctionnalités</span>
          </a>
          
          <a href="./#pricing" className="text-sm font-medium transition-colors hover:text-blue-400 flex items-center gap-2">
            <span>Tarifs</span>
          </a>

          <a href="./#contact" className="text-sm font-medium transition-colors hover:text-blue-400 flex items-center gap-2">
            <span>Contact</span>
          </a>
        </div>

        {/* Action Buttons (Right) */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <UserDropdownMenu onSignOut={signOut} showUserInfo={false} />
          ) : (
            <Button variant="outline" onClick={handleTrialButtonClick} className="bg-blue-600 hover:bg-blue-500">
              Essayez gratuitement
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden absolute top-[72px] left-0 right-0 bg-card/95 backdrop-blur-md border-b border-white/5 animate-fade-in">
          <div className="py-4 px-6 space-y-4 flex flex-col">
            <a href="./#home" className="py-2 text-base font-medium transition-colors hover:text-blue-400 flex items-center gap-2">
              <span>Accueil</span>
            </a>
            <a href="./#features" className="py-2 text-base font-medium transition-colors hover:text-blue-400 flex items-center gap-2">
              <span>Fonctionnalités</span>
            </a>
            <a href="./#pricing" className="py-2 text-base font-medium transition-colors hover:text-blue-400 flex items-center gap-2">
              <span>Tarifs</span>
            </a>
            <a href="./#contact" className="py-2 text-base font-medium transition-colors hover:text-blue-400 flex items-center gap-2">
              <span>Contact</span> 
              </a>
            {user ? (
              <UserDropdownMenu onSignOut={signOut} showUserInfo={true} />
            ) : (
              <Link to="/dashboard" className="py-2 text-base font-medium transition-colors hover:text-blue-400">
                Tableau de bord
              </Link>
            )}
          </div>
      </div>}
    </nav>;
};

export default Navbar;
