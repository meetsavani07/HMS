import React from 'react';
import Loader from './Loader';

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, children }) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center">
        <Loader size="large" />
      </div>
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default LoadingOverlay;