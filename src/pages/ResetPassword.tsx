import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, CheckCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
const formSchema = z.object({
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères."
  }),
  confirmPassword: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères."
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"]
});
const ResetPassword = () => {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    // Check if we have hash parameters from the reset password email
    const hash = window.location.hash;
    if (!hash) {
      toast({
        title: "Lien invalide",
        description: "Ce lien de réinitialisation n'est pas valide ou a expiré.",
        variant: "destructive"
      });
    }
  }, [toast]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const {
        error
      } = await supabase.auth.updateUser({
        password: values.password
      });
      if (error) {
        throw error;
      }
      setSuccess(true);
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été réinitialisé avec succès."
      });

      // Redirect to sign in after a short delay
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la réinitialisation du mot de passe.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }
  return <div className="min-h-screen bg-[#121824] flex items-center justify-center px-4 relative">
      <div className="w-full max-w-md py-12 space-y-6 relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center">
              <span className="text-blue-400">AI</span>Writer
            </h2>
          </Link>
          <p className="mt-2 text-white/60">Réinitialisation de mot de passe</p>
        </div>
        
        <div className="animated-border-glow cosmic-card bg-[#1E2532]/80 backdrop-blur-md rounded-lg border border-white/5 p-8 shadow-xl">
          {!success ? <>
              <h1 className="text-2xl font-bold text-white mb-6 text-center">Créer un nouveau mot de passe</h1>
              <p className="text-white/70 mb-6">
                Veuillez entrer un nouveau mot de passe pour votre compte.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="password" render={({
                field
              }) => <FormItem>
                        <FormLabel className="text-white/70">Nouveau mot de passe</FormLabel>
                        <FormControl>
                          <div className="relative form-input-animated">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                            <Input type="password" className="pl-10 bg-[#141B2A] border-white/10 text-white focus-visible:ring-blue-500" placeholder="••••••••" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <FormField control={form.control} name="confirmPassword" render={({
                field
              }) => <FormItem>
                        <FormLabel className="text-white/70">Confirmez le mot de passe</FormLabel>
                        <FormControl>
                          <div className="relative form-input-animated">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                            <Input type="password" className="pl-10 bg-[#141B2A] border-white/10 text-white focus-visible:ring-blue-500" placeholder="••••••••" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <Button type="submit" className="w-full blue-shimmer-button bg-blue-500 hover:bg-blue-600 text-white font-medium" disabled={isLoading}>
                    {isLoading ? "Mise à jour en cours..." : "Réinitialiser le mot de passe"}
                  </Button>
                </form>
              </Form>
            </> : <div className="text-center py-6">
              <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Mot de passe réinitialisé</h2>
              <p className="text-white/70 mb-6">
                Votre mot de passe a été modifié avec succès. Vous allez être redirigé vers la page de connexion.
              </p>
            </div>}
        </div>
      </div>
    </div>;
};
export default ResetPassword;