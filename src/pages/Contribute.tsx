
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ContributeTab from '@/components/dashboard/tabs/ContributeTab';
import ContributeForm from '@/components/dashboard/tabs/ContributeForm';

const Contribute = () => {
  const breadcrumbs = [
    { label: 'Contribuer' }
  ];

  return (
    <DashboardLayout 
      activeTab="contribute" 
      breadcrumbs={breadcrumbs}
    >
      <div className="w-full max-w-full grid grid-cols-1 gap-8">
        <ContributeForm />
        <ContributeTab />
      </div>
    </DashboardLayout>
  );
};

export default Contribute;
