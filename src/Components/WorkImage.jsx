import React from 'react';

const WorkImage = ({ image, alt = "" }) => {
  return (
    <div className="flex w-full justify-center">
      <div className="relative">
        <img 
          src={image} 
          alt={alt} 
          className="max-w-full max-h-[350px] rounded-lg"
        />
      </div>
    </div>
  );
};

export default WorkImage;
