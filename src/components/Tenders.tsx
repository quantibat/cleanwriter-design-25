import { useState } from "react";
import { Clock, MapPin } from "lucide-react";  // Icônes de react-lucide
import { Badge } from "./ui/badge";
import ScoreCircle from "./ui/score";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { DetailItem } from "./TenderDetail";

const PublicTenders = ({ tenders }) => {

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="w-full flex flex-col gap-4">
          {tenders && tenders.length >0 ? 
          tenders.map((tender) => (
            <div
              key={tender.id}
              className="p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-[#ffffff12] border-[#384454] border flex flex-col gap-3 relative"
            >
              <div className="item-center w-full flex justify-start gap-4">
                  <Badge variant="outline">{tender.appel_offre.metadata.Type_Projet}</Badge>
                  <div className="flex items-center" >
                    <span className="text-gray-100"> Date limite de réponse le {new Date(tender.appel_offre.metadata.EndDate).toLocaleDateString()}</span>
                  </div>
              </div>
              <div className="flex flex-row gap-2 justify-between">
                <h3 className="text-2xl font-semibold text-white w-4/5">
                  {tender.appel_offre.metadata.Objet_Appel_Offre}
                </h3>
                <div className="flex flex-col gap-2 ml-auto relative w-1/4 justify-self-end">
                    <div className="text-xs text-gray-300 ml-auto flex flex-col gap-2 text-end justify-self-end ">
                      <ScoreCircle score={tender.score_final} size={80} taille={"text-sm"}/>
                    </div>
                </div>
              </div>

              <div className="w-full">
                <p className="flex-1 text-sm text-gray-300 line-clamp-1">
                  {tender.appel_offre.content}
                </p>
              </div>

              <div className="flex justify-between items-center text-gray-300 text-xs mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <MapPin className="mr-1 text-gray-300" size={12} />
                    <span>{tender.appel_offre.metadata.Code_Postal}</span>
                  </div>

                </div>
                
                <Button
                  variant="outline"
                  className="text-xs border-neon-blue bg-transparent-200 hover:border-none hover:bg-gray-300 hover:text-gray-900 py-0"
                >
                    <Link to={`/offre-detail/${tender.appel_offre.metadata.idweb}`}>Consulter</Link>
                </Button>
                
              </div>
            </div>
          )) : (
            <div className="w-full bg-[#0f172a]/70  p-6 rounded-lg shadow-lg border border-[#384454] h-48"> 
            <div className="flex flex-col gap-4 items-center justify-center h-full">
              <p className="text-sm text-gray-300 text-center">Aucun appel d'offre ne correspond à votre profil</p>  
              </div>
              </div>
          )
            }
        </div>
      </div>
    </div>
  );
};

export default PublicTenders;


