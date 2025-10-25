import React, { useState } from 'react';
import './DownloadButton.css';

const DownloadButton = ({ tooltip = "Size: 20Mb", className = "" }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = () => {
    // Set clicked state to true (permanent gradient)
    setIsClicked(true);
    
    // Add your resume download logic here
    // For example: window.open('/path/to/resume.pdf', '_blank');
    console.log('Downloading resume...');
  };

  const displayTooltip = isClicked ? "Downloaded!" : tooltip;

  // Determine which glow class to use for the button
  const getButtonGlowClass = () => {
    if (isClicked || isHovered) {
      return 'cyan-glow-button-static';
    }
    return 'cyan-glow-button-animated';
  };

  return (
    <div 
      className={`download-button ${className} ${isClicked ? 'clicked' : ''} ${getButtonGlowClass()}`} 
      data-tooltip={displayTooltip}
      onClick={handleDownload}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="button-wrapper">
        <div className="text">Download</div>
        <span className="icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            aria-hidden="true" 
            role="img" 
            width="2em" 
            height="2em" 
            preserveAspectRatio="xMidYMid meet" 
            viewBox="0 0 24 24"
          >
            <path 
              fill="none" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default DownloadButton;