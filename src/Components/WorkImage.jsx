import React, { useState, useRef, useEffect } from 'react';
import { CardBody, CardContainer, CardItem } from './3d-card';

const WorkImage = ({ image, project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  const handleViewProject = () => {
    const projectUrl = project.link || project.website;
    if (projectUrl) {
      window.open(projectUrl, '_blank');
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
      <CardContainer className="inter-var w-full h-full" containerClassName="py-0 w-full h-full">
        <CardBody
          className={`bg-gray-50 relative group/card dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl py-3 px-4 border flex flex-col cursor-pointer transition-shadow duration-300 ${isInView ? 'dark:shadow-2xl dark:shadow-teal-400/[0.5]' : ''} lg:dark:shadow-none lg:dark:hover:shadow-2xl lg:dark:hover:shadow-teal-400/[0.5]`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouch}>





          <CardItem
            translateZ="50"
            className={`text-lg font-bold flex-shrink-0 transition-all duration-300 ${isHovered || isInView
              ? 'bg-gradient-to-r from-[#00d4aa] to-[#0099cc] bg-clip-text text-transparent'
              : 'text-neutral-600 dark:text-white'
              }`}>
            {project.title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-1 dark:text-neutral-300 flex-shrink-0">
            {project.category}
          </CardItem>
          <CardItem
            translateZ="100"
            className="w-full mt-3 flex-1 min-h-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouch}>
            <div className={`h-full w-full rounded-xl overflow-hidden transition-all duration-300 ${isHovered ? 'lg:p-2' : 'p-0'} flex items-center justify-center`}>
              <video
                ref={videoRef}
                className="w-full h-full object-contain group-hover/card:shadow-xl"
                muted
                loop
                playsInline
                preload="metadata"
                style={{
                  objectFit: 'contain',
                  aspectRatio: '16/9'
                }}>
                <source src={image} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </CardItem>
          <div className="flex justify-between items-center mt-3 flex-shrink-0">

            <CardItem
              translateZ={20}
              as="button"
              onClick={handleViewProject}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`px-3 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold transition-all duration-300 flex items-center gap-2 flex-shrink-0 cursor-pointer ${isHovered ? 'lg:scale-110 lg:px-4' : ''
                }`}>
              View Project
              <span className={`text-[#00d4aa] text-sm font-black transition-all duration-300 ${isHovered ? 'translate-x-1 opacity-100' : 'translate-x-0 opacity-0'
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