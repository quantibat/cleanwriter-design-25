
import React, { useState, useEffect } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

// Schéma de validation du formulaire de profil
const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  address: z.string().min(5, { message: "Adresse invalide" }),
  enterprise: z.string().min(2, { message: "Le nom de l'entreprise doit contenir au moins 2 caractères" }),
  siret: z.string().min(9, { message: "Le SIRET doit contenir au moins 9 caractères" })
});

// Schéma de validation du formulaire de mot de passe
const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, { message: "Le mot de passe actuel est requis" }),
  newPassword: z.string().min(6, { message: "Le nouveau mot de passe doit contenir au moins 6 caractères" }),
  confirmPassword: z.string().min(6, { message: "La confirmation du mot de passe doit contenir au moins 6 caractères" })
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

const Account = () => {
  const { getUserProfile, updateUserProfile, isProfileComplete, updatePassword } = useAuth();
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [passwordUpdateLoading, setPasswordUpdateLoading] = useState(false);
  
  // Formulaire de profil
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getUserProfile(),
  });

  // Formulaire de mot de passe
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
  });

  // Vérifier si le profil est complet
  useEffect(() => {
    setIsIncomplete(!isProfileComplete());
    
    const subscription = profileForm.watch((value) => {
      const isEmpty = Object.values(value).some(val => !val);
      setIsIncomplete(isEmpty);
    });
    
    return () => subscription.unsubscribe();
  }, [profileForm, isProfileComplete]);

  // Soumission du formulaire de profil
  const onProfileSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    await updateUserProfile(data);
  };

  // Soumission du formulaire de mot de passe
  const onPasswordSubmit = async (data: z.infer<typeof passwordFormSchema>) => {
    setPasswordUpdateLoading(true);
    try {
      await updatePassword(data.currentPassword, data.newPassword);
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } finally {
      setPasswordUpdateLoading(false);
    }
  };

  return (
    <DashboardLayout activeTab="account" breadcrumbs={[{ label: 'Mon Compte' }]}>
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-6">Mon Compte</h1>
        
        {isIncomplete && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Information incomplète</AlertTitle>
            <AlertDescription>
              Veuillez compléter tous les champs de votre profil pour une meilleure expérience.
            </AlertDescription>
          </Alert>
        )}
        
        {/* Formulaire d'informations personnelles */}
        <Card className="mb-8 w-full">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              Gérez vos informations personnelles, votre adresse et les détails de votre entreprise
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <FormField
                    control={profileForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full" readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={profileForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <FormField
                    control={profileForm.control}
                    name="enterprise"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Entreprise</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="siret"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>SIRET</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="w-full flex justify-end">
                  <Button type="submit" className="w-full md:w-auto">
                    Enregistrer les modifications
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Formulaire de sécurité */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sécurité</CardTitle>
            <CardDescription>
              Gérez votre mot de passe et la sécurité de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 w-full">
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 w-full">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Mot de passe actuel</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          className="w-full" 
                          showPasswordToggle={true} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nouveau mot de passe</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          className="w-full" 
                          showPasswordToggle={true} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Confirmer le mot de passe</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          className="w-full" 
                          showPasswordToggle={true} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end w-full">
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={passwordUpdateLoading}
                  >
                    {passwordUpdateLoading ? "Modification en cours..." : "Modifier le mot de passe"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Account;
