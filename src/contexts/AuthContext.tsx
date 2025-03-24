
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { User, UserResponse } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isPremiumUser: boolean;
  isAffiliate: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isPremiumUser: false,
  isAffiliate: false,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isAffiliate, setIsAffiliate] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        setUser(user);
        
        // Vérifier si l'utilisateur est premium en consultant une table spécifique
        // Par défaut, l'utilisateur n'est PAS premium
        setIsPremiumUser(false);
        setIsAffiliate(false);
        
        // Vous pourriez vérifier le statut premium dans une table profiles
        if (user) {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('is_premium, is_affiliate')
            .eq('id', user.id)
            .single();
            
          if (profileData && !error) {
            setIsPremiumUser(profileData.is_premium || false);
            setIsAffiliate(profileData.is_affiliate || false);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setIsLoading(true);
        
        // Réinitialiser les statuts premium et affiliate quand l'état d'authentification change
        if (!session?.user) {
          setIsPremiumUser(false);
          setIsAffiliate(false);
          setIsLoading(false);
          return;
        }
        
        // Vérifier le statut premium et affiliate
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('is_premium, is_affiliate')
          .eq('id', session.user.id)
          .single();
          
        if (profileData && !error) {
          setIsPremiumUser(profileData.is_premium || false);
          setIsAffiliate(profileData.is_affiliate || false);
        } else {
          setIsPremiumUser(false);
          setIsAffiliate(false);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsPremiumUser(false);
      setIsAffiliate(false);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isPremiumUser, isAffiliate, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
