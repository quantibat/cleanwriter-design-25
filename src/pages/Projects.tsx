
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
      <ProjectsTab />
    </DashboardLayout>
  );
};

export default Projects;
