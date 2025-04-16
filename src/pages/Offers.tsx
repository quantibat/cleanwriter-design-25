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

    const from = (page - 1) * OFFRES_PAR_PAGE;
    const to = from + OFFRES_PAR_PAGE - 1;

    const { data, error, count } = await supabase
      .from('appel_offre')
      .select('*', { count: 'exact' }) // pour récupérer le total
      .range(from, to)
      .order('id', { ascending: false });

    if (error) {
      console.error('Erreur de chargement des appels :', error);
    } else {
      setAppelsOffres(data);
      setTotalPages(Math.ceil((count ?? 0) / OFFRES_PAR_PAGE));
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

  return (
    <DashboardLayout 
      activeTab="tools" 
      breadcrumbs={breadcrumbs}
    >
      <div className="w-full grid grid-cols-1 gap-4 pt-4 mb-8">
        <PublicTenders tenders={appelsOffres}/>
        
        <div className="flex justify-end items-center gap-4">
          <button 
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-full disabled:opacity-50 text-sm"
          >
            Précédent
          </button>

          <span className="text-sm text-gray-300 text-sm">
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
