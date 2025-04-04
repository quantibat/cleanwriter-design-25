import { FC } from "react";
import { Home, Folder, Users, Settings, CheckCircle } from "lucide-react";

export const SidebarProject: FC = () => {
  return (
    <div className="flex">
      {/* Menu vertical (sidebar) */}
      <aside className="h-auto w-64 bg-[#1e293b] text-white shadow-lg hidden md:flex flex-col">

        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink icon={<Home className="w-5 h-5" />} label="Accueil" />
          <SidebarLink icon={<Folder className="w-5 h-5" />} label="Projets" />
          <SidebarLink icon={<Users className="w-5 h-5" />} label="Équipe" />
          <SidebarLink icon={<Settings className="w-5 h-5" />} label="Paramètres" />
        </nav>
      </aside>
    </div>
  );
};

type SidebarLinkProps = {
  icon: React.ReactNode;
  label: string;
};

const SidebarLink: FC<SidebarLinkProps> = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#334155] cursor-pointer transition-colors">
      {icon}
      <span>{label}</span>
    </div>
  );
};
