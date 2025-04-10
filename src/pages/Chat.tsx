
import { useEffect } from "react";

const N8nChat = () => {
  useEffect(() => {
    const loadChat = async () => {
      try {
        const module = await import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js');
        module.createChat({
          webhookUrl: 'https://metrr.app.n8n.cloud/webhook/81ecf1cb-27ab-46a8-baf8-ae7e0232fb06/chat'
        });
      } catch (error) {
        console.error("Failed to load chat module:", error);
      }
    };

    // Inject the CSS dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    document.head.appendChild(link);

    loadChat();

    // Cleanup: optionally remove the chat and style if needed
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      const chatContainer = document.querySelector('n8n-chat');
      if (chatContainer) chatContainer.remove();
    };
  }, []);

  return null; // The chat displays itself via the script, no HTML needed here
};

export default N8nChat;
