
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string | null | undefined;
}

export const DetailItem: React.FC<DetailItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-700/50">
    <div className="p-2 rounded-full bg-blue-500/10">
      <Icon className="w-5 h-5 text-blue-400" />
    </div>
    <div>
      <dt className="text-sm font-medium text-gray-400">{label}</dt>
      <dd className="text-sm font-semibold text-white mt-1">{value || "Non spécifié"}</dd>
    </div>
  </div>
);
