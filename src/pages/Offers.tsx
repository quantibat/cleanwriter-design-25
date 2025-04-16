
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PublicTenders from '@/components/Tenders';
import { supabase } from '@/integrations/supabase/client';

const Offers = () => {
  const breadcrumbs = [
    { label: "Veille des appels d'offres", url: "/dashboard" },
    { label: "Appel d'offre" }
  ];

  const [appelsOffres, setAppelsOffres] = useState([])
  const [loading, setLoading] = useState(true)

  // Fonction de chargement initial
  const fetchAppels = async () => {
    const { data, error } = await supabase
      .from('appel_offre')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('Erreur de chargement des appels :', error)
    } else {
      setAppelsOffres(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAppels()
  }, [])
  

  return (
    <DashboardLayout 
      activeTab="tools" 
      breadcrumbs={breadcrumbs}
    >
      <div className="w-full grid grid-cols-1 gap-8 pt-4">
        <PublicTenders tenders={appelsOffres}/>
      </div>
    </DashboardLayout>
  );
};

export default Offers;
