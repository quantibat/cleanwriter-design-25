
import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser, setSession, setPremiumUser, signOut as signOutAction, setIsLoading, registerAsAffiliate as registerAsAffiliateAction } from '@/store/slices/userSlice';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  user: any | null;
  session: any | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  isPremiumUser: boolean;
  isAffiliate: boolean;
  registerAsAffiliate: (formData: any) => Promise<void>;
  quickAffiliateSignup: () => Promise<boolean>;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, session, isLoading, isPremiumUser, isAffiliate } = useAppSelector((state) => state.user);

  useEffect(() => {
    const getInitialSession = async () => {
      dispatch(setIsLoading(true));
      
      const { data, error } = await supabase.auth.getSession();
      
      if (!error && data.session) {
        dispatch(setSession(data.session));
        dispatch(setUser(data.session.user));
      }
      
      dispatch(setIsLoading(false));
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log(`Auth event: ${event}`);
        
        if (event === 'SIGNED_IN') {
          // Mettre à jour la session et l'utilisateur immédiatement
          dispatch(setSession(newSession));
          dispatch(setUser(newSession?.user ?? null));
          
          // Gérer les métadonnées pour les nouveaux utilisateurs Google
          if (newSession?.user?.app_metadata?.provider === 'google') {
            if (newSession.user.created_at === newSession.user.last_sign_in_at) {
              console.log("Nouvel utilisateur Google, configuration des métadonnées");
              
              const { data, error } = await supabase.auth.updateUser({
                data: { 
                  full_name: newSession.user.user_metadata.full_name || newSession.user.user_metadata.name
                }
              });
              
              if (error) {
                console.error("Erreur lors de la mise à jour des métadonnées:", error);
              }
            }
          }
          
          // Toujours définir isPremiumUser à true pour tous les utilisateurs
          dispatch(setPremiumUser(true));
          
          // Make sure to set isLoading to false after Google login
          dispatch(setIsLoading(false));
          
          // Afficher le message de bienvenue
          toast({
            title: "Connexion réussie",
            description: "Vous êtes maintenant connecté",
            variant: "default",
          });
          
          // Notification système
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
          // Réinitialiser la session et l'utilisateur
          dispatch(setSession(null));
          dispatch(setUser(null));
          dispatch(setPremiumUser(false));
          
          toast({
            title: "Déconnexion",
            description: "Vous avez été déconnecté",
            variant: "default",
          });
        } else if (event === 'TOKEN_REFRESHED') {
          // When token is refreshed, make sure loading state is reset
          dispatch(setIsLoading(false));
        } else if (event === 'PASSWORD_RECOVERY') {
          toast({
            title: "Récupération de mot de passe",
            description: "Veuillez vérifier votre email pour réinitialiser votre mot de passe",
            variant: "default",
          });
        }
        
        // Mettre à jour isLoading à false après chaque événement
        dispatch(setIsLoading(false));
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  // Add a second useEffect to monitor auth state changes and force isLoading to false
  // after a timeout to prevent the loading state from getting stuck
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        console.log('Force resetting isLoading state after timeout');
        dispatch(setIsLoading(false));
      }, 5000); // 5 second safety timeout
      return () => clearTimeout(timer);
    }
  }, [isLoading, dispatch]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      dispatch(signOutAction());
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt!",
        variant: "default",
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  // Implement registerAsAffiliate function
  const registerAsAffiliate = async (formData: any) => {
    try {
      await dispatch(registerAsAffiliateAction()).unwrap();
    } catch (error: any) {
      throw new Error(error.message || "Une erreur est survenue lors de l'inscription");
    }
  };

  // Implement quickAffiliateSignup function
  const quickAffiliateSignup = async (): Promise<boolean> => {
    try {
      await dispatch(registerAsAffiliateAction()).unwrap();
      return true;
    } catch (error) {
      console.error("Erreur lors de l'inscription rapide comme affilié:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      signOut, 
      isPremiumUser, 
      isAffiliate, 
      registerAsAffiliate, 
      quickAffiliateSignup 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

if (typeof window !== 'undefined') {
  window._getNotificationContext = () => {
    try {
      const element = document.querySelector('#__root');
      return (element as any)?.__NOTIFICATION_CONTEXT__;
    } catch (e) {
      return null;
    }
  };
}
