
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ProjectsTab from '@/components/dashboard/tabs/ProjectsTab';

const Projects = () => {
  const breadcrumbs = [
    { label: 'Projets' }
  ];

  return (
    <DashboardLayout 
      activeTab="projects" 
      breadcrumbs={breadcrumbs}
    >
      <div className="w-full max-w-full">
        <ProjectsTab />
      </div>
    </DashboardLayout>
  );
};

export default Projects;
