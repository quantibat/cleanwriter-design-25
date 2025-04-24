
import React, { useEffect, useState } from "react";
import { MapPin, Building2, CalendarClock, User, Briefcase, Hammer, FileDown, Info } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import CompatibilityGauge from "./ui/CompatibilityGauge";
import LinearProgressBar from "./ui/linearprogress";
import { DetailItem } from "./tender/DetailItem";

const TenderDetail = ({ tender }) => {
  const [villes, setVilles] = useState({});

  useEffect(() => {
    async function fetchVilles() {
      const nouvellesVilles = {};
      const code = tender.appel_offre.metadata.Code_Postal;
      const res = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${code}&fields=nom&format=json`);
      const data = await res.json();
      
      if (data.length > 0) {
        nouvellesVilles[tender.appel_offre.metadata.idweb] = `${data[0].nom} (${code})`;
      } else {
        nouvellesVilles[tender.appel_offre.metadata.idweb] = `Code postal ${code}`;
      }
      setVilles(nouvellesVilles);
    }
    fetchVilles();
  }, [tender]);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex-col gap-6 space-y-6">
      {/* En-tête */}
      <div className="bg-gray-700 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#384454]">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white">
              {tender?.appel_offre.metadata?.Objet_Appel_Offre}
            </h1>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{tender && villes[tender?.appel_offre?.metadata?.idweb]}</span>
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

      {/* Grille d'informations principales */}
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
          icon={Briefcase}
          label="Type de projet" 
          value={tender?.appel_offre.metadata?.Type_Projet}
        />
        <DetailItem 
          icon={Hammer}
          label="Type de travaux" 
          value={tender?.appel_offre.metadata?.Type_Travaux}
        />
        <DetailItem 
          icon={CalendarClock}
          label="Date limite de réponse" 
          value={formatDate(tender?.appel_offre.metadata?.EndDate)}
        />
      </div>

      {/* Section Correspondance */}
      <div className="bg-gray-700 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#384454]">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Correspondance avec votre profil</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10">
                      <Info className="h-4 w-4 text-blue-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[300px]">
                    <p>Score basé sur l'analyse de plusieurs critères adaptés à votre profil d'entreprise</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-sm text-gray-300 max-w-[70%] mt-2">
              Ce marché correspond à vos critères selon notre analyse. 
              Survolez chaque critère pour plus de détails.
            </p>
          </div>
          <CompatibilityGauge score={tender?.score_final} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tender?.Scoring?.map((item, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-800/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">{item.Critère}</span>
                    </div>
                    <LinearProgressBar score={item.Note} />
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

      {/* Description détaillée */}
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
