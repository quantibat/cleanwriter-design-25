
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/integrations/supabase/client';
import { ProjectFormData } from '@/services/projectsService';
import { toast } from '@/hooks/use-toast';
import { Json } from '@/integrations/supabase/types';

interface ProjectsState {
  projects: any[];
  currentProject: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error('Vous devez être connecté pour accéder à vos projets');
      }

      console.log('Fetching projects from Supabase...');
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error fetching projects:', error);
        throw error;
      }
      
      console.log('Projects fetched successfully:', projects);
      return projects;
    } catch (error: any) {
      console.error('Error in fetchProjects thunk:', error);
      
      return rejectWithValue(error.message || 'Une erreur est survenue lors de la récupération des projets');
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error('Vous devez être connecté pour accéder à ce projet');
      }

      const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      console.log('Project fetched successfully:', project);
      return project;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Une erreur est survenue lors de la récupération du projet');
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (data: ProjectFormData, { rejectWithValue }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Utilisateur non authentifié');
      }
      
      const projectData = {
        user_id: user.id,
        title: data.title || 'Untitled Youtube to Newsletter',
        youtube_link: data.youtubeLink,
        option_type: data.option,
        output_language: data.language || 'french',
        ai_model: data.aiModel || 'gpt-4o',
        card_title: data.cardTitle || 'Ma sélection de cartes',
        is_social_media_only: data.isSocialMediaOnly || false,
        topics: data.topics || [],
        selected_topics: data.selectedTopics || [],
        active_content: data.activeContent || null,
        generated_contents: data.generatedContents || [],
        video_metadata: data.videoMetadata || null,
        used_credits: data.usedCredits || 0,
        progress: data.progress || 0,
        elements: data.elements || 0
      };

      console.log('Creating project with data:', projectData);
      const { data: project, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single();

      if (error) throw error;
      
      console.log('Project created successfully:', project);
      return project;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Une erreur est survenue lors de la création du projet');
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, data }: { id: string, data: Partial<ProjectFormData> }, { rejectWithValue }) => {
    try {
      const updateData: Record<string, any> = {};
      
      if (data.title !== undefined) updateData.title = data.title;
      if (data.youtubeLink !== undefined) updateData.youtube_link = data.youtubeLink;
      if (data.option !== undefined) updateData.option_type = data.option;
      if (data.language !== undefined) updateData.output_language = data.language;
      if (data.aiModel !== undefined) updateData.ai_model = data.aiModel;
      if (data.cardTitle !== undefined) updateData.card_title = data.cardTitle;
      if (data.isSocialMediaOnly !== undefined) updateData.is_social_media_only = data.isSocialMediaOnly;
      if (data.topics !== undefined) updateData.topics = data.topics;
      if (data.selectedTopics !== undefined) updateData.selected_topics = data.selectedTopics;
      if (data.activeContent !== undefined) updateData.active_content = data.activeContent;
      if (data.generatedContents !== undefined) updateData.generated_contents = data.generatedContents;
      if (data.videoMetadata !== undefined) updateData.video_metadata = data.videoMetadata;
      if (data.usedCredits !== undefined) updateData.used_credits = data.usedCredits;
      if (data.progress !== undefined) updateData.progress = data.progress;
      if (data.elements !== undefined) updateData.elements = data.elements;
      
      console.log('Updating project with data:', updateData);
      const { data: project, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      console.log('Project updated successfully:', project);
      return project;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Une erreur est survenue lors de la mise à jour du projet');
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Une erreur est survenue lors de la suppression du projet');
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<any>) => {
      state.currentProject = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProject = action.payload;
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.unshift(action.payload);
        state.currentProject = action.payload;
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = state.projects.filter(project => project.id !== action.payload);
        if (state.currentProject?.id === action.payload) {
          state.currentProject = null;
        }
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentProject, clearCurrentProject, clearError } = projectsSlice.actions;
export default projectsSlice.reducer;
