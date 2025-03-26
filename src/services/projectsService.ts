
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

// Ces méthodes sont des wrappers autour des actions Redux pour simplifier l'usage
export const createProject = async (data: ProjectFormData) => {
  return store.dispatch(createProjectAction(data)).unwrap();
};

export const updateProject = async (id: string, data: Partial<ProjectFormData>) => {
  return store.dispatch(updateProjectAction({ id, data })).unwrap();
};

export const getProjectById = async (id: string) => {
  return store.dispatch(fetchProjectByIdAction(id)).unwrap();
};

export const getUserProjects = async () => {
  return store.dispatch(fetchProjectsAction()).unwrap();
};

export const deleteProject = async (id: string) => {
  return store.dispatch(deleteProjectAction(id)).unwrap();
};
