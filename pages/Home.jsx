import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MacbookModel } from "../src/Components/MacbookModel.jsx";
import LetterGlitch from "../src/Components/LetterGlitch.jsx";
import BlurText from "../src/Components/BlurText.jsx";
import ResumeButton from "../src/Components/ResumeButton.jsx";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    document.documentElement.classList.add("dark");

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 500);

    return () => {
      window.removeEventListener('resize', checkMobile);
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



  return (
    <div className="flex justify-center items-center h-screen relative bg-black text-white">
      <div className="absolute inset-0 z-0">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      <div className="relative z-10 my-4 sm:my-8 md:my-12 lg:my-16 xl:my-20 min-w-[30%] sm:min-w-[85%] md:min-w-[80%] xl:min-w-[50%] 2xl:min-w-[60%] max-w-[90vw] flex flex-col lg:flex-row justify-center items-center rounded-lg shadow-lg bg-white/90 dark:bg-black/90 p-4 sm:p-6 md:p-8">

       <div
  id="Mac"
  className="order-1 lg:order-2 w-full lg:w-[600px] xl:w-[700px] 2xl:w-[800px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] mb-8 lg:mb-0 lg:mt-[60px] flex justify-center items-center overflow-hidden rounded-lg"
>

  {isMobile ? (
  <MacbookModel screenImage="/react.svg" scale={[6, 6, 6]} />
) : (
  <MacbookModel screenImage="/react.svg" scale={[7, 7, 7]} />
)}

</div>

        <div className="order-2 lg:order-1 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 mx-4 sm:mx-8 md:mx-12 lg:mx-20">
          <div
            id="Animated-details"
            className="inline-block max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center justify-center"
          >
            <BlurText
              text="Hello, I am"
              delay={isMobile ? 0 : 150}
              animateBy="words"
              direction="top"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold"
            />
            <BlurText
              text="Arsh Siddiqui"
              delay={isMobile ? 0 : 300}
              animateBy="words"
              direction="top"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#40e6b9]"
            />
            <BlurText
              text="I Craft Premium Web Experiences"
              delay={isMobile ? 0 : 450}
              animateBy="words"
              direction="top"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold"
            />
            <BlurText
              text="That Impress."
              delay={isMobile ? 0 : 600}
              animateBy="words"
              direction="top"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#40e6b9]"
            />

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8 md:mt-10">
              <ResumeButton
                text="Resume"
                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 xl:py-3.5"
                iconColor="#333"
              />
              <button className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 xl:py-3.5 bg-gray-200 dark:bg-gray-700 rounded-full">
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
