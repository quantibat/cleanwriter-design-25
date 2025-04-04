import { FC } from "react";
import { Users, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type FolderCardProps = {
  title: string;
  date: string;
  status: string;
  collaborateur: string;
  type?: string;
  onClick?: () => void;
};

type Props = {
  folders: FolderCardProps[];
};


const statusColor = {
  "En cours": "bg-neon-blue/50",
  "Terminé": "bg-neon-green/50",
  "En attente": "bg-neon-orange/50",
};

const typeColor = {
  "Projet Web": "bg-neon-blue/50",
  "Application Mobile": "bg-neon-purple/50",
  "Communication": "bg-neon-green/50",
  "Data Visualisation": "bg-neon-orange/50",
  "Intégration Web": "bg-neon-pink/50",
  "Design Graphique": "bg-neon-yellow/50",
  "Projet": "bg-[#334155]/50", // valeur par défaut
};


export const FolderCard: FC<FolderCardProps> = ({
  title,
  date,
  status,
  collaborateur,
  type = "Projet",
  onClick,
}) => {

  const navigate = useNavigate()

  const projets = [
    {
      id: "1",
      title: "Refonte du site vitrine",
      date: "2025-03-10",
      created_at: "2025-01-15",
      status: "En cours",
      collaborateur: "Julie Martin",
      type: "Projet Web",
    },
    {
      id: 2,
      title: "Application mobile RH",
      date: "2025-01-22",
      created_at: "2024-12-01",
      status: "Terminé",
      collaborateur: "Thomas Dupont",
      type: "Application Mobile",
    },
    {
      id: 3,
      title: "Application mobile RH",
      date: "2025-01-22",
      created_at: "2024-12-01",
      status: "Terminé",
      collaborateur: "Thomas Dupont",
      type: "Application Mobile",
    },
    {
      id: 4,
      title: "Campagne marketing Printemps",
      date: "2025-02-15",
      created_at: "2025-01-05",
      status: "En attente",
      collaborateur: "Laura Bernard",
      type: "Communication",
    },
    {
      id: 5,
      title: "Intégration maquette Figma",
      date: "2025-02-02",
      created_at: "2025-01-10",
      status: "Terminé",
      collaborateur: "Alice Moreau",
      type: "Intégration Web",
    }
  ];
  return (
    <div
    onClick={() => navigate('/view-project', { state: { project: projets[0] } })} // Remplacez 'projets[0]' par le projet que vous souhaitez afficher
      className="relative group cursor-pointer transition-all duration-300 relative"
    >
      {/* Onglet du dossier avec le type */}
      <div className={`absolute -top-3 left-4 w-1/3 h-6 ${typeColor[type] || "bg-[#334155]"} rounded-t-md shadow-md transition-colors z-10 flex items-center justify-center`}>        <span className="text-xs text-white font-medium truncate px-2">
         {type}
        </span>
      </div>

      {/* Corps du dossier */}
      <div className="bg-[#1e293b] border border-[#384454] rounded-xl pt-6 pb-4 px-4 shadow-md group-hover:shadow-lg transition-all flex flex-col justify-between gap-4 h-48 ">
        <div className="flex justify-between items-start ">
          <div>
            <h3 className="text-lg font-semibold text-white">
             {title}
              </h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-300">
              <Users className="w-4 h-4" />
              <span>{collaborateur}</span>
            </div>
          </div>
          <span
            className={` absolute right-4 bottom-4 text-xs text-white px-2 py-1 rounded-full ${statusColor[status] || "bg-gray-500"}`}
          >
            {status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{new Date(date).toLocaleDateString("fr-FR")}</span>
        </div>
      </div>
    </div>
  );
};




export const FolderByTypeSection: FC<Props> = ({ folders }) => {
  const foldersByType = folders.reduce<Record<string, FolderCardProps[]>>((acc, folder) => {
    const type = folder.type || "Projet";
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(folder);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(foldersByType).map(([type, cards]) => (
        <div key={type}>
          <div className="text-lg font-large text-gray-300 mb-6"><p>{type}</p>
          <div className="mt-1 border-b border-gray-700 w-full" />
          </div>
          
          <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 pb-4 w-full">
            {cards.map((card, index) => (
              <FolderCard key={index} {...card} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

