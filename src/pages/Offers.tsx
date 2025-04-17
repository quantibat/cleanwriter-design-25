import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PublicTenders from '@/components/Tenders';
import { supabase } from '@/integrations/supabase/client';
import { a } from 'node_modules/framer-motion/dist/types.d-B50aGbjN';
import { useAppelsOffres } from '@/hooks/useAppelOffers';

const OFFRES_PAR_PAGE = 8;

const Offers = () => {
  const breadcrumbs = [
    { label: "Veille des appels d'offres", url: "/dashboard" },
    { label: "Appel d'offre" }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const { appelsOffres, totalPages} = useAppelsOffres(currentPage);


  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  console.log(appelsOffres);

  

  return (
    <DashboardLayout activeTab="tools" breadcrumbs={breadcrumbs}>
      <div className="w-full grid grid-cols-1 gap-4 pt-4 mb-8">
        <PublicTenders tenders={appelsOffres} />
        
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
