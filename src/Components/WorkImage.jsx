import React, { useState } from 'react';
import { CardBody, CardContainer, CardItem } from './3d-card';

const WorkImage = ({ image, alt, project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleViewProject = () => {
    if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  return (
    <CardContainer className="inter-var" containerClassName="py-0">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white">
          {project.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {project.category}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={image}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={alt}
          />
        </CardItem>
        <div className="flex justify-between items-end mt-20 min-h-[60px]">
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white flex-1 max-w-[60%]">
            {project.tools}
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            onClick={handleViewProject}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold transition-all duration-300 flex items-center gap-2 flex-shrink-0 ${
              isHovered ? 'scale-110 px-6' : ''
            }`}>
            View Project
            <span className={`text-[#40e6b9] text-xl font-black transition-all duration-300 ${
              isHovered ? 'translate-x-1 opacity-100' : 'translate-x-0 opacity-0'
            }`}>
              →
            </span>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default WorkImage;
