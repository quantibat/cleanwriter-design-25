import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import FeaturePage from '@/pages/FeaturePage';

// This is just a reference for how routes should be structured in App.tsx
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/features/:slug" element={<FeaturePage />} />
      {/* Other existing routes */}
    </Routes>
  );
};

export default AppRoutes;
