
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, KeyRound, ArrowRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate authentication - replace with actual auth
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté.",
      });
      navigate("/dashboard");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="particles-container fixed inset-0 z-0 pointer-events-none"></div>
      
      <div className="w-full max-w-md py-12 space-y-6 relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h2 className="text-2xl font-bold text-foreground flex items-center justify-center">
              <span className="text-blue-400">AI</span>Writer
            </h2>
          </Link>
          <p className="mt-2 text-muted-foreground">Connectez-vous à votre compte</p>
        </div>
        
        <div className="cosmic-card p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          className="pl-10 bg-background/40 border-white/10" 
                          placeholder="votre@email.com" 
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          type="password" 
                          className="pl-10 bg-background/40 border-white/10" 
                          placeholder="••••••••" 
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full mt-6 hover-button bg-blue-500 hover:bg-blue-600 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"} 
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Pas encore de compte ?</span>
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
