
import { supabase } from '@/integrations/supabase/client';
import { usersTable } from '@/utils/supabaseHelpers';

// Helper function to update user profile
export const updateUserProfile = async (userId: string, data: {
  full_name?: string;
  avatar_url?: string;
  address?: string;
}) => {
  try {
    // First update auth metadata (doesn't allow direct DB access)
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        full_name: data.full_name,
        address: data.address,
        avatar_url: data.avatar_url,
      }
    });
    
    if (authError) {
      throw authError;
    }
    
    // Then update the public profile in users table
    const { error: dbError } = await usersTable
      .update({
        full_name: data.full_name,
        avatar_url: data.avatar_url,
      })
      .eq('id', userId);
    
    if (dbError) {
      throw dbError;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error };
  }
};

// Helper function to update enterprise info
export const updateEnterpriseInfo = async (userId: string, data: {
  enterprise?: string;
  siret?: string;
}) => {
  try {
    // First update auth metadata
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        enterprise: data.enterprise,
        siret: data.siret,
      }
    });
    
    if (authError) {
      throw authError;
    }
    
    // Then update the public profile
    const { error: dbError } = await usersTable
      .update({
        enterprise: data.enterprise,
        siret: data.siret,
      })
      .eq('id', userId);
    
    if (dbError) {
      throw dbError;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating enterprise info:', error);
    return { success: false, error };
  }
};
