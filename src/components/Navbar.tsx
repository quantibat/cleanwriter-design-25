import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User, CreditCard, HelpCircle, Settings, LogOut, Zap, Gift, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';
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
  return <nav className="py-6 px-6 md:px-10 w-full bg-background/20 backdrop-blur-md fixed top-0 z-50 border-b border-white/5">
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
          
          <a href="#pricing" className="text-sm font-medium transition-colors hover:text-blue-400">
            Tarifs
          </a>
          <Link to="/affiliate" className="text-sm font-medium transition-colors hover:text-blue-400">
            Affiliation
          </Link>
        </div>

        {/* Action Buttons (Right) */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? <div className="flex items-center gap-3">
              {!isPremiumUser && <Link to="/free-trial">
                  
                </Link>}
              <span className="text-sm text-foreground">
                {user.user_metadata?.full_name || user.email}
                {isPremiumUser}
                {isAffiliate && <span className="ml-2 text-green-400 text-xs">(Affilié)</span>}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="p-2 text-sm">
                    <p className="font-medium">{user.user_metadata?.full_name || user.email}</p>
                    <p className="text-muted-foreground">{user.email}</p>
                    {isPremiumUser ? <p className="mt-1 text-xs text-amber-400">Compte Premium</p> : <p className="mt-1 text-xs text-gray-400">Compte Gratuit</p>}
                    {isAffiliate && <p className="mt-1 text-xs text-green-400">Affilié</p>}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Tableau de bord</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer flex items-center w-full">
                      <User className="h-4 w-4 mr-2" />
                      Mon compte
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/billing" className="cursor-pointer flex items-center w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Facturation
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help" className="cursor-pointer flex items-center w-full">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Aide
                    </Link>
                  </DropdownMenuItem>
                  {isPremiumUser && <DropdownMenuItem asChild>
                      <Link to="/affiliate" className="cursor-pointer flex items-center w-full">
                        <Users className="h-4 w-4 mr-2" />
                        Affiliation
                      </Link>
                    </DropdownMenuItem>}
                  {!isPremiumUser && <DropdownMenuItem asChild>
                      <Link to="/upgrade-plan" className="cursor-pointer flex items-center w-full">
                        <Zap className="h-4 w-4 mr-2" />
                        Essai gratuit
                      </Link>
                    </DropdownMenuItem>}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div> : <Button variant="outline" onClick={handleTrialButtonClick} className="bg-blue-600 hover:bg-blue-500">
              Démarrer un essai
            </Button>}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden absolute top-[72px] left-0 right-0 bg-card/95 backdrop-blur-md border-b border-white/5 animate-fade-in">
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
            <Link to="/affiliate" className="py-2 text-base font-medium transition-colors hover:text-blue-400">
              Affiliation
            </Link>
            <Link to="/privacy-policy" className="py-2 text-base font-medium transition-colors hover:text-blue-400">
              Politique de confidentialité
            </Link>
            {user ? <>
                <div className="py-2 flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">
                    {user.user_metadata?.full_name || user.email}
                    {isPremiumUser && <span className="ml-2 bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full">
                        Premium
                      </span>}
                    {isAffiliate && <span className="ml-2 bg-green-500/20 text-green-300 text-xs px-2 py-0.5 rounded-full">
                        Affilié
                      </span>}
                  </span>
                </div>
                {!isPremiumUser && <Link to="/upgrade-plan" className="py-2 text-base font-medium transition-colors hover:text-blue-400 flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Essai gratuit
                  </Link>}
                {isPremiumUser && <Link to="/affiliate" className="py-2 text-base font-medium transition-colors hover:text-blue-400 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Affiliation
                  </Link>}
                <Link to="/dashboard" className="py-2 text-base font-medium transition-colors hover:text-blue-400">
                  Tableau de bord
                </Link>
                <Link to="/account" className="py-2 text-base font-medium transition-colors hover:text-blue-400 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Mon compte
                </Link>
                <Link to="/billing" className="py-2 text-base font-medium transition-colors hover:text-blue-400 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Facturation
                </Link>
                <Link to="/help" className="py-2 text-base font-medium transition-colors hover:text-blue-400 flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Aide
                </Link>
                <button onClick={() => signOut()} className="py-2 text-base font-medium transition-colors hover:text-blue-400 text-left flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </button>
              </> : <Link to="/dashboard" className="py-2 text-base font-medium transition-colors hover:text-blue-400">
                Tableau de bord
              </Link>}
          </div>
        </div>}
    </nav>;
};
export default Navbar;