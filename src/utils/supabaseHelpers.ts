
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/types/supabase';

// Helper for type-safe queries when the table isn't in the auto-generated types
export const createTypeSafeQuery = <T extends keyof Database['public']['Tables']>(tableName: T) => {
  return {
    select: (query = '*') => supabase.from(tableName).select(query),
    insert: (data: Database['public']['Tables'][T]['Insert']) => supabase.from(tableName).insert(data),
    update: (data: Database['public']['Tables'][T]['Update']) => supabase.from(tableName).update(data),
    delete: () => supabase.from(tableName).delete(),
    upsert: (data: Database['public']['Tables'][T]['Insert']) => supabase.from(tableName).upsert(data),
  };
};

// For use with specific tables
export const projectsTable = createTypeSafeQuery('projects');
export const usersTable = createTypeSafeQuery('users');
