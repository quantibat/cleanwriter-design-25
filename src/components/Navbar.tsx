
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-6 px-6 md:px-10 w-full bg-background/20 backdrop-blur-md fixed top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-foreground flex items-center">
            <span className="text-blue-400">AI</span>Writer
          </Link>
        </div>

        {/* Desktop Navigation */}
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
          <Button variant="outline" className="hover-button font-medium border-white/10 bg-white/5 hover:bg-white/10 hover:text-blue-400" asChild>
            <Link to="/signin">Connexion</Link>
          </Button>
          <Button className="hover-button bg-blue-500 hover:bg-blue-600 text-white font-medium" asChild>
            <Link to="/signup">Essayer gratuitement</Link>
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
            <div className="flex flex-col space-y-3 pt-2">
              <Button variant="outline" className="w-full hover-button font-medium border-white/10 bg-white/5 hover:bg-white/10" asChild>
                <Link to="/signin">Connexion</Link>
              </Button>
              <Button className="w-full hover-button bg-blue-500 hover:bg-blue-600 text-white font-medium" asChild>
                <Link to="/signup">Essayer gratuitement</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
