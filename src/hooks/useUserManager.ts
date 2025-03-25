
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  setUser, 
  setSession, 
  setPremiumUser, 
  signIn as signInAction, 
  signOut as signOutAction,
  registerAsAffiliate as registerAsAffiliateAction
} from '@/store/slices/userSlice';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  enterprise: string;
  siret: string;
}

export const useUserManager = () => {
  const dispatch = useAppDispatch();
  const { user, session, isLoading, isPremiumUser, isAffiliate, error } = useAppSelector(state => state.user);
  const [updateLoading, setUpdateLoading] = useState(false);
  
  // Authentification
  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      const result = await dispatch(signInAction(credentials)).unwrap();
      return result;
    } catch (error: any) {
      toast({
        title: 'Erreur de connexion',
        description: error.message || 'Identifiants incorrects',
        variant: 'destructive',
      });
      throw error;
    }
  };
  
  const signOut = async () => {
    try {
      await dispatch(signOutAction());
      toast({
        title: 'Déconnexion réussie',
        description: 'Vous avez été déconnecté avec succès',
      });
    } catch (error: any) {
      toast({
        title: 'Erreur de déconnexion',
        description: error.message || 'Une erreur est survenue lors de la déconnexion',
        variant: 'destructive',
      });
    }
  };
  
  // Affiliation
  const registerAsAffiliate = async () => {
    try {
      if (!user) {
        throw new Error('Utilisateur non connecté');
      }
      
      await dispatch(registerAsAffiliateAction());
      return true;
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue lors de l\'inscription comme affilié',
        variant: 'destructive',
      });
      return false;
    }
  };
  
  const quickAffiliateSignup = async (): Promise<boolean> => {
    return await registerAsAffiliate();
  };
  
  // Gestion du profil
  const updateUserProfile = async (profile: Partial<UserProfile>): Promise<boolean> => {
    if (!user) {
      toast({
        title: 'Erreur',
        description: 'Vous devez être connecté pour mettre à jour votre profil',
        variant: 'destructive',
      });
      return false;
    }
    
    // Ensure all required fields are present
    const completeProfile: UserProfile = {
      firstName: profile.firstName || user?.user_metadata?.full_name?.split(' ')[0] || '',
      lastName: profile.lastName || user?.user_metadata?.full_name?.split(' ')[1] || '',
      email: profile.email || user?.email || '',
      address: profile.address || user?.user_metadata?.address || '',
      enterprise: profile.enterprise || user?.user_metadata?.enterprise || '',
      siret: profile.siret || user?.user_metadata?.siret || ''
    };
    
    setUpdateLoading(true);
    
    try {
      // Mise à jour des métadonnées utilisateur
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          full_name: `${completeProfile.firstName} ${completeProfile.lastName}`,
          address: completeProfile.address,
          enterprise: completeProfile.enterprise,
          siret: completeProfile.siret
        }
      });
      
      if (updateError) throw updateError;
      
      // Mise à jour de l'utilisateur dans la table users
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({
          full_name: `${completeProfile.firstName} ${completeProfile.lastName}`,
          enterprise: completeProfile.enterprise,
          siret: completeProfile.siret
        })
        .eq('id', user.id);
      
      if (userUpdateError) throw userUpdateError;
      
      // Mise à jour du state Redux
      const updatedUser = {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          full_name: `${completeProfile.firstName} ${completeProfile.lastName}`,
          address: completeProfile.address,
          enterprise: completeProfile.enterprise,
          siret: completeProfile.siret
        }
      } as User;
      
      dispatch(setUser(updatedUser));
      
      toast({
        title: 'Profil mis à jour',
        description: 'Vos informations ont été mises à jour avec succès',
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue lors de la mise à jour du profil',
        variant: 'destructive',
      });
      return false;
    } finally {
      setUpdateLoading(false);
    }
  };
  
  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      // Vérifier le mot de passe actuel
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword,
      });
      
      if (signInError) {
        throw new Error('Le mot de passe actuel est incorrect');
      }
      
      // Mettre à jour le mot de passe
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (updateError) throw updateError;
      
      toast({
        title: 'Mot de passe mis à jour',
        description: 'Votre mot de passe a été modifié avec succès',
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue lors de la mise à jour du mot de passe',
        variant: 'destructive',
      });
      return false;
    }
  };
  
  // Utilitaires
  const getUserProfile = (): UserProfile => {
    return {
      firstName: user?.user_metadata?.full_name?.split(' ')[0] || '',
      lastName: user?.user_metadata?.full_name?.split(' ')[1] || '',
      email: user?.email || '',
      address: user?.user_metadata?.address || '',
      enterprise: user?.user_metadata?.enterprise || '',
      siret: user?.user_metadata?.siret || '',
    };
  };
  
  const isProfileComplete = (): boolean => {
    const profile = getUserProfile();
    return !Object.values(profile).some(val => !val);
  };
  
  return {
    user,
    session,
    isLoading,
    updateLoading,
    isPremiumUser,
    isAffiliate,
    error,
    signIn,
    signOut,
    registerAsAffiliate,
    quickAffiliateSignup,
    updateUserProfile,
    updatePassword,
    getUserProfile,
    isProfileComplete,
  };
};
