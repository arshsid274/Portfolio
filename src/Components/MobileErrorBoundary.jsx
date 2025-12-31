import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const isMobileDevice = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) && window.innerWidth < 1024;
};

const SimpleMobileFallback = ({ error }) => (
  <div className="w-full h-64 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center rounded-lg">
    <div className="text-center text-white/70 p-4">
      <div className="text-lg mb-2">Content Unavailable</div>
      <div className="text-sm opacity-70">This feature is optimized for desktop viewing</div>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
      >
        Refresh
      </button>
    </div>
  </div>
);

const MobileErrorBoundary = ({ children, fallback }) => {
  if (isMobileDevice()) {
    return (
      <ErrorBoundary fallback={fallback || SimpleMobileFallback}>
        {children}
      </ErrorBoundary>
    );
  }
  return children;
};

export default MobileErrorBoundary;