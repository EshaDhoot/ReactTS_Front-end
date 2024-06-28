import React from 'react';
import { getCookie } from '../utils/Cookies';
import { Navigate } from 'react-router-dom'; 

interface WithAuthProps {
  
}

const withAuth = <P extends WithAuthProps>(Component: React.ComponentType<P>) => {
  const AuthComponent: React.FC<P> = (props) => {
    const accessToken = getCookie('accessToken');
    
    if (!accessToken) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
