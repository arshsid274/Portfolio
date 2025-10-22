import React from "react";
import { motion } from "motion/react";
import { Vortex } from "../src/Components/Vortex";

const SkillItem = ({ name, icon, index }) => {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const onMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.75 }}
      viewport={{ once: true }}
    >
      <motion.div 
        ref={ref} 
        onMouseMove={onMouseMove} 
        onMouseLeave={onMouseLeave} 
        animate={{ x, y }}
        transition={{
          type: 'spring',
          stiffness: 190,
          damping: 5,
          mass: 0.1,
        }}
      >
        <img 
          title={name}
          alt={name}
          width={85}
          height={85}
          src={icon}
          className="cursor-pointer object-cover"
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
  return (
    <section className="min-h-screen overflow-hidden">
<Vortex
  backgroundColor="#000000"
  baseHue={120}
  particleCount={500}
  baseSpeed={0.1}
  rangeSpeed={1.5}
  baseRadius={5}
  rangeRadius={7}
  rangeY={400}
  containerClassName="h-screen"
>



        <div className="max-w-6xl mx-auto py-20 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="sm:text-[18px] text-[14px] text-gray-300 uppercase tracking-wider">Tech</p>
            <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Skills.</h2>
          </motion.div>

          <div className="flex flex-col gap-10 justify-center items-center">
            <div className="flex flex-wrap gap-10 justify-center">
              {technologies.slice(0, 7).map((technology, index) => (
                <div className="w-28 h-28" key={technology.name}>
                  <SkillItem name={technology.name} icon={technology.icon} index={index} />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-10 justify-center">
              {technologies.slice(7, 12).map((technology, index) => (
                <div className="w-28 h-28" key={technology.name}>
                  <SkillItem name={technology.name} icon={technology.icon} index={index + 7} />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-10 justify-center">
              {technologies.slice(12).map((technology, index) => (
                <div className="w-24 h-24" key={technology.name}>
                  <SkillItem name={technology.name} icon={technology.icon} index={index + 12} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Vortex>
    </section>
  );
}

export default Skills;
