
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
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
  
  // Si tout est en ordre, afficher l'enfant (la page protégée)
  return <>{children}</>;
};

export default AuthGuard;
