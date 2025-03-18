
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="py-6 px-6 md:px-10 w-full bg-background/20 backdrop-blur-md fixed top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo (Left) */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-foreground flex items-center">
            <span className="text-blue-400">AI</span>Writer
          </Link>
        </div>

        {/* Navigation Menu (Center) */}
        <div className="hidden md:flex items-center space-x-8">
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
        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <Link to="/account" className="text-sm font-medium transition-colors hover:text-blue-400 relative">
              <UserCircle className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-background"></span>
            </Link>
          )}
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
            {user && (
              <Link to="/account" className="py-2 text-base font-medium transition-colors hover:text-blue-400 flex items-center relative">
                <UserCircle className="h-5 w-5 mr-2" />
                Mon compte
                <span className="absolute left-1 top-2 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-background"></span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
