import { MapPin, Star } from "lucide-react";  
import ScoreCircle from "./ui/score";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const PublicTenders = ({ tenders }) => {
  const [villes, setVilles] = useState({});

  useEffect(() => {
    async function fetchVilles() {
      const nouvellesVilles = {};

      await Promise.all(
        tenders.map(async (tender) => {
          const code = tender.appel_offre.metadata.Code_Postal;
          try {
            const res = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${code}&fields=nom&format=json`);
            const data = await res.json();
            if (data.length > 0) {
              nouvellesVilles[tender.appel_offre.metadata.idweb] = `${data[0].nom} (${code})`;
            } else {
              nouvellesVilles[tender.appel_offre.metadata.idweb] = `Code inconnu (${code})`;
            }
          } catch (error) {
            nouvellesVilles[tender.appel_offre.metadata.idweb] = `Erreur (${code})`;
          }
        })
      );

      setVilles(nouvellesVilles);
    }

    if (tenders && tenders.length > 0) {
      fetchVilles();
    }
  }, [tenders]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full flex flex-col gap-6">
          {tenders && tenders.length > 0 ? (
            tenders.map((tender) => (
              <div
                key={tender.id}
                className="group relative p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-gray-700 to-gray-800 border-[#384454] border flex flex-col gap-4"
              >
                <div className="flex flex-row items-start justify-between">
                  <h3 className="text-2xl font-semibold text-white w-4/5 hover:text-blue-400 transition-colors cursor-pointer" 
                      onClick={() => window.open(`/offre-detail/${tender.appel_offre.metadata.idweb}`, "_blank")}>
                    {tender.appel_offre.metadata.Objet_Appel_Offre}
                  </h3>
                  <div className="flex flex-col items-end gap-2">
                    <Star 
                      size={24} 
                      className="cursor-pointer text-gray-400 hover:text-yellow-400 transition-colors"
                    />
                    <ScoreCircle score={tender.score_final} size={80} taille={"text-lg"}/>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={16} className="text-neon-blue" />
                    <span className="text-sm">
                      {villes[tender.appel_offre.metadata.idweb]}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    {tender?.appel_offre?.metadata?.Nom_Acheteur === undefined 
                      ? "Entreprise dans le secteur du BTP" 
                      : tender?.appel_offre?.metadata?.Nom_Acheteur}
                  </div>
                  <div className="text-sm text-gray-300">
                    Date limite: {new Date(tender.appel_offre.metadata.EndDate).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 mt-2">
                  {tender.appel_offre.content}
                </p>

                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-white transition-colors"
                  >
                    <Link to={`/offre-detail/${tender.appel_offre.metadata.idweb}`}>
                      Voir l'offre {tender.appel_offre.metadata.idweb}
                    </Link>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full bg-gray-700 p-8 rounded-xl shadow-lg border border-[#384454] flex items-center justify-center"> 
              <p className="text-gray-300 text-center">Aucun appel d'offre ne correspond à votre profil</p>  
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicTenders;
