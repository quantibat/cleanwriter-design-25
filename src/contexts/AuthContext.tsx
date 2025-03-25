
import React, { createContext, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser, setSession, setPremiumUser, signOut as signOutAction } from '@/store/slices/userSlice';

type AuthContextType = {
  user: any | null;
  session: any | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  isPremiumUser: boolean;
  isAffiliate: boolean;
  registerAsAffiliate: (formData: AffiliateRegistrationData) => Promise<void>;
  quickAffiliateSignup: () => Promise<boolean>;
};

type AffiliateRegistrationData = {
  fullName: string;
  email: string;
  password: string;
  agreeTerms: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, session, isLoading, isPremiumUser, isAffiliate, error } = useAppSelector(state => state.user);

  const registerAsAffiliate = async (formData: AffiliateRegistrationData): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          if (user) {
            const updatedUser = {
              ...user,
              user_metadata: {
                ...user.user_metadata,
                affiliate: true
              }
            };
            
            dispatch(setUser(updatedUser));
            
            if (session) {
              dispatch(setSession({
                ...session,
                user: updatedUser
              }));
            }
            
            resolve();
          } else {
            reject(new Error("Utilisateur non connecté"));
          }
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  };

  const quickAffiliateSignup = async (): Promise<boolean> => {
    try {
      if (!user) {
        return false;
      }

      const updatedUser = {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          affiliate: true
        }
      };
      
      dispatch(setUser(updatedUser));
      
      if (session) {
        dispatch(setSession({
          ...session,
          user: updatedUser
        }));
      }
      
      setTimeout(() => {
        try {
          const notificationContext = window._getNotificationContext?.();
          if (notificationContext?.addNotification) {
            notificationContext.addNotification({
              title: "Bienvenue dans le programme d'affiliation",
              message: "Votre compte affilié est prêt à l'emploi!",
              type: "success",
            });
          }
        } catch (e) {
          console.error("Impossible d'accéder au contexte de notification:", e);
        }
      }, 500);
      
      return true;
    } catch (error: any) {
      return false;
    }
  };

  const signOut = async () => {
    dispatch(signOutAction());
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log(`Auth event: ${event}`);
        dispatch(setSession(newSession));
        
        if (event === 'SIGNED_IN') {
          // Si c'est une nouvelle connexion Google, s'assurer que l'utilisateur est ajouté à la table users
          if (newSession?.user?.app_metadata?.provider === 'google') {
            // Vérifier si c'est un nouvel utilisateur (created_at égal à last_sign_in_at)
            if (newSession.user.created_at === newSession.user.last_sign_in_at) {
              console.log("Nouvel utilisateur Google, configuration des métadonnées");
              
              // Ajouter l'utilisateur à la table users
              const { error: insertError } = await supabase
                .from('users')
                .insert({
                  id: newSession.user.id,
                  email: newSession.user.email,
                  full_name: newSession.user.user_metadata.full_name || newSession.user.user_metadata.name,
                  created_at: new Date().toISOString()
                });
              
              if (insertError) {
                console.error("Erreur lors de l'ajout de l'utilisateur à la table users:", insertError);
              }
              
              const { data, error } = await supabase.auth.updateUser({
                data: { 
                  premium: true,
                  affiliate: false,
                  full_name: newSession.user.user_metadata.full_name || newSession.user.user_metadata.name,
                  enterprise: "",
                  siret: ""
                }
              });
              
              if (error) {
                console.error("Erreur lors de la mise à jour des métadonnées:", error);
              }
            }
          }
          
          // Toujours définir isPremiumUser à true pour tous les utilisateurs
          dispatch(setPremiumUser(true));
          
          // Système de notification (si disponible)
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
        }
      }
    );

    // Initialiser la session au chargement
    const getInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (!error && data.session) {
        dispatch(setSession(data.session));
        dispatch(setPremiumUser(true));
      }
    };

    getInitialSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

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
  const context = useContext(AuthContext);
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
