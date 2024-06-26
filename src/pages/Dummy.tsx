
import React from 'react';
import withAuth from './AuthChecker';

const ProtectedComponent: React.FC = () => {
  return (
    <div>
      This is a protected component.
    </div>
  );
};

export default withAuth(ProtectedComponent);
