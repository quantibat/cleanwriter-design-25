import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  address: z.string().min(5, { message: "Adresse invalide" }),
});

const ProfileForm = () => {
  const { user } = useAuth();



  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.user_metadata?.full_name?.split(' ')[0] || '',
      lastName: user?.user_metadata?.full_name?.split(' ')[1] || '',
      email: user?.email || '',
      address: user?.user_metadata?.address || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: `${data.firstName} ${data.lastName}`,
          address: data.address,
        },
      });

      if (error) throw error;

      await supabase.from('users').update({
        full_name: `${data.firstName} ${data.lastName}`,
      }).eq('id', user?.id);

      toast({
        title: 'Profil mis à jour',
        description: 'Vos informations personnelles ont été mises à jour avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card className='border border-gray/10 rounded-lg mb-8'>
      <CardHeader className='flex flex-col gap-3 border-b border-gray/10 p-4'>
        <CardTitle className='flex flex-row items-center gap-2'> <User size={30} className=' border border-white/10 rounded-full p-1'/> Informations personnelles</CardTitle>
        <CardDescription>Gérez vos informations personnelles et votre adresse</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <div className="flex flex-col items-center space-y-4 mb-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={avatarUrl || ''} alt="Photo de profil" />
            <AvatarFallback>
              {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || <UserRound />}
            </AvatarFallback>
          </Avatar>
          <Label htmlFor="avatar-upload" className="cursor-pointer w-full">
            <div className="flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md">
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
        </div> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="firstName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="lastName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input {...field} readOnly /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="flex justify-end">
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
