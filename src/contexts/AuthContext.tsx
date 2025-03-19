
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.getSession();
      
      if (!error && data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
      
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log(`Auth event: ${event}`);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setIsLoading(false);
        
        // Afficher les notifications appropriées pour les événements d'authentification
        if (event === 'SIGNED_IN') {
          toast({
            title: "Connexion réussie",
            description: "Vous êtes maintenant connecté",
            variant: "default",
          });
          
          // Simulation de notification dans le contexte de notification
          // Notez: ce sera disponible uniquement après que le contexte soit complètement initialisé
          setTimeout(() => {
            try {
              const notificationContext = window._getNotificationContext?.();
              if (notificationContext?.addNotification) {
                notificationContext.addNotification({
                  title: "Connexion réussie",
                  message: `Bienvenue ${newSession?.user?.email || 'utilisateur'}!`,
                  type: "auth",
                });
              }
            } catch (e) {
              console.error("Impossible d'accéder au contexte de notification:", e);
            }
          }, 500);
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Déconnexion",
            description: "Vous avez été déconnecté",
            variant: "default",
          });
        } else if (event === 'PASSWORD_RECOVERY') {
          toast({
            title: "Récupération de mot de passe",
            description: "Veuillez vérifier votre email pour réinitialiser votre mot de passe",
            variant: "default",
          });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!",
      variant: "default",
    });
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Expose notification context to window for auth events
// This is a hack to get around circular dependencies
// between AuthContext and NotificationContext
if (typeof window !== 'undefined') {
  window._getNotificationContext = () => {
    try {
      // @ts-ignore
      return document.querySelector('#__root')?.__NOTIFICATION_CONTEXT__;
    } catch (e) {
      return null;
    }
  };
}
