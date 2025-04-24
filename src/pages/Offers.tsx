import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PublicTenders from '@/components/Tenders';
import { useAppelsOffres } from '@/hooks/useAppelOffers';
import { isToday, isThisWeek, isSameWeek, parseISO, subWeeks } from 'date-fns';
import clsx from 'clsx';
import { Calendar, CalendarDays, History, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { FiltersSidebar } from '@/components/tender/FiltersSidebar';

const Offers = () => {
  const breadcrumbs = [
    { label: "Actions rapides", path: "/dashboard" },
    { label: "Veille des appels d'offres" }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'favorites' | 'today' | 'thisWeek' | 'lastWeek'>('favorites');
  const [refreshTrigger, setRefreshTrigger] = useState(0); 
  const [scoreMin, setScoreMin] = useState(0);

  const { appelsOffres, totalPages } = useAppelsOffres(currentPage, refreshTrigger); 

  const toggleFavorite = async (id: string, currentStatus: boolean) => {
    console.log(`Toggling favorite for id: ${id}, current status: ${currentStatus}`);

    const { error } = await supabase
      .from('AO_Public_Scoring')
      .update({ isFavorite: !currentStatus })
      .eq('ao_id', id);

    if (error) {
      console.error('Erreur lors de la mise à jour du favori', error);
    } else {
      console.log(`Favori mis à jour pour l'appel d'offre ${id}`);
      setRefreshTrigger(prev => prev + 1); // 🆕 force le refresh
    }
  };

  const now = new Date();
  const lastWeek = subWeeks(now, 1);

  const { today, thisWeek, lastWeekOffers, favoriteOffers } = useMemo(() => {
    const today: any[] = [];
    const thisWeek: any[] = [];
    const lastWeekOffers: any[] = [];
    const favoriteOffers: any[] = [];

    const sorted = [...(appelsOffres || [])].sort((a, b) => {
      const scoreA = a?.score_final || 0;
      const scoreB = b?.score_final || 0;
      return scoreB - scoreA;
    });

    sorted
      .filter(offer => (offer?.score_final || 0) >= scoreMin)
      .forEach((offer) => {
        if (!offer?.appel_offre.metadata.startDate) return;

        const date = parseISO(offer.appel_offre.metadata.startDate);
        const isFavorite = offer.isFavorite;

        if (isFavorite) {
          favoriteOffers.push(offer);
        }
        if (!isFavorite) {
          if (isToday(date)) {
            today.push(offer);
          } else if (isThisWeek(date, { weekStartsOn: 1 })) {
            thisWeek.push(offer);
          } else if (isSameWeek(date, lastWeek, { weekStartsOn: 1 })) {
            lastWeekOffers.push(offer);
          }
        }
    });

    return { today, thisWeek, lastWeekOffers, favoriteOffers };
  }, [appelsOffres, scoreMin]);

  const getTenders = () => {
    switch (activeTab) {
      case 'favorites':
        return favoriteOffers;
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
    { key: 'favorites', label: `Favoris (${favoriteOffers.length})`, icon: <Star size={16} /> },
    { key: 'today', label: `Aujourd'hui (${today.length})`, icon: <Calendar size={16} /> },
    { key: 'thisWeek', label: `Cette semaine (${thisWeek.length})`, icon: <CalendarDays size={16} /> },
    { key: 'lastWeek', label: `Semaine dernière (${lastWeekOffers.length})`, icon: <History size={16} /> },
  ];

  return (
    <DashboardLayout activeTab="tools" breadcrumbs={breadcrumbs}>
      <div className="w-full flex flex-col gap-6 pt-4 mb-8">
        <div className="w-full bg-gray-700 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-[#384454] mb-4">
          <h2 className="text-3xl font-bold">Appels d'offres</h2>
          <p className="text-muted-foreground py-2 text-sm">
            {appelsOffres?.length > 0 && appelsOffres.length === 1
              ? `Un appel d'offre correspond à votre profil`
              : appelsOffres?.length > 1
                ? `${appelsOffres.length} appels d'offres correspondent à votre profil`
                : `Aucun appel d'offre ne correspond à votre profil`}
          </p>
        </div>

        <div className="flex gap-6">
          <FiltersSidebar
            scoreMin={scoreMin}
            setScoreMin={setScoreMin}
            onReset={() => setScoreMin(0)}
          />
          
          <div className="flex-1">
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

            <PublicTenders
              tenders={getTenders()}
              onToggleFavorite={(id, isFav) => toggleFavorite(id, isFav)}
            />

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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Offers;
