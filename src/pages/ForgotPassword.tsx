import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  email: z.string().email({
    message: "Adresse e-mail invalide."
  })
});

const ForgotPassword = () => {
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const {
        error
      } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) {
        throw error;
      }
      setSubmitted(true);
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte de réception pour réinitialiser votre mot de passe."
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'envoi de l'email.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center px-4 relative">
      <div className="w-full max-w-md py-12 space-y-6 relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img 
              src="/lovable-uploads/87d822bd-dd26-494f-a6d1-9d7e353735ad.png" 
              alt="DCE Manager"
              className="h-16 mx-auto mb-4"
            />
          </Link>
          <p className="mt-2 text-white/60">Réinitialisation de mot de passe</p>
        </div>
        
        <div className="animated-border-glow cosmic-card bg-[#1E2532]/80 backdrop-blur-md rounded-lg border border-white/5 p-8 shadow-xl">
          {!submitted ? <>
              <h1 className="text-2xl font-bold text-white mb-6 text-center">Mot de passe oublié</h1>
              <p className="text-white/70 mb-6">
                Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="email" render={({
                field
              }) => <FormItem>
                        <FormLabel className="text-white/70">Email</FormLabel>
                        <FormControl>
                          <div className="relative form-input-animated">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                            <Input className="pl-10 bg-[#141B2A] border-white/10 text-white focus-visible:ring-blue-500" placeholder="votre@email.com" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <Button type="submit" disabled={isLoading} className="w-full blue-shimmer-button text-white font-medium bg-transparent">
                    {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 text-center text-sm">
                <Link to="/signin" className="text-blue-400 hover:underline">
                  Retour à la connexion
                </Link>
              </div>
            </> : <div className="text-center py-6">
              <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Vérifiez votre boîte de réception</h2>
              <p className="text-white/70 mb-6">
                Nous avons envoyé un lien de réinitialisation à votre adresse e-mail.
              </p>
              <Button className="mt-4 blue-shimmer-button bg-blue-500 hover:bg-blue-600" asChild>
                <Link to="/signin">Retour à la connexion</Link>
              </Button>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
