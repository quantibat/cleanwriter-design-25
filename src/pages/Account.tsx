import React, { useState } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ProfileForm from '@/components/AccountProfileForm';
import SecurityForm from '@/components/AccountSecurityForm';
import EnterpriseForm from '@/components/AccountEntrepriseForm';
import { cn } from "@/lib/utils"; // optionnel si tu utilises une utilitaire comme `clsx` ou `cn`

const Account = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'enterprise' | 'security'>('profile');
  return <DashboardLayout activeTab="account" breadcrumbs={[{
    label: 'Mon Compte',
    path: '/account'
  }, {
    label: activeTab === 'profile' ? 'Informations personnelles' : activeTab === 'enterprise' ? 'Entreprise' : 'Sécurité'
  }]} toolType="account">
      <div className="flex flex-col w-full mt-4">
        <div className="w-full bg-gray-700 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-[#384454] mb-8">
          <h1 className="text-2xl font-bold mb-2">Mon Compte</h1>
          <p className='text-sm text-gray-400'>Gérez ici vos informations personnelles, votre entreprise et la sécurité de votre compte.</p>
        </div>
        
        <div className='flex flex-col md:flex-row gap-8 w-full'>
          <aside className="w-full md:w-64 space-y-2 pr-4">
            <button onClick={() => setActiveTab('profile')} className={cn("w-full text-left px-4 py-2 rounded-md transition border border-gray/20 bg-gradient-to-b from-gray-700 to-gray-800 text-sm", activeTab === 'profile' ? "bg-blue-600 font-semibold" : "hover:bg-accent")}>
              Informations personnelles
            </button>
            <button onClick={() => setActiveTab('enterprise')} className={cn("w-full text-left px-4 py-2 rounded-md transition border border-gray/20 bg-gradient-to-b from-gray-700 to-gray-800 text-sm", activeTab === 'enterprise' ? "bg-blue-600 font-semibold" : "hover:bg-accent")}>
              Entreprise
            </button>
            <button onClick={() => setActiveTab('security')} className={cn("w-full text-left px-4 py-2 rounded-md transition border border-gray/20 bg-gradient-to-b from-gray-700 to-gray-800 text-sm", activeTab === 'security' ? "bg-blue-600 font-semibold" : "hover:bg-accent")}>
              Sécurité
            </button>
          </aside>

          <section className="flex-1">
            {activeTab === 'profile' && <ProfileForm />}
            {activeTab === 'enterprise' && <EnterpriseForm />}
            {activeTab === 'security' && <SecurityForm />}
          </section>
        </div>
      </div>
    </DashboardLayout>;
};
export default Account;