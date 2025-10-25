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
      // Use natural viewport detection like MacbookScroll
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      setViewportWidth(vw);
      setIsMobile(vw < 768);
    };
    
    // Initial check with a small delay to ensure DOM is ready
    setTimeout(checkScreenSize, 100);
    
    const debouncedResize = (() => {
      let timeoutId;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(checkScreenSize, 150);
      };
    })();
    
    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(checkScreenSize, 500);
    });
    
    document.documentElement.classList.add("dark");

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 500);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', checkScreenSize);
      clearTimeout(refreshTimeout);
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
  const scale = Math.min(viewportWidth / 1920, 1);

  return (
    <div className="flex justify-center items-center h-screen relative bg-black text-white">
      <div className="absolute inset-0 z-0" style={{ filter: 'blur(2px)' }}>
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      <div 
        className="relative z-10 my-20 w-[1200px] max-w-[90vw] flex flex-col lg:flex-row justify-center items-center rounded-lg shadow-lg bg-white/90 dark:bg-black/90 p-8"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center'
        }}
      >

       <div
  id="Mac"
  className="order-1 lg:order-2 w-[700px] h-[500px] mb-8 lg:mb-0 lg:mt-[60px] flex justify-center items-center overflow-hidden rounded-lg"
>

  <ThreeJSErrorBoundary fallbackMessage="Unable to load the 3D MacBook model. The content is still available.">
    <Suspense fallback={<ThreeJSLoadingFallback />}>
      {isMobile ? (
        <MacbookModel screenImage="/react.svg" scale={[6, 6, 6]} />
      ) : (
        <MacbookModel screenImage="/react.svg" scale={[7, 7, 7]} />
      )}
    </Suspense>
  </ThreeJSErrorBoundary>

</div>

        <div className="order-2 lg:order-1 flex flex-col items-center justify-center gap-4 mx-20">
          <div
            id="Animated-details"
            className="inline-block max-w-lg text-center justify-center"
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
