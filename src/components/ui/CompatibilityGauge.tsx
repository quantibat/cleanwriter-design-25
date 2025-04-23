
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CompatibilityGaugeProps {
  score: number;
  size?: number;
}

const CompatibilityGauge: React.FC<CompatibilityGaugeProps> = ({
  score,
  size = 200,
}) => {
  const percentage = (score / 5) * 100;
  
  const getColor = (percent: number) => {
    if (percent >= 80) return "#4CAF50"; // Vert
    if (percent >= 50) return "#FFC107"; // Jaune/Orange
    return "#FF5722"; // Rouge
  };

  const getLabel = (percent: number) => {
    if (percent >= 80) return "Bonne opportunité";
    if (percent >= 50) return "Compatibilité moyenne";
    return "Compatibilité faible";
  };

  // Configuration pour le demi-cercle
  const strokeWidth = 20;
  const radius = (size / 2) - (strokeWidth / 2);
  const centerX = size / 2;
  const centerY = size / 2;
  const startAngle = 180;
  const endAngle = 0;
  
  // Calcul des points pour le path
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians)),
    };
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  // Path pour le fond de la jauge
  const backgroundPath = describeArc(centerX, centerY, radius, startAngle, endAngle);
  
  // Calcul de l'angle pour le score actuel
  const scoreAngle = startAngle - ((percentage / 100) * (startAngle - endAngle));
  
  // Path pour la partie colorée de la jauge
  const scorePath = describeArc(centerX, centerY, radius, startAngle, scoreAngle);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-2 text-xl font-bold">
        Indice de compatibilité
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white">
                <Info className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px] text-sm">
              <p>
                Cet indice évalue la pertinence de l'appel d'offres par rapport au profil de votre entreprise.
                Il est calculé à partir de 13 critères : localisation, corps d'état, expérience, capacité financière, délais, documents demandés, complexité technique, etc.
                Plus l'indice est élevé, plus l'opportunité est en adéquation avec votre profil.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="relative w-full" style={{ maxWidth: `${size}px` }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Demi-cercle gris (background) */}
          <path
            d={backgroundPath}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Portions colorées selon le score */}
          <path
            d={scorePath}
            fill="none"
            stroke={getColor(percentage)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Points d'extrémité arrondis */}
          <circle 
            cx={polarToCartesian(centerX, centerY, radius, startAngle).x}
            cy={polarToCartesian(centerX, centerY, radius, startAngle).y}
            r={strokeWidth / 2}
            fill={percentage <= 20 ? getColor(percentage) : "#E5E7EB"}
          />
          
          <circle 
            cx={polarToCartesian(centerX, centerY, radius, endAngle).x}
            cy={polarToCartesian(centerX, centerY, radius, endAngle).y}
            r={strokeWidth / 2}
            fill={percentage >= 90 ? getColor(percentage) : "#E5E7EB"}
          />
        </svg>
        
        {/* Texte au centre */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-2xl font-bold">{getLabel(percentage)}</div>
          <div className="text-3xl font-bold">{score.toFixed(1).replace('.', ',')}/5</div>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityGauge;
