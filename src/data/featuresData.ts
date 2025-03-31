
import React from 'react';
import { Compass, BarChart2, Clock, FolderOpen, FileSpreadsheet, Lightbulb, RulerSquare, CalendarClock, DollarSign, PenTool, ClipboardCheck, Send, FileText, MessageSquare } from 'lucide-react';

// This function creates React elements for the icons
const createIcon = (Icon: any) => React.createElement(Icon, { size: 24 });

const featuresData = {
  'veille-appels-offres': {
    title: 'Veille des Appels d'Offres',
    description: 'Une liste ciblée d'appels d'offres adaptés à votre entreprise pour repérer en un clin d'œil les opportunités qui comptent pour vous.',
    icon: createIcon(Compass),
    sections: [
      {
        title: 'Surveillance automatisée des appels d'offres',
        content: 'Notre technologie avancée analyse en continu les nouveaux marchés publiés et les filtre selon vos critères spécifiques. Vous recevez uniquement les opportunités qui correspondent à votre activité, votre zone géographique et vos capacités.',
      },
      {
        title: 'Alertes personnalisées en temps réel',
        content: 'Définissez vos préférences de notification et recevez des alertes dès qu'un appel d'offres correspondant à vos critères est publié. Ne manquez plus jamais une opportunité commerciale importante.',
      },
      {
        title: 'Tableau de bord intuitif',
        content: 'Visualisez en un coup d'œil l'ensemble des appels d'offres pertinents pour votre entreprise, avec un système de prioritisation intelligent qui met en avant les opportunités les plus prometteuses.',
      }
    ],
    benefits: [
      'Gain de temps considérable dans la recherche d'appels d'offres',
      'Ciblage précis évitant les réponses aux appels d'offres inadaptés',
      'Augmentation significative du taux de transformation',
      'Vue d'ensemble du marché dans votre secteur d'activité',
      'Identification précoce des tendances et nouvelles opportunités'
    ],
    testimonials: [
      {
        quote: 'Grâce à la veille automatisée de DCE Manager, nous avons augmenté de 40% le nombre d'appels d'offres auxquels nous répondons, tout en ciblant mieux. Notre taux de transformation a doublé en six mois.',
        author: 'Sophie Mercier',
        position: 'Directrice commerciale, BTP Solutions'
      },
      {
        quote: 'Avant DCE Manager, nous passions des heures à chercher des appels d'offres pertinents. Maintenant, ils arrivent directement dans notre tableau de bord, parfaitement filtrés.',
        author: 'Thomas Leroy',
        position: 'Responsable des marchés publics, Constructions Durables'
      }
    ],
    stats: [
      {
        label: 'Gain de temps',
        value: '78%'
      },
      {
        label: 'Opportunités identifiées',
        value: '+65%'
      },
      {
        label: 'Taux de transformation',
        value: 'x2.4'
      },
      {
        label: 'Satisfaction client',
        value: '96%'
      }
    ],
    faq: [
      {
        question: 'Comment personnaliser mes critères de recherche ?',
        answer: 'Vous pouvez définir vos critères par secteur d'activité, zone géographique, montant estimé, type de procédure et mots-clés spécifiques. Ces paramètres sont modifiables à tout moment depuis votre espace personnel.'
      },
      {
        question: 'Les appels d'offres privés sont-ils inclus ?',
        answer: 'Oui, notre solution surveille à la fois les marchés publics et les appels d'offres privés auxquels nous avons accès via notre réseau de partenaires.'
      },
      {
        question: 'Puis-je partager les opportunités avec mon équipe ?',
        answer: 'Absolument, vous pouvez attribuer des appels d'offres à différents membres de votre équipe et suivre leur progression directement dans l'outil.'
      }
    ]
  },
  'analyse-rapide-dce': {
    title: 'Analyse rapide du DCE',
    description: 'Un résumé clair et personnalisé des points clés et exigences techniques du DCE pour le comprendre sans y passer la journée.',
    icon: createIcon(BarChart2),
    sections: [
      {
        title: 'Synthèse automatique des exigences clés',
        content: 'Notre technologie d\'intelligence artificielle analyse l\'intégralité du DCE pour en extraire les informations essentielles : délais, critères de sélection, exigences techniques spécifiques, et pièces administratives requises.',
      },
      {
        title: 'Identification des risques et opportunités',
        content: 'Le système détecte automatiquement les clauses inhabituelles, les exigences particulièrement contraignantes ou les opportunités spécifiques liées à vos domaines d\'expertise.',
      },
      {
        title: 'Comparaison avec vos projets antérieurs',
        content: 'L\'analyse établit des parallèles avec vos précédents appels d\'offres pour identifier les similitudes, les différences notables et vous permettre de capitaliser sur votre expérience.',
      }
    ],
    benefits: [
      'Réduction drastique du temps d\'analyse des DCE (de plusieurs heures à quelques minutes)',
      'Détection des points critiques nécessitant une attention particulière',
      'Meilleure compréhension des attentes du maître d\'ouvrage',
      'Prise de décision éclairée sur l\'opportunité de répondre',
      'Préparation optimisée de votre réponse technique'
    ],
    testimonials: [
      {
        quote: 'L\'analyse rapide du DCE a transformé notre approche. Nous identifions immédiatement les appels d\'offres qui correspondent vraiment à nos compétences et évitons ceux où nous serions moins compétitifs.',
        author: 'Jean Dupont',
        position: 'Directeur commercial, Innovations Construction'
      },
      {
        quote: 'Avec cette fonctionnalité, nous avons réduit de 70% le temps consacré à l\'étude préliminaire des DCE. Notre équipe peut désormais se concentrer sur l\'élaboration de réponses de qualité.',
        author: 'Marie Laurent',
        position: 'Responsable des appels d\'offres, Groupe BTI'
      }
    ],
    stats: [
      {
        label: 'Temps économisé',
        value: '70%'
      },
      {
        label: 'Précision de l\'analyse',
        value: '95%'
      },
      {
        label: 'Réactivité améliorée',
        value: 'x3'
      },
      {
        label: 'Taux de pertinence',
        value: '92%'
      }
    ],
    faq: [
      {
        question: 'Quels types de documents l\'outil peut-il analyser ?',
        answer: 'Notre solution analyse tous les formats courants : PDF, Word, Excel, ainsi que les fichiers ZIP contenant plusieurs documents.'
      },
      {
        question: 'Comment l\'IA reconnaît-elle les informations importantes ?',
        answer: 'Notre système a été entraîné sur des milliers de DCE et affine continuellement sa compréhension grâce au machine learning. Il identifie les patterns récurrents et les éléments critiques propres à chaque secteur d\'activité.'
      },
      {
        question: 'Est-il possible d\'adapter l\'analyse à mon domaine d\'activité ?',
        answer: 'Oui, le système apprend progressivement de vos interactions et s\'adapte à votre secteur spécifique pour une analyse toujours plus pertinente.'
      }
    ]
  },
  'estimation-effort-etude': {
    title: 'Estimation de l\'Effort d\'Étude',
    description: 'Obtenez rapidement une estimation fiable du temps et des ressources nécessaires pour répondre efficacement à l\'appel d\'offres.',
    icon: createIcon(Clock),
    sections: [
      {
        title: 'Évaluation intelligente de la complexité',
        content: 'Notre algorithme analyse la complexité technique du projet, le volume documentaire, les exigences spécifiques et les délais pour calculer précisément le niveau d\'effort requis.',
      },
      {
        title: 'Planification des ressources nécessaires',
        content: 'En fonction de l\'analyse, le système propose une répartition optimale des ressources humaines et techniques, avec une estimation des heures de travail par profil et par phase.',
      },
      {
        title: 'Comparaison avec des projets similaires',
        content: 'L\'estimation s\'appuie sur l\'historique de vos précédentes réponses pour des projets comparables, garantissant ainsi une prévision réaliste basée sur votre expérience.',
      }
    ],
    benefits: [
      'Anticipation précise du temps nécessaire à la préparation',
      'Allocation optimisée des ressources internes',
      'Évaluation fiable du retour sur investissement potentiel',
      'Meilleure priorisation des appels d\'offres',
      'Réduction des risques de surcharge ou de sous-estimation'
    ],
    stats: [
      {
        label: 'Précision moyenne',
        value: '89%'
      },
      {
        label: 'Projets abandonnés à temps',
        value: '+45%'
      },
      {
        label: 'Planification améliorée',
        value: '+62%'
      },
      {
        label: 'Satisfaction équipes',
        value: '91%'
      }
    ],
    faq: [
      {
        question: 'Comment l\'outil calcule-t-il le temps nécessaire ?',
        answer: 'Le système analyse plusieurs paramètres : volume documentaire, complexité technique, exigences particulières, et s\'appuie sur les données historiques de projets similaires pour affiner son estimation.'
      },
      {
        question: 'Est-ce adaptable selon la taille de mon entreprise ?',
        answer: 'Absolument, l\'outil prend en compte vos capacités internes et s\'ajuste en fonction de l\'expérience et de la productivité de votre équipe.'
      }
    ]
  },
  'reorganisation-dce': {
    title: 'Réorganisation du DCE',
    description: 'Disposez immédiatement d\'un dossier clair, complet et ordonné, prêt à l\'emploi pour faciliter votre analyse.',
    icon: createIcon(FolderOpen),
    sections: [
      {
        title: 'Classement automatique des documents',
        content: 'L\'outil identifie et classe automatiquement tous les documents du DCE selon leur nature (administratif, technique, financier) pour une navigation simplifiée.'
      },
      {
        title: 'Extraction et indexation du contenu',
        content: 'Le contenu de chaque document est analysé, indexé et rendu accessible via un système de recherche performant qui vous permet de retrouver instantanément n\'importe quelle information.'
      },
      {
        title: 'Organisation hiérarchique intelligente',
        content: 'Le système crée une arborescence logique des documents, mettant en évidence les relations entre eux et facilitant la compréhension globale du dossier.'
      }
    ],
    benefits: [
      'Gain de temps considérable dans l\'organisation préalable',
      'Réduction des risques d\'oubli de documents importants',
      'Facilité de partage et de collaboration au sein de l\'équipe',
      'Amélioration de la qualité d\'analyse globale',
      'Conformité assurée avec toutes les exigences du DCE'
    ],
    stats: [
      {
        label: 'Temps d\'organisation réduit',
        value: '85%'
      },
      {
        label: 'Précision du classement',
        value: '99%'
      },
      {
        label: 'Satisfaction utilisateurs',
        value: '96%'
      }
    ],
    faq: [
      {
        question: 'Comment les documents sont-ils organisés ?',
        answer: 'Les documents sont automatiquement classés par catégories (administratif, technique, financier) puis sous-catégories selon leur nature spécifique, créant une arborescence intuitive.'
      },
      {
        question: 'Est-il possible de personnaliser l\'organisation ?',
        answer: 'Oui, vous pouvez définir votre propre structure de classement et l\'appliquer automatiquement à tous vos projets futurs.'
      }
    ]
  },
  'elaboration-dpgf': {
    title: 'Élaboration DPGF',
    description: 'Transformez simplement votre CCTP en DPGF détaillée et immédiatement chiffrable pour gagner un temps précieux.',
    icon: createIcon(FileSpreadsheet),
    sections: [
      {
        title: 'Extraction automatique des ouvrages',
        content: 'Notre technologie identifie et extrait automatiquement tous les ouvrages mentionnés dans le CCTP, les organise par lots et créé une structure claire pour votre DPGF.'
      },
      {
        title: 'Quantification assistée',
        content: 'Le système propose des estimations de quantités basées sur l\'analyse des descriptions, des plans et utilise l\'intelligence artificielle pour détecter les incohérences potentielles.'
      },
      {
        title: 'Format prêt au chiffrage',
        content: 'La DPGF générée est immédiatement exploitable dans vos outils habituels (Excel, logiciels métiers) et prête à recevoir vos prix unitaires.'
      }
    ],
    benefits: [
      'Réduction drastique du temps d\'élaboration (de plusieurs jours à quelques heures)',
      'Diminution des risques d\'oublis d\'ouvrages',
      'Cohérence parfaite entre CCTP et DPGF',
      'Détection des ambiguïtés et incohérences dans le DCE',
      'Structure optimisée pour faciliter le chiffrage ultérieur'
    ],
    stats: [
      {
        label: 'Gain de temps',
        value: '75%'
      },
      {
        label: 'Réduction des oublis',
        value: '90%'
      },
      {
        label: 'Précision des quantités',
        value: '88%'
      }
    ],
    faq: [
      {
        question: 'Comment les quantités sont-elles estimées ?',
        answer: 'L\'IA analyse les descriptions des ouvrages, croise les informations avec les plans quand ils sont disponibles, et utilise des modèles prédictifs basés sur des projets similaires.'
      },
      {
        question: 'Puis-je modifier facilement la DPGF générée ?',
        answer: 'Absolument, la DPGF est entièrement modifiable et vous pouvez ajuster les quantités, ajouter ou supprimer des postes selon vos besoins.'
      }
    ]
  }
};

export default featuresData;
