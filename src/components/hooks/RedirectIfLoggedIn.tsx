import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

type RedirectIfLoggedInProps = {
    children: ReactNode; 
  };

const RedirectIfLoggedIn = ({ children }: RedirectIfLoggedInProps) => {
  const { userName, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
        navigate('/HomeMobile'); 
    }
  }, [userName, userRole, navigate]);

  return <>{children}</>;; 
};

export default RedirectIfLoggedIn;


