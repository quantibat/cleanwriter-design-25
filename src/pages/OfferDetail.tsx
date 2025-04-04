
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TenderDetail from '@/components/TenderDetail';
const OfferDetail = () => {
  const breadcrumbs = [
    { label: "Détail de l'appel d'offre" }
  ];

  const tenders = [
    {
      id: 1,
      title: "Marché public pour la rénovation d’un bâtiment",
      description: "Travaux de rénovation d'un bâtiment public dans le centre-ville.",
      date: "2025-04-03",
      type: "Travaux",
      location: "Paris, Île-de-France",
      url: "https://www.example.com/tender/1",  
      score:85
    },
    {
      id: 2,
      title: "Fourniture de matériel informatique",
      description: "Fourniture de PC portables et accessoires pour une administration publique.",
      date: "2025-03-28",
      type: "Fourniture",
      location: "Lyon, Auvergne-Rhône-Alpes",
      url: "https://www.example.com/tender/2",
      score:55  
    },
  ];
  

  return (
    <DashboardLayout 
      activeTab="tools" 
      breadcrumbs={breadcrumbs}
    >
      <div className="w-full grid grid-cols-1 gap-8 pt-4">
        <TenderDetail tender={tenders[0]} />
      </div>
    </DashboardLayout>
  );
};

export default OfferDetail;
