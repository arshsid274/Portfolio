import React from 'react';
import './MainLoader.css';

const MainLoader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="main-loader-overlay">
      <div className="spinner">
        <div className="spinner1"></div>
      </div>
    </div>
  );
};

export default MainLoader;