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
import { FireExtinguisher } from 'lucide-react';

const passwordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

const SecurityForm = () => {
  const { user } = useAuth();
  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });
      if (error) throw error;

      form.reset();
      toast({
        title: 'Mot de passe mis à jour',
        description: 'Votre mot de passe a été modifié avec succès.'
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
      <CardTitle className='flex flex-row items-center gap-2'> <FireExtinguisher size={30} className=' border border-white/10 rounded-full p-1'/> <CardTitle>Sécurité</CardTitle></CardTitle>
      <CardDescription>Modifiez votre mot de passe</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {['currentPassword', 'newPassword', 'confirmPassword'].map((field, i) => (
              <FormField key={i} control={form.control} name={field} render={({ field }) => (
                <FormItem>
                  <FormLabel>{
                    field.name === 'currentPassword' ? 'Mot de passe actuel' :
                    field.name === 'newPassword' ? 'Nouveau mot de passe' :
                    'Confirmer le mot de passe'
                  }</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            ))}
            <div className="flex justify-end">
              <Button type="submit">Modifier le mot de passe</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SecurityForm;
