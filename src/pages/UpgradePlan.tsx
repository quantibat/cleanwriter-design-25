
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Skeleton } from '@/components/ui/skeleton';

const UpgradePlan = () => {
  const [isLoading, setIsLoading] = useState(true);
  const frameUrl = "https://preview--cleanwriter-design-25.lovable.app/free-trial";
  
  // Gestion du chargement de l'iframe
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const breadcrumbs = [
    { label: 'Upgrader son plan' }
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="w-full h-full min-h-[calc(100vh-8rem)]">
        {isLoading && (
          <div className="w-full space-y-4 animate-pulse">
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        )}
        <iframe 
          src={frameUrl}
          className={`w-full min-h-[calc(100vh-8rem)] rounded-lg border border-border ${isLoading ? 'hidden' : 'block'}`}
          onLoad={handleIframeLoad}
          title="Mise à niveau du plan"
          sandbox="allow-same-origin allow-scripts allow-forms"
        />
      </div>
    </DashboardLayout>
  );
};

export default UpgradePlan;
