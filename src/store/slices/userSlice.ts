
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

interface UserState {
  user: User | null;
  session: any | null;
  isLoading: boolean;
  isPremiumUser: boolean;
  isAffiliate: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  session: null,
  isLoading: true,
  isPremiumUser: false,
  isAffiliate: false,
  error: null,
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'user/signIn',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        title: 'Erreur de connexion',
        description: error.message,
        variant: 'destructive',
      });
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  'user/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return null;
    } catch (error: any) {
      toast({
        title: 'Erreur de déconnexion',
        description: error.message,
        variant: 'destructive',
      });
      return rejectWithValue(error.message);
    }
  }
);

export const registerAsAffiliate = createAsyncThunk(
  'user/registerAsAffiliate',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = (getState() as any).user;
      if (!user) throw new Error('Utilisateur non connecté');
      
      // Simuler l'inscription comme affilié
      const updatedUser = {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          affiliate: true
        }
      } as User;
      
      toast({
        title: 'Félicitations!',
        description: 'Vous êtes maintenant un affilié DCEManager',
        variant: 'default'
      });
      
      return updatedUser;
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAffiliate = !!action.payload?.user_metadata?.affiliate;
    },
    setSession: (state, action: PayloadAction<any>) => {
      state.session = action.payload;
      state.user = action.payload?.user || null;
      state.isAffiliate = !!action.payload?.user?.user_metadata?.affiliate;
    },
    setPremiumUser: (state, action: PayloadAction<boolean>) => {
      state.isPremiumUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.session = action.payload.session;
        state.user = action.payload.session?.user || null;
        state.isPremiumUser = true; // Set premium to true for all users
        state.isAffiliate = !!action.payload.session?.user?.user_metadata?.affiliate;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.session = action.payload.session;
        state.user = action.payload.user;
        state.isPremiumUser = true;
        state.isAffiliate = !!action.payload.user?.user_metadata?.affiliate;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.session = null;
        state.isPremiumUser = false;
        state.isAffiliate = false;
      })
      .addCase(registerAsAffiliate.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAffiliate = true;
        if (state.session) {
          state.session.user = action.payload;
        }
      });
  },
});

export const { setUser, setSession, setPremiumUser } = userSlice.actions;
export default userSlice.reducer;
