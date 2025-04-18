import React, { useState } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ProfileForm from '@/components/AccountProfileForm';
import SecurityForm from '@/components/AccountSecurityForm';
import EnterpriseForm from '@/components/AccountEntrepriseForm';
import { cn } from "@/lib/utils"; // optionnel si tu utilises une utilitaire comme `clsx` ou `cn`

const Account = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'enterprise' | 'security'>('profile');

  return (
    <DashboardLayout activeTab="account" breadcrumbs={[{ label: 'Mon Compte', path:'/account' }, { label: activeTab === 'profile' ? 'Informations personnelles' : activeTab === 'enterprise' ? 'Entreprise' : 'Sécurité' }]} toolType="account">
      <div className="flex flex-col w-full mt-4">
      <h1 className="text-2xl font-bold mb-6">Mon Compte</h1>
        <div className='flex flex-col md:flex-row gap-8 w-full'>
            <aside className="w-full md:w-64 space-y-2  pr-4">
              <button
                onClick={() => setActiveTab('profile')}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-md transition-colors",
                  activeTab === 'profile' ? "bg-muted text-primary font-semibold" : "hover:bg-accent"
                )}
              >
                Informations personnelles
              </button>
              <button
                onClick={() => setActiveTab('enterprise')}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-md transition-colors",
                  activeTab === 'enterprise' ? "bg-muted text-primary font-semibold" : "hover:bg-accent"
                )}
              >
                Entreprise
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-md transition-colors",
                  activeTab === 'security' ? "bg-muted text-primary font-semibold" : "hover:bg-accent"
                )}
              >
                Sécurité
              </button>
            </aside>

            {/* Contenu dynamique */}
            <section className="flex-1">
              {activeTab === 'profile' && <ProfileForm />}
              {activeTab === 'enterprise' && <EnterpriseForm />}
              {activeTab === 'security' && <SecurityForm />}
            </section>
        </div>
       </div>
    </DashboardLayout>
  );
};

export default Account;
