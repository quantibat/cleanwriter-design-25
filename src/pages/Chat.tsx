import { useEffect } from "react";

const N8nChat = () => {
  useEffect(() => {
    const loadChat = async () => {
      try {
        // Inject the stylesheet
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
        document.head.appendChild(link).style.color= "blue";

        // Dynamically import the module (like <script type="module">)
        const module = await import(
          "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js"
        );

        if (module?.createChat) {
          module.createChat({
            webhookUrl:
              "https://metrr.app.n8n.cloud/webhook/81ecf1cb-27ab-46a8-baf8-ae7e0232fb06/chat",
          });
        }
      } catch (err) {
        console.error("Erreur lors du chargement du chat :", err);
      }
    };

    loadChat();
  }, []);

  return null;
};

export default N8nChat;
