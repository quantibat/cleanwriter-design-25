
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-6 px-6 md:px-10 w-full backdrop-blur-sm bg-white/90 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-xl font-bold text-foreground flex items-center">
            <span className="text-brand-purple">AI</span>Writer
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-sm font-medium transition-colors hover:text-brand-purple">
            Accueil
          </a>
          <a href="#features" className="text-sm font-medium transition-colors hover:text-brand-purple">
            Fonctionnalités
          </a>
          <a href="#pricing" className="text-sm font-medium transition-colors hover:text-brand-purple">
            Tarifs
          </a>
          <Button variant="outline" className="hover-button font-medium">
            Connexion
          </Button>
          <Button className="hover-button bg-brand-purple hover:bg-brand-purple-dark text-white font-medium">
            Essayer gratuitement
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
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-gray-200 animate-fade-in">
          <div className="py-4 px-6 space-y-4 flex flex-col">
            <a href="#home" className="py-2 text-base font-medium transition-colors hover:text-brand-purple">
              Accueil
            </a>
            <a href="#features" className="py-2 text-base font-medium transition-colors hover:text-brand-purple">
              Fonctionnalités
            </a>
            <a href="#pricing" className="py-2 text-base font-medium transition-colors hover:text-brand-purple">
              Tarifs
            </a>
            <div className="flex flex-col space-y-3 pt-2">
              <Button variant="outline" className="w-full hover-button font-medium">
                Connexion
              </Button>
              <Button className="w-full hover-button bg-brand-purple hover:bg-brand-purple-dark text-white font-medium">
                Essayer gratuitement
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
