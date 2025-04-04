
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Offers from '@/pages/Offers';
import OfferDetail from '@/pages/OfferDetail';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/offres" element={<Offers />} />
          <Route path="/offer-detail/:id" element={<OfferDetail />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
