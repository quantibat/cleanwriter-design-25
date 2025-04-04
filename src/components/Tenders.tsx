import { useState } from "react";
import { MapPin } from "lucide-react";  // Icônes de react-lucide
import { Badge } from "./ui/badge";

const FilterPanel = ({ filters, setFilters }) => {
  return (
    <div className="w-full md:w-1/4 p-4 bg-[#384454] rounded-lg shadow-lg flex flex-col gap-2">
      <h2 className="text-lg font-semibold mb-4">Filtres</h2>
      <input
        type="text"
        placeholder="Rechercher..."
        className="w-full p-2 rounded-full text-sm text-gray-700"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Type de marché</h3>
        <select
          className="w-full p-2 rounded-full text-sm text-gray-700"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">Tous les types</option>
          <option value="Travaux">Travaux</option>
          <option value="Fourniture">Fourniture</option>
        </select>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Localisation</h3>
        <select
          className="w-full p-2 rounded-full text-sm text-gray-700"
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
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-[#384454] flex flex-col gap-1 hover:border-white hover:border-2"
            >
              <div className="flex flex-row gap-2 justify-center items-center">
                <h3 className="text-2xl font-semibold text-white">
                  {tender.title}
                </h3>
                <Badge variant="outline">{tender.type}</Badge>
                <div className="text-xs text-gray-300 mb-4 ml-auto flex flex-col gap-2 text-end justify-self-end">
                  <p>Date limite</p>
                  <span>{new Date(tender.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="w-full h-8">
                <p className="line-clamp-3 flex-1 text-sm text-gray-300 mb-2">
                  {tender.description}
                </p>
              </div>

              <div className="flex justify-between items-center text-gray-300 text-xs mb-2">
                <div className="flex items-center">
                  <MapPin className="mr-1 text-gray-300" />
                  <span>{tender.location}</span>
                </div>
                <a
                  href={tender.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center text-xs bg-blue-500 rounded-full p-2 transition duration-300"
                >
                  <span>Voir l'offre</span>
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
