import React, { useEffect, useState, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkImage from '../src/Components/WorkImage';

gsap.registerPlugin(ScrollTrigger);

const workData = [
  {
    id: 1,
    title: "Macbook Landing Page Clone Clone",
    category: "3D Product Website (Frontend)",
    tools: "React, Three.js, Gsap, Tailwind css",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1761135569/Macbookfinal_updated_ew7hzf.mp4",
    website: "https://apple-website-clone-psi.vercel.app/",

  },
  {
    id: 2,
    title: "Apple Website Clone",
    category: "3D Product Website (Frontend)",
    tools: "React, Three.js, Gsap, Tailwind css",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945223/AppleClone_zm4el3.mp4",
    website: "https://apple-website-clone-psi.vercel.app/",

  },
  {
    id: 3,
    title: "Vasl Ai",
    category: "Data Analyst Website (Frontend)",
    tools: "Vue, Nuxt, PrimeVue,Tailwind css,Headless Ui,HeroIcon",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945266/VaslAi_ctcj4d.mp4",
    website: "https://www.vaslai.com/",


  },
  {
    id: 4,
    title: "Dirt Off",
    category: "Business management  app for Laundery (Full Stack App)",
    tools: "React,Tailwind css,Firebase,Node js ,express js",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760963986/DirtOffFullStack_wsr9bl.mp4",
    link: "https://dirt-off-frontend.vercel.app/"
  },
  {
    id: 5,
    title: "Buddha Avenue",
    category: "Banquet Management app for Hotels (Full Stack App)",
    tools: "React,Tailwind css, Axios, DaisyUi,React Router DOM,Node js ,Express js,MongoDB",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760963994/BuddhaAvenue_fvf4zy.mp4",
    link: "https://budha-avenue-frontend.vercel.app/"
  },
  {
    id: 6,
    title: "Dirt Off ",
    category: "Static Website for Laundery (Frontend)",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945298/DirtOffStatic_yav2v9.mp4",
    website: "https://www.dirtoff.in/",

  },
  {
    id: 7,
    title: "Shine Travels",
    category: "Static Website for Travel Agency (Frontend)",
    tools: "HTML ,CSS ,Javascript,jQuery,Gsap,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945296/ShineTravels_du9lst.mp4",
    website: "https://www.shinetravels.co.in/",

  },
  {
    id: 8,
    title: "Regalia Banquet",
    category: "Static website for Banquet Hall (Frontend)",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945290/RegaliaBanquet_acnza9.mp4",
    website: "https://www.theregaliaresort.in/",

  },
  {
    id: 9,
    title: "Design Orient Arcitect",
    category: "Architecture Portfolio Website (Figma to Code)",
    tools: "React, Tailwind css,React Router,FontAwesome ,Lucid React",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945282/DesignOrientArchitect_llaalf.mp4",
    website: "https://www.architectsdo.com/",

  },
  {
    id: 10,
    title: "Ishan Travels",
    category: "static  website for travels agency (Frontend)",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945247/IshanTravels_ztijt0.mp4",
    website: "https://ishan-travel.vercel.app/",

  },
  {
    id: 11,
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




  useEffect(() => {
    if (isMobile) {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Mobile scroll animations
      const cards = document.querySelectorAll('.work-card-mobile');
      cards.forEach((card) => {
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
      const boxes = document.getElementsByClassName("work-box");
      if (boxes.length === 0) return;

      const container = document.querySelector(".work-flex");
      if (!container) return;

      // Calculate the total width of all work boxes
      const boxWidth = 600; // Each box is 600px wide
      const totalBoxesWidth = boxWidth * boxes.length;

      // Get the viewport width
      const viewportWidth = window.innerWidth;

      // Calculate how much we need to translate to show all content
      // We want to scroll until the last box is visible
      translateX = Math.max(0, totalBoxesWidth - viewportWidth + 200); // 200px buffer
    }

    function setupAnimation() {
      setTranslateX();

      // Only create animation if we have content to scroll
      if (translateX <= 0) {
        return null;
      }

      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${translateX * 3}`, // Slower, more controlled scroll
          scrub: 1,
          pin: true,
          id: "work",
          refreshPriority: -1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Clamp the progress to prevent over-scrolling
            const clampedProgress = Math.min(self.progress, 1);
            gsap.set(".work-flex", {
              x: -translateX * clampedProgress,
              force3D: true
            });
          }
        },
      });

      return timeline;
    }

    const timeline = setupAnimation();
    timelineRef.current = timeline;

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Clean up existing animation
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
        ScrollTrigger.getById("work")?.kill();

        // Reset transform
        gsap.set(".work-flex", { x: 0 });

        // Create new animation
        const newTimeline = setupAnimation();
        timelineRef.current = newTimeline;
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getById("work")?.kill();
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);

      // Reset transform on cleanup
      gsap.set(".work-flex", { x: 0 });
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="work-section-mobile bg-black min-h-screen py-4 px-2">

        <h2 className="text-3xl font-medium text-center text-white mb-8">
          My <span className="text-[#40e6b9]">Work</span>
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {workData.map((project, index) => (
            <div key={project.id} className="work-card-mobile">
              <WorkImage image={project.image} project={project} />
            </div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="work-section relative h-screen box-border will-change-transform overflow-hidden bg-black">
      <div className="work-container relative mx-auto flex flex-col h-full max-w-none">
        <h2 className="text-[70px] font-medium text-center text-white py-8 flex-shrink-0 z-10">
          My <span className="text-[#40e6b9]">Work</span>
        </h2>
        <div className="work-flex w-full flex flex-1 relative will-change-transform" style={{ transform: 'translateX(0px)' }}>
          {workData.map((project, index) => (
            <div
              className={`work-box px-8 py-6 flex w-[600px] h-full box-border border-r border-[#363636] flex-shrink-0 gap-6 justify-center will-change-transform ${index % 2 === 1 ? 'flex-col-reverse' : 'flex-col'
                } ${index === 0 ? 'pl-12' : ''} ${index === workData.length - 1 ? 'pr-12' : ''}`}
              key={project.id}
            >
              <div className="work-info flex-shrink-0">
                <div className="work-title flex justify-between w-full mb-4">
                  <h3 className="text-[40px] leading-[40px] m-0 font-semibold text-[#40e6b9]">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </h3>
                  <div className="text-right">
                    <h4 className="text-base font-normal m-0 text-white">
                      {project.title}
                    </h4>
                    <p className="font-light text-[#adacac] m-0 mt-1 text-sm">
                      {project.category}
                    </p>
                  </div>
                </div>
                <h4 className="text-base font-normal m-0 text-white">Tools and features</h4>
                <p className="font-light text-[#adacac] m-0 mt-1 w-[90%] text-sm">
                  {project.tools}
                </p>
              </div>
              <div className="work-image-container flex-1 min-h-0">
                <WorkImage image={project.image} project={project} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;