import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PublicTenders from '@/components/Tenders';
import { useAppelsOffres } from '@/hooks/useAppelOffers';
import { isToday, isThisWeek, isSameWeek, parseISO, subWeeks } from 'date-fns';
import clsx from 'clsx';
import { Calendar, CalendarDays, History } from 'lucide-react';

const Offers = () => {
  const breadcrumbs = [
    { label: "Veille des appels d'offres", path: "/dashboard" },
    { label: "Appel d'offre" }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'today' | 'thisWeek' | 'lastWeek'>('today');
  const { appelsOffres, totalPages } = useAppelsOffres(currentPage);

  const now = new Date();
  const lastWeek = subWeeks(now, 1);

  const { today, thisWeek, lastWeekOffers } = useMemo(() => {
    const today: any[] = [];
    const thisWeek: any[] = [];
    const lastWeekOffers: any[] = [];

    console.log('appelsOffres', appelsOffres);

    appelsOffres && appelsOffres?.forEach((offer) => {
      if (!offer?.appel_offre.metadata.startDate) return;
      const date = parseISO(offer?.appel_offre.metadata.startDate);
      if (isToday(date)) {
        today.push(offer);
      } else if (isThisWeek(date, { weekStartsOn: 1 })) {
        thisWeek.push(offer);
      } else if (isSameWeek(date, lastWeek, { weekStartsOn: 1 })) {
        lastWeekOffers.push(offer);
      }
    });

    return { today, thisWeek, lastWeekOffers };
  }, [appelsOffres]);

  const getTenders = () => {
    switch (activeTab) {
      case 'today':
        return today;
      case 'thisWeek':
        return thisWeek;
      case 'lastWeek':
        return lastWeekOffers;
      default:
        return [];
    }
  };

  const tabList = [
    { key: 'today', label: `Aujourd'hui (${today.length})`, icon: <Calendar size={16} /> },
    { key: 'thisWeek', label: `Cette semaine (${thisWeek.length})`, icon: <CalendarDays size={16} /> },
    { key: 'lastWeek', label: `Semaine dernière (${lastWeekOffers.length})`, icon: <History size={16} /> },
  ];

  return (
    <DashboardLayout activeTab="tools" breadcrumbs={breadcrumbs}>
      <div className="w-full flex flex-col gap-6 pt-4 mb-8">
        <div className="w-full bg-[#0f172a]/70 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-[#384454] mb-4">
          <h2 className="text-3xl font-bold">Appels d'offres</h2>
          <p className="text-muted-foreground py-2 text-sm">
            {appelsOffres?.length
              ? `${appelsOffres.length} appels d'offres correspondent à votre profil`
              : `Aucun appel d'offre ne correspond à votre profil`}
          </p>
        </div>

        {/* Onglets horizontaux alignés à droite */}
        <div className="flex justify-end mb-2">
          <div className="flex gap-4">
            {tabList.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={clsx(
                  'flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-all',
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu de l'onglet actif */}
        <PublicTenders tenders={getTenders()} />

        {/* Pagination */}
        {appelsOffres && appelsOffres.length > 0 && (
          <div className="flex justify-end items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-full disabled:opacity-50 text-sm"
            >
              Précédent
            </button>

            <span className="text-sm text-gray-300">
              Page {currentPage} sur {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded-full disabled:opacity-50 text-sm"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Offers;
