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

  console.log("Villes:", villes);


  

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="w-full flex flex-col gap-4">
          {tenders && tenders.length >0 ? 
          tenders.map((tender) => (
            <div
              key={tender.id}
              className=" relative p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-gray-700 border-[#384454] border flex flex-col gap-3 relative"
            >
              {/* <div className="item-center w-full flex justify-start gap-4">
                  <Badge variant="outline">{tender.appel_offre.metadata.Type_Projet}</Badge>
                  <div className="flex items-center" >
                    <span className="text-gray-100"> Avis n° {tender.appel_offre.metadata.idweb} Date limite de réponse le {new Date(tender.appel_offre.metadata.EndDate).toLocaleDateString()}</span>
                  </div>
              </div> */}
              <div className="flex flex-row gap-2 justify-between">
                <h3 className="text-2xl font-semibold text-white w-4/5 underline cursor-pointer " onClick={() => window.open(`/offre-detail/${tender.appel_offre.metadata.idweb}`, "_blank")}>
                  {tender.appel_offre.metadata.Objet_Appel_Offre} - { villes[tender.appel_offre.metadata.idweb]} - { tender && tender?.appel_offre?.metadata?.Nom_Acheteur === undefined ? "Entreprise dans le secteur du BTP" : tender?.appel_offre?.metadata?.Nom_Acheteur} 
                </h3>
                <div className="flex flex-col gap-2 ml-auto relative w-1/4 justify-self-end">
                  <div className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-yellow-400 z-10">
                    <Star size={20} />
                  </div>
                    
                </div>
              </div>

              <div className="w-full gap-y-1 ">
              <p className="flex-1 text-sm text-gray-300 line-clamp-1 mb-4">
                  {tender.appel_offre.content}
              </p>
              <div className="mt-3 text-gray-300 text-xs w-full">
              <span className="text-gray-200 "> 
                <p className="text-sm">Date limite le {new Date(tender.appel_offre.metadata.EndDate).toLocaleDateString()} à 00h00</p></span>
                <div className="flex justify-between items-center">
                  <ScoreCircle score={tender.score_final} size={100} taille={"text-lg"}/>
                  <div className="flex justify-end items-center text-gray-300 text-xs w-full">
                <Button
                  variant="blue"
                  className="text-xs border-neon-blue bg-transparent-200 hover:border-none hover:bg-gray-300 hover:text-gray-900 py-0"
                >
                    <Link to={`/offre-detail/${tender.appel_offre.metadata.idweb}`}>Voir l'offre {tender.appel_offre.metadata.idweb }</Link>
                </Button>
                </div>
                </div>
              </div>
              {/* <div className="flex justify-end items-center text-gray-300 text-xs w-full">
                <Button
                  variant="outline"
                  className="text-xs border-neon-blue bg-transparent-200 hover:border-none hover:bg-gray-300 hover:text-gray-900 py-0"
                >
                    <Link to={`/offre-detail/${tender.appel_offre.metadata.idweb}`}>Voir l'offre {tender.appel_offre.metadata.idweb }</Link>
                </Button>
                </div> */}
              </div>
            </div>
          )) : (
            <div className="w-full bg-gray-700  p-6 rounded-lg shadow-lg border border-[#384454] h-48"> 
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


