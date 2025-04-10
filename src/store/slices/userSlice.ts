
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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      // Add debug logging for state changes
      console.log(`User state isLoading changed to: ${action.payload}`);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log('getUser.pending: Setting isLoading to true');
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.session = action.payload.session;
        state.user = action.payload.session?.user || null;
        state.isPremiumUser = true; // Set premium to true for all users
        state.isAffiliate = !!action.payload.session?.user?.user_metadata?.affiliate;
        console.log('getUser.fulfilled: Setting isLoading to false');
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.log('getUser.rejected: Setting isLoading to false');
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log('signIn.pending: Setting isLoading to true');
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.session = action.payload.session;
        state.user = action.payload.user;
        state.isPremiumUser = true;
        state.isAffiliate = !!action.payload.user?.user_metadata?.affiliate;
        console.log('signIn.fulfilled: Setting isLoading to false');
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.log('signIn.rejected: Setting isLoading to false');
      })
      .addCase(signOut.pending, (state) => {
        console.log('signOut.pending');
        // Don't change loading state here to avoid flashing
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.session = null;
        state.isPremiumUser = false;
        state.isAffiliate = false;
        state.isLoading = false; // Ensure loading is false after signout
        console.log('signOut.fulfilled: Setting isLoading to false');
      })
      .addCase(signOut.rejected, (state) => {
        state.isLoading = false; // Ensure loading is false even if signout fails
        console.log('signOut.rejected: Setting isLoading to false');
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

export const { setUser, setSession, setPremiumUser, setIsLoading } = userSlice.actions;
export default userSlice.reducer;
