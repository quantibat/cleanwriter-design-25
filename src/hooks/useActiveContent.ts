
import { useState } from 'react';

export interface ActiveContent {
  topicId?: string;
  subject: string;
  body: string;
}

export const useActiveContent = (initialContent: ActiveContent | null) => {
  const [activeContent, setActiveContent] = useState<ActiveContent | null>(initialContent);

  const clearActiveContent = () => {
    setActiveContent(null);
  };

  return {
    activeContent,
    setActiveContent,
    clearActiveContent,
  };
};
