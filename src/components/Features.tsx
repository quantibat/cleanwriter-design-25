import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Compass, BarChart2, UsersRound, ShieldCheck, FolderOpen, FileText, Lightbulb, Users, CalendarClock, DollarSign, PenTool, ClipboardCheck, Send, FileSpreadsheet, MessageSquare, Clock, Badge } from "lucide-react";
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  slug: string;
  index: number;
}

const FeatureCard = ({
  title,
  description,
  icon,
  color,
  slug,
  index
}: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return <motion.div className={`bg-white/5 backdrop-blur-sm border border-${color}/20 rounded-xl p-6 hover:bg-white/8 transition-all duration-300 group relative h-full flex flex-col bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/8 transition-all duration-300 animate-on-scroll feature-card`} style={{
    boxShadow: `0 0 5px rgba(255, 255, 255, 0.1), 0 0 20px rgba(26, 7, 139, 0.05)`
  }} initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: index * 0.1
  }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
      <motion.div className={`h-12 w-12 bg-${color}/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-${color}/30 transition-colors duration-300`} animate={{
      scale: isHovered ? 1.1 : 1,
      rotate: isHovered ? 5 : 0
    }} transition={{
      duration: 0.3
    }}>
        <div className={`text-${color}`}>{icon}</div>
      </motion.div>
      
      <h3 className={`text-xl font-semibold mb-3 text-white`}>{title}</h3>
      <p className="text-blue-100/70 mb-4">{description}</p>
      
      <motion.div className="mt-auto" initial={{
      opacity: 0
    }} animate={{
      opacity: isHovered ? 1 : 0
    }} transition={{
      duration: 0.3
    }}>
        <Link to={`/features/${slug}`}>
          <Button variant="blue" size="sm" className="w-full">
            Découvrir
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>;
};

const Features = () => {
  const allFeatures = [{
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
    color: "neon-purple",
    slug: "analyse-rapide-dce",
    category: "search"
  }, {
    title: "Estimation de l'Effort d'Étude",
    description: "Évaluez instantanément vos besoins. Obtenez rapidement une estimation fiable du temps et des ressources nécessaires pour répondre efficacement.",
    icon: <Clock size={24} />,
    color: "neon-purple",
    slug: "estimation-effort-etude",
    category: "search"
  }, {
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
    color: "neon-purple",
    slug: "elaboration-dpgf",
    category: "organize"
  }, {
    title: "Analyse Technique du Lot",
    description: "Repérez les points techniques essentiels en un instant. Identifiez directement contraintes et spécificités techniques pour adapter efficacement votre offre.",
    icon: <Lightbulb size={24} />,
    color: "neon-purple",
    slug: "analyse-technique-lot",
    category: "organize"
  }, {
    title: "Consultation Fournisseurs",
    description: "Préparez facilement vos consultations. Accédez immédiatement aux informations techniques nécessaires pour solliciter rapidement vos fournisseurs et sous-traitants.",
    icon: <Users size={24} />,
    color: "neon-purple",
    slug: "consultation-fournisseurs",
    category: "organize"
  }, {
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
    color: "neon-purple",
    slug: "planning-previsionnel",
    category: "costs"
  }, {
    title: "Chiffrage",
    description: "Chiffrez rapidement en toute confiance. Élaborez facilement des propositions cohérentes et compétitives, avec des alertes automatiques sur les points à surveiller.",
    icon: <DollarSign size={24} />,
    color: "neon-purple",
    slug: "chiffrage",
    category: "costs"
  }, {
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
    color: "neon-purple",
    slug: "dossier-administratif",
    category: "formalize"
  }, {
    title: "Relecture & Dépôt de l'Offre",
    description: "Déposez une offre irréprochable sereinement. Dernières vérifications automatisées pour vous assurer de la cohérence et du respect complet des exigences.",
    icon: <Send size={24} />,
    color: "neon-purple",
    slug: "relecture-depot-offre",
    category: "formalize"
  }, {
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
    color: "neon-purple",
    slug: "negociation-ajustements",
    category: "conclude"
  }, {
    title: "Attente & Attribution",
    description: "Soyez prêt dès l'attribution. Recevez des notifications en temps réel pour démarrer immédiatement en cas de succès et tirer des conclusions rapides en cas contraire.",
    icon: <Clock size={24} />,
    color: "neon-purple",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const emblaApiRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (emblaApiRef.current) {
        emblaApiRef.current.scrollNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return <section id="features" className="pt-24 pb-0 px-6 relative">
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 bg-neon-pink/10 rounded-full text-sm font-medium inline-flex items-center justify-center mx-auto text-blue-400">
            <Sparkles className="w-4 h-4 mr-2" /> Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
            Grâce à DCE Manager
          </h2>
          <p className="text-blue-100/70 max-w-2xl mx-auto text-lg">
            Découvrez comment vous pouvez transformer votre recherche d'appel d'offre et améliorer l'efficacité de vos candidatures.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 mx-auto w-[85%]">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-white">Repérez vos futurs chantiers</h2>

            <p className="text-blue-100/70 mb-6">
              DCE Manager vous permet de trouver efficacement les appels d'offres qui vous correspondent de la veille à la soumission, en un seul endroit sécurisé.
            </p>
            <Button variant="blue" className="self-start">
              Comment ca marche ?
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center">
            <img src="/lovable-uploads/d78aaf3f-ab9f-4537-9cbb-425f831d0433.png" alt="Appel d'offres" className="rounded-lg max-w-full h-auto shadow-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 mx-auto w-[85%]">
          <div className="flex items-center">
            <img src="/lovable-uploads/8ca1fb05-d35d-4395-b8b7-4271a0037e42.png" alt="DCE document" className="rounded-lg max-w-full h-auto shadow-lg" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-white">Organisez clairement vos documents et appuyez-vous sur un suivi efficace
            </h2>
            <p className="text-blue-100/70 mb-6">
              Notre technologie d'IA avancée analyse vos dossiers de consultation pour en extraire les informations essentielles et vous faire gagner du temps.
            </p>
            <Button variant="blue" className="self-start">
              Comment ca marche ?
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 mx-auto w-[85%]">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-white">Affinez précisément vos quantités, coûts et plannings</h2>
            <p className="text-blue-100/70 mb-6">
              Travaillez en temps réel avec votre équipe sur les appels d'offres, partagez des commentaires et assignez des tâches pour une efficacité maximale.
            </p>
            <Button variant="blue" className="self-start">
              Comment ca marche ?
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center">
            <img src="/lovable-uploads/72d76f1f-a73c-4a67-b966-4a863242c8e1.png" alt="Chantier et construction" className="rounded-lg max-w-full h-auto shadow-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 mx-auto w-[85%]">
          <div className="flex items-center">
            <img src="/lovable-uploads/d415e730-0f39-4cb8-8092-d1db1540be5e.png" alt="Value proposition" className="rounded-lg max-w-full h-auto shadow-lg" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-white">Concluez efficacement pour remporter vos marchés</h2>
            <p className="text-blue-100/70 mb-6">
              Ne manquez plus jamais une date limite importante grâce à notre système de rappels et de notifications personnalisables.
            </p>
            <Button variant="blue" className="self-start">
              Comment ca marche ?
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 mx-auto w-[85%]">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-white">Négocez et Ajustez</h2>
            <p className="text-blue-100/70 mb-6">
              Vos données sensibles sont protégées grâce à notre infrastructure sécurisée et conforme aux normes RGPD les plus strictes.
            </p>
            <Button variant="blue" className="self-start">
             Comment ca marche ?
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center">
            <img src="/lovable-uploads/e6f0fdd2-99e2-4f60-9d62-311ab47faec6.png" alt="Poignée de main" className="rounded-lg max-w-full h-auto shadow-lg" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-4 mb-4 text-white text-center py-6">
            L'analyse d'un projet sur DCE Manager, c'est
        </h2>
        
        
        <Carousel ref={carouselRef} opts={{
        align: "start",
        loop: true
      }} className="mx-auto w-[85%] h-auto" setApi={api => {
        emblaApiRef.current = api;
      }}>
          <CarouselContent>
            {allFeatures.map((feature, index) => <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3 pl-4">
                <FeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} color={feature.color} slug={feature.slug} index={index} />
              </CarouselItem>)}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-8">
            <CarouselPrevious className="relative static h-10 w-10 bg-blue-500/20 border-blue-500/40 text-white hover:bg-blue-500/30 transition-colors" />
            <CarouselNext className="relative static h-10 w-10 bg-blue-500/20 border-blue-500/40 text-white hover:bg-blue-500/30 transition-colors" />
          </div>
        </Carousel>
      </div>
    </section>;
};

export default Features;
