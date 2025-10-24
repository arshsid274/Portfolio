import { useEffect } from "react";
import "./styles/Experience.css";
import { initializeExperienceAnimation } from "../src/utils/experienceAnimation.js";

const Experience = () => {
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
  return (
    <div className="career-section section-container">
      <div className="career-container">
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