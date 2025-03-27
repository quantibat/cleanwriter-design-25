
import { store } from '@/store';
import { 
  fetchProjects as fetchProjectsAction,
  fetchProjectById as fetchProjectByIdAction,
  createProject as createProjectAction,
  updateProject as updateProjectAction,
  deleteProject as deleteProjectAction
} from '@/store/slices/projectsSlice';

export interface ProjectFormData {
  title: string;
  youtubeLink?: string;
  option?: string;
  language?: string;
  aiModel?: string;
  cardTitle?: string;
  isSocialMediaOnly?: boolean;
  topics?: any[];
  selectedTopics?: string[];
  activeContent?: any;
  generatedContents?: any[];
  videoMetadata?: any;
  usedCredits?: number;
  progress?: number;
  elements?: number;
}

// Add better error handling to these service methods
export const createProject = async (data: ProjectFormData) => {
  try {
    return await store.dispatch(createProjectAction(data)).unwrap();
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (id: string, data: Partial<ProjectFormData>) => {
  try {
    return await store.dispatch(updateProjectAction({ id, data })).unwrap();
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const getProjectById = async (id: string) => {
  try {
    return await store.dispatch(fetchProjectByIdAction(id)).unwrap();
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw error;
  }
};

export const getUserProjects = async () => {
  try {
    return await store.dispatch(fetchProjectsAction()).unwrap();
  } catch (error) {
    console.error('Error fetching user projects:', error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    return await store.dispatch(deleteProjectAction(id)).unwrap();
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
