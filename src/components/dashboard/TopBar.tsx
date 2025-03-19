
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Search, LogOut, Menu, Globe, User, CreditCard, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/components/ui/sidebar';
import NotificationBell from './NotificationBell';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  // User profile form schema
  const profileFormSchema = z.object({
    firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
    lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    email: z.string().email({ message: "Adresse email invalide" }),
    address: z.string().optional(),
  });

  // Mock user data - in a real app, this would come from the user object or a separate API call
  const userData = {
    firstName: user?.user_metadata?.full_name?.split(' ')[0] || "John",
    lastName: user?.user_metadata?.full_name?.split(' ')[1] || "Doe",
    email: user?.email || "john.doe@example.com",
    address: user?.user_metadata?.address || "123 Rue de Paris, 75000 Paris",
    plan: "Gratuit", // Mock plan data
    hasPaidPlan: false,
    planExpiry: "", 
    amountPaid: "",
  };

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      address: userData.address,
    },
  });

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

  const handleProfileEdit = (data: z.infer<typeof profileFormSchema>) => {
    console.log('Profile updated:', data);
    // Here you would implement the actual profile update logic
    setIsProfileDialogOpen(false);
  };

  const handleUpgradePlan = () => {
    console.log('Upgrade plan clicked');
    // Here you would implement the plan upgrade logic
    navigate('/pricing');
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
        {/* Notification Bell */}
        <NotificationBell />
        
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

        {/* Profile Dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-sidebar-accent/30 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {userData.firstName[0]}{userData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-popover">
              <DropdownMenuLabel className="font-semibold">Mon Compte</DropdownMenuLabel>
              <div className="px-2 py-2">
                <div className="text-sm"><span className="font-medium">Nom:</span> {userData.lastName}</div>
                <div className="text-sm"><span className="font-medium">Prénom:</span> {userData.firstName}</div>
                <div className="text-sm"><span className="font-medium">Email:</span> {userData.email}</div>
                <div className="text-sm"><span className="font-medium">Adresse:</span> {userData.address}</div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2 w-full"
                  onClick={() => setIsProfileDialogOpen(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </div>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="font-semibold">Facturation</DropdownMenuLabel>
              <div className="px-2 py-2">
                {userData.hasPaidPlan ? (
                  <>
                    <div className="text-sm"><span className="font-medium">Plan:</span> {userData.plan}</div>
                    <div className="text-sm"><span className="font-medium">Expiration:</span> {userData.planExpiry}</div>
                    <div className="text-sm"><span className="font-medium">Montant payé:</span> {userData.amountPaid}</div>
                  </>
                ) : (
                  <Button 
                    size="sm" 
                    variant="default"
                    className="w-full"
                    onClick={handleUpgradePlan}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Mettre à niveau mon plan
                  </Button>
                )}
              </div>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                className="cursor-pointer flex items-center justify-center py-2 text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Profile Edit Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier mon profil</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleProfileEdit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="submit"
                  className="w-full sm:w-auto"
                >
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TopBar;
