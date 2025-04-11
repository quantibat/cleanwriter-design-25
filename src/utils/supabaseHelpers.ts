
import { supabase } from '@/integrations/supabase/client';

// Helper for type-safe queries when the table isn't in the auto-generated types
export const createTypeSafeQuery = (tableName: string) => {
  return {
    select: (query = '*') => supabase.from(tableName).select(query),
    insert: (data: any) => supabase.from(tableName).insert(data),
    update: (data: any) => supabase.from(tableName).update(data),
    delete: () => supabase.from(tableName).delete(),
    upsert: (data: any) => supabase.from(tableName).upsert(data),
  };
};

// For use with specific tables that aren't in the auto-generated types
export const projectsTable = createTypeSafeQuery('projects');
export const usersTable = createTypeSafeQuery('users');
