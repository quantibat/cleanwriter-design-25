
import React from "react";
import { GaugeComponent } from 'react-gauge-component';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CompatibilityGaugeProps {
  score: number;
}

const CompatibilityGauge: React.FC<CompatibilityGaugeProps> = ({ score }) => {
  const getLabel = (value: number) => {
    if (value >= 4) return "Bonne opportunité";
    if (value >= 2) return "Compatibilité moyenne";
    return "Compatibilité faible";
  };

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

      <div className="relative w-full">
        <GaugeComponent
          type="semicircle"
          arc={{
            colorArray: ['#FF2121', '#00FF15'],
            padding: 0.02,
            subArcs: [
              { limit: 40 },
              { limit: 60 },
              { limit: 70 },
              {},
              {},
              {},
              {}
            ]
          }}
          pointer={{type: "blob", animationDelay: 0}}
          value={score * 20} // Convert score from 0-5 to 0-100
          labels={{
            valueLabel: {
              formatTextValue: () => getLabel(score),
              style: { fontSize: '16px', fontWeight: 'bold', color: 'white' },
            },
            tickLabels: {
              type: "inner",
              ticks: [
                { value: 20 },
                { value: 40 },
                { value: 60 },
                { value: 80 },
                { value: 100 }
              ]
            }
          }}
        />
      </div>
    </div>
  );
};

export default CompatibilityGauge;

