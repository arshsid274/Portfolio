import { useEffect, useState, Suspense, lazy } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LetterGlitch from "../src/Components/LetterGlitch.jsx";
import BlurText from "../src/Components/BlurText.jsx";
import DownloadButton from "../src/Components/DownloadButton.jsx";
import ThreeJSErrorBoundary from "../src/Components/ThreeJSErrorBoundary.jsx";
import { ThreeJSLoadingFallback } from "../src/Components/LoadingFallback.jsx";

// Lazy load the 3D component
const MacbookModel = lazy(() => import("../src/Components/MacbookModel.jsx").then(module => ({ default: module.MacbookModel })));

gsap.registerPlugin(ScrollTrigger);

function Home({ onReady }) {
  const [isMobile, setIsMobile] = useState(false);
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);
  const [browserZoom, setBrowserZoom] = useState(1);
  const [effectiveViewport, setEffectiveViewport] = useState({ width: 1920, height: 1080 });

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
      setIsMobile(effectiveWidth < 768);
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
    // Always make content visible immediately - no scroll triggers for Home section
    gsap.set("#Animated-details", { opacity: 1, y: 0 });
    gsap.set("#Mac", { opacity: 1, y: 0 });

    // Optional: Add a subtle fade-in animation without scroll trigger
    if (!isMobile) {
      gsap.fromTo(
        "#Animated-details",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        "#Mac",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [isMobile]);

  // Comprehensive scaling calculation
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

    // Apply bounds and smooth the scale - more conservative for Home
    return Math.max(0.6, Math.min(1.1, combinedScale));
  };

  const scale = calculateDynamicScale();

  // Force Canvas refresh when viewport changes
  const [canvasRefresh, setCanvasRefresh] = useState(0);

  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      setCanvasRefresh(prev => prev + 1);
    }, 300);

    return () => clearTimeout(refreshTimer);
  }, [effectiveViewport, scale]);

  return (
    <div
      id="home-section"
      className="flex justify-center items-center relative bg-black text-white"
      style={{
        minHeight: '100vh',
        height: isMobile ? 'auto' : '100vh',
        overflow: 'visible',
        padding: isMobile ? '20px 0' : '0'
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
        className={`relative z-10 flex justify-center items-center rounded-lg shadow-lg bg-white/90 dark:bg-black/90 ${isMobile
          ? 'w-full max-w-[95vw] flex-col p-4 gap-6'
          : 'w-[1200px] max-w-[90vw] flex-col lg:flex-row p-8'
          }`}
        style={{
          transform: isMobile ? 'none' : `scale(${scale})`,
          transformOrigin: 'center center',
          imageRendering: devicePixelRatio > 1 ? 'crisp-edges' : 'auto'
        }}
      >

        <div
          id="Mac"
          className={`${isMobile ? 'order-1 w-full h-[250px] relative z-20' : 'order-1 lg:order-2 w-[700px] h-[500px] relative z-20'} mb-4 lg:mb-0 flex justify-center items-center overflow-visible rounded-lg`}
          style={{
            minWidth: isMobile ? '100%' : '700px',
            minHeight: isMobile ? '250px' : '500px'
          }}
        >

          <ThreeJSErrorBoundary fallbackMessage="Unable to load the 3D MacBook model. The content is still available.">
            <Suspense fallback={<ThreeJSLoadingFallback />}>
              {isMobile ? (
                <MacbookModel key={`mobile-${canvasRefresh}`} screenImage="/react.svg" scale={[4, 4, 4]} />
              ) : (
                <MacbookModel key={`desktop-${canvasRefresh}`} screenImage="/react.svg" scale={[7, 7, 7]} />
              )}
            </Suspense>
          </ThreeJSErrorBoundary>

        </div>

        <div className={`${isMobile ? 'order-2 w-full relative z-10' : 'order-2 lg:order-1 mx-20 relative z-10'} flex flex-col items-center justify-center gap-4`}>
          <div
            id="Animated-details"
            className={`inline-block text-center justify-center ${isMobile ? 'max-w-full px-2' : 'max-w-lg'}`}
          >
            <BlurText
              text="Hello, I am"
              delay={isMobile ? 0 : 150}
              animateBy="words"
              direction="top"
              className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-white relative z-10`}
            />
            <BlurText
              text="Arsh Siddiqui"
              delay={isMobile ? 0 : 300}
              animateBy="words"
              direction="top"
              className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-[#00d4aa] relative z-10`}
            />
            <BlurText
              text="I Craft Premium Web Experiences"
              delay={isMobile ? 0 : 450}
              animateBy="words"
              direction="top"
              className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-white relative z-10`}
            />
            <BlurText
              text="That Impress."
              delay={isMobile ? 0 : 600}
              animateBy="words"
              direction="top"
              className={`${isMobile ? 'text-3xl' : 'text-6xl'} font-bold text-[#00d4aa] relative z-10`}
            />

            <div className={`flex gap-3 ${isMobile ? 'flex-col mt-6' : 'flex-col sm:flex-row gap-5 mt-10'}`}>
              <DownloadButton
                tooltip="Resume PDF"
                className={isMobile ? 'mobile-size' : 'desktop-size'}
              />
              <button className={`${isMobile ? 'text-lg px-4 py-2' : 'text-xl px-6 py-3'} bg-gray-200 dark:bg-gray-700 rounded-full`}>
                Contact Me
              </button>


              {/* <h1 className="cyan-glow-text">Apple Website Clone</h1>

// Vibrant glow
<h1 className="cyan-glow-vibrant">Apple Website Clone</h1>

// Animated glow
<h1 className="cyan-glow-animated">Apple Website Clone</h1> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
