
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

  // Fonction pour connexion avec compte test premium
  const signInWithTestAccount = () => {
    // Créer un faux utilisateur et une fausse session
    const testUser = {
      id: 'test-user-id',
      email: 'test@exemple.com',
      user_metadata: {
        full_name: 'Utilisateur Test',
        premium: true,
        affiliate: false
      },
      app_metadata: {
        role: 'user',
      },
      // Ajout des propriétés manquantes pour satisfaire le type User
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

    // Mettre à jour l'état
    setUser(testUser);
    setSession(testSession);
    setIsPremiumUser(true);
    setIsAffiliate(false);
    setIsLoading(false);

    // Afficher une notification
    toast({
      title: "Connexion test réussie",
      description: "Vous êtes connecté avec le compte de démonstration premium",
      variant: "default",
    });

    // Notification dans le contexte de notification
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

  // Fonction pour connexion avec compte test basique (sans premium)
  const signInWithBasicTestAccount = () => {
    // Créer un faux utilisateur et une fausse session (sans premium)
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
      // Ajout des propriétés manquantes pour satisfaire le type User
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

    // Mettre à jour l'état
    setUser(testUser);
    setSession(testSession);
    setIsPremiumUser(false);
    setIsAffiliate(false);
    setIsLoading(false);

    // Afficher une notification
    toast({
      title: "Connexion test réussie",
      description: "Vous êtes connecté avec le compte de démonstration basique (sans abonnement)",
      variant: "default",
    });

    // Notification dans le contexte de notification
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

  // Fonction pour enregistrer un utilisateur comme affilié
  const registerAsAffiliate = async (formData: AffiliateRegistrationData): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        // Simulation d'une requête au serveur
        setTimeout(() => {
          // Dans une implémentation réelle, ce serait une requête API pour enregistrer l'utilisateur comme affilié
          if (user) {
            // Mise à jour des métadonnées utilisateur pour inclure le statut d'affilié
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

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.getSession();
      
      if (!error && data.session) {
        setSession(data.session);
        setUser(data.session.user);
        // Vérifier si l'utilisateur est premium
        setIsPremiumUser(!!data.session.user?.user_metadata?.premium);
        // Vérifier si l'utilisateur est affilié
        setIsAffiliate(!!data.session.user?.user_metadata?.affiliate);
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
        // Mettre à jour le statut premium
        setIsPremiumUser(!!newSession?.user?.user_metadata?.premium);
        // Mettre à jour le statut d'affilié
        setIsAffiliate(!!newSession?.user?.user_metadata?.affiliate);
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
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      signOut, 
      signInWithTestAccount, 
      signInWithBasicTestAccount,
      isPremiumUser,
      isAffiliate,
      registerAsAffiliate
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
