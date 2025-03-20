
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, isLoading, isPremiumUser } = useAuth();
  const location = useLocation();
  
  // Liste des routes qui nécessitent un abonnement premium
  const premiumRoutes = ['/dashboard', '/projects', '/create-dce', '/edit-dce', '/view-dce'];
  const requiresPremium = premiumRoutes.some(route => 
    location.pathname === route || 
    (route.includes('/edit-dce') && location.pathname.startsWith('/edit-dce/')) ||
    (route.includes('/view-dce') && location.pathname.startsWith('/view-dce/'))
  );

  // Si nous sommes en train de charger, afficher un indicateur de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  // Si la route nécessite un abonnement premium et que l'utilisateur n'est pas premium,
  // rediriger vers la page d'essai gratuit
  if (requiresPremium && !isPremiumUser) {
    return <Navigate to="/free-trial" state={{ from: location }} replace />;
  }

  // Si tout est en ordre, afficher l'enfant (la page protégée)
  return <>{children}</>;
};

export default AuthGuard;
