import React, { useEffect, useState, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkImage from '../src/Components/WorkImage';

gsap.registerPlugin(ScrollTrigger);

const workData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    tools: "React, Node.js, MongoDB, Stripe",
    image: "/assets/Design Orient.png"
  },
  {
    id: 2,
    title: "Portfolio Website", 
    category: "Frontend",
    tools: "React, Three.js, GSAP, Tailwind",
    image: "/assets/Design Orient.png"
  },
  {
    id: 3,
    title: "Mobile App",
    category: "React Native", 
    tools: "React Native, Firebase, Redux",
    image: "/assets/Design Orient.png"
  },
  {
    id: 4,
    title: "Dashboard Analytics",
    category: "Data Visualization",
    tools: "D3.js, React, Chart.js", 
    image: "/assets/Design Orient.png"
  },
  {
    id: 5,
    title: "AI Chatbot",
    category: "Machine Learning",
    tools: "Python, TensorFlow, Flask",
    image: "/assets/Design Orient.png"
  },
  {
    id: 6,
    title: "Blockchain DApp",
    category: "Web3",
    tools: "Solidity, Web3.js, React",
    image: "/assets/Design Orient.png"
  }
];

const Work = () => {
  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(width <= 1024 || isTouchDevice); // Increased breakpoint for tablets/phones
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      return;
    }

    const setupAnimation = () => {
      const workSection = document.querySelector(".work-section");
      const workFlex = document.querySelector(".work-flex");
      const workBoxes = document.querySelectorAll(".work-box");
      
      if (!workSection || !workFlex || workBoxes.length === 0) return;

      const totalWidth = Array.from(workBoxes).reduce((acc, box) => acc + box.offsetWidth, 0);
      const containerWidth = workSection.offsetWidth;
      const translateX = totalWidth - containerWidth + 200;

      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: workSection,
          start: "top top",
          end: `+=${translateX}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timelineRef.current.to(workFlex, {
        x: -translateX,
        ease: "none",
      });
    };

    const timer = setTimeout(setupAnimation, 100);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="work-section-mobile relative min-h-screen py-8 px-4 bg-black">
        <h2 className="text-3xl md:text-4xl font-medium text-center text-white mb-8">
          My <span className="text-[#40e6b9]">Work</span>
        </h2>
        <div className="max-w-sm mx-auto space-y-6">
          {workData.map((project, index) => (
            <div key={project.id} className="bg-gray-900/80 rounded-lg p-4 border border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xl font-semibold text-[#40e6b9]">0{index + 1}</span>
                <div className="text-right flex-1 ml-4">
                  <h4 className="text-base font-medium text-white leading-tight">{project.title}</h4>
                  <p className="text-xs text-[#adacac] mt-1">{project.category}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <WorkImage image={project.image} alt={project.title} project={project} index={index} />
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-white mb-1">Tools & Features</h4>
                <p className="text-xs text-[#adacac] leading-relaxed">{project.tools}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="work-section relative h-screen box-border will-change-transform overflow-hidden">
      <div className="work-container relative mx-auto flex flex-col h-full max-w-none">
        <h2 className="mt-[100px] text-[70px] font-medium text-center text-white">
          My <span className="text-[#40e6b9]">Work</span>
        </h2>
        <div className="work-flex w-full flex h-full -ml-20 pr-[120px] relative will-change-transform">
          {workData.map((project, index) => (
            <div 
              className={`work-box p-20 flex w-[600px] box-border border-r border-[#363636] flex-shrink-0 gap-[50px] justify-start will-change-transform ${
                index % 2 === 1 ? 'flex-col-reverse' : 'flex-col'
              } ${index === 0 ? 'ml-20' : ''}`} 
              key={project.id}
            >
              <div className="work-info">
                <div className="work-title flex justify-between w-full mb-5">
                  <h3 className="text-[50px] leading-[50px] m-0 font-semibold text-[#40e6b9]">
                    0{index + 1}
                  </h3>
                  <div className="text-right">
                    <h4 className="text-lg font-normal m-0 text-white">
                      {project.title}
                    </h4>
                    <p className="font-light text-[#adacac] m-0 mt-1">
                      {project.category}
                    </p>
                  </div>
                </div>
                <h4 className="text-lg font-normal m-0 text-white">Tools and features</h4>
                <p className="font-light text-[#adacac] m-0 mt-1 w-[90%]">
                  {project.tools}
                </p>
              </div>
              <WorkImage image={project.image} alt={project.title} project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
