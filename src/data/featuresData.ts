
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
  // Repérez vos futurs chantiers
  "veille-appels-offres": {
    title: "Veille des Appels d'Offres",
    description: "Trouvez directement les AO faits pour vous. Recevez une liste ciblée et actualisée des AO correspondant à votre activité, votre zone géographique et vos spécialités.",
    longDescription: "Notre solution de veille des appels d'offres analyse quotidiennement les publications sur l'ensemble des plateformes de marchés publics. Grâce à notre algorithme d'IA, nous identifions les opportunités qui correspondent précisément à votre profil d'entreprise et vous les présentons de manière claire et organisée.",
    benefits: [
      "Gain de temps considérable sur la recherche d'appels d'offres",
      "Alertes personnalisées par email ou notification",
      "Filtrage intelligent selon vos critères d'activité et de localisation",
      "Accès à des opportunités que vous auriez pu manquer"
    ]
  },
  "analyse-rapide-dce": {
    title: "Analyse du DCE",
    description: "Identifiez l'essentiel du lot sans perdre de temps. Visualisez immédiatement les points clés et les exigences techniques pour décider rapidement et sereinement.",
    longDescription: "Notre outil d'analyse du DCE utilise l'intelligence artificielle pour parcourir l'ensemble des documents du dossier de consultation et en extraire les informations essentielles. Vous obtenez en quelques minutes un résumé structuré des points clés, des exigences techniques et des délais, vous permettant de prendre une décision éclairée rapidement.",
    benefits: [
      "Compréhension rapide des enjeux du projet",
      "Identification des contraintes techniques spécifiques",
      "Repérage des clauses inhabituelles ou restrictives",
      "Visualisation claire des délais et des livrables"
    ]
  },
  "estimation-effort-etude": {
    title: "Estimation de l'Effort d'Étude",
    description: "Évaluez instantanément vos besoins. Obtenez rapidement une estimation fiable du temps et des ressources nécessaires pour répondre efficacement.",
    longDescription: "Notre outil d'estimation de l'effort d'étude analyse la complexité du DCE et vous fournit une évaluation précise des ressources nécessaires pour préparer une réponse de qualité. Basé sur des milliers de projets similaires, il vous aide à planifier efficacement votre charge de travail et à prioriser vos réponses.",
    benefits: [
      "Estimation précise du temps de préparation nécessaire",
      "Évaluation des compétences requises pour la réponse",
      "Priorisation objective des appels d'offres",
      "Optimisation de l'allocation des ressources internes"
    ]
  },
  
  // Organisez clairement vos documents
  "reorganisation-dce": {
    title: "Réorganisation du DCE",
    description: "Classez votre DCE automatiquement. Disposez immédiatement d'un dossier clair, complet et ordonné, prêt à l'emploi.",
    longDescription: "Notre solution de réorganisation du DCE structure automatiquement l'ensemble des documents du dossier de consultation selon une arborescence logique et intuitive. Les fichiers sont renommés de manière cohérente et classés par catégories (administratif, technique, financier), facilitant leur consultation et leur analyse.",
    benefits: [
      "Structure claire et cohérente des documents",
      "Nommage standardisé des fichiers",
      "Accès rapide aux informations recherchées",
      "Partage facilité avec votre équipe"
    ]
  },
  "elaboration-dpgf": {
    title: "Élaboration DPGF",
    description: "Créez une DPGF claire et prête à l'usage. Transformez simplement votre CCTP en DPGF détaillée et immédiatement chiffrable.",
    longDescription: "Notre outil d'élaboration DPGF analyse le CCTP et autres documents techniques pour extraire automatiquement tous les postes de travaux et les quantités associées. Il génère une décomposition du prix global et forfaitaire structurée, prête à être chiffrée, vous faisant gagner un temps précieux dans la préparation de votre offre.",
    benefits: [
      "Automatisation de l'extraction des postes de travaux",
      "Structuration cohérente et hiérarchique des lots",
      "Estimation automatique des quantités quand c'est possible",
      "Format directement compatible avec vos outils de chiffrage"
    ]
  },
  "analyse-technique-lot": {
    title: "Analyse Technique du Lot",
    description: "Repérez les points techniques essentiels en un instant. Identifiez directement contraintes et spécificités techniques pour adapter efficacement votre offre.",
    longDescription: "Notre solution d'analyse technique du lot examine en profondeur les exigences techniques du marché et identifie les points critiques, les contraintes particulières et les spécifications inhabituelles. Elle vous alerte sur les aspects qui nécessitent une attention particulière, vous permettant de préparer une offre parfaitement adaptée aux besoins du maître d'ouvrage.",
    benefits: [
      "Identification des points techniques critiques",
      "Repérage des spécifications inhabituelles",
      "Mise en évidence des contraintes d'exécution",
      "Suggestion de solutions techniques adaptées"
    ]
  },
  "consultation-fournisseurs": {
    title: "Consultation Fournisseurs",
    description: "Préparez facilement vos consultations. Accédez immédiatement aux informations techniques nécessaires pour solliciter rapidement vos fournisseurs et sous-traitants.",
    longDescription: "Notre module de consultation fournisseurs extrait automatiquement les informations pertinentes du DCE pour chaque corps de métier et prépare des demandes de prix structurées. Il vous permet de solliciter rapidement vos fournisseurs et sous-traitants avec des documents clairs contenant toutes les informations nécessaires à leur chiffrage.",
    benefits: [
      "Préparation automatisée des demandes de prix",
      "Centralisation des réponses des fournisseurs",
      "Comparaison facilitée des offres reçues",
      "Suivi des consultations en cours"
    ]
  },
  
  // Affinez précisément vos quantités, coûts et plannings
  "realisation-metres": {
    title: "Réalisation des Métrés",
    description: "Quantifiez précisément, sans effort. Obtenez rapidement des métrés fiables grâce à l'appui de l'intelligence artificielle.",
    longDescription: "Notre solution de réalisation des métrés analyse les plans, les CCTP et autres documents techniques pour effectuer automatiquement les calculs de surfaces, volumes et quantités. Elle intègre les dernières technologies de reconnaissance visuelle et d'interprétation de plans pour vous fournir des métrés précis et fiables en quelques minutes.",
    benefits: [
      "Calcul automatisé des surfaces et volumes",
      "Extraction des quantités depuis les plans",
      "Vérification croisée avec les informations du CCTP",
      "Ajustement possible des calculs avec interface intuitive"
    ]
  },
  "planning-previsionnel": {
    title: "Planning Prévisionnel",
    description: "Établissez un planning clair en quelques clics. Générez simplement un planning prévisionnel réaliste, immédiatement présentable et adaptable.",
    longDescription: "Notre outil de planning prévisionnel analyse les différentes tâches du projet et leurs interdépendances pour générer automatiquement un calendrier d'exécution optimisé. Il prend en compte les contraintes spécifiques du chantier, les délais d'approvisionnement et les ressources disponibles pour vous proposer un planning réaliste et facilement ajustable.",
    benefits: [
      "Génération automatique d'un planning cohérent",
      "Prise en compte des contraintes spécifiques du projet",
      "Visualisation claire du chemin critique",
      "Export en formats courants (MS Project, Excel, PDF)"
    ]
  },
  "chiffrage": {
    title: "Chiffrage",
    description: "Chiffrez rapidement en toute confiance. Élaborez facilement des propositions cohérentes et compétitives, avec des alertes automatiques sur les points à surveiller.",
    longDescription: "Notre solution de chiffrage intègre votre bibliothèque de prix et applique automatiquement les coûts aux postes identifiés dans la DPGF. Elle vous alerte sur les écarts significatifs par rapport à des projets similaires et vous suggère des optimisations pour améliorer la compétitivité de votre offre tout en préservant votre marge.",
    benefits: [
      "Application automatique de votre bibliothèque de prix",
      "Détection des postes à risque ou mal valorisés",
      "Suggestions d'optimisation pour améliorer la compétitivité",
      "Analyse comparative avec des projets similaires"
    ]
  },
  
  // Formalisez une offre percutante
  "memoire-technique": {
    title: "Mémoire Technique",
    description: "Rédigez un mémoire qui séduit immédiatement. Obtenez en quelques clics un mémoire parfaitement adapté aux attentes du maître d'ouvrage, précis et convaincant.",
    longDescription: "Notre solution de rédaction de mémoire technique analyse les attentes du maître d'ouvrage et génère un document structuré, personnalisé et convaincant. Elle intègre automatiquement vos références pertinentes, vos certifications, votre méthodologie et vos engagements qualité pour créer un mémoire sur mesure qui répond précisément aux critères d'évaluation.",
    benefits: [
      "Rédaction assistée adaptée aux critères d'évaluation",
      "Intégration automatique de vos références pertinentes",
      "Mise en valeur de vos points forts et différenciants",
      "Génération de visuels et schémas explicatifs"
    ]
  },
  "dossier-administratif": {
    title: "Dossier Administratif",
    description: "Constituez facilement un dossier impeccable. Remplissage rapide et vérifications automatiques vous assurent un dossier administratif irréprochable du premier coup.",
    longDescription: "Notre outil de préparation du dossier administratif pré-remplit automatiquement l'ensemble des formulaires requis (DC1, DC2, DC4, etc.) à partir des informations de votre entreprise. Il vérifie la cohérence et la conformité de tous les documents, et vous guide pas à pas pour compléter les éléments manquants, garantissant un dossier impeccable.",
    benefits: [
      "Remplissage automatique des formulaires administratifs",
      "Vérification de conformité en temps réel",
      "Alertes sur les pièces manquantes ou incomplètes",
      "Archivage intelligent des documents pour réutilisation"
    ]
  },
  "relecture-depot-offre": {
    title: "Relecture & Dépôt de l'Offre",
    description: "Déposez une offre irréprochable sereinement. Dernières vérifications automatisées pour vous assurer de la cohérence et du respect complet des exigences.",
    longDescription: "Notre solution de relecture et dépôt vérifie l'exhaustivité et la cohérence de votre offre avant soumission. Elle s'assure que tous les documents requis sont présents, correctement nommés et signés, que les montants sont cohérents entre les différentes pièces, et vous accompagne dans le processus de dépôt sur les plateformes de marchés publics.",
    benefits: [
      "Vérification complète de la conformité du dossier",
      "Contrôle de cohérence entre les différentes pièces",
      "Assistance au dépôt sur les plateformes dématérialisées",
      "Confirmation de bonne réception et archivage"
    ]
  },
  
  // Concluez efficacement pour remporter vos marchés
  "completion-pieces-administratives": {
    title: "Complétion Pièces Administratives",
    description: "Préparez instantanément vos pièces administratives. Complétez sans effort les documents requis pour répondre efficacement à chaque AO.",
    longDescription: "Notre outil de complétion des pièces administratives analyse les exigences spécifiques de chaque appel d'offres et prépare automatiquement l'ensemble des documents administratifs requis. Il intègre vos informations d'entreprise, vos références et vos certifications pour générer des documents personnalisés et conformes aux attentes du maître d'ouvrage.",
    benefits: [
      "Génération automatique des documents administratifs",
      "Personnalisation selon les exigences spécifiques de l'AO",
      "Mise à jour automatique des informations d'entreprise",
      "Vérification de conformité avant soumission"
    ]
  },
  "negociation-ajustements": {
    title: "Négociation & Ajustements",
    description: "Ajustez rapidement votre offre après remise. Modifiez simplement votre proposition selon les retours du maître d'ouvrage et optimisez vos chances de succès.",
    longDescription: "Notre module de négociation et ajustements vous permet de réagir rapidement aux demandes de précisions ou de modifications du maître d'ouvrage. Il identifie les impacts des changements demandés sur l'ensemble de votre offre et vous aide à formuler des réponses cohérentes et argumentées, maximisant vos chances de succès lors de la phase de négociation.",
    benefits: [
      "Analyse d'impact des modifications demandées",
      "Suggestion d'ajustements optimaux",
      "Mise à jour cohérente de l'ensemble des documents",
      "Préparation d'arguments pour la négociation"
    ]
  },
  "attente-attribution": {
    title: "Attente & Attribution",
    description: "Soyez prêt dès l'attribution. Recevez des notifications en temps réel pour démarrer immédiatement en cas de succès et tirer des conclusions rapides en cas contraire.",
    longDescription: "Notre solution de suivi d'attribution vous tient informé en temps réel de l'avancement du processus d'attribution. En cas de succès, elle vous guide dans les démarches post-attribution (notification, assurances, cautions). En cas d'échec, elle vous aide à analyser les raisons et à tirer des enseignements pour améliorer vos futures offres.",
    benefits: [
      "Notifications en temps réel de l'état d'avancement",
      "Guide étape par étape pour les démarches post-attribution",
      "Analyse des écarts en cas de non-attribution",
      "Recommandations d'amélioration pour les futures offres"
    ]
  },
  "doe-diuo-apres-travaux": {
    title: "DOE & DIUO après Travaux",
    description: "Constituez facilement vos dossiers finaux. Générez simplement votre DOE et DIUO, livrez un dossier professionnel facilitant la maintenance future.",
    longDescription: "Notre outil de préparation des DOE et DIUO structure automatiquement l'ensemble des documents nécessaires selon les standards de la profession. Il intègre les plans d'exécution, les fiches techniques, les notices de maintenance et tous les documents requis dans un dossier organisé et facilement consultable, améliorant la satisfaction client et facilitant les interventions futures.",
    benefits: [
      "Organisation automatique des documents selon les normes",
      "Intégration des plans, fiches techniques et notices",
      "Génération d'index et de sommaires interactifs",
      "Export en format numérique ou prêt pour impression"
    ]
  },
  
  // Anciens items
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
