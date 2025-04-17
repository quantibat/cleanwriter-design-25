import { useState } from "react";
import { Clock, MapPin } from "lucide-react";  // Icônes de react-lucide
import { Badge } from "./ui/badge";
import ScoreCircle from "./ui/score";
import { Button } from "./ui/button";

const FilterPanel = ({ filters, setFilters }) => {
  return (
    <div className="w-full lg:w-1/4">
      <div className="space-y-4">
        <details className="group relative overflow-hidden rounded-xl border bg-[#ffffff12] border-[#384454] border shadow-xl dark:border-[#384454]">
          <summary className="flex items-center justify-between gap-2 p-3 text-white transition-colors  dark:text-gray-200 dark:hover:text-white [&::-webkit-details-marker]:hidden">
            <span className="text-md font-medium"> Filtres</span>
            <span className="transition-transform group-open:-rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </summary>
          
          <div className="divide-y divide-gray-300 border-t border-gray-300 bg-[#0f172a]/70 backdrop-blur-md dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-900">
            <div className="flex items-center justify-between px-3 py-2">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full p-2 rounded-full text-sm text-white bg-[#ffffff12] border border-[#384454] placeholder:text-[#ffffff88] focus:outline-none focus:ring-2 focus:ring-[#384454]"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            
            <div className="p-3">
              <h3 className="text-sm font-semibold text-white mb-2">Type de marché</h3>
              <select
                className="w-full text-sm text-gray-500 p-2 rounded-full bg-[#ffffff12] text-white border border-[#384454] focus:outline-none focus:ring-2 focus:ring-[#384454]"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="">Tous les types</option>
                <option value="Travaux">Travaux</option>
                <option value="Fourniture">Fourniture</option>
              </select>
            </div>

            <div className="p-3">
              <h3 className="text-sm font-semibold text-white mb-2">Localisation</h3>
              <select
                className="w-full text-sm text-gray-500 p-2 rounded-full bg-[#ffffff12] text-white border border-[#384454] focus:outline-none focus:ring-2 focus:ring-[#384454]"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              >
                <option value="">Toutes les localisations</option>
                <option value="Paris">Paris</option>
                <option value="Lyon">Lyon</option>
                <option value="Marseille">Marseille</option>
              </select>
            </div>
            
            {/* Example of a reset button, similar to the second code's button */}
            <div className="flex justify-end px-3 py-2">
              <button
                type="button"
                className="text-sm text-white underline transition-colors hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                onClick={() => setFilters({ search: '', type: '', location: '' })}
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};




const PublicTenders = ({ tenders }) => {
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    location: "",
  });




  const filteredTenders = tenders.filter((tender) => {
    return (
      tender.appel_offre.metadata.Objet_Appel_Offre.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.type ? tender.appel_offre.metadata.Type_Projet === filters.type : true) &&
      (filters.location ? tender.appel_offre.metadata.Code_Postal === filters.location : true)
    );
  });

  console.log(filteredTenders)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <div className="py-1">
          <h2 className="text-3xl font-bold">Appels d'offres</h2>
          <p className="text-muted-foreground py-[10px]">
            { `${ tenders && tenders.length} appels d'offres correspondent à votre profil` || `Aucun appel d'offre ne correspont à votre profil` } 
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <FilterPanel filters={filters} setFilters={setFilters} />
        <div className="w-full md:w-3/4 flex flex-col gap-4">
          {filteredTenders && filteredTenders.length >0 ? 
          filteredTenders.map((tender) => (
            <div
              key={tender.id}
              className="p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-[#ffffff12] border-[#384454] border flex flex-col gap-3 relative"
            >
              <div className="item-center w-full flex justify-start">
                  <Badge variant="outline">{tender.appel_offre.metadata.Type_Projet}</Badge>
              </div>
              <div className="flex flex-row gap-2 justify-between">
                <h3 className="text-2xl font-semibold text-white w-4/5">
                  {tender.appel_offre.metadata.Objet_Appel_Offre}
                </h3>
                <div className="flex flex-col gap-2 ml-auto relative w-1/4 justify-self-end">
                    <div className="text-xs text-gray-300 ml-auto flex flex-col gap-2 text-end justify-self-end ">
                      <ScoreCircle score={tender.score_final} size={80}/>
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
                  <div className="flex items-center" >
                    <Clock className="mr-1 text-gray-300 font-bold"size={12} />
                    <span className="text-gray-300"> A rendre avant le {new Date(tender.appel_offre.metadata.EndDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="text-xs border-neon-blue bg-transparent-200 hover:border-none hover:bg-gray-300 hover:text-gray-900 py-0"
                  onClick={() => window.open(`./offre-detail/${tender.appel_offre.metadata.idweb}`)} 
                >
                  <span>Consulter</span>  
                </Button>
                
              </div>
            </div>
          )) : (
            <div className="w-full bg-[#0f172a]/70  p-6 rounded-2xl shadow-lg border border-[#384454] h-48"> 
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


