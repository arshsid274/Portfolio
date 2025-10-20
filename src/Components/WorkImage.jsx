import React, { useState, useRef, useEffect } from 'react';
import { CardBody, CardContainer, CardItem } from './3d-card';

const WorkImage = ({ image, alt, project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  const handleViewProject = () => {
    if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  const playVideo = () => {
    if (videoRef.current) {
      // Reset all other videos first
      document.querySelectorAll('video').forEach(video => {
        if (video !== videoRef.current) {
          video.pause();
          video.currentTime = 0;
        }
      });
      
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playVideo();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    pauseVideo();
  };

  const handleTouch = () => {
    playVideo();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          playVideo();
        } else {
          pauseVideo();
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div className="" ref={cardRef}>
      <CardContainer className="inter-var" containerClassName="py-0">
<CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[700px] h-[550px] rounded-xl py-6 px-14 border flex flex-col cursor-pointer">

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
          <CardItem 
            translateZ="100" 
            className="w-full mt-4 flex-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouch}>
            <div className="h-80 w-full rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                className="h-full w-full object-fill group-hover/card:shadow-xl"
                muted
                loop
                playsInline
                preload="metadata">
                <source src={image} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </CardItem>
          <div className="flex justify-between items-end mt-auto min-h-[60px]">
            <CardItem
              translateZ={20}
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white flex-1 max-w-[60%] break-words">
              {project.tools}
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              onClick={handleViewProject}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold transition-all duration-300 flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                isHovered ? 'scale-110 px-6' : ''
              }`}>
              View Project
              <span className={`text-[#40e6b9] text-base font-black transition-all duration-300 ${
                isHovered ? 'translate-x-1 opacity-100' : 'translate-x-0 opacity-0'
              }`}>
                →
              </span>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default WorkImage;
