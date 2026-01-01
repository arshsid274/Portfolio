import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward, MdCopyright } from "react-icons/md";

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      setIsMobile(vw < 768);
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

  const socialLinks = [
    { name: "Github", url: "https://github.com/arshsid274", icon: MdArrowOutward },
    { name: "Linkedin", url: "www.linkedin.com/in/arsh-sid-b645b62b2", icon: MdArrowOutward },
    // { name: "Twitter", url: "https://x.com", icon: MdArrowOutward },
    // { name: "Instagram", url: "https://www.instagram.com", icon: MdArrowOutward }
  ];



  return (
    <section className="relative bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8" id="contact">
      <div className="max-w-7xl mx-auto">
        <motion.h3 
          className={`gradient-text font-normal uppercase mb-8 sm:mb-12 md:mb-16 ${
            isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Contact
        </motion.h3>

        <div className={`flex flex-col lg:flex-row justify-between ${
          isMobile ? 'gap-8' : 'gap-16 lg:gap-8'
        }`}>
          {/* Contact Info */}
          <motion.div 
            className={`flex flex-col ${isMobile ? 'space-y-6' : 'space-y-8'}`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <h4 className={`text-white font-medium opacity-60 mb-2 ${
                isMobile ? 'text-base' : 'text-lg'
              }`}>Email</h4>
              <motion.p
                whileHover={isMobile ? {} : { scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <a 
                  href="mailto:example@mail.com" 
                  className={`text-white hover:text-[#00d4aa] transition-colors duration-300 ${
                    isMobile ? 'text-lg' : 'text-lg md:text-xl'
                  }`}
                >
                  arshsid274@gmail.com
                </a>
              </motion.p>
            </div>
            
            <div>
              <h4 className={`text-white font-medium opacity-60 mb-2 ${
                isMobile ? 'text-base' : 'text-lg'
              }`}>Phone</h4>
              <div className="flex flex-col space-y-1">
  <motion.p
    whileHover={isMobile ? {} : { scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <a 
      href="tel:+917380627426" 
      className={`text-white hover:text-[#00d4aa] transition-colors duration-300 ${
        isMobile ? 'text-lg' : 'text-lg md:text-xl'
      }`}
    >
      +91 7380627426
    </a>
  </motion.p>
  <motion.p
    whileHover={isMobile ? {} : { scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <a 
      href="tel:+971XXXXXXXXX" 
      className={`text-white hover:text-[#00d4aa] transition-colors duration-300 ${
        isMobile ? 'text-lg' : 'text-lg md:text-xl'
      }`}
    >
      +971 547172956
    </a>
  </motion.p>
</div>

            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className={`flex flex-col ${isMobile ? 'space-y-3' : 'space-y-4'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className={`text-white font-medium opacity-60 mb-2 ${
              isMobile ? 'text-base' : 'text-lg'
            }`}>Social</h4>
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white border-b border-gray-400 pb-1 flex items-center gap-2 hover:text-[#00d4aa] hover:border-[#00d4aa] transition-all duration-300 w-fit ${
                  isMobile ? 'text-lg' : 'text-xl lg:text-2xl'
                }`}
                whileHover={isMobile ? { scale: 1.05 } : { x: 10 }}
                whileTap={isMobile ? { scale: 0.95 } : {}}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {link.name} <MdArrowOutward className={isMobile ? 'text-base' : 'text-lg'} />
              </motion.a>
            ))}
          </motion.div>

          {/* Credits */}
          <motion.div 
            className={`flex flex-col ${isMobile ? 'justify-start mt-4' : 'justify-end'}`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className={`text-white font-normal mb-4 ${
                isMobile ? 'text-base' : 'text-lg md:text-xl'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Designed and Developed <br /> 
              with <span className="text-[#00d4aa]">❤</span>  by <span className="text-[#00d4aa]">Mohammad Arsh</span>
            </motion.h2>
            
            <motion.h5 
              className={`text-white font-medium flex items-center gap-2 opacity-50 ${
                isMobile ? 'text-base' : 'text-lg'
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              <MdCopyright className={isMobile ? 'text-sm' : 'text-base'} /> 2025
            </motion.h5>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
