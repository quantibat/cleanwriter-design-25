
import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PublicTenders from '@/components/Tenders';
import { useAppelsOffres } from '@/hooks/useAppelOffers';
import { isToday, isThisWeek, isSameWeek, parseISO, subWeeks } from 'date-fns';
import clsx from 'clsx';
import { Calendar, CalendarDays, History, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { FiltersSidebar } from '@/components/tender/FiltersSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const Offers = () => {
  const breadcrumbs = [
    { label: "Actions rapides", path: "/dashboard" },
    { label: "Veille des appels d'offres" }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'favorites' | 'today' | 'thisWeek' | 'lastWeek'>('favorites');
  const [refreshTrigger, setRefreshTrigger] = useState(0); 
  const [scoreMin, setScoreMin] = useState(0);
  const [selectedCity, setSelectedCity] = useState("all_cities");
  const [dateLimit, setDateLimit] = useState<Date>();
  const [workType, setWorkType] = useState("all_types");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const isMobile = useIsMobile();

  const { appelsOffres, totalPages } = useAppelsOffres(currentPage, refreshTrigger);

  const cities = useMemo(() => {
    const uniqueCities = new Set(
      appelsOffres?.map(offer => 
        offer?.appel_offre?.metadata?.Code_Postal ? 
        `${offer?.appel_offre?.metadata?.Ville} (${offer?.appel_offre?.metadata?.Code_Postal})` : 
        null
      ).filter(Boolean)
    );
    return Array.from(uniqueCities);
  }, [appelsOffres]);

  const workTypes = useMemo(() => {
    const uniqueTypes = new Set(
      appelsOffres?.map(offer => 
        offer?.appel_offre?.metadata?.Type_Travaux
      ).filter(Boolean)
    );
    return Array.from(uniqueTypes);
  }, [appelsOffres]);

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

  const filteredOffers = useMemo(() => {
    let filtered = [...(appelsOffres || [])].sort((a, b) => {
      const scoreA = a?.score_final || 0;
      const scoreB = b?.score_final || 0;
      return scoreB - scoreA;
    });

    filtered = filtered.filter(offer => {
      const score = offer?.score_final || 0;
      if (score < scoreMin) return false;

      if (selectedCity !== "all_cities" && offer?.appel_offre?.metadata?.Ville) {
        const offerCity = `${offer.appel_offre.metadata.Ville} (${offer.appel_offre.metadata.Code_Postal})`;
        if (offerCity !== selectedCity) return false;
      }

      if (dateLimit && offer?.appel_offre?.metadata?.EndDate) {
        const endDate = new Date(offer.appel_offre.metadata.EndDate);
        if (endDate > dateLimit) return false;
      }

      if (workType !== "all_types" && offer?.appel_offre?.metadata?.Type_Travaux) {
        if (offer.appel_offre.metadata.Type_Travaux !== workType) return false;
      }

      return true;
    });

    return filtered;
  }, [appelsOffres, scoreMin, selectedCity, dateLimit, workType]);

  const resetFilters = () => {
    setScoreMin(0);
    setSelectedCity("all_cities");
    setDateLimit(undefined);
    setWorkType("all_types");
  };

  const { today, thisWeek, lastWeekOffers, favoriteOffers } = useMemo(() => {
    const today: any[] = [];
    const thisWeek: any[] = [];
    const lastWeekOffers: any[] = [];
    const favoriteOffers: any[] = [];

    filteredOffers.forEach((offer) => {
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
  }, [filteredOffers]);

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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Appels d'offres</h2>
              <p className="text-muted-foreground py-2 text-sm">
                {filteredOffers.length > 0 && filteredOffers.length === 1
                  ? `Un appel d'offre correspond à votre profil`
                  : filteredOffers.length > 1
                    ? `${filteredOffers.length} appels d'offres correspondent à votre profil`
                    : `Aucun appel d'offre ne correspond à votre profil`}
              </p>
            </div>
            {isMobile && (
              <Button 
                variant="outline" 
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="lg:hidden"
              >
                Filtres
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`
            lg:block
            ${isMobile ? (isMobileFiltersOpen ? 'block' : 'hidden') : 'block'}
            lg:relative fixed top-0 right-0 z-50 
            lg:w-auto w-full lg:h-auto h-screen
            lg:bg-transparent bg-background/95 backdrop-blur-md
          `}>
            {isMobile && isMobileFiltersOpen && (
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Filtres</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <FiltersSidebar
              scoreMin={scoreMin}
              setScoreMin={setScoreMin}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              dateLimit={dateLimit}
              setDateLimit={setDateLimit}
              workType={workType}
              setWorkType={setWorkType}
              cities={cities}
              workTypes={workTypes}
              onReset={resetFilters}
            />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-end mb-2">
              <div className="flex gap-4 overflow-x-auto pb-2">
                {tabList.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={clsx(
                      'flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-all whitespace-nowrap',
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
