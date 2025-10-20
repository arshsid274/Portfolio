import React, { useEffect, useState, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkImage from '../src/Components/WorkImage';

gsap.registerPlugin(ScrollTrigger);

const workData = [
  {
    id: 1,
    title: "Apple Website Clone",
    category: "3D Product Website (Frontend)",
    tools: "React, Three.js, Gsap, Tailwind css",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945223/AppleClone_zm4el3.mp4",
    website: "https://apple-website-clone-psi.vercel.app/",
   
  },
  {
    id: 2,
    title: "Vasl Ai", 
    category: "Data Analyst Website (Frontend)",
    tools: "Vue, Nuxt, PrimeVue,Tailwind css,Headless Ui,HeroIcon",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945266/VaslAi_ctcj4d.mp4",
    website: "https://www.vaslai.com/",
    

  },
  {
    id: 3,
    title: "Dirt Off",
    category: "Business management  app for Laundery (Full Stack App)", 
    tools: "React,Tailwind css,Firebase,Node js ,express js",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760963986/DirtOffFullStack_wsr9bl.mp4",
    link: "https://dirt-off-frontend.vercel.app/"
  },
  {
    id: 4,
    title: "Buddha Avenue",
    category: "Banquet Management app for Hotels (Full Stack App)",
    tools: "React,Tailwind css, Axios, DaisyUi,React Router DOM,Node js ,Express js,MongoDB", 
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760963994/BuddhaAvenue_fvf4zy.mp4",
    link: "https://budha-avenue-frontend.vercel.app/"
  },
  {
    id: 5,
    title: "Dirt Off ",
    category: "Static Website for Laundery (Frontend)",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945298/DirtOffStatic_yav2v9.mp4",
    website: "https://www.dirtoff.in/",
    
  },
  {
    id: 6,
    title: "Shine Travels",
    category: "Static Website for Travel Agency (Frontend)",
    tools: "HTML ,CSS ,Javascript,jQuery,Gsap,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945296/ShineTravels_du9lst.mp4",
    website: "https://www.shinetravels.co.in/",
    
  },
   {
    id: 7,
    title: "Regalia Banquet",
    category: "Static website for Banquet Hall (Frontend)",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945290/RegaliaBanquet_acnza9.mp4",
    website: "https://www.theregaliaresort.in/",
    
  },
  {
    id: 8,
    title: "Design Orient Arcitect",
    category: "Architecture Portfolio Website (Figma to Code)",
    tools: "React, Tailwind css,React Router,FontAwesome ,Lucid React",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945282/DesignOrientArchitect_llaalf.mp4",
    website: "https://www.architectsdo.com/",
    
  },
    {
    id: 9,
    title: "Ishan Travels",
    category: "static  website for travels agency (Frontend)",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945247/IshanTravels_ztijt0.mp4",
    website: "https://ishan-travel.vercel.app/",
     
  },
    {
    id: 10,
    title: "Rajvillas",
    category: "Static website for Hotel (Frontend)",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945271/RajVillas_tgzs0z.mp4",
    website: "https://rajvillas-final.vercel.app/",
    
  }
];

const Work = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });
  const timelineRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile scroll animations
const cards = document.querySelectorAll('.work-card-mobile');
cards.forEach((card, index) => {
  gsap.fromTo(card,
    {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 60%",
        toggleActions: "play none none reverse",
        markers: false
      }
    }
  );
});


  useEffect(() => {
    if (isMobile) {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Mobile scroll animations
      const cards = document.querySelectorAll('.work-card-mobile');
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
      
      return;
    }

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
  }, [isMobile]);

if (isMobile) {
  return (
   <div className="work-section-mobile bg-black min-h-screen py-4 ">

      <h2 className="text-3xl font-medium text-center text-white mb-8">
        My <span className="text-[#40e6b9]">Work</span>
      </h2>
      <div className="max-w-md mx-auto space-y-6">
        {workData.map((project, index) => (
          <div key={project.id} className="work-card-mobile">
            <WorkImage image={project.image} alt={project.title} project={project} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}


  return (
    <div className="work-section relative h-screen box-border will-change-transform overflow-hidden">
      <div className="work-container relative mx-auto flex flex-col h-full max-w-none">
        <h2 className="mt-[100px] text-[70px] font-medium text-center text-white">
          My <span className="text-[#40e6b9]">Work</span>
        </h2>
        <div className="work-flex w-full flex h-full -ml-20 pr-[120px] relative will-change-transform">
          {workData.map((project, index) => (
            <div 
              className={`work-box p-20 flex w-[800px] box-border border-r border-[#363636] flex-shrink-0 gap-[50px] justify-start will-change-transform ${
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
