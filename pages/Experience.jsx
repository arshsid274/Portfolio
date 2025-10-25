import { useEffect, useState } from "react";
import "./styles/Experience.css";
import { initializeExperienceAnimation } from "../src/utils/experienceAnimation.js";

const Experience = () => {
  const [viewportWidth, setViewportWidth] = useState(1920);

  useEffect(() => {
    const checkScreenSize = () => {
      // Use natural viewport detection for Vercel consistency
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      setViewportWidth(vw);
    };

    checkScreenSize();
    
    const debouncedResize = () => {
      setTimeout(checkScreenSize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', debouncedResize);
    };
  }, []);

  useEffect(() => {
    try {
      initializeExperienceAnimation();
    } catch (error) {
      console.warn('Experience animation failed to initialize:', error);
      // Fallback: show elements immediately
      const timeline = document.querySelector('.career-timeline');
      const boxes = document.querySelectorAll('.career-info-box');
      
      if (timeline) {
        timeline.style.maxHeight = '100%';
        timeline.style.opacity = '1';
      }
      
      boxes.forEach(box => {
        box.style.opacity = '1';
      });
    }
  }, []);

  // Calculate scale based on viewport width with 1920px as reference
  const scale = Math.min(viewportWidth / 1920, 1);

  return (
    <div className="career-section section-container">
      <div 
        className="career-container"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center'
        }}
      >
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Position In Company</h4>
                <h5>Company Name</h5>
              </div>
              <h3>20XX</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              labore sit non ipsum temporibus quidem, deserunt eaque officiis
              mollitia ratione suscipit repellat.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Position In Company</h4>
                <h5>Company Name</h5>
              </div>
              <h3>20XX</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              labore sit non ipsum temporibus quidem, deserunt eaque officiis
              mollitia ratione suscipit repellat.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Position In Company</h4>
                <h5>Company Name</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              labore sit non ipsum temporibus quidem, deserunt eaque officiis
              mollitia ratione suscipit repellat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;