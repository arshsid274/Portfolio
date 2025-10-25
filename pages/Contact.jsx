import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward, MdCopyright } from "react-icons/md";

const Contact = () => {
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

  const socialLinks = [
    { name: "Github", url: "https://github.com", icon: MdArrowOutward },
    { name: "Linkedin", url: "https://www.linkedin.com", icon: MdArrowOutward },
    { name: "Twitter", url: "https://x.com", icon: MdArrowOutward },
    { name: "Instagram", url: "https://www.instagram.com", icon: MdArrowOutward }
  ];

  return (
    <section className="relative bg-black py-20 px-4" id="contact">
      <div 
        className="max-w-7xl mx-auto"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center'
        }}
      >
        <motion.h3 
          className="text-4xl md:text-5xl lg:text-6xl font-normal uppercase mb-16"
          style={{
            background: 'linear-gradient(0deg, #00d4aa, #ffffff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent'
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Contact
        </motion.h3>

        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">
          {/* Contact Info */}
          <motion.div 
            className="flex flex-col space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <h4 className="text-white font-medium opacity-60 mb-2">Email</h4>
              <motion.p
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <a 
                  href="mailto:example@mail.com" 
                  className="text-white text-lg hover:text-[#00d4aa] transition-colors duration-300"
                >
                  example@mail.com
                </a>
              </motion.p>
            </div>
            
            <div>
              <h4 className="text-white font-medium opacity-60 mb-2">Phone</h4>
              <motion.p
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <a 
                  href="tel:+9199999999" 
                  className="text-white text-lg hover:text-[#00d4aa] transition-colors duration-300"
                >
                  +91 99999 99999
                </a>
              </motion.p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-medium opacity-60 mb-2">Social</h4>
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xl lg:text-2xl border-b border-gray-400 pb-1 flex items-center gap-2 hover:text-purple-400 hover:border-purple-400 transition-all duration-300 w-fit"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {link.name} <MdArrowOutward />
              </motion.a>
            ))}
          </motion.div>

          {/* Credits */}
          <motion.div 
            className="flex flex-col justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-white text-lg md:text-xl font-normal mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Designed and Developed <br /> 
              by <span className="text-purple-400">Your Name</span>
            </motion.h2>
            
            <motion.h5 
              className="text-white text-lg font-medium flex items-center gap-2 opacity-50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              <MdCopyright /> 2024
            </motion.h5>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
