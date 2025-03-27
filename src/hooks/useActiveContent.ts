
import { useState } from 'react';
import { Json } from '@/integrations/supabase/types';

export interface ActiveContent {
  topicId?: string;
  subject: string;
  body: string;
}

// Helper to convert ActiveContent to Json compatible object
export const activeContentToJson = (content: ActiveContent | null): Json => {
  if (!content) return null;
  return content as unknown as Json;
};

// Helper to convert Json to ActiveContent
export const jsonToActiveContent = (json: Json): ActiveContent | null => {
  if (!json) return null;
  
  // Handle the case where json is an object with subject and body properties
  const contentObj = json as any;
  if (typeof contentObj === 'object' && contentObj !== null && 'subject' in contentObj && 'body' in contentObj) {
    return {
      topicId: contentObj.topicId,
      subject: contentObj.subject,
      body: contentObj.body
    };
  }
  
  return null;
};

// Helper to convert Json[] to ActiveContent[]
export const jsonArrayToActiveContent = (jsonArray: Json | null): ActiveContent[] => {
  if (!jsonArray) return [];
  
  // Handle array case
  if (Array.isArray(jsonArray)) {
    return jsonArray.map(item => {
      const contentObj = item as any;
      if (typeof contentObj === 'object' && contentObj !== null && 'subject' in contentObj && 'body' in contentObj) {
        return {
          topicId: contentObj.topicId,
          subject: contentObj.subject,
          body: contentObj.body
        };
      }
      return null;
    }).filter(Boolean) as ActiveContent[];
  }
  
  // Handle object case (if stored as an object with numeric keys)
  if (typeof jsonArray === 'object' && jsonArray !== null) {
    return Object.values(jsonArray).map(item => {
      const contentObj = item as any;
      if (typeof contentObj === 'object' && contentObj !== null && 'subject' in contentObj && 'body' in contentObj) {
        return {
          topicId: contentObj.topicId,
          subject: contentObj.subject,
          body: contentObj.body
        };
      }
      return null;
    }).filter(Boolean) as ActiveContent[];
  }
  
  return [];
};

export const useActiveContent = (initialContent: ActiveContent | null) => {
  const [activeContent, setActiveContent] = useState<ActiveContent | null>(initialContent);

  const clearActiveContent = () => {
    setActiveContent(null);
  };

  const updateActiveContent = (content: Partial<ActiveContent>) => {
    setActiveContent(prev => prev ? { ...prev, ...content } : null);
  };

  return {
    activeContent,
    setActiveContent,
    updateActiveContent,
    clearActiveContent,
  };
};
