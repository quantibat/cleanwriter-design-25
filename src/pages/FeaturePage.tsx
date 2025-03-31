
import React from 'react';
import { useParams } from 'react-router-dom';
import FeatureDetail from '@/components/FeatureDetail';
import featuresData from '@/data/featuresData';
import { Compass, BarChart2, Clock, FolderOpen, FileSpreadsheet, Lightbulb, Users, CalendarClock, DollarSign, PenTool, ClipboardCheck, Send, FileText, MessageSquare } from "lucide-react";

const FeaturePage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the specific feature data using the slug param
  const rawFeatureData = slug && featuresData[slug] ? featuresData[slug] : null;
  
  // If we have data, transform it to match the expected FeatureDetail props
  const featureData = rawFeatureData ? {
    ...rawFeatureData,
    icon: getIconForSlug(slug),
    sections: [
      {
        title: "Vue d'ensemble",
        content: rawFeatureData.longDescription || rawFeatureData.description,
      },
      {
        title: "Fonctionnalités principales",
        content: "Découvrez comment cette fonctionnalité peut transformer votre processus de gestion des appels d'offres et améliorer l'efficacité de votre travail quotidien.",
      }
    ],
    benefits: rawFeatureData.benefits || ["Gain de temps", "Réduction des erreurs", "Conformité réglementaire", "Facilité d'utilisation"],
    stats: [
      {
        label: "Gain de temps",
        value: "75%"
      },
      {
        label: "Satisfaction clients",
        value: "98%"
      },
      {
        label: "ROI moyen",
        value: "3.2x"
      },
      {
        label: "Adoption",
        value: "91%"
      }
    ],
    testimonials: [
      {
        quote: "Cette fonctionnalité a complètement transformé notre façon de travailler. Nous avons gagné un temps précieux.",
        author: "Jean Dupont",
        position: "Directeur des achats, Mairie de Lyon"
      },
      {
        quote: "Simple, efficace et précis. Exactement ce dont nous avions besoin pour optimiser notre processus.",
        author: "Marie Martin",
        position: "Chef de projet, Entreprise de BTP"
      }
    ],
    faq: [
      {
        question: "Comment fonctionne cette fonctionnalité ?",
        answer: "Cette fonctionnalité utilise des algorithmes avancés pour analyser et traiter vos données d'appels d'offres, offrant ainsi une solution automatisée et précise."
      },
      {
        question: "Est-ce compatible avec nos outils actuels ?",
        answer: "Oui, notre solution s'intègre parfaitement avec la plupart des outils de gestion de projet et de document que vous utilisez déjà."
      }
    ]
  } : null;
  
  return <FeatureDetail featureData={featureData} />;
};

// Helper function to return the appropriate icon based on slug
const getIconForSlug = (slug?: string) => {
  switch(slug) {
    case 'veille-appels-offres':
      return <Compass className="w-6 h-6" />;
    case 'analyse-rapide-dce':
      return <BarChart2 className="w-6 h-6" />;
    case 'estimation-effort-etude':
      return <Clock className="w-6 h-6" />;
    case 'reorganisation-dce':
      return <FolderOpen className="w-6 h-6" />;
    case 'elaboration-dpgf':
      return <FileSpreadsheet className="w-6 h-6" />;
    case 'analyse-technique-lot':
      return <Lightbulb className="w-6 h-6" />;
    case 'realisation-metres':
      return <Users className="w-6 h-6" />;
    case 'planning-previsionnel':
      return <CalendarClock className="w-6 h-6" />;
    case 'chiffrage':
      return <DollarSign className="w-6 h-6" />;
    case 'memoire-technique':
      return <PenTool className="w-6 h-6" />;
    case 'dossier-administratif':
      return <ClipboardCheck className="w-6 h-6" />;
    case 'relecture-depot-offre':
      return <Send className="w-6 h-6" />;
    case 'completion-pieces-administratives':
      return <FileText className="w-6 h-6" />;
    case 'negociation-ajustements':
      return <MessageSquare className="w-6 h-6" />;
    case 'attente-attribution':
      return <Clock className="w-6 h-6" />;
    case 'doe-diuo-apres-travaux':
      return <FileText className="w-6 h-6" />;
    case 'consultation-fournisseurs':
      return <Users className="w-6 h-6" />;
    default:
      return <FileText className="w-6 h-6" />;
  }
};

export default FeaturePage;
