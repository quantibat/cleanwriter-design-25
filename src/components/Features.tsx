
import React from 'react';
import { FolderArchive, Share2, FileSearch, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
}

const FeatureCard = ({
  title,
  description,
  icon,
  image,
  alt,
  reverse = false
}: FeatureCardProps) => (
  <div className="w-full flex flex-col md:flex-row items-center gap-8">
    {/* Image section - 50% width on desktop */}
    <div className={`w-full md:w-1/2 order-1 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
      <Card className="overflow-hidden border-white/10 hover:border-blue-500/30 transition-all duration-300 shadow-xl h-full">
        <div className="h-64 md:h-full overflow-hidden">
          <img src={image} alt={alt} className="w-full h-full object-cover object-center" />
        </div>
      </Card>
    </div>
    
    {/* Text content section - 50% width on desktop */}
    <div className={`w-full md:w-1/2 order-2 ${reverse ? 'md:order-1' : 'md:order-2'}`}>
      <Card className="cosmic-card overflow-hidden border-white/10 hover:border-blue-500/30 transition-all duration-300 bg-card/60 h-full">
        <CardContent className="p-10">
          <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
            <div className="text-blue-400">{icon}</div>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
          <p className="text-blue-100/70">{description}</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

const Features = () => {
  // Feature images
  const featureImages = ["/lovable-uploads/c51301c4-6875-4882-86b5-a9cd9cd773cd.png", "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", "https://images.unsplash.com/photo-1518770660439-4636190af475", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"];
  
  return (
    <section id="features" className="py-28 px-10 md:px-16 relative">
      {/* Background dots */}
      <div className="absolute inset-0 cosmic-dots opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">Fonctionnalités principales</h2>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
            Des outils efficaces pour gérer vos dossiers de consultation
          </p>
        </div>
        
        <div className="flex flex-col space-y-32">
          <FeatureCard title="Organisation des DCE" description="Classez et organisez vos dossiers de consultation des entreprises selon vos besoins. Notre système de classement permet une recherche rapide et efficace." icon={<FolderArchive size={24} />} image={featureImages[0]} alt="Organisation DCE" />
          
          <FeatureCard title="Partage sécurisé" description="Partagez vos documents avec vos collaborateurs ou partenaires en toute sécurité. Définissez des permissions d'accès précises pour chaque utilisateur." icon={<Share2 size={24} />} image={featureImages[1]} alt="Partage sécurisé" reverse={true} />
          
          <FeatureCard title="Recherche avancée" description="Retrouvez rapidement vos documents grâce à notre moteur de recherche puissant. Filtrez par type, date, statut ou mots-clés pour gagner un temps précieux." icon={<FileSearch size={24} />} image={featureImages[2]} alt="Recherche avancée" />
          
          <FeatureCard title="Suivi des versions" description="Suivez l'évolution de vos documents avec un historique complet des versions. Comparez les modifications et restaurez les versions antérieures si nécessaire." icon={<FileCheck size={24} />} image={featureImages[3]} alt="Suivi des versions" reverse={true} />
        </div>
      </div>
    </section>
  );
};

export default Features;
