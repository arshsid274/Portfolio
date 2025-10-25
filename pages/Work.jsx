import React, { useEffect, useState, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkImage from '../src/Components/WorkImage';

gsap.registerPlugin(ScrollTrigger);

const workData = [
  {
    id: 1,
    title: "Macbook Landing Page Clone ",
    category: "3D Product Website ",
    tools: "React, Three.js, Gsap, Tailwind css",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1761135569/Macbookfinal_updated_ew7hzf.mp4",
    website: "https://apple-website-clone-psi.vercel.app/",

  },
  {
    id: 2,
    title: "Apple Website Clone",
    category: "3D Product Website ",
    tools: "React, Three.js, Gsap, Tailwind css",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945223/AppleClone_zm4el3.mp4",
    website: "https://apple-website-clone-psi.vercel.app/",

  },
  {
    id: 3,
    title: "Vasl Ai",
    category: "Data Analyst Website ",
    tools: "Vue, Nuxt, PrimeVue,Tailwind css,Headless Ui,HeroIcon",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945266/VaslAi_ctcj4d.mp4",
    website: "https://www.vaslai.com/",


  },
  {
    id: 4,
    title: "Dirt Off",
    category: "Business management  app for Laundery ",
    tools: "React,Tailwind css,Firebase,Node js ,express js",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760963986/DirtOffFullStack_wsr9bl.mp4",
    link: "https://dirt-off-frontend.vercel.app/"
  },
  {
    id: 5,
    title: "Buddha Avenue",
    category: "Banquet Management app for Hotels ",
    tools: "React,Tailwind css, Axios, DaisyUi,React Router DOM,Node js ,Express js,MongoDB",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760963994/BuddhaAvenue_fvf4zy.mp4",
    link: "https://budha-avenue-frontend.vercel.app/"
  },
  {
    id: 6,
    title: "Dirt Off ",
    category: "Static Website for Laundery ",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945298/DirtOffStatic_yav2v9.mp4",
    website: "https://www.dirtoff.in/",

  },
  {
    id: 7,
    title: "Shine Travels",
    category: "Static Website for Travel Agency ",
    tools: "HTML ,CSS ,Javascript,jQuery,Gsap,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945296/ShineTravels_du9lst.mp4",
    website: "https://www.shinetravels.co.in/",

  },
  {
    id: 8,
    title: "Regalia Banquet",
    category: "Static website for Banquet Hall ",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945290/RegaliaBanquet_acnza9.mp4",
    website: "https://www.theregaliaresort.in/",

  },
  {
    id: 9,
    title: "Design Orient Arcitect",
    category: "Architecture Portfolio Website ",
    tools: "React, Tailwind css,React Router,FontAwesome ,Lucid React",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945282/DesignOrientArchitect_llaalf.mp4",
    website: "https://www.architectsdo.com/",

  },
  {
    id: 10,
    title: "Ishan Travels",
    category: "static  website for travels agency ",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945247/IshanTravels_ztijt0.mp4",
    website: "https://ishan-travel.vercel.app/",

  },
  {
    id: 11,
    title: "Rajvillas",
    category: "Static website for Hotel ",
    tools: "HTML ,CSS ,Javascript,jQuery,Bootstrap",
    image: "https://res.cloudinary.com/dgpzvkjki/video/upload/v1760945271/RajVillas_tgzs0z.mp4",
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




  // Calculate responsive grid layout with wider cards (fewer columns)
  const getGridConfig = () => {
    if (viewportWidth >= 1536) return { cols: 3, gap: 10 }; // 2xl: 3 columns (wider cards)
    if (viewportWidth >= 1280) return { cols: 2, gap: 8 };  // xl: 2 columns (wider cards)
    if (viewportWidth >= 1024) return { cols: 2, gap: 6 };  // lg: 2 columns (wider cards)
    if (viewportWidth >= 768) return { cols: 2, gap: 6 };   // md: 2 columns
    return { cols: 1, gap: 6 }; // sm: 1 column
  };

  const gridConfig = getGridConfig();

  // Calculate scale based on viewport width with 1920px as reference (like Home.jsx)
  const scale = Math.min(viewportWidth / 1920, 1);

  useEffect(() => {
    // Clean up any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Animate cards from below as they come into view
    const cards = document.querySelectorAll('.work-card');
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 80,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: (index % gridConfig.cols) * 0.1, // Stagger based on column position
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [gridConfig.cols, viewportWidth]);

  return (
    <div
      ref={containerRef}
      className="work-section bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
      <div 
        className="max-w-7xl mx-auto"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center'
        }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            My <span className="text-[#40e6b9]">Work</span>
          </h2>
          <p className="text-lg text-[#adacac] max-w-2xl mx-auto">
            Scroll down to explore {workData.length} projects showcasing modern web development
          </p>
        </div>

        {/* Fixed Grid with Consistent Dimensions */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
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
                height: '600px', // Increased card height for better 3D effects
                minHeight: '600px',
                maxHeight: '600px'
              }}
            >
              {/* Project Info - Fixed Height Text Area */}
              <div
                className="work-info flex-shrink-0 px-6 py-3"
                style={{
                  height: '180px',
                  minHeight: '180px',
                  maxHeight: '180px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-3xl font-bold text-[#40e6b9]">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <div className="text-right flex-1 ml-4">
                    <h4
                      className="font-semibold text-white mb-1"
                      style={{
                        fontSize: '16px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '200px'
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
                  <h4 className="text-sm font-medium text-white mb-1">
                    Tools and Features
                  </h4>
                  <p
                    className="font-light text-[#adacac] m-0"
                    style={{
                      fontSize: '12px',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: '1.3',
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
                  height: '420px',
                  minHeight: '420px',
                  maxHeight: '420px',
                  overflow: 'hidden',
                  backgroundColor: '#1a1a1a'
                }}
              >
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