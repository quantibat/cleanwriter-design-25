
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  signInWithTestAccount: () => void; // Compte test standard (premium)
  signInWithBasicTestAccount: () => void; // Compte test sans abonnement
  isPremiumUser: boolean; // Indicateur de statut premium
  isAffiliate: boolean; // Indicateur de statut d'affilié
  registerAsAffiliate: (formData: AffiliateRegistrationData) => Promise<void>; // Inscription comme affilié
  quickAffiliateSignup: () => Promise<boolean>; // Inscription rapide comme affilié, retourne true si réussi
};

type AffiliateRegistrationData = {
  fullName: string;
  email: string;
  password: string;
  agreeTerms: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPremiumUser, setIsPremiumUser] = useState<boolean>(false);
  const [isAffiliate, setIsAffiliate] = useState<boolean>(false);

  const signInWithTestAccount = () => {
    const testUser = {
      id: 'test-user-id',
      email: 'test@exemple.com',
      user_metadata: {
        full_name: 'Utilisateur Test',
        premium: true,
        affiliate: true
      },
      app_metadata: {
        role: 'user',
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      role: '',
      updated_at: new Date().toISOString(),
    } as User;

    const testSession = {
      access_token: 'fake-token',
      refresh_token: 'fake-refresh-token',
      expires_in: 3600,
      user: testUser,
    } as Session;

    setUser(testUser);
    setSession(testSession);
    setIsPremiumUser(true);
    setIsAffiliate(false);
    setIsLoading(false);

    toast({
      title: "Connexion test réussie",
      description: "Vous êtes connecté avec le compte de démonstration premium",
      variant: "default",
    });

    setTimeout(() => {
      try {
        const notificationContext = window._getNotificationContext?.();
        if (notificationContext?.addNotification) {
          notificationContext.addNotification({
            title: "Connexion test réussie",
            message: "Bienvenue sur la démo premium!",
            type: "auth",
          });
        }
      } catch (e) {
        console.error("Impossible d'accéder au contexte de notification:", e);
      }
    }, 500);
  };

  const signInWithBasicTestAccount = () => {
    const testUser = {
      id: 'test-basic-user-id',
      email: 'test-basic@exemple.com',
      user_metadata: {
        full_name: 'Utilisateur Test Basic',
        premium: false,
        affiliate: false
      },
      app_metadata: {
        role: 'user',
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      role: '',
      updated_at: new Date().toISOString(),
    } as User;

    const testSession = {
      access_token: 'fake-token-basic',
      refresh_token: 'fake-refresh-token-basic',
      expires_in: 3600,
      user: testUser,
    } as Session;

    setUser(testUser);
    setSession(testSession);
    setIsPremiumUser(false);
    setIsAffiliate(false);
    setIsLoading(false);

    toast({
      title: "Connexion test réussie",
      description: "Vous êtes connecté avec le compte de démonstration basique (sans abonnement)",
      variant: "default",
    });

    setTimeout(() => {
      try {
        const notificationContext = window._getNotificationContext?.();
        if (notificationContext?.addNotification) {
          notificationContext.addNotification({
            title: "Connexion test réussie",
            message: "Bienvenue sur la démo basique!",
            type: "auth",
          });
        }
      } catch (e) {
        console.error("Impossible d'accéder au contexte de notification:", e);
      }
    }, 500);
  };

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
            } as User;
            
            setUser(updatedUser);
            setIsAffiliate(true);
            
            if (session) {
              setSession({
                ...session,
                user: updatedUser
              });
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
      if (!user || !isPremiumUser) {
        toast({
          title: "Accès refusé",
          description: "Vous devez être un utilisateur premium pour devenir affilié",
          variant: "destructive"
        });
        return false;
      }

      const updatedUser = {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          affiliate: true
        }
      } as User;
      
      setUser(updatedUser);
      setIsAffiliate(true);
      
      if (session) {
        setSession({
          ...session,
          user: updatedUser
        });
      }
      
      toast({
        title: "Félicitations!",
        description: "Vous êtes maintenant un affilié DCEManager",
        variant: "default"
      });

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
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'inscription rapide",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.getSession();
      
      if (!error && data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setIsPremiumUser(!!data.session.user?.user_metadata?.premium);
        setIsAffiliate(!!data.session.user?.user_metadata?.affiliate);
      }
      
      setIsLoading(false);
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log(`Auth event: ${event}`);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setIsPremiumUser(!!newSession?.user?.user_metadata?.premium);
        setIsAffiliate(!!newSession?.user?.user_metadata?.affiliate);
        setIsLoading(false);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Connexion réussie",
            description: "Vous êtes maintenant connecté",
            variant: "default",
          });
          
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
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      signOut, 
      signInWithTestAccount, 
      signInWithBasicTestAccount,
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
