
import React from 'react';
import { FileText, Shield, BarChart3, Users, CheckCircle } from 'lucide-react';

// Define the structure of the feature data
interface FeatureDataType {
  [key: string]: {
    title: string;
    description: string;
    icon: React.ReactNode;
    sections: {
      title: string;
      content: string;
      image?: string;
    }[];
    benefits: string[];
    testimonials?: {
      quote: string;
      author: string;
      position: string;
    }[];
    faq?: {
      question: string;
      answer: string;
    }[];
    stats?: {
      label: string;
      value: string;
    }[];
  };
}

// Create the data object
const featuresData: FeatureDataType = {
  "generation-automatisee": {
    title: "Génération automatisée",
    description: "Créez des documents standardisés et personnalisables en quelques clics, en respectant la réglementation en vigueur.",
    icon: <FileText className="h-8 w-8 text-blue-400" />,
    sections: [
      {
        title: "Création de documents en un clic",
        content: "Notre système de génération automatisée vous permet de créer tous les documents nécessaires pour vos appels d'offres en quelques instants, en vous assurant qu'ils respectent les dernières normes et réglementations en vigueur."
      },
      {
        title: "Modèles personnalisables",
        content: "Utilisez nos modèles prédéfinis ou créez les vôtres pour générer rapidement des documents adaptés à vos besoins spécifiques. Notre système intelligent s'adapte à vos préférences et à votre historique d'utilisation."
      },
      {
        title: "Validation automatique",
        content: "Notre système vérifie automatiquement vos documents pour éviter les erreurs et omissions. Vous êtes ainsi assuré que vos dossiers sont complets et conformes aux exigences légales."
      }
    ],
    benefits: [
      "Gain de temps considérable dans la création de documents",
      "Réduction des erreurs et des risques juridiques",
      "Conformité garantie avec la réglementation en vigueur",
      "Interface intuitive accessible à tous les niveaux d'expertise",
      "Possibilité de créer des modèles personnalisés réutilisables"
    ],
    testimonials: [
      {
        quote: "Depuis que nous utilisons la fonction de génération automatisée de DCE Manager, nous avons réduit de 70% le temps passé à créer nos documents d'appels d'offres.",
        author: "Jean Dupont",
        position: "Directeur des achats, Ville de Bordeaux"
      },
      {
        quote: "La simplicité d'utilisation combinée à la fiabilité des documents générés font de cet outil un allié précieux pour notre service juridique.",
        author: "Sophie Martin",
        position: "Responsable juridique, BTP Solutions"
      }
    ],
    faq: [
      {
        question: "Les documents générés sont-ils conformes au Code de la commande publique ?",
        answer: "Oui, tous nos modèles sont régulièrement mis à jour pour rester en conformité avec les dernières évolutions du Code de la commande publique et des autres réglementations applicables."
      },
      {
        question: "Puis-je personnaliser les modèles de documents ?",
        answer: "Absolument ! Vous pouvez modifier tous nos modèles ou créer les vôtres à partir de zéro, puis les sauvegarder pour une utilisation future."
      },
      {
        question: "Combien de temps faut-il pour générer un DCE complet ?",
        answer: "En fonction de la complexité de votre projet, cela peut prendre de quelques minutes à une heure. Cependant, sans notre outil, le même travail pourrait vous prendre plusieurs jours."
      }
    ],
    stats: [
      {
        label: "Réduction du temps",
        value: "-70%"
      },
      {
        label: "Erreurs évitées",
        value: "-85%"
      },
      {
        label: "Conformité",
        value: "100%"
      },
      {
        label: "Satisfaction",
        value: "96%"
      }
    ]
  },
  "collaboration-simplifiee": {
    title: "Collaboration simplifiée",
    description: "Partagez facilement vos DCE avec votre équipe et vos partenaires, avec un contrôle précis des accès.",
    icon: <Users className="h-8 w-8 text-blue-400" />,
    sections: [
      {
        title: "Travail d'équipe efficace",
        content: "Notre plateforme de collaboration permet à plusieurs utilisateurs de travailler simultanément sur le même dossier, avec un suivi en temps réel des modifications et des commentaires pour faciliter les échanges."
      },
      {
        title: "Gestion fine des accès",
        content: "Définissez précisément qui peut voir, modifier ou commenter chaque document. Attribuez des rôles spécifiques à vos collaborateurs et partenaires pour un contrôle total sur vos informations sensibles."
      },
      {
        title: "Notifications intelligentes",
        content: "Restez informé des modifications importantes grâce à notre système de notifications personnalisables. Ne manquez plus jamais une mise à jour cruciale ou une échéance importante."
      }
    ],
    benefits: [
      "Collaboration en temps réel entre tous les intervenants",
      "Contrôle précis des droits d'accès et des permissions",
      "Historique complet des modifications et des versions",
      "Réduction des délais de validation et d'approbation",
      "Centralisation de toutes les communications liées au projet"
    ],
    testimonials: [
      {
        quote: "La fonction de collaboration nous permet de faire travailler ensemble nos services techniques, juridiques et financiers sans effort. C'est un gain de temps incroyable.",
        author: "Marie Lefort",
        position: "Cheffe de projet, Métropole de Lyon"
      },
      {
        quote: "Grâce à DCE Manager, je peux facilement collaborer avec nos partenaires externes tout en gardant un contrôle total sur les accès aux documents sensibles.",
        author: "Thomas Rivière",
        position: "Responsable des marchés publics, SNCF"
      }
    ],
    faq: [
      {
        question: "Combien d'utilisateurs peuvent collaborer sur un même projet ?",
        answer: "Selon votre forfait, vous pouvez avoir de 5 à un nombre illimité de collaborateurs sur chaque projet. Chaque utilisateur peut avoir des droits d'accès différents."
      },
      {
        question: "Comment sont gérées les modifications simultanées ?",
        answer: "Notre système utilise une technologie de fusion intelligente qui permet à plusieurs personnes de travailler sur le même document sans conflit. En cas de modification conflictuelle, vous êtes alerté et pouvez choisir quelle version conserver."
      },
      {
        question: "Les collaborateurs externes doivent-ils avoir un compte payant ?",
        answer: "Non, vous pouvez inviter des collaborateurs externes avec un accès limité sans coût supplémentaire. Seuls les utilisateurs avec des droits d'édition complets nécessitent une licence."
      }
    ],
    stats: [
      {
        label: "Temps de validation",
        value: "-60%"
      },
      {
        label: "Échanges d'emails",
        value: "-75%"
      },
      {
        label: "Collaboration",
        value: "+90%"
      },
      {
        label: "Productivité",
        value: "+40%"
      }
    ]
  },
  "analyses-suivi": {
    title: "Analyses et suivi",
    description: "Suivez l'avancement de vos projets et générez des rapports détaillés pour prendre les meilleures décisions.",
    icon: <BarChart3 className="h-8 w-8 text-blue-400" />,
    sections: [
      {
        title: "Tableaux de bord personnalisables",
        content: "Créez des tableaux de bord sur mesure pour visualiser en un coup d'œil l'état d'avancement de vos projets, les échéances à venir et les indicateurs clés de performance que vous aurez définis."
      },
      {
        title: "Rapports automatisés",
        content: "Générez des rapports détaillés sur vos activités, vos délais, vos budgets ou tout autre aspect de vos projets. Exportez-les facilement dans différents formats pour vos réunions ou présentations."
      },
      {
        title: "Analyse prédictive",
        content: "Bénéficiez d'analyses avancées basées sur l'intelligence artificielle pour anticiper les retards potentiels, optimiser vos processus et améliorer continuellement vos performances."
      }
    ],
    benefits: [
      "Visibilité complète sur l'avancement de tous vos projets",
      "Identification rapide des goulets d'étranglement et des risques",
      "Rapports détaillés pour faciliter la prise de décision",
      "Analyse des tendances pour améliorer vos processus",
      "Alertes proactives avant que les problèmes ne surviennent"
    ],
    testimonials: [
      {
        quote: "Les tableaux de bord nous permettent de suivre en temps réel l'état de nos appels d'offres et d'anticiper les actions à mener. C'est devenu indispensable pour notre direction.",
        author: "Philippe Moreau",
        position: "Directeur général, BTP Constructions"
      },
      {
        quote: "Grâce aux rapports automatisés, je peux présenter des données précises à ma direction en quelques clics. Cela m'économise des heures de préparation chaque semaine.",
        author: "Claire Dubois",
        position: "Acheteuse publique, Département du Rhône"
      }
    ],
    faq: [
      {
        question: "Puis-je créer mes propres indicateurs de performance ?",
        answer: "Oui, notre plateforme vous permet de définir et suivre vos propres KPIs en fonction de vos objectifs spécifiques et de la nature de vos projets."
      },
      {
        question: "Les rapports sont-ils exportables ?",
        answer: "Absolument ! Vous pouvez exporter vos rapports et tableaux de bord aux formats PDF, Excel ou PowerPoint pour les partager facilement avec votre équipe ou votre direction."
      },
      {
        question: "L'outil propose-t-il des prévisions basées sur les données historiques ?",
        answer: "Oui, notre système d'analyse prédictive utilise vos données historiques pour anticiper les délais réels, les risques potentiels et proposer des optimisations de processus."
      }
    ],
    stats: [
      {
        label: "Visibilité projet",
        value: "+85%"
      },
      {
        label: "Temps de reporting",
        value: "-80%"
      },
      {
        label: "Délais respectés",
        value: "+65%"
      },
      {
        label: "ROI moyen",
        value: "x4"
      }
    ]
  },
  "securite-renforcee": {
    title: "Sécurité renforcée",
    description: "Protégez vos données sensibles avec un chiffrement de bout en bout et des sauvegardes automatiques.",
    icon: <Shield className="h-8 w-8 text-blue-400" />,
    sections: [
      {
        title: "Protection de vos données",
        content: "Nous utilisons les technologies de chiffrement les plus avancées pour protéger vos informations sensibles. Toutes vos données sont chiffrées en transit et au repos, garantissant leur confidentialité en toutes circonstances."
      },
      {
        title: "Sauvegardes automatiques",
        content: "Vos documents sont automatiquement sauvegardés en temps réel. Vous pouvez également configurer des sauvegardes planifiées et restaurer facilement des versions antérieures en cas de besoin."
      },
      {
        title: "Conformité RGPD",
        content: "Notre solution est entièrement conforme au Règlement Général sur la Protection des Données (RGPD) et aux autres réglementations en vigueur, vous permettant de respecter vos obligations légales sans effort supplémentaire."
      }
    ],
    benefits: [
      "Protection maximale de vos données sensibles",
      "Tranquillité d'esprit grâce aux sauvegardes automatiques",
      "Conformité aux réglementations facilitée",
      "Traçabilité complète des accès et actions",
      "Restauration facile en cas d'incident"
    ],
    testimonials: [
      {
        quote: "La sécurité était notre préoccupation principale lors du choix d'une solution. DCE Manager a dépassé toutes nos attentes avec son chiffrement de bout en bout.",
        author: "Nicolas Blanc",
        position: "DSI, Mairie de Nantes"
      },
      {
        quote: "Après une panne informatique majeure, nous avons pu récupérer toutes nos données grâce au système de sauvegarde. Un stress énorme évité !",
        author: "Isabelle Petit",
        position: "Responsable administrative, Cabinet d'architecture Durand"
      }
    ],
    faq: [
      {
        question: "Où sont stockées nos données ?",
        answer: "Toutes vos données sont stockées sur des serveurs sécurisés situés en France, dans des centres de données certifiés qui respectent les plus hauts standards de sécurité."
      },
      {
        question: "Comment fonctionne le chiffrement des données ?",
        answer: "Nous utilisons un chiffrement AES-256 bits, la norme de l'industrie pour les données sensibles. Vos données sont chiffrées sur votre appareil avant d'être transmises à nos serveurs, garantissant qu'elles restent protégées à tout moment."
      },
      {
        question: "Pendant combien de temps les sauvegardes sont-elles conservées ?",
        answer: "Par défaut, les sauvegardes sont conservées pendant 30 jours, mais vous pouvez configurer cette durée selon vos besoins, jusqu'à 7 ans pour répondre aux exigences d'archivage légal."
      }
    ],
    stats: [
      {
        label: "Niveau de sécurité",
        value: "Tier 4"
      },
      {
        label: "Temps de restauration",
        value: "-95%"
      },
      {
        label: "Disponibilité",
        value: "99.9%"
      },
      {
        label: "Conformité RGPD",
        value: "100%"
      }
    ]
  },
  "conformite-garantie": {
    title: "Conformité garantie",
    description: "Assurez-vous que vos DCE respectent toutes les exigences légales et réglementaires actuelles.",
    icon: <CheckCircle className="h-8 w-8 text-blue-400" />,
    sections: [
      {
        title: "Veille réglementaire continue",
        content: "Notre équipe juridique surveille en permanence les évolutions du droit de la commande publique pour mettre à jour nos modèles et nos contrôles. Vous êtes ainsi assuré de toujours respecter les dernières réglementations en vigueur."
      },
      {
        title: "Validation automatique de conformité",
        content: "Avant chaque finalisation, nos algorithmes vérifient automatiquement la conformité de vos documents avec les exigences légales applicables et vous alertent en cas de problème potentiel."
      },
      {
        title: "Accompagnement juridique",
        content: "En cas de question complexe, nos experts juridiques spécialisés dans les marchés publics sont disponibles pour vous conseiller et vous assurer que vos procédures sont inattaquables."
      }
    ],
    benefits: [
      "Sécurisation juridique de vos procédures d'appel d'offres",
      "Réduction des risques de contentieux",
      "Mise à jour automatique selon les évolutions législatives",
      "Alertes préventives en cas de non-conformité",
      "Accompagnement par des experts en droit des marchés publics"
    ],
    testimonials: [
      {
        quote: "Depuis que nous utilisons DCE Manager, aucun de nos marchés n'a été contesté pour vice de procédure. La tranquillité d'esprit que cela nous apporte est inestimable.",
        author: "François Lemaire",
        position: "Responsable juridique, Communauté de communes du Val de Loire"
      },
      {
        quote: "La fonction de validation automatique de conformité nous a permis d'identifier et de corriger plusieurs erreurs qui auraient pu invalider notre procédure. Un outil vraiment précieux.",
        author: "Aurélie Rousseau",
        position: "Juriste marchés publics, Hôpital Universitaire de Strasbourg"
      }
    ],
    faq: [
      {
        question: "À quelle fréquence les modèles sont-ils mis à jour ?",
        answer: "Nos modèles sont mis à jour immédiatement après chaque changement réglementaire significatif, et nous effectuons une révision complète au moins une fois par mois pour intégrer les évolutions de jurisprudence."
      },
      {
        question: "Votre système prend-il en compte les spécificités locales ?",
        answer: "Oui, notre solution intègre les particularités réglementaires applicables aux différentes catégories d'acheteurs publics (État, collectivités territoriales, établissements publics, etc.) ainsi que les spécificités sectorielles."
      },
      {
        question: "Comment être alerté des changements réglementaires ?",
        answer: "Vous recevez automatiquement des notifications concernant les évolutions réglementaires qui pourraient impacter vos projets en cours. Nous publions également une newsletter mensuelle résumant les changements importants."
      }
    ],
    stats: [
      {
        label: "Réduction contentieux",
        value: "-90%"
      },
      {
        label: "Mise à jour",
        value: "<24h"
      },
      {
        label: "Couverture juridique",
        value: "100%"
      },
      {
        label: "Sécurité juridique",
        value: "+95%"
      }
    ]
  }
};

export default featuresData;
