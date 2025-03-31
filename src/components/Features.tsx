import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Compass, BarChart2, UsersRound, ShieldCheck, FolderOpen, FileText, Lightbulb, Users, CalendarClock, DollarSign, PenTool, ClipboardCheck, Send, FileSpreadsheet, MessageSquare, Clock } from "lucide-react";
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  slug: string;
}
const FeatureCard = ({
  title,
  description,
  icon,
  color,
  slug
}: FeatureCardProps) => <div className={`bg-white/5 backdrop-blur-sm border border-${color}/20 rounded-xl p-6 hover:bg-white/8 transition-all duration-300 group relative h-full flex flex-col`} style={{
  boxShadow: `0 0 10px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.05)`
}}>
    <div className={`h-12 w-12 bg-${color}/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-${color}/30 transition-colors duration-300`}>
      <div className={`text-${color}`}>{icon}</div>
    </div>
    <h3 className={`text-xl font-semibold mb-3 text-white`}>{title}</h3>
    <p className="text-blue-100/70 mb-4">{description}</p>
    <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Link to={`/features/${slug}`}>
        <Button variant="blue" size="sm" className="w-full">
          Découvrir
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  </div>;
const Features = () => {
  const allFeatures = [
  // Category 1: Repérez vos futurs chantiers
  {
    title: "Veille des Appels d'Offres",
    description: "Trouvez directement les AO faits pour vous. Recevez une liste ciblée et actualisée des AO correspondant à votre activité, votre zone géographique et vos spécialités.",
    icon: <Compass size={24} />,
    color: "neon-purple",
    slug: "veille-appels-offres",
    category: "search"
  }, {
    title: "Analyse du DCE",
    description: "Identifiez l'essentiel du lot sans perdre de temps. Visualisez immédiatement les points clés et les exigences techniques pour décider rapidement et sereinement.",
    icon: <BarChart2 size={24} />,
    color: "neon-pink",
    slug: "analyse-rapide-dce",
    category: "search"
  }, {
    title: "Estimation de l'Effort d'Étude",
    description: "Évaluez instantanément vos besoins. Obtenez rapidement une estimation fiable du temps et des ressources nécessaires pour répondre efficacement.",
    icon: <Clock size={24} />,
    color: "neon-blue",
    slug: "estimation-effort-etude",
    category: "search"
  },
  // Category 2: Organisez clairement vos documents
  {
    title: "Réorganisation du DCE",
    description: "Classez votre DCE automatiquement. Disposez immédiatement d'un dossier clair, complet et ordonné, prêt à l'emploi.",
    icon: <FolderOpen size={24} />,
    color: "neon-purple",
    slug: "reorganisation-dce",
    category: "organize"
  }, {
    title: "Élaboration DPGF",
    description: "Créez une DPGF claire et prête à l'usage. Transformez simplement votre CCTP en DPGF détaillée et immédiatement chiffrable.",
    icon: <FileSpreadsheet size={24} />,
    color: "neon-pink",
    slug: "elaboration-dpgf",
    category: "organize"
  }, {
    title: "Analyse Technique du Lot",
    description: "Repérez les points techniques essentiels en un instant. Identifiez directement contraintes et spécificités techniques pour adapter efficacement votre offre.",
    icon: <Lightbulb size={24} />,
    color: "neon-blue",
    slug: "analyse-technique-lot",
    category: "organize"
  }, {
    title: "Consultation Fournisseurs",
    description: "Préparez facilement vos consultations. Accédez immédiatement aux informations techniques nécessaires pour solliciter rapidement vos fournisseurs et sous-traitants.",
    icon: <Users size={24} />,
    color: "neon-purple",
    slug: "consultation-fournisseurs",
    category: "organize"
  },
  // Category 3: Affinez précisément vos quantités, coûts et plannings
  {
    title: "Réalisation des Métrés",
    description: "Quantifiez précisément, sans effort. Obtenez rapidement des métrés fiables grâce à l'appui de l'intelligence artificielle.",
    icon: <Users size={24} />,
    color: "neon-purple",
    slug: "realisation-metres",
    category: "costs"
  }, {
    title: "Planning Prévisionnel",
    description: "Établissez un planning clair en quelques clics. Générez simplement un planning prévisionnel réaliste, immédiatement présentable et adaptable.",
    icon: <CalendarClock size={24} />,
    color: "neon-pink",
    slug: "planning-previsionnel",
    category: "costs"
  }, {
    title: "Chiffrage",
    description: "Chiffrez rapidement en toute confiance. Élaborez facilement des propositions cohérentes et compétitives, avec des alertes automatiques sur les points à surveiller.",
    icon: <DollarSign size={24} />,
    color: "neon-blue",
    slug: "chiffrage",
    category: "costs"
  },
  // Category 4: Formalisez une offre percutante
  {
    title: "Mémoire Technique",
    description: "Rédigez un mémoire qui séduit immédiatement. Obtenez en quelques clics un mémoire parfaitement adapté aux attentes du maître d'ouvrage, précis et convaincant.",
    icon: <PenTool size={24} />,
    color: "neon-purple",
    slug: "memoire-technique",
    category: "formalize"
  }, {
    title: "Dossier Administratif",
    description: "Constituez facilement un dossier impeccable. Remplissage rapide et vérifications automatiques vous assurent un dossier administratif irréprochable du premier coup.",
    icon: <ClipboardCheck size={24} />,
    color: "neon-pink",
    slug: "dossier-administratif",
    category: "formalize"
  }, {
    title: "Relecture & Dépôt de l'Offre",
    description: "Déposez une offre irréprochable sereinement. Dernières vérifications automatisées pour vous assurer de la cohérence et du respect complet des exigences.",
    icon: <Send size={24} />,
    color: "neon-blue",
    slug: "relecture-depot-offre",
    category: "formalize"
  },
  // Category 5: Concluez efficacement pour remporter vos marchés
  {
    title: "Complétion Pièces Administratives",
    description: "Préparez instantanément vos pièces administratives. Complétez sans effort les documents requis pour répondre efficacement à chaque AO.",
    icon: <FileText size={24} />,
    color: "neon-purple",
    slug: "completion-pieces-administratives",
    category: "conclude"
  }, {
    title: "Négociation & Ajustements",
    description: "Ajustez rapidement votre offre après remise. Modifiez simplement votre proposition selon les retours du maître d'ouvrage et optimisez vos chances de succès.",
    icon: <MessageSquare size={24} />,
    color: "neon-pink",
    slug: "negociation-ajustements",
    category: "conclude"
  }, {
    title: "Attente & Attribution",
    description: "Soyez prêt dès l'attribution. Recevez des notifications en temps réel pour démarrer immédiatement en cas de succès et tirer des conclusions rapides en cas contraire.",
    icon: <Clock size={24} />,
    color: "neon-blue",
    slug: "attente-attribution",
    category: "conclude"
  }, {
    title: "DOE & DIUO après Travaux",
    description: "Constituez facilement vos dossiers finaux. Générez simplement votre DOE et DIUO, livrez un dossier professionnel facilitant la maintenance future.",
    icon: <FileText size={24} />,
    color: "neon-purple",
    slug: "doe-diuo-apres-travaux",
    category: "conclude"
  }];

  // Group features by category
  const featuresGroups = [{
    title: "🔍 Repérez vos futurs chantiers",
    icon: <Compass className="w-5 h-5 mr-2" />,
    description: "Gagnez du temps en ciblant les appels d'offres les plus pertinents",
    features: allFeatures.filter(feature => feature.category === "search")
  }, {
    title: "📂 Organisez clairement vos documents et appuyez-vous sur un suivi efficace",
    icon: <FolderOpen className="w-5 h-5 mr-2" />,
    description: "Vos documents classés, votre dossier enrichi, vos échanges simplifiés",
    features: allFeatures.filter(feature => feature.category === "organize")
  }, {
    title: "💹 Affinez précisément vos quantités, coûts et plannings",
    icon: <DollarSign className="w-5 h-5 mr-2" />,
    description: "Des métrés fiables, des chiffrages précis, des plannings réalistes",
    features: allFeatures.filter(feature => feature.category === "costs")
  }, {
    title: "✒️ Formalisez une offre percutante",
    icon: <PenTool className="w-5 h-5 mr-2" />,
    description: "Votre mémoire technique sur-mesure, votre administratif simplifié",
    features: allFeatures.filter(feature => feature.category === "formalize")
  }, {
    title: "🤲 Concluez efficacement pour remporter vos marchés",
    icon: <ShieldCheck className="w-5 h-5 mr-2" />,
    description: "Finalisez avec confiance, ajustez avec facilité, décrochez sereinement",
    features: allFeatures.filter(feature => feature.category === "conclude")
  }];
  return <section id="features" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 bg-neon-pink/10 text-neon-pink rounded-full text-sm font-medium inline-flex items-center justify-center mx-auto">
            <Sparkles className="w-4 h-4 mr-2" /> Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-blue-100/70 max-w-2xl mx-auto text-lg">
            Découvrez comment DCE Manager peut transformer votre gestion documentaire et améliorer l'efficacité de vos appels d'offres.
          </p>
        </div>
        
        {/* Feature category headers */}
        
        
        {/* Single carousel with all features */}
        <Carousel opts={{
        align: "start",
        loop: true
      }} className="w-full mb-16">
          <CarouselContent>
            {allFeatures.map((feature, index) => <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3 pl-4">
                <FeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} color={feature.color} slug={feature.slug} />
              </CarouselItem>)}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-4">
            <CarouselPrevious className="relative static h-10 w-10 bg-blue-500/20 border-blue-500/40 text-white" />
            <CarouselNext className="relative static h-10 w-10 bg-blue-500/20 border-blue-500/40 text-white" />
          </div>
        </Carousel>
        
        <div className="mt-8 text-center">
          
        </div>
      </div>
    </section>;
};
export default Features;