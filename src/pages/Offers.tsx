
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PublicTenders from '@/components/Tenders';

const Offers = () => {
  const breadcrumbs = [
    { label: "Veille des appels d'offres", url: "/dashboard" },
    { label: "Appel d'offre" }
  ];

  const tenders = [
    {
      id: 1,
      title: "Marché public pour la rénovation d’un bâtiment",
      description: "Travaux de rénovation d'un bâtiment public dans le centre-ville.",
      date: "2025-04-03",
      company: "Société Générale",
      type: "Travaux",
      location: "Paris, Île-de-France",
      url: "https://www.example.com/tender/1",  // Lien vers les détails de l'appel d'offre
      score:85,
      attachments: [
        { name: "CCTP.pdf", url: "https://www.example.com/attachments/cctp.pdf" },
        { name: "DCE.zip", url: "https://www.example.com/attachments/dce.zip" },
      ],
    },
    {
      id: 2,
      title: "Fourniture de matériel informatique",
      description: "Fourniture de PC portables et accessoires pour une administration publique.",
      date: "2025-03-28",
      type: "Fourniture",
      location: "Lyon, Auvergne-Rhône-Alpes",
      company: "Thales",
      url: "https://www.example.com/tender/2",
      score:55  
    },
    {
      id: 3,
      title: "Fourniture de matériel informatique",
      description: "Fourniture de PC portables et accessoires pour une administration publique.",
      date: "2025-03-28",
      type: "Fourniture",
      location: "Lyon, Auvergne-Rhône-Alpes",
      url: "https://www.example.com/tender/2",
      score:52  
    },
    {
      id: 4,
      title: "Fourniture de matériel informatique",
      description: "Fourniture de PC portables et accessoires pour une administration publique.",
      date: "2025-03-28",
      type: "Fourniture",
      location: "Lyon, Auvergne-Rhône-Alpes",
      url: "https://www.example.com/tender/2",
      score:50 
    },
  ];
  

  return (
    <DashboardLayout 
      activeTab="tools" 
      breadcrumbs={breadcrumbs}
    >
      <div className="w-full grid grid-cols-1 gap-8 pt-4">
        <PublicTenders tenders={tenders}/>
      </div>
    </DashboardLayout>
  );
};

export default Offers;
