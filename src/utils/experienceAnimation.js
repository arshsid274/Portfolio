export function initializeExperienceAnimation() {
  // Check if GSAP is available
  if (typeof window === 'undefined') return;
  
  // Dynamically import GSAP to avoid SSR issues
  import('gsap').then(({ gsap }) => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      
      setupAnimation(gsap, ScrollTrigger);
    }).catch(err => {
      console.warn('ScrollTrigger not available:', err);
      // Fallback to basic CSS animations
      setupFallbackAnimation();
    });
  }).catch(err => {
    console.warn('GSAP not available:', err);
    // Fallback to basic CSS animations
    setupFallbackAnimation();
  });
}

function setupAnimation(gsap, ScrollTrigger) {
    // Clean up any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger && trigger.trigger.classList.contains('career-section')) {
        trigger.kill();
      }
    });

    // Set initial states
    gsap.set(".career-timeline", { 
      maxHeight: "0%",
      opacity: 0
    });
    
    gsap.set(".career-info-box", { 
      opacity: 0,
      y: 30
    });

    // Create smooth bidirectional animations
    gsap.to(".career-timeline", {
      maxHeight: "100%", 
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 85%",
        end: "top 60%",
        toggleActions: "play none none reverse",
        refreshPriority: -1
      }
    });

    // Animate each career box individually for better control
    const boxes = document.querySelectorAll(".career-info-box");
    boxes.forEach((box, index) => {
      gsap.to(box, {
        opacity: 1, 
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: box,
          start: "top 90%",
          end: "top 70%",
          toggleActions: "play none none reverse",
          refreshPriority: -1
        }
      });
    });
}

function setupFallbackAnimation() {
  // Create intersection observer for fallback animation with bidirectional support
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const timeline = entry.target.querySelector('.career-timeline');
      if (timeline) {
        if (entry.isIntersecting) {
          timeline.style.maxHeight = '100%';
          timeline.style.opacity = '1';
          timeline.style.transition = 'all 1.5s ease-out';
        } else {
          timeline.style.maxHeight = '0%';
          timeline.style.opacity = '0';
          timeline.style.transition = 'all 0.8s ease-out';
        }
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -15% 0px'
  });

  const boxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'all 0.6s ease-out';
      } else {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(30px)';
        entry.target.style.transition = 'all 0.4s ease-out';
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -10% 0px'
  });

  const careerSection = document.querySelector('.career-section');
  const boxes = document.querySelectorAll('.career-info-box');
  
  if (careerSection) {
    timelineObserver.observe(careerSection);
  }
  
  boxes.forEach(box => {
    boxObserver.observe(box);
  });
}