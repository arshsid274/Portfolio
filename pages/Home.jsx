import { useEffect, useState, Suspense, lazy } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LetterGlitch from "../src/Components/LetterGlitch.jsx";
import BlurText from "../src/Components/BlurText.jsx";
import ResumeButton from "../src/Components/ResumeButton.jsx";
import ThreeJSErrorBoundary from "../src/Components/ThreeJSErrorBoundary.jsx";
import { ThreeJSLoadingFallback } from "../src/Components/LoadingFallback.jsx";

// Lazy load the 3D component
const MacbookModel = lazy(() => import("../src/Components/MacbookModel.jsx").then(module => ({ default: module.MacbookModel })));

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1920);

  useEffect(() => {
    const checkScreenSize = () => {
      // Use consistent viewport detection for Vercel compatibility
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      setViewportWidth(vw);
      setIsMobile(vw < 768);
    };
    
    // Initial check with delay to ensure DOM is ready
    const initialTimeout = setTimeout(checkScreenSize, 100);
    
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkScreenSize, 200); // Increased debounce for stability
    };
    
    let orientationTimeout;
    const handleOrientationChange = () => {
      clearTimeout(orientationTimeout);
      orientationTimeout = setTimeout(checkScreenSize, 600);
    };
    
    window.addEventListener('resize', debouncedResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
    
    document.documentElement.classList.add("dark");

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 800); // Increased timeout for Vercel

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(resizeTimeout);
      clearTimeout(orientationTimeout);
      clearTimeout(refreshTimeout);
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

useGSAP(() => {
  if (!isMobile) {
    gsap.fromTo(
      "#Animated-details",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#Animated-details",
          toggleActions: "play none none reverse",
          start: "top 80%",
          end: "bottom 20%",
          refreshPriority: -1,
        },
      }
    );

    gsap.fromTo(
      "#Mac",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#Mac",
          toggleActions: "play none none reverse",
          start: "top 80%",
          end: "bottom 20%",
          refreshPriority: -1,
        },
      }
    );
  } else {
    gsap.set("#Animated-details", { opacity: 1, y: 0 });
    gsap.set("#Mac", { opacity: 1, y: 0 });
  }
}, [isMobile]);

  // Calculate scale based on viewport width with 1920px as reference
  // Ensure minimum scale for better Vercel compatibility
  const scale = Math.max(Math.min(viewportWidth / 1920, 1), 0.6);
  
  // Calculate MacBook scale based on viewport for consistent sizing
  const macbookScale = isMobile 
    ? Math.max(4, Math.min(viewportWidth / 200, 6)) 
    : Math.max(5, Math.min(viewportWidth / 250, 8));

  return (
    <div 
      className="flex justify-center items-center relative bg-black text-white"
      style={{ 
        minHeight: '100vh',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <div className="absolute inset-0 z-0" style={{ filter: 'blur(2px)' }}>
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      <div 
        className="relative z-10 flex flex-col lg:flex-row justify-center items-center rounded-lg shadow-lg bg-white/90 dark:bg-black/90 p-8"
        style={{
          width: isMobile ? '95vw' : Math.min(1200 * scale, viewportWidth * 0.9),
          maxWidth: '95vw',
          transform: `scale(${Math.min(scale, 1)})`,
          transformOrigin: 'center center'
        }}
      >

       <div
  id="Mac"
  className="order-1 lg:order-2 mb-8 lg:mb-0 flex justify-center items-center overflow-hidden rounded-lg relative"
  style={{
    width: isMobile ? '100%' : '700px',
    height: isMobile ? '300px' : '500px',
    maxWidth: '90vw'
  }}
>
  <div 
    className="absolute inset-0 flex justify-center items-center"
    style={{
      transform: `scale(${scale})`,
      transformOrigin: 'center center'
    }}
  >
    <ThreeJSErrorBoundary fallbackMessage="Unable to load the 3D MacBook model. The content is still available.">
      <Suspense fallback={<ThreeJSLoadingFallback />}>
        <MacbookModel 
          screenImage="/react.svg" 
          scale={[macbookScale, macbookScale, macbookScale]} 
        />
      </Suspense>
    </ThreeJSErrorBoundary>
  </div>
</div>

        <div 
          className="order-2 lg:order-1 flex flex-col items-center justify-center gap-4"
          style={{
            marginLeft: isMobile ? '1rem' : '5rem',
            marginRight: isMobile ? '1rem' : '5rem'
          }}
        >
          <div
            id="Animated-details"
            className="inline-block text-center justify-center"
            style={{
              maxWidth: isMobile ? '90vw' : '500px'
            }}
          >
            <BlurText
              text="Hello, I am"
              delay={isMobile ? 0 : 150}
              animateBy="words"
              direction="top"
              className="text-6xl font-bold"
            />
            <BlurText
              text="Arsh Siddiqui"
              delay={isMobile ? 0 : 300}
              animateBy="words"
              direction="top"
              className="text-6xl font-bold text-[#40e6b9]"
            />
            <BlurText
              text="I Craft Premium Web Experiences"
              delay={isMobile ? 0 : 450}
              animateBy="words"
              direction="top"
              className="text-6xl font-bold"
            />
            <BlurText
              text="That Impress."
              delay={isMobile ? 0 : 600}
              animateBy="words"
              direction="top"
              className="text-6xl font-bold text-[#40e6b9]"
            />

            <div className="flex flex-col sm:flex-row gap-5 mt-10">
              <ResumeButton
                text="Resume"
                className="text-xl px-6 py-3"
                iconColor="#333"
              />
              <button className="text-xl px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
