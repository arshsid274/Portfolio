import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Vortex } from "../src/Components/Vortex";

const SkillItem = ({ name, icon, index }) => {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onMouseMove = (e) => {
    if (isMobile) return; // Disable mouse move on mobile

    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const onMouseLeave = () => {
    if (isMobile) return;
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
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
        className="skill-item-container"
      >
        <img
          title={name}
          alt={name}
          className="cursor-pointer object-cover w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 transition-all duration-200 hover:brightness-110"
          src={icon}
        />
      </motion.div>
    </motion.div>
  );
};

const technologies = [
  { name: "React JS", icon: "/tech/reactjs.png" },
  { name: "Next JS", icon: "/tech/nextjs.svg" },
  { name: "Express JS", icon: "/tech/express.png" },
  { name: "JavaScript", icon: "/tech/javascript.png" },
  { name: "TypeScript", icon: "/tech/typescript.png" },
  { name: "Redux Toolkit", icon: "/tech/redux.png" },
  { name: "Tailwind CSS", icon: "/tech/tailwind.png" },
  { name: "Node JS", icon: "/tech/nodejs.png" },
  { name: "MongoDB", icon: "/tech/mongodb.png" },
  { name: "git", icon: "/tech/git.png" },
  { name: "HTML 5", icon: "/tech/html.png" },
  { name: "CSS 3", icon: "/tech/css.png" },
  { name: "Java", icon: "/tech/java.png" },
  { name: "JWT", icon: "/tech/jwt.svg" },
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

  // Calculate scale based on viewport width with 1920px as reference
  const scale = Math.min(viewportWidth / 1920, 1);

  return (
    <section className="min-h-screen overflow-hidden">
      <Vortex
        backgroundColor="#000000"
        baseHue={120}
        particleCount={500}
        baseSpeed={0.1}
        rangeSpeed={1.5}
        baseRadius={3}
        rangeRadius={4}
        rangeY={400}
        containerClassName="min-h-screen"
      >
        <div className="max-w-7xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 place-items-center px-4 sm:px-2">
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
