import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Vortex } from "../src/Components/Vortex";

const SkillItem = ({ name, icon, index }) => {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onMouseMove = (e) => {
    if (isMobile) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const onMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    if (isMobile) return;
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const { x, y } = position;
  const isThreeJS = name === "Three Js";

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="p-1"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        animate={isMobile ? {} : { x, y }}
        transition={{
          type: 'spring',
          stiffness: 190,
          damping: 5,
          mass: 0.1,
        }}
        whileHover={isMobile ? { scale: 1.1 } : {}}
        whileTap={isMobile ? { scale: 0.95 } : {}}
        className={`skill-item-container relative rounded-full transition-all duration-300 flex items-center justify-center ${isMobile
          ? 'w-14 h-14 p-2'
          : 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-36 xl:h-36 2xl:w-44 2xl:h-44 3xl:w-52 3xl:h-52 4xl:w-60 4xl:h-60 p-3'
          } ${isHovered ? 'shadow-[0_0_4px_rgba(0,212,170,0.8)]' : ''
          } ${isThreeJS ? 'border-2 border-transparent bg-gradient-to-br from-[#00d4aa] via-[#40e6b9] to-transparent bg-clip-border' : ''}`}
        style={{
          background: isThreeJS ? 'radial-gradient(circle at center, #00d4aa 0%, #40e6b9 18%, transparent 42%)' : 'transparent'
        }}
      >
        {!imageError ? (
          <img
            title={name}
            alt={name}
            className={`cursor-pointer object-contain transition-all duration-300 hover:brightness-110 ${isMobile
              ? 'w-8 h-8'
              : 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 3xl:w-28 3xl:h-28 4xl:w-32 4xl:h-32'
              }`}
            src={icon}
            onError={() => {
              console.warn(`Failed to load icon for ${name}:`, icon);
              setImageError(true);
            }}
            loading="lazy"
          />
        ) : (
          <div className={`text-white font-bold text-center leading-tight ${isMobile
            ? 'text-xs'
            : 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl'
            }`}>
            {name.split(' ').map(word => word.charAt(0)).join('').toUpperCase()}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const technologies = [
  { name: "HTML 5", icon: "/tech/html.png" },
  { name: "CSS 3", icon: "/tech/css.png" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Tailwind CSS", icon: "/tech/tailwind.png" },
  { name: "JavaScript", icon: "/tech/javascript.png" },








  { name: "Node JS", icon: "/tech/nodejs.png" },
  { name: "Express JS", icon: "/tech/express.png" },
  { name: "MongoDB", icon: "/tech/mongodb.png" },
  { name: "React JS", icon: "/tech/reactjs.png" },
  { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },

  { name: "Nextjs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "arduino ", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
  { name: "c++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "ESP32", icon: "https://cdn.worldvectorlogo.com/logos/espressif-systems.svg" },
  { name: "git", icon: "/tech/git.png" },
  { name: "firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },


  { name: "Three Js", icon: "/tech/threejs.svg" },
  { name: "Gsap", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTySE8oQbAHSYkYcjYaIZ9N9-YVArJPyEXc-S43ziHv27qJdBc_2fYIz1_pY76IsGetAc4&usqp=CAU" },
  { name: "JWT", icon: "/tech/jwt.svg" },

  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },

  { name: "Windows", icon: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg" },
  { name: "Mac Os", icon: "https://www.vectorlogo.zone/logos/apple/apple-tile.svg" },
];

function Skills() {
  const [viewportWidth, setViewportWidth] = useState(1920);

  useEffect(() => {
    const checkScreenSize = () => {
      // Use natural viewport detection for Vercel consistency
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

  // Viewport width tracking for potential future use

  return (
    <section id="skills" className="min-h-screen w-full overflow-hidden py-16 border-none outline-none relative">
      <Vortex
        backgroundColor="#000000"
        baseHue={120}
        particleCount={1200}
        baseSpeed={0.3}
        rangeSpeed={2.5}
        baseRadius={3}
        rangeRadius={5}
        rangeY={800}
        containerClassName="h-full w-full absolute inset-0"
      >
        <div className="max-w-7xl mx-auto py-6 sm:py-8 md:py-10 lg:py-12 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 border-none outline-none relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12 md:mb-16 text-center sm:text-left"
          >
            <p className="text-sm sm:text-base md:text-lg text-gray-300 uppercase tracking-wider">Tech</p>
            <h2 className="text-white font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">Skills.</h2>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9 3xl:grid-cols-10 4xl:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-14 xl:gap-18 2xl:gap-22 3xl:gap-26 4xl:gap-32 place-items-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 2xl:px-10 3xl:px-12 4xl:px-16 py-12 pb-20 border-none outline-none">
            {technologies.map((technology, index) => (
              <SkillItem
                key={technology.name}
                name={technology.name}
                icon={technology.icon}
                index={index}
              />
            ))}
          </div>

        </div>
      </Vortex>
    </section>
  );
}

export default Skills;
