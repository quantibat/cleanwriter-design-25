
interface FeatureData {
  title: string;
  description: string;
  longDescription?: string;
  benefits?: string[];
  useCases?: string[];
  integrationDetails?: string;
  technicalSpecs?: string[];
}

interface FeaturesDataType {
  [key: string]: FeatureData;
}

const featuresData: FeaturesDataType = {
  "automated-generation": {
    title: "Génération automatisée",
    description: "Créez des documents standardisés et personnalisables en quelques clics, en respectant la réglementation en vigueur.",
    longDescription: "Notre système de génération automatisée permet de créer rapidement des DCE complets et conformes à la réglementation des marchés publics. Avec des modèles prédéfinis et des champs personnalisables, vous pouvez produire en quelques minutes ce qui prenait auparavant plusieurs heures, tout en garantissant la conformité réglementaire.",
    benefits: [
      "Gain de temps considérable",
      "Réduction des erreurs de saisie",
      "Conformité réglementaire garantie",
      "Cohérence entre tous vos documents"
    ]
  },
  "simplified-collaboration": {
    title: "Collaboration simplifiée",
    description: "Partagez facilement vos DCE avec votre équipe et vos partenaires, avec un contrôle précis des accès.",
    longDescription: "Notre plateforme facilite la collaboration à chaque étape du processus de création et de gestion des DCE. Invitez des membres d'équipe ou des partenaires externes avec différents niveaux d'accès, travaillez simultanément sur les documents, et gardez une trace complète des modifications pour un suivi efficace.",
    benefits: [
      "Travail collaboratif en temps réel",
      "Gestion fine des droits d'accès",
      "Historique complet des modifications",
      "Notifications automatiques"
    ]
  },
  "analytics-tracking": {
    title: "Analyses et suivi",
    description: "Suivez l'avancement de vos projets et générez des rapports détaillés pour prendre les meilleures décisions.",
    longDescription: "Notre module d'analyse vous offre une visibilité complète sur tous vos DCE. Obtenez des informations précieuses sur l'avancement de vos projets, les délais moyens, et les performances globales. Générez facilement des rapports détaillés pour mieux comprendre vos processus et les optimiser.",
    benefits: [
      "Tableaux de bord personnalisables",
      "Suivi en temps réel des projets",
      "Rapports automatisés",
      "Indicateurs de performance clés",
      "Suggestions d'optimisation basées sur l'IA"
    ]
  },
  "enhanced-security": {
    title: "Sécurité renforcée",
    description: "Protégez vos données sensibles avec un chiffrement de bout en bout et des sauvegardes automatiques.",
    longDescription: "La sécurité est au cœur de notre solution. Toutes les données sont protégées par un chiffrement de bout en bout, avec des sauvegardes automatiques régulières et des mesures de protection avancées contre les accès non autorisés, garantissant la confidentialité totale de vos informations sensibles.",
    benefits: [
      "Chiffrement AES-256 de toutes les données",
      "Authentification multi-facteurs",
      "Sauvegardes automatiques quotidiennes",
      "Conformité RGPD complète",
      "Journalisation des accès"
    ]
  },
  "guaranteed-compliance": {
    title: "Conformité garantie",
    description: "Assurez-vous que vos DCE respectent toutes les exigences légales et réglementaires actuelles.",
    longDescription: "Notre équipe juridique maintient constamment à jour notre système pour refléter les dernières évolutions réglementaires dans le domaine des marchés publics. Grâce à nos modèles validés et nos contrôles automatiques, vous avez l'assurance que tous vos documents sont conformes aux exigences légales et réglementaires les plus récentes.",
    benefits: [
      "Modèles validés par des experts juridiques",
      "Mises à jour automatiques des clauses légales",
      "Vérifications de conformité intégrées",
      "Alertes en cas de non-conformité potentielle"
    ]
  }
};

export default featuresData;
