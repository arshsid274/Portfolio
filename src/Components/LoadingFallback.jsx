import React from 'react';

const LoadingFallback = ({ message = "Loading...", className = "" }) => {
  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <div className="text-center">
        <div className="relative">
          {/* Animated spinner */}
          <div className="w-12 h-12 mx-auto mb-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          
          {/* Loading text */}
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

// Specialized loading components for different contexts
export const ThreeJSLoadingFallback = () => (
  <LoadingFallback 
    message="Loading 3D content..." 
    className="bg-gradient-to-br from-gray-900 to-black text-white min-h-[400px]"
  />
);

export const PageLoadingFallback = () => (
  <LoadingFallback 
    message="Loading page..." 
    className="min-h-[300px]"
  />
);

export const ComponentLoadingFallback = ({ componentName }) => (
  <LoadingFallback 
    message={`Loading ${componentName}...`} 
    className="min-h-[150px]"
  />
);

export default LoadingFallback;