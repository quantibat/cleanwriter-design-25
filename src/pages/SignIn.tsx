
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  email: z.string().email({
    message: "Adresse e-mail invalide."
  }),
  password: z.string().min(1, {
    message: "Le mot de passe est requis."
  })
});

const SignIn = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    if (user) {
      navigate('/dashboard', {
        replace: true
      });
    }
  }, [user, navigate]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });
      if (error) {
        throw error;
      }
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté."
      });
      
      // Redirection vers le tableau de bord sans vérification premium
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue lors de la connexion.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard'
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error("Erreur de connexion Google:", error);
      toast({
        title: "Erreur de connexion avec Google",
        description: error.message || "Une erreur est survenue lors de la connexion avec Google.",
        variant: "destructive"
      });
      setIsGoogleLoading(false);
    }
  }
  
  return (
    <div className="min-h-screen bg-[#121824] flex items-center justify-center px-4 relative">
      <div className="particles-container fixed inset-0 z-0 pointer-events-none">
        {/* Les particules d'arrière-plan seront ajoutés ici avec du CSS */}
      </div>
      
      <div className="w-full max-w-md py-12 space-y-6 relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center">
              <span className="text-blue-400">DCE</span>Manager
            </h2>
          </Link>
          <p className="mt-2 text-white/60">Connectez-vous à votre compte</p>
        </div>
        
        <div className="animated-border-glow cosmic-card bg-[#1E2532]/80 backdrop-blur-md rounded-lg border border-white/5 p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Bienvenue sur DCEManager</h1>
          
          <div className="mb-8">
            <Button 
              variant="outline" 
              className="w-full bg-transparent border border-white/10 text-white hover:bg-white/5" 
              onClick={signInWithGoogle}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <span className="flex items-center">
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                  Connexion en cours...
                </span>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                    <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                    <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                    <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z" />
                  </svg>
                  Se connecter avec Google
                </>
              )}
            </Button>
          </div>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1E2532] text-white/40">ou</span>
            </div>
          </div>
          
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
              
              <FormField 
                control={form.control} 
                name="password" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/70">Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative form-input-animated">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input 
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10 bg-[#141B2A] border-white/10 text-white focus-visible:ring-blue-500" 
                          placeholder="••••••••" 
                          {...field} 
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-2.5 text-white/40 hover:text-white/70"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
              />
              
              <div className="flex items-center justify-end">
                <Link to="/forgot-password" className="text-sm text-blue-400 hover:underline">
                  Mot de passe oublié?
                </Link>
              </div>
              
              <Button type="submit" className="w-full blue-shimmer-button text-white font-medium bg-transparent" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-white/60">Pas encore de compte?</span>
            {" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
