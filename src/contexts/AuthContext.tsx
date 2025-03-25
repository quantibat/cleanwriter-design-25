import React, { createContext, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser, setSession, setPremiumUser } from '@/store/slices/userSlice';
import { useUserManager, UserProfile } from '@/hooks/useUserManager';

type AuthContextType = {
  user: any | null;
  session: any | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  isPremiumUser: boolean;
  isAffiliate: boolean;
  registerAsAffiliate: () => Promise<boolean>;
  quickAffiliateSignup: () => Promise<boolean>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<boolean>;
  getUserProfile: () => UserProfile;
  isProfileComplete: () => boolean;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, session, isLoading, isPremiumUser, isAffiliate } = useAppSelector(state => state.user);
  const userManager = useUserManager();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log(`Auth event: ${event}`);
        dispatch(setSession(newSession));
        
        if (event === 'SIGNED_IN') {
          if (newSession?.user?.app_metadata?.provider === 'google') {
            if (newSession.user.created_at === newSession.user.last_sign_in_at) {
              console.log("Nouvel utilisateur Google, configuration des métadonnées");
              
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
          
          dispatch(setPremiumUser(true));
          
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
      signOut: userManager.signOut,
      isPremiumUser,
      isAffiliate,
      registerAsAffiliate: userManager.registerAsAffiliate,
      quickAffiliateSignup: userManager.quickAffiliateSignup,
      updateUserProfile: userManager.updateUserProfile,
      getUserProfile: userManager.getUserProfile,
      isProfileComplete: userManager.isProfileComplete,
      updatePassword: userManager.updatePassword
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
