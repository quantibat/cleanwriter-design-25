import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TenderDetail from '@/components/TenderDetail';
import { useParams } from 'react-router-dom';
import { useAppelOffreById } from '@/hooks/useAppelOfferById';

const OfferDetail = () => {

  const breadcrumbs = [
    { label: "Actions rapides", path: "/dashboard" },
    { label: "Veille des appels d'offres", path: "/offres" },
    { label: "Détail de l'appel d'offre" }
  ];

  const { id } = useParams(); 

  const { tender, loading } = useAppelOffreById(id);

  return (
    <DashboardLayout activeTab="tools" breadcrumbs={breadcrumbs}>
      <div className="w-full grid grid-cols-1 gap-8 pt-4">
        {loading ? (
          <p className="text-gray-300">Chargement...</p>
        ) : tender ? (
          <TenderDetail tender={tender} />
        ) : (
          <p className="text-red-500">Aucun appel d'offre trouvé.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OfferDetail;
