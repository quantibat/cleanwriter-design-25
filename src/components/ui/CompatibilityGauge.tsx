
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
  const radius = (size / 2) - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((100 - percentage) / 100) * circumference;
  
  const getColor = (percent: number) => {
    if (percent >= 80) return "#22C55E"; // Green
    if (percent >= 50) return "#F59E0B"; // Yellow
    return "#EF4444"; // Red
  };

  const getLabel = (percent: number) => {
    if (percent >= 80) return "Bonne opportunité";
    if (percent >= 50) return "Compatibilité moyenne";
    return "Compatibilité faible";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 text-lg font-semibold">
        Indice de compatibilité
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-5 w-5 text-blue-400" />
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
      
      <div className="relative w-full flex justify-center">
        <svg
          width={size}
          height={size / 2}
          viewBox={`0 0 ${size} ${size / 2}`}
        >
          {/* Background track */}
          <path
            d={`M 10 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2}`}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <path
            d={`M 10 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2}`}
            fill="none"
            stroke={getColor(percentage)}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transform -rotate-180 origin-center transition-all duration-1000 ease-out"
            transform={`rotate(-180 ${size/2} ${size/2})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <div className="text-xl font-bold">{getLabel(percentage)}</div>
          <div className="text-2xl font-bold">{score.toFixed(1)}/5</div>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityGauge;
