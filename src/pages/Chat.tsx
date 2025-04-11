
import { useEffect, useRef } from "react";

const N8nChat = () => {
  const chatInitializedRef = useRef(false);

  useEffect(() => {
    // Skip if already initialized to prevent duplicate chat instances
    if (chatInitializedRef.current) return;
    
    const loadChat = async () => {
      try {
        // Create and load the script dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
        script.type = 'module';
        script.onload = () => {
          // When script is loaded, initialize the chat
          if (window.createChat) {
            window.createChat({
              webhookUrl: 'https://metrr.app.n8n.cloud/webhook/81ecf1cb-27ab-46a8-baf8-ae7e0232fb06/chat'
            });
            chatInitializedRef.current = true;
          }
        };
        document.body.appendChild(script);
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
      chatInitializedRef.current = false;
    };
  }, []);

  return null; // The chat displays itself via the script, no HTML needed here
};

export default N8nChat;
