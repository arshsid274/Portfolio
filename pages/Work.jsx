import React, { useEffect } from 'react';
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
  useEffect(() => {
    let translateX = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      
      const container = document.querySelector(".work-container");
      if (!container) return;
      
      const rectLeft = container.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement?.getBoundingClientRect().width || 0;
      
      const computedStyle = window.getComputedStyle(box[0]);
      const padding = parseInt(computedStyle.paddingLeft) || 80;
      
      translateX = (rect.width * box.length) - (rectLeft + parentWidth) + padding;
    }

    function setupAnimation() {
      setTranslateX();

      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: 1,
          pin: true,
          id: "work",
          refreshPriority: -1,
          anticipatePin: 1,
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });

      return timeline;
    }

    const timeline = setupAnimation();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
        setupAnimation();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

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
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
