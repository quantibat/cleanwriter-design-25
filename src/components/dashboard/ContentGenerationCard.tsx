
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { YoutubeIcon, ShareIcon, PanelTopOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ContentCardType = 'youtube' | 'social';

interface ContentGenerationCardProps {
  type: ContentCardType;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const ContentGenerationCard: React.FC<ContentGenerationCardProps> = ({
  type,
  title,
  description,
  icon,
  onClick
}) => {
  return (
    <Card className="flex flex-col h-full hover:shadow-[0_0_15px_rgba(30,174,219,0.5)] border-white/10 bg-[#1E2532]/60 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-full ${type === 'youtube' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {icon}
          </div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {/* Contenu qui varie selon le type de carte */}
        {type === 'youtube' && (
          <div className="text-sm text-white/60">
            <p>Entrez un lien YouTube pour analyser et générer du contenu à partir de cette vidéo.</p>
            <div className="mt-4 p-2 rounded bg-[#141B2A] text-xs border border-white/5">
              <p>Exemple: https://www.youtube.com/watch?v=dQw4w9WgXcQ</p>
            </div>
          </div>
        )}
        {type === 'social' && (
          <div className="text-sm text-white/60">
            <p>Décrivez le contenu que vous souhaitez générer pour vos réseaux sociaux.</p>
            <div className="mt-4 p-2 rounded bg-[#141B2A] text-xs border border-white/5">
              <p>Exemple: "Un post inspirant pour LinkedIn sur l'intelligence artificielle"</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          onClick={onClick} 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        >
          <PanelTopOpen className="mr-2 h-4 w-4" />
          Accéder
        </Button>
      </CardFooter>
    </Card>
  );
};

export const getCardsByType = (onCardClick: (type: ContentCardType) => void) => [
  <ContentGenerationCard
    key="youtube"
    type="youtube"
    title="Contenu YouTube"
    description="Génère du contenu à partir de vidéos YouTube"
    icon={<YoutubeIcon className="h-5 w-5" />}
    onClick={() => onCardClick('youtube')}
  />,
  <ContentGenerationCard
    key="social"
    type="social"
    title="Réseaux Sociaux"
    description="Créez du contenu pour vos réseaux sociaux"
    icon={<ShareIcon className="h-5 w-5" />}
    onClick={() => onCardClick('social')}
  />
];

export default ContentGenerationCard;
