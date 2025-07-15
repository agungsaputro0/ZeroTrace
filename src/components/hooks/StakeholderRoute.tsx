import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LoadingSpinner from '../atoms/LoadingSpinner';

type StakeholderRouteProps = {
  children: ReactNode;
};

const StakeholderRoute = ({ children }: StakeholderRouteProps) => {
  const { userName, loading, userKategori } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!userName) {
    return <Navigate to="/Login" replace />;
  }

  if (userKategori === 'administrator') {
    return <Navigate to="/home" replace />; 
  }

  return <>{children}</>;
};

export default StakeholderRoute;
