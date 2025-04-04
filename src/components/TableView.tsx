import { FC } from "react";
import StepProgress from "./ui/tab-project";

type FolderRow = {
  title: string;
  date: string;
  status: string;
  collaborateur: string;
  type?: string;
};

type Props = {
  folders: FolderRow[];
};

export const TableView: FC<Props> = ({ folders }) => {
  return (
    <div className="flex flex-col gap-4  w-full">
      <StepProgress currentStep={1}/>
      <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden text-sm">
        <thead className="bg-[#1e293b] text-left">
          <tr>
            <th className="px-4 py-3 border-b border-gray-700">Titre</th>
            <th className="px-4 py-3 border-b border-gray-700">Date</th>
            <th className="px-4 py-3 border-b border-gray-700">Statut</th>
            <th className="px-4 py-3 border-b border-gray-700">Type</th>
            <th className="px-4 py-3 border-b border-gray-700">Validation</th>
          </tr>
        </thead>
        <tbody>
          {folders.map((folder, index) => (
            <tr key={index} className="hover:bg-gray-800 transition-colors">
              <td className="px-4 py-3 border-b border-gray-700">{folder.title}</td>
              <td className="px-4 py-3 border-b border-gray-700">{new Date(folder.date).toLocaleDateString("fr-FR")}</td>
              <td className="px-4 py-3 border-b border-gray-700">{folder.status}</td>
              <td className="px-4 py-3 border-b border-gray-700">{folder.type || "Projet"}</td>
              <td className="px-4 py-3 border-b border-gray-700">
                <div className="flex gap-2">
                  <input type="checkbox" checked readOnly className="accent-neon-green" />
                  <input type="checkbox" checked readOnly className="accent-neon-green" />
                  <input type="checkbox" checked readOnly className="accent-neon-green" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
