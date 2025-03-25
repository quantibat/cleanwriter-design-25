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
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Upload, UserRound } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  address: z.string().min(5, { message: "Adresse invalide" }),
  enterprise: z.string().min(2, { message: "Le nom de l'entreprise doit contenir au moins 2 caractères" }),
  siret: z.string().min(9, { message: "Le SIRET doit contenir au moins 9 caractères" })
});

const Account = () => {
  const { user } = useAuth();
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Parse user data from metadata
  const userData = {
    firstName: user?.user_metadata?.full_name?.split(' ')[0] || "",
    lastName: user?.user_metadata?.full_name?.split(' ')[1] || "",
    email: user?.email || "",
    address: user?.user_metadata?.address || "",
    enterprise: user?.user_metadata?.enterprise || "",
    siret: user?.user_metadata?.siret || ""
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: userData,
  });

  // Check if any field is empty and show alert if needed
  useEffect(() => {
    const subscription = form.watch((value) => {
      const isEmpty = Object.values(value).some(val => !val);
      setIsIncomplete(isEmpty);
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  // Load avatar from user metadata or set default
  useEffect(() => {
    if (user) {
      // If user has a custom avatar_url in metadata, use it
      if (user.user_metadata?.avatar_url) {
        setAvatarUrl(user.user_metadata.avatar_url);
      } 
      // Otherwise check if it's a Google account with a picture
      else if (user.app_metadata?.provider === 'google' && user.user_metadata?.picture) {
        setAvatarUrl(user.user_metadata.picture);
      }
    }
  }, [user]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}-${Math.random().toString(36).slice(2)}.${fileExt}`;
      
      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const avatarUrl = data.publicUrl;
      
      // Update the user metadata with the new avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: avatarUrl }
      });
      
      if (updateError) throw updateError;
      
      // Update the user in the public users table
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({ avatar_url: avatarUrl })
        .eq('id', user?.id);
      
      if (userUpdateError) throw userUpdateError;
      
      setAvatarUrl(avatarUrl);
      
      toast({
        title: "Avatar mis à jour",
        description: "Votre photo de profil a été mise à jour",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'upload de l'image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          full_name: `${data.firstName} ${data.lastName}`,
          address: data.address,
          enterprise: data.enterprise,
          siret: data.siret
        }
      });
      
      if (updateError) throw updateError;
      
      // Update user in the public users table
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({
          full_name: `${data.firstName} ${data.lastName}`,
          enterprise: data.enterprise,
          siret: data.siret
        })
        .eq('id', user?.id);
      
      if (userUpdateError) throw userUpdateError;
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès",
      });
      
      // Refresh incomplete status
      setIsIncomplete(Object.values(data).some(val => !val));
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour du profil",
        variant: "destructive"
      });
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
        
        <Card className="mb-8 w-full">
          <CardHeader>
            <CardTitle>Photo de profil</CardTitle>
            <CardDescription>
              Choisissez une photo de profil pour personnaliser votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarUrl || ""} alt="Photo de profil" />
              <AvatarFallback className="bg-blue-500 text-white text-2xl">
                {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || <UserRound />}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex items-center justify-center">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="flex items-center space-x-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md">
                  <Upload className="h-4 w-4" />
                  <span>{uploading ? "Téléchargement..." : "Changer la photo"}</span>
                </div>
                <Input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarUpload} 
                  disabled={uploading}
                  className="hidden" 
                />
              </Label>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8 w-full">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>
              Gérez vos informations personnelles, votre adresse et les détails de votre entreprise
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sécurité</CardTitle>
            <CardDescription>
              Gérez votre mot de passe et la sécurité de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 w-full">
            <div className="w-full">
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input id="current-password" type="password" className="w-full" showPasswordToggle={true} />
            </div>
            <div className="w-full">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input id="new-password" type="password" className="w-full" showPasswordToggle={true} />
            </div>
            <div className="w-full">
              <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
              <Input id="confirm-password" type="password" className="w-full" showPasswordToggle={true} />
            </div>
            <div className="flex justify-end w-full">
              <Button className="w-full md:w-auto">Modifier le mot de passe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Account;
