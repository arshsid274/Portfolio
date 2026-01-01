import React, { useEffect, useState, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";
import WorkImage from '../src/Components/WorkImage';

gsap.registerPlugin(ScrollTrigger);

const LazyWorkImage = ({ image, project }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div ref={ref} className="w-full h-full">
      {isInView ? (
        <WorkImage image={image} project={project} />
      ) : (
        <div className="w-full h-full bg-gray-900/50 animate-pulse rounded-xl" />
      )}
    </div>
  );
};

const workData = [
  {
    id: 1,
    title: "Macbook Landing Page Clone ",
    category: "3D Product Website ",
    tools: "React, Three.js, Gsap, Tailwind css",
    image: "https://cdn.jsdelivr.net/gh/arshsid274/Portfolio-assets@main/MacbookLanding.webm",
    website: "https://macbook-landing-page-main.vercel.app/",

  },
  {
    id: 2,
    title: "Apple Website Clone",
    category: "3D Product Website ",
    tools: "React, Three.js, Gsap, Tailwind css",
    image: "https://cdn.jsdelivr.net/gh/arshsid274/Portfolio-assets@main/AppleClone.webm",
    website: "https://apple-website-clone-psi.vercel.app/",

  },
  {
    id: 3,
    title: "Vasl Ai",
    category: "Data Analyst Website ",
    tools: "Vue, Nuxt, PrimeVue,Tailwind css,Headless Ui,HeroIcon",
    image: "https://cdn.jsdelivr.net/gh/arshsid274/Portfolio-assets@main/Vaslai.webm",
    website: "https://www.vaslai.com/",


  },
  {
    id: 4,
    title: "Dirt Off",
    category: "Business management  app for Laundery ",
    tools: "React,Tailwind css,Firebase,Node js ,express js",
    image: "https://cdn.jsdelivr.net/gh/arshsid274/Portfolio-assets@main/DirtOffFullStack.webm",
    link: "https://dirt-off-frontend.vercel.app/"
  },
  {
    id: 5,
    title: "Buddha Avenue",
    category: "Banquet Management app for Hotels ",
    tools: "React,Tailwind css, Axios, DaisyUi,React Router DOM,Node js ,Express js,MongoDB",
    image: "https://cdn.jsdelivr.net/gh/arshsid274/Portfolio-assets@main/BuddhaAvenue.webm",
    link: "https://budha-avenue-frontend.vercel.app/"
  },
  {
    id: 6,
    title: "Dirt Off ",
    category: "Static Website for Laundery ",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://cdn.jsdelivr.net/gh/arshsid274/Portfolio-assets@main/Dirtoffstatic.webm",
    website: "https://www.dirtoff.in/",

  },
  {
    id: 7,
    title: "Shine Travels",
    category: "Static Website for Travel Agency ",
    tools: "HTML ,CSS ,Javascript,jQuery,Gsap,Bootstrap",
    image: "https://cdn.jsdelivr.net/gh/arshsid274/Portfolio-assets@main/ShineInfosoultion.webm",
    website: "https://www.shinetravels.co.in/",

  },
  {
    id: 8,
    title: "Regalia Banquet",
    category: "Static website for Banquet Hall ",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://cdn.jsdelivr.net/gh/arshsid274/Portfolio-assets@main/Regalia.webm",
    website: "https://www.theregaliaresort.in/",

  },
  {
    id: 9,
    title: "Design Orient Arcitect",
    category: "Architecture Portfolio Website ",
    tools: "React, Tailwind css,React Router,FontAwesome ,Lucid React",
    image: "https://cdn.jsdelivr.net/gh/arshsid274/Portfolio-assets@main/DesignOrientArchitect.webm",
    website: "https://www.architectsdo.com/",

  },
  {
    id: 10,
    title: "Ishan Travels",
    category: "static  website for travels agency ",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://cdn.jsdelivr.net/gh/arshsid274/Portfolio-assets@main/IshanTravels.webm",
    website: "https://ishan-travel.vercel.app/",

  },
  {
    id: 11,
    title: "Rajvillas",
    category: "Static website for Hotel ",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://cdn.jsdelivr.net/gh/arshsid274/Portfolio-assets@main/Rajvillas.webm",
    website: "https://rajvillas-final.vercel.app/",

  }
];

const Work = () => {
  const [viewportWidth, setViewportWidth] = useState(1920);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      // Use natural viewport detection like MacbookScroll for Vercel consistency
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




  // Calculate responsive grid layout ensuring at least 3 cards are visible
  const getGridConfig = () => {
    if (viewportWidth >= 1536) return { cols: 3, gap: 8 }; // 2xl: 3 columns
    if (viewportWidth >= 1280) return { cols: 3, gap: 6 }; // xl: 3 columns  
    if (viewportWidth >= 1024) return { cols: 3, gap: 6 }; // lg: 3 columns
    if (viewportWidth >= 768) return { cols: 2, gap: 6 };  // md: 2 columns
    return { cols: 1, gap: 6 }; // sm: 1 column
  };

  const gridConfig = getGridConfig();

  // Remove scaling for Work section to prevent gaps on Vercel
  // const scale = Math.min(viewportWidth / 1920, 1);

  useEffect(() => {
    // Clean up any existing ScrollTriggers for this section only
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger && trigger.trigger.closest('#work')) {
        trigger.kill();
      }
    });

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('#work .work-card');

      cards.forEach((card, index) => {
        // Set initial state without animation
        gsap.set(card, {
          opacity: 0,
          y: 60,
          scale: 0.95
        });

        // Create smooth entrance animation
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: (index % gridConfig.cols) * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 70%",
            toggleActions: "play none none reverse",
            refreshPriority: -1,
            fastScrollEnd: true,
            preventOverlaps: true
          }
        });
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      // Only kill ScrollTriggers for this section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && trigger.trigger.closest('#work')) {
          trigger.kill();
        }
      });
    };
  }, [gridConfig.cols]);

  return (
    <div
      id="work"
      ref={containerRef}
      className="work-section bg-black py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            My <span className="text-[#40e6b9]">Work</span>
          </h2>
          <p className="text-lg text-[#adacac] max-w-2xl mx-auto">
            {/* Scroll down to explore {workData.length} projects showcasing modern web development */}
          </p>
        </div>

        {/* Fixed Grid with Consistent Dimensions */}
        <div
          className="grid mb-12"
          style={{
            gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
            gridAutoRows: 'min-content',
            gap: `${gridConfig.gap * 4}px`,
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          {workData.map((project, index) => (
            <div
              key={project.id}
              className="work-card bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden hover:border-[#40e6b9]/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#40e6b9]/20 flex flex-col"
              style={{
                height: '650px', // Increased card height for better 3D effects
                minHeight: '650px',
                maxHeight: '650px'
              }}
            >
              {/* Project Info - Compact Text Area */}
              <div
                className="work-info flex-shrink-0 px-4 py-2"
                style={{
                  height: '140px',
                  minHeight: '140px',
                  maxHeight: '140px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-2xl font-bold text-[#40e6b9]">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <div className="text-right flex-1 ml-4">
                    <h4
                      className="font-semibold text-white mb-1"
                      style={{
                        fontSize: '14px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '180px'
                      }}
                    >
                      {project.title}
                    </h4>
                    <p
                      className="font-light text-[#adacac] m-0"
                      style={{
                        fontSize: '12px',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: '1.3'
                      }}
                    >
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="text-xs font-medium text-white mb-1">
                    Tools and Features
                  </h4>
                  <p
                    className="font-light text-[#adacac] m-0"
                    style={{
                      fontSize: '10px',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: '1.2',
                      width: '100%'
                    }}
                  >
                    {project.tools}
                  </p>
                </div>
              </div>

              {/* Project Image/Video - Fixed Height Image Area */}
              <div
                className="work-image-container flex-1 p-5"
                style={{
                  width: '100%',
                  height: '510px',
                  minHeight: '510px',
                  maxHeight: '510px',
                  overflow: 'visible', // Allow 3D effects to show
                  backgroundColor: 'transparent'
                }}
              >
                <LazyWorkImage image={project.image} project={project} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;