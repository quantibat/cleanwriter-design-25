import { useState } from "react";
import { Clock, MapPin } from "lucide-react";  // Icônes de react-lucide
import { Badge } from "./ui/badge";
import ScoreCircle from "./ui/score";

const FilterPanel = ({ filters, setFilters }) => {
  return (
    <div className="w-full md:w-1/4">
      <div className="bg-[#384454] backdrop-blur-md rounded-xl shadow-xl border border-[#384454] p-4 sticky top-0 text-white">
        <h2 className="text-lg font-semibold mb-4 text-white">
          🎛️ Filtres
        </h2>

        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full p-2 mb-3 rounded-full text-sm text-white bg-[#ffffff12] border border-[#384454] placeholder:text-[#ffffff88] focus:outline-none focus:ring-2 focus:ring-[#384454]"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white mb-2 mt-4">Type de marché</h3>
          <select
            className="w-full p-2 rounded-full bg-[#ffffff12] text-white border border-[#384454] focus:outline-none focus:ring-2 focus:ring-[#384454]"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">Tous les types</option>
            <option value="Travaux">Travaux</option>
            <option value="Fourniture">Fourniture</option>
          </select>
        </div>

        <div className="mb-2">
          <h3 className="text-sm font-semibold text-white mb-2 mt-4">Localisation</h3>
          <select
            className="w-full p-2 rounded-full bg-[#ffffff12] text-white border border-[#384454] focus:outline-none focus:ring-2 focus:ring-[#384454]"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          >
            <option value="">Toutes les localisations</option>
            <option value="Paris">Paris</option>
            <option value="Lyon">Lyon</option>
            <option value="Marseille">Marseille</option>
          </select>
        </div>
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
      tender.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.type ? tender.type === filters.type : true) &&
      (filters.location ? tender.location === filters.location : true)
    );
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <div className="py-1">
          <h2 className="text-3xl font-bold">Appels d'offres</h2>
          <p className="text-muted-foreground py-[10px]">
            2 appels d'offres correspondent à votre profil
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <FilterPanel filters={filters} setFilters={setFilters} />

        <div className="w-full md:w-3/4 flex flex-col gap-4">
          {filteredTenders.map((tender) => (
            <div
              key={tender.id}
              className="p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-[#384454] flex flex-col gap-3 relative"
            >
              <div className="flex flex-row gap-2 justify-start ">
                <h3 className="text-2xl font-semibold text-white">
                  {tender.title}
                </h3>
                <div className="item-center">
                <Badge variant="outline">{tender.type}</Badge>
                </div>
                <div className="text-xs text-gray-300 mb-4 ml-auto flex flex-col gap-2 text-end justify-self-end absolute right-4 top-4">
                  <ScoreCircle score={tender.score}/>
                </div>
              </div>

              <div className="w-full">
                <p className="flex-1 text-sm text-gray-300">
                  {tender.description}
                </p>
              </div>

              <div className="flex justify-between items-center text-gray-300 text-xs mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <MapPin className="mr-1 text-gray-300" size={12} />
                    <span>{tender.location}</span>
                  </div>
                  <div className="flex items-center" >
                    <Clock className="mr-1 text-gray-300 font-bold"size={12} />
                    <span className="text-gray-300"> A rendre avant le {new Date(tender.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <a
                  href={`offre-detail/${tender.id}`}
                  className="ml-auto flex items-center text-xs bg-blue-500 rounded-full p-2 transition duration-300 text-white"
                >
                  <span>Consulter</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicTenders;
