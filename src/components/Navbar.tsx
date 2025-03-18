
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="py-6 px-6 md:px-10 w-full bg-background/20 backdrop-blur-md fixed top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo (Left) */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-foreground flex items-center">
            <span className="text-blue-400">DCE</span>Manager
          </Link>
        </div>

        {/* Navigation Menu (Center) - Updated to be centered */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
          <a href="#home" className="text-sm font-medium transition-colors hover:text-blue-400">
            Accueil
          </a>
          <a href="#features" className="text-sm font-medium transition-colors hover:text-blue-400">
            Fonctionnalités
          </a>
          <a href="#pricing" className="text-sm font-medium transition-colors hover:text-blue-400">
            Tarifs
          </a>
        </div>

        {/* Action Buttons (Right) */}
        <div className="hidden md:flex items-center">
          <Button 
            className={`${location.pathname.includes('/dashboard') ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            asChild
          >
            <Link to="/dashboard">Tableau de bord</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-card/95 backdrop-blur-md border-b border-white/5 animate-fade-in">
          <div className="py-4 px-6 space-y-4 flex flex-col">
            <a href="#home" className="py-2 text-base font-medium transition-colors hover:text-blue-400">
              Accueil
            </a>
            <a href="#features" className="py-2 text-base font-medium transition-colors hover:text-blue-400">
              Fonctionnalités
            </a>
            <a href="#pricing" className="py-2 text-base font-medium transition-colors hover:text-blue-400">
              Tarifs
            </a>
            <Link to="/dashboard" className="py-2 text-base font-medium transition-colors hover:text-blue-400">
              Tableau de bord
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
