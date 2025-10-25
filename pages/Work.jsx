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
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);
  const [browserZoom, setBrowserZoom] = useState(1);
  const [effectiveViewport, setEffectiveViewport] = useState({ width: 1920, height: 1080 });
  const timelineRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      // Get actual viewport dimensions
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

      // Detect device pixel ratio for high-DPI displays
      const dpr = window.devicePixelRatio || 1;

      // Calculate browser zoom level (with fallback for edge cases)
      const zoom = window.outerWidth && window.innerWidth
        ? Math.round((window.outerWidth / window.innerWidth) * 100) / 100
        : 1;

      // Calculate effective viewport considering zoom and DPI
      const effectiveWidth = vw * zoom;
      const effectiveHeight = vh * zoom;

      setDevicePixelRatio(dpr);
      setBrowserZoom(zoom);
      setEffectiveViewport({ width: effectiveWidth, height: effectiveHeight });
      setIsMobile(effectiveWidth < 1024);
    };

    const initialTimeout = setTimeout(checkScreenSize, 100);

    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkScreenSize, 200);
    };

    window.addEventListener('resize', debouncedResize, { passive: true });
    window.addEventListener('orientationchange', debouncedResize, { passive: true });

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', debouncedResize);
    };
  }, []);




  // Comprehensive scaling calculation - moved before useEffect
  const calculateDynamicScale = () => {
    // Base reference: 1920x1080 at 1.0 device pixel ratio
    const baseWidth = 1920;
    const baseDPR = 1;

    // Calculate scale factors
    const widthScale = effectiveViewport.width / baseWidth;
    const dprScale = Math.max(0.8, Math.min(1.2, baseDPR / devicePixelRatio));
    const zoomScale = Math.max(0.7, Math.min(1.3, 1 / browserZoom));

    // Combine all factors with weights
    const combinedScale = widthScale * 0.7 + dprScale * 0.2 + zoomScale * 0.1;

    // Apply bounds and smooth the scale
    return Math.max(0.5, Math.min(1.2, combinedScale));
  };

  const scale = calculateDynamicScale();

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
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;

      // Dynamic card dimensions based on scale
      const baseCardWidth = 480;
      const dynamicCardWidth = baseCardWidth * scale;
      const cardPadding = 96 * scale;
      const firstCardMargin = 48 * scale;

      // Effective width per card including padding
      const effectiveCardWidth = dynamicCardWidth + cardPadding;

      // Total width needed for all cards
      const totalCardsWidth = effectiveCardWidth * box.length;
      const totalWidthWithMargin = totalCardsWidth + firstCardMargin;

      // Use effective viewport width
      const currentViewportWidth = effectiveViewport.width;

      // Calculate translateX to show all cards
      translateX = Math.max(0, totalWidthWithMargin - currentViewportWidth + (200 * scale));
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
  }, [isMobile, scale, effectiveViewport]);

  if (isMobile) {
    return (
      <div className="work-section-mobile bg-black min-h-screen py-4 px-2">
        <h2 className="text-3xl font-medium text-center text-white mb-8">
          My <span className="text-[#40e6b9]">Work</span>
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {workData.map((project) => (
            <div key={project.id} className="work-card-mobile">
              <WorkImage image={project.image} project={project} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="work-section relative h-screen box-border will-change-transform overflow-hidden"
      style={{
        // Apply comprehensive scaling that considers all factors
        transform: `scale(${Math.max(0.8, scale)})`,
        transformOrigin: 'center center',
        // Ensure proper overflow handling
        overflowX: 'hidden',
        overflowY: 'hidden',
        // Adjust for different pixel densities
        imageRendering: devicePixelRatio > 1 ? 'crisp-edges' : 'auto'
      }}
    >
      <div className="work-container relative mx-auto flex flex-col h-full max-w-none">
        <h2 className="text-[70px] font-medium text-center text-white py-8 flex-shrink-0">
          My <span className="text-[#40e6b9]">Work</span>
        </h2>
        <div
          className="work-flex w-full flex flex-1 relative will-change-transform"
          style={{
            // Remove overflow properties - let GSAP handle all scrolling
            width: '100vw'
          }}
        >
          {workData.map((project, index) => (
            <div
              className={`work-box px-12 py-6 flex box-border border-r border-[#363636] flex-shrink-0 gap-6 justify-center will-change-transform ${index % 2 === 1 ? 'flex-col-reverse' : 'flex-col'
                } ${index === 0 ? 'ml-12' : ''}`}
              key={project.id}
              style={{
                // Dynamic card dimensions based on comprehensive scaling
                width: `${480 * scale}px`,
                height: '100%',
                minWidth: `${480 * scale}px`,
                maxWidth: `${480 * scale}px`,
                // Remove any transform - let parent handle scaling
                transform: 'none',
                transformOrigin: 'center center'
              }}
            >
              <div className="work-info flex-shrink-0">
                <div className="work-title flex justify-between w-full mb-4">
                  <h3 className="text-[32px] leading-[32px] m-0 font-semibold text-[#40e6b9]">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </h3>
                  <div className="text-right">
                    <h4 className="text-sm font-normal m-0 text-white">
                      {project.title}
                    </h4>
                    <p className="font-light text-[#adacac] m-0 mt-1 text-xs">
                      {project.category}
                    </p>
                  </div>
                </div>
                <h4 className="text-sm font-normal m-0 text-white">Tools and features</h4>
                <p className="font-light text-[#adacac] m-0 mt-1 w-[90%] text-xs">
                  {project.tools}
                </p>
              </div>
              <div
                className="work-image-container flex-1 min-h-0"
                style={{
                  // Let parent scaling handle consistency
                  width: '100%',
                  height: '100%'
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