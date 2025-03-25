
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useAppDispatch } from '@/store/hooks';
import { setIsLoading } from '@/store/slices/userSlice';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  // Add a safety timeout to ensure isLoading doesn't get stuck
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isLoading) {
      console.log('AuthGuard detected loading state, setting safety timer');
      timer = setTimeout(() => {
        console.log('Safety timeout triggered in AuthGuard');
        dispatch(setIsLoading(false));
      }, 3000); // 3 second safety timeout
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, dispatch]);
  
  // Si nous sommes en train de charger, afficher un indicateur de chargement
  if (isLoading) {
    console.log('AuthGuard: isLoading =', isLoading);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!user) {
    console.log('AuthGuard: User not authenticated, redirecting to signin');
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  // Si tout est en ordre, afficher l'enfant (la page protégée)
  console.log('AuthGuard: User authenticated, rendering protected content');
  return <>{children}</>;
};

export default AuthGuard;
