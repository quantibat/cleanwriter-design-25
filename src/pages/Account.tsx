
import React, { useState, useEffect } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Building, Upload, UserRound } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNotificationsManager } from '@/hooks/useNotificationsManager';

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  address: z.string().min(5, { message: "Adresse invalide" }),
});

const enterpriseFormSchema = z.object({
  enterprise: z.string().min(2, { message: "Le nom de l'entreprise doit contenir au moins 2 caractères" }),
  siret: z.string().min(9, { message: "Le SIRET doit contenir au moins 9 caractères" })
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  newPassword: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  confirmPassword: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const Account = () => {
  const { user } = useAuth();
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSaving, setIsSaving] = useState({
    profile: false,
    enterprise: false,
    security: false
  });
  const notificationsManager = useNotificationsManager();
  
  // Parse user data from metadata
  const userData = {
    firstName: user?.user_metadata?.full_name?.split(' ')[0] || "",
    lastName: user?.user_metadata?.full_name?.split(' ')[1] || "",
    email: user?.email || "",
    address: user?.user_metadata?.address || "",
    enterprise: user?.user_metadata?.enterprise || "",
    siret: user?.user_metadata?.siret || ""
  };

  const profileForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      address: userData.address
    },
  });

  const enterpriseForm = useForm<z.infer<typeof enterpriseFormSchema>>({
    resolver: zodResolver(enterpriseFormSchema),
    defaultValues: {
      enterprise: userData.enterprise,
      siret: userData.siret
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
  });

  // Check if any field is empty and show alert if needed
  useEffect(() => {
    const subscription = profileForm.watch((value) => {
      const isEmpty = Object.values(value).some(val => !val);
      setIsIncomplete(isEmpty);
    });
    
    return () => subscription.unsubscribe();
  }, [profileForm]);

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
      const fileName = `${user?.id}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      // Vérifier si le bucket existe, sinon le créer
      const { data: bucketData, error: bucketError } = await supabase
        .storage
        .getBucket('avatars');

      if (bucketError && bucketError.message.includes('does not exist')) {
        const { error: createBucketError } = await supabase
          .storage
          .createBucket('avatars', {
            public: true,
            fileSizeLimit: 1024 * 1024, // 1MB
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif']
          });

        if (createBucketError) throw createBucketError;
      }
      
      // Supprimer l'ancienne image si elle existe
      if (avatarUrl) {
        const oldFileName = avatarUrl.split('/').pop();
        if (oldFileName) {
          await supabase.storage
            .from('avatars')
            .remove([oldFileName]);
        }
      }
      
      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      const newAvatarUrl = data.publicUrl;
      
      // Update the user metadata with the new avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: newAvatarUrl }
      });
      
      if (updateError) throw updateError;
      
      // Update the user in the public users table
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', user?.id);
      
      if (userUpdateError) throw userUpdateError;
      
      setAvatarUrl(newAvatarUrl);
      
      toast({
        title: "Avatar mis à jour",
        description: "Votre photo de profil a été mise à jour avec succès",
      });
      
      // Add to notification center
      notificationsManager.notifySuccess(
        "Avatar mis à jour", 
        "Votre photo de profil a été mise à jour avec succès"
      );
    } catch (error: any) {
      console.error("Erreur lors de l'upload de l'avatar:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'upload de l'image",
        variant: "destructive"
      });
      
      notificationsManager.notifyError(
        "Erreur", 
        error.message || "Une erreur est survenue lors de l'upload de l'image"
      );
    } finally {
      setUploading(false);
    }
  };

  const onSubmitProfile = async (data: Partial<z.infer<typeof formSchema>>) => {
    try {
      setIsSaving({ ...isSaving, profile: true });
      
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          full_name: `${data.firstName} ${data.lastName}`,
          address: data.address,
        }
      });
      
      if (updateError) throw updateError;
      
      // Update user in the public users table
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({
          full_name: `${data.firstName} ${data.lastName}`,
        })
        .eq('id', user?.id);
      
      if (userUpdateError) throw userUpdateError;
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations personnelles ont été mises à jour avec succès",
      });
      
      // Add to notification center
      notificationsManager.notifySuccess(
        "Profil mis à jour", 
        "Vos informations personnelles ont été mises à jour avec succès"
      );
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour du profil",
        variant: "destructive"
      });
      
      notificationsManager.notifyError(
        "Erreur", 
        error.message || "Une erreur est survenue lors de la mise à jour du profil"
      );
    } finally {
      setIsSaving({ ...isSaving, profile: false });
    }
  };

  const onSubmitEnterprise = async (data: z.infer<typeof enterpriseFormSchema>) => {
    try {
      setIsSaving({ ...isSaving, enterprise: true });
      
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          enterprise: data.enterprise,
          siret: data.siret
        }
      });
      
      if (updateError) throw updateError;
      
      // Update user in the public users table
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({
          enterprise: data.enterprise,
          siret: data.siret
        })
        .eq('id', user?.id);
      
      if (userUpdateError) throw userUpdateError;
      
      toast({
        title: "Informations entreprise mises à jour",
        description: "Les informations de votre entreprise ont été mises à jour avec succès",
      });
      
      // Add to notification center
      notificationsManager.notifySuccess(
        "Entreprise mise à jour", 
        "Les informations de votre entreprise ont été mises à jour avec succès"
      );
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour des informations entreprise:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour",
        variant: "destructive"
      });
      
      notificationsManager.notifyError(
        "Erreur", 
        error.message || "Une erreur est survenue lors de la mise à jour des informations entreprise"
      );
    } finally {
      setIsSaving({ ...isSaving, enterprise: false });
    }
  };

  const onSubmitPassword = async (data: z.infer<typeof passwordFormSchema>) => {
    try {
      setIsSaving({ ...isSaving, security: true });
      
      // Update user password
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });
      
      if (error) throw error;
      
      // Reset form fields
      passwordForm.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été modifié avec succès",
      });
      
      // Add to notification center
      notificationsManager.notifySuccess(
        "Mot de passe mis à jour", 
        "Votre mot de passe a été modifié avec succès"
      );
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la modification du mot de passe",
        variant: "destructive"
      });
      
      notificationsManager.notifyError(
        "Erreur", 
        error.message || "Une erreur est survenue lors de la modification du mot de passe"
      );
    } finally {
      setIsSaving({ ...isSaving, security: false });
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

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Profile Photo */}
          <div className="md:w-80">
            <Card className="w-full sticky top-6">
              <CardHeader>
                <CardTitle>Photo de profil</CardTitle>
                <CardDescription>
                  Choisissez une photo de profil pour personnaliser votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={avatarUrl || ""} alt="Photo de profil" />
                  <AvatarFallback className="bg-blue-500 text-white text-3xl">
                    {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || <UserRound />}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex items-center justify-center w-full">
                  <Label htmlFor="avatar-upload" className="cursor-pointer w-full">
                    <div className="flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md w-full">
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
          </div>

          {/* Right Column - Forms */}
          <div className="flex-1 space-y-8">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles et votre adresse
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-4 w-full">
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
                    
                    <div className="w-full flex justify-end">
                      <Button type="submit" disabled={isSaving.profile}>
                        {isSaving.profile ? "Enregistrement..." : "Enregistrer le profil"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader className="flex flex-row items-center space-x-2">
                <Building className="h-5 w-5 text-blue-500" />
                <div>
                  <CardTitle>Informations entreprise</CardTitle>
                  <CardDescription>
                    Gérez les informations de votre entreprise
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="w-full">
                <Form {...enterpriseForm}>
                  <form onSubmit={enterpriseForm.handleSubmit(onSubmitEnterprise)} className="space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <FormField
                        control={enterpriseForm.control}
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
                        control={enterpriseForm.control}
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
                      <Button type="submit" disabled={isSaving.enterprise}>
                        {isSaving.enterprise ? "Enregistrement..." : "Enregistrer l'entreprise"}
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
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4 w-full">
                    <div className="w-full">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Mot de passe actuel</FormLabel>
                            <FormControl>
                              <Input type="password" showPasswordToggle={true} {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Nouveau mot de passe</FormLabel>
                            <FormControl>
                              <Input type="password" showPasswordToggle={true} {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Confirmer le mot de passe</FormLabel>
                            <FormControl>
                              <Input type="password" showPasswordToggle={true} {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end w-full">
                      <Button type="submit" disabled={isSaving.security}>
                        {isSaving.security ? "Modification..." : "Modifier le mot de passe"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Account;
