
import React from "react";
import CompatibilityGauge from "./ui/CompatibilityGauge";
import LinearProgressBar from "./ui/linearprogress";
import { Button } from "./ui/button";
import { MapPin, Building2, CalendarClock, User, Briefcase, Hammer, FileDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const DetailItem = ({ label, value, icon: Icon }) => (
  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-800/50">
    <div className="p-2 rounded-full bg-blue-500/10">
      <Icon className="w-5 h-5 text-blue-400" />
    </div>
    <div>
      <dt className="text-sm font-medium text-gray-400">{label}</dt>
      <dd className="text-sm font-semibold text-white mt-1">{value || "Non spécifié"}</dd>
    </div>
  </div>
);

const TenderDetail = ({ tender }) => {
  const getDepartement = (codePostal) => {
    if (!codePostal) return "";
    return `(${codePostal.substring(0, 2)})`;
  };

  return (
    <div className="flex-col gap-6 space-y-6">
      {/* Header Section */}
      <div className="bg-gray-700 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#384454]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {tender?.appel_offre.metadata?.Objet_Appel_Offre}
            </h1>
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4" />
              <span>
                {tender?.appel_offre.metadata?.Ville} {getDepartement(tender?.appel_offre.metadata?.Code_Postal)}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => window.open(tender?.url_ao, "_blank")}
          >
            <FileDown className="w-4 h-4" />
            Télécharger le DCE
          </Button>
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DetailItem 
          icon={Building2}
          label="Maître d'ouvrage" 
          value={tender?.appel_offre.metadata?.Nom_Acheteur}
        />
        <DetailItem 
          icon={User}
          label="Maître d'œuvre" 
          value={tender?.appel_offre.metadata?.Maitre_Oeuvre}
        />
        <DetailItem 
          icon={CalendarClock}
          label="Date limite de réponse" 
          value={tender?.appel_offre.metadata?.EndDate}
        />
        <DetailItem 
          icon={Briefcase}
          label="Type de projet" 
          value={tender?.appel_offre.metadata?.Type_Projet}
        />
        <DetailItem 
          icon={Hammer}
          label="Type de travaux" 
          value={tender?.appel_offre.metadata?.Type_Travaux}
        />
      </div>

      {/* Correspondance Section */}
      <div className="bg-gray-700 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#384454]">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Correspondance avec votre profil</h2>
            <p className="text-sm text-gray-300 max-w-[70%]">
              Ce marché public correspond à vos critères selon l'analyse de nos algorithmes. 
              Survolez chaque critère pour plus de détails.
            </p>
          </div>
          <CompatibilityGauge score={tender?.score_final} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tender?.Scoring.map((item, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <div className="flex flex-col gap-2 p-3 rounded-lg bg-gray-800/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">{item.Critère}</span>
                    </div>
                    <LinearProgressBar score={item.Note}/>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{item.Raisonnement || "Score basé sur l'analyse de votre profil"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-gray-700 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#384454]">
        <h2 className="text-xl font-semibold mb-4">Description détaillée</h2>
        <p className="text-sm text-gray-300 whitespace-pre-line">
          {tender?.appel_offre.content}
        </p>
      </div>
    </div>
  );
};

export default TenderDetail;
