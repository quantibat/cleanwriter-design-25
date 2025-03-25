
import React, { ReactNode, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useEffect(() => {
    console.log('MainLayout mounted');
    // Add this line to check if there's any issue with the layout rendering
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#06071b]">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
