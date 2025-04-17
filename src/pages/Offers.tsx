import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PublicTenders from '@/components/Tenders';
import { supabase } from '@/integrations/supabase/client';

const OFFRES_PAR_PAGE = 8;

const Offers = () => {
  const breadcrumbs = [
    { label: "Veille des appels d'offres", url: "/dashboard" },
    { label: "Appel d'offre" }
  ];

  const [appelsOffres, setAppelsOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAppels = async (page = 1) => {
    setLoading(true);

    try {
      const from = (page - 1) * OFFRES_PAR_PAGE;
      const to = from + OFFRES_PAR_PAGE - 1;

      // Étape 1 : identification de l'utilisateur
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Erreur utilisateur :", userError);
        return;
      }

      // Étape 2 : récupération de l'entreprise liée à cet utilisateur
      const { data: entreprise, error: entrepriseError } = await supabase
        .from('entreprises')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (entrepriseError || !entreprise) {
        console.error("Erreur récupération entreprise :", entrepriseError);
        return;
      }

      const idEntreprise = entreprise.id;

      // Étape 3 : récupération des IDs des AO liés à cette entreprise
      const { data: scoringData, error: scoringError } = await supabase
        .from('AO_Public_Scoring')
        .select('ao_id')
        .eq('id_entreprise', idEntreprise);

      if (scoringError) {
        console.error("Erreur récupération AO_Public_Scoring :", scoringError);
        return;
      }

      const aoIds = scoringData.map(item => item.ao_id);

      if (aoIds.length === 0) {
        setAppelsOffres([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      // Étape 4 : récupération des AO correspondants
      const { data, error, count } = await supabase
        .from('appel_offre')
        .select('*', { count: 'exact' })
        .in('id', aoIds)
        .range(from, to)
        .order('id', { ascending: false });

      if (error) {
        console.error('Erreur de chargement des AO :', error);
      } else {
        setAppelsOffres(data);
        setTotalPages(Math.ceil((count ?? 0) / OFFRES_PAR_PAGE));
      }
    } catch (err) {
      console.error('Erreur inattendue :', err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAppels(currentPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  console.log('appelsOffres', appelsOffres);

  return (
    <DashboardLayout 
      activeTab="tools" 
      breadcrumbs={breadcrumbs}
    >
      <div className="w-full grid grid-cols-1 gap-4 pt-4 mb-8">
        <PublicTenders tenders={appelsOffres}/>

        {appelsOffres.length === 0 && !loading && (
          <div className="text-center text-sm text-gray-400">
            Aucun appel d'offre correspondant à votre entreprise.
          </div>
        )}

        <div className="flex justify-end items-center gap-4">
          <button 
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-full disabled:opacity-50 text-sm"
          >
            Précédent
          </button>

          <span className="text-sm text-gray-300">
            Page {currentPage} sur {totalPages}
          </span>

          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-full disabled:opacity-50 text-sm"
          >
            Suivant
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Offers;
