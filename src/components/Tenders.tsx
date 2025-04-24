
import { MapPin, Building2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import CompatibilityGauge from "./ui/CompatibilityGauge";

const PublicTenders = ({ tenders, onToggleFavorite }) => {
  const [villes, setVilles] = useState({});
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteOffers');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

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

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " à " + d.getHours().toString().padStart(2, "0") + "h" + d.getMinutes().toString().padStart(2, "0");
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };


  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        {tenders && tenders.length > 0 ? (
          tenders.map((tender) => (
            <div
              key={tender.id}
              className="group relative p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-gray-700 to-gray-800 border-[#384454] border"
            >
              <div className="absolute top-0 right-0">
                <div className="w-0 h-0 
                  border-t-[50px] border-l-[50px] 
                  border-t-blue-600 border-l-transparent">
                  <button 
                    className="absolute top-[5px] right-[5px] text-white hover:scale-110 transition-transform"
                    onClick={() => {
                      const id = tender.appel_offre.metadata.idweb;
                      const isFavorite = favorites.includes(id);
                      const updatedFavorites = isFavorite
                        ? favorites.filter(fav => fav !== id)
                        : [...favorites, id];
                      setFavorites(updatedFavorites);
                      localStorage.setItem('favoriteOffers', JSON.stringify(updatedFavorites));
                      onToggleFavorite?.(id, !isFavorite);
                    }}
                    
                  >
                    <Star 
                      size={20} 
                      fill={tender.isFavorite ? "white" : "none"}
                      className="text-white"
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white hover:text-blue-400 transition-colors cursor-pointer"
                        onClick={() => window.open(`/offre-detail/${tender.appel_offre.metadata.idweb}`, "_blank")}>
                      {truncateText(tender.appel_offre.metadata.Objet_Appel_Offre, 10)}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin size={16} className="text-neon-blue" />
                        <span>{villes[tender.appel_offre.metadata.idweb]}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Building2 size={16} className="text-neon-blue" />
                        <span>{tender?.appel_offre?.metadata?.Nom_Acheteur || "Entreprise dans le secteur du BTP"}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mt-4">
                      { tender.appel_offre.metadata?.Resume_Appel_Offre ? tender.appel_offre.metadata?.Resume_Appel_Offre : truncateText(tender.appel_offre.content, 40)}
                    </p>

                    <div className="text-gray-400 mt-4">
                      <span className="font-medium">Date limite:</span> {formatDate(tender.appel_offre.metadata.EndDate)}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 w-full lg:w-1/4 min-w-[250px]">
                    <CompatibilityGauge score={tender.score_final} />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-white transition-colors"
                    >
                      <Link to={`/offre-detail/${tender && tender?.appel_offre?.metadata?.idweb}`}>
                        Voir l'offre 
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full bg-gray-700 p-8 rounded-xl shadow-lg border border-[#384454] flex items-center justify-center h-24">
            <p className="text-gray-300 text-center">Aucun appel d'offre ne correspond à votre profil</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicTenders;
