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
    // Add a delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      try {
        initializeExperienceAnimation();
      } catch (error) {
        console.warn('Experience animation failed to initialize:', error);
        showContentFallback();
      }
    }, 100);

    // Also set up a fallback timer in case animation doesn't trigger
    const fallbackTimer = setTimeout(() => {
      showContentFallback();
    }, 2000);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Additional useEffect to ensure content is visible on mount
  useEffect(() => {
    const forceVisibility = () => {
      const timeline = document.querySelector('.career-timeline');
      const boxes = document.querySelectorAll('.career-info-box');

      if (timeline && timeline.style.opacity === '0') {
        timeline.style.opacity = '0.8';
        timeline.style.maxHeight = '100%';
      }

      boxes.forEach(box => {
        if (box && box.style.opacity === '0') {
          box.style.opacity = '0.9';
        }
      });
    };

    // Force visibility after a short delay
    const visibilityTimer = setTimeout(forceVisibility, 1000);

    return () => clearTimeout(visibilityTimer);
  }, []);

  const showContentFallback = () => {
    // Ensure content is visible even if animation fails
    const timeline = document.querySelector('.career-timeline');
    const boxes = document.querySelectorAll('.career-info-box');

    if (timeline) {
      timeline.style.maxHeight = '100%';
      timeline.style.opacity = '1';
      timeline.style.transition = 'all 0.5s ease-out';
    }

    boxes.forEach((box, index) => {
      if (box) {
        setTimeout(() => {
          box.style.opacity = '1';
          box.style.transform = 'translateY(0)';
          box.style.transition = 'all 0.3s ease-out';
        }, index * 100);
      }
    });
  };

  // Remove scaling to prevent gaps in Experience section
  // const scale = Math.min(viewportWidth / 1920, 1);

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline" style={{ opacity: 0.3, maxHeight: '50%' }}>
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box" style={{ opacity: 0.8 }}>
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer</h4>
                <h5>Shine Infosolution</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Full-stack Intern at shine Infosolutions — Built responsive UIs, role-based CRUD APIs, optimized static business sites with SEO, integrated APIs, and supported team mentoring & offline Raspberry Pi deployment.
            </p>
          </div>
          <div className="career-info-box" style={{ opacity: 0.8 }}>
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Intern</h4>
                <h5>Vaslai</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
               Front-End Intern at Vasl AI — Designed key website UIs, implemented secure form validation, built dynamic PubChem search with API integration, and merged multi-source REST API data into one seamless app.
            
            </p>
          </div>
          {/* <div className="career-info-box" style={{ opacity: 0.8 }}>
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Experience;