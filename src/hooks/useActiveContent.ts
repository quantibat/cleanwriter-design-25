
import { useState } from 'react';

export interface ActiveContent {
  subject: string;
  body: string;
}

export const useActiveContent = (initialContent: ActiveContent | null = null) => {
  const [activeContent, setActiveContent] = useState<ActiveContent | null>(initialContent);

  const updateActiveContent = (content: ActiveContent | null) => {
    setActiveContent(content);
  };

  return {
    activeContent,
    setActiveContent: updateActiveContent
  };
};
