import React from 'react';
import './MainLoader.css';

const MainLoader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="main-loader-overlay">
      <div className="loader-content">
        <div className="spinner">
          <div className="spinner1"></div>
        </div>
        <div className="loader-text">
          <h2 className="tech-typography">
            Please wait while server is building your{' '}
            <span className="gradient-highlight">3D experience</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MainLoader;