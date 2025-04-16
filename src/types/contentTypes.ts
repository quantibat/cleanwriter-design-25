
import { Json } from "@/integrations/supabase/types";

export interface ActiveContent {
  subject: string;
  body: string;
  topicId?: string;
}

export const activeContentToJson = (content: ActiveContent): Json => {
  return content as unknown as Json;
};

export const activeContentArrayToJson = (contents: ActiveContent[]): Json => {
  return contents as unknown as Json;
};

export const jsonToActiveContent = (json: Json): ActiveContent => {
  if (typeof json === 'object' && json !== null) {
    return {
      subject: (json as any).subject || '',
      body: (json as any).body || '',
      topicId: (json as any).topicId
    };
  }
  return { subject: '', body: '' };
};

export const jsonToActiveContentArray = (json: Json): ActiveContent[] => {
  if (Array.isArray(json)) {
    return json.map(item => jsonToActiveContent(item));
  }
  return [];
};
