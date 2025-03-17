
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Save, ArrowLeft } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const Account = () => {
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '06 12 34 56 78',
    address: '123 Rue de Paris',
    city: 'Paris',
    postalCode: '75001',
    country: 'France'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call to update user info
    setIsEditing(false);
    
    toast({
      title: "Informations mises à jour",
      description: "Vos informations personnelles ont été mises à jour avec succès.",
    });
  };
  
  useEffect(() => {
    // Create floating particles for the background effect
    const createParticles = () => {
      const container = document.querySelector('.particles-container');
      if (!container) return;
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('star');
        
        // Random size
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
      }
    };
    
    createParticles();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="particles-container fixed inset-0 z-0 pointer-events-none"></div>
      
      {/* Account Header */}
      <header className="bg-background/20 backdrop-blur-md border-b border-white/5 py-6 px-6 md:px-10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-foreground flex items-center">
              <span className="text-blue-400">AI</span>Writer
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="hover-button border-white/10 bg-white/5 hover:bg-white/10"
              asChild
            >
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au tableau de bord
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-12 px-6 md:px-10">
        <h1 className="text-3xl font-bold mb-8 fade-up visible">Mon Compte</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card className="cosmic-card fade-up visible">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-blue-400" />
                </div>
                <CardTitle>{userInfo.firstName} {userInfo.lastName}</CardTitle>
                <CardDescription>{userInfo.email}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <p className="text-sm text-muted-foreground">
                  Membre depuis juin 2023
                </p>
                <p className="text-sm text-blue-400 font-medium mt-2">
                  Abonnement Premium
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full hover-button border-white/10 bg-white/5 hover:bg-white/10" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Annuler" : "Modifier mes informations"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Info Card */}
          <div className="md:col-span-2">
            <Card className="cosmic-card h-full fade-up visible">
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  {isEditing ? "Modifiez vos informations" : "Consultez et gérez vos informations personnelles"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-white/5" : ""}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-white/5" : ""}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={userInfo.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-white/5" : ""}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-white/5" : ""}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input 
                      id="address"
                      name="address"
                      value={userInfo.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-white/5" : ""}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input 
                        id="city"
                        name="city"
                        value={userInfo.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-white/5" : ""}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input 
                        id="postalCode"
                        name="postalCode"
                        value={userInfo.postalCode}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-white/5" : ""}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Pays</Label>
                      <Input 
                        id="country"
                        name="country"
                        value={userInfo.country}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-white/5" : ""}
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium">
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
