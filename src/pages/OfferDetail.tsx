import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TenderDetail from '@/components/TenderDetail';
import { supabase } from '@/integrations/supabase/client';
import { useParams } from 'react-router-dom';

const OfferDetail = () => {
  const breadcrumbs = [
    { label: "Détail de l'appel d'offre" }
  ];

  const { id } = useParams(); // ✅ Corrigé ici

  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenderById = async () => {
      if (!id) return;

      setLoading(true);

      const { data, error } = await supabase
        .from('appel_offre') 
        .select('*')
        .eq('id', id) // si `id` est un UUID ou une string en BDD
        .single();

      if (error) {
        console.error('Erreur de chargement:', error);
      } else {
        setTender(data);
      }

      setLoading(false);
    };

    fetchTenderById();
  }, [id]);

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
