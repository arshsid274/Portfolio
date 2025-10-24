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
    // Create timeline that plays once when triggered
    const careerTimeline = gsap.timeline({
      paused: true
    });
    
    // Set up the timeline animation sequence
    careerTimeline
      .fromTo(
        ".career-timeline",
        { 
          maxHeight: "0%",
          opacity: 0
        },
        { 
          maxHeight: "100%", 
          opacity: 1,
          duration: 2,
          ease: "power2.out"
        },
        0
      )
      .fromTo(
        ".career-info-box",
        { 
          opacity: 0,
          y: 30
        },
        { 
          opacity: 1, 
          y: 0,
          stagger: 0.3, 
          duration: 0.8,
          ease: "power2.out"
        },
        0.5
      )
      .to(
        ".career-dot",
        {
          animationIterationCount: "1",
          duration: 0.1,
        },
        1.5
      );

    // ScrollTrigger to play animation once when section comes into view
    ScrollTrigger.create({
      trigger: ".career-section",
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        careerTimeline.play();
      },
      onLeave: () => {
        // Optional: Reset animation when leaving section
        // careerTimeline.reverse();
      },
      onEnterBack: () => {
        // Play again when scrolling back up
        if (careerTimeline.progress() === 1) {
          careerTimeline.restart();
        }
      }
    });
}

function setupFallbackAnimation() {
  // Create intersection observer for fallback animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const timeline = entry.target.querySelector('.career-timeline');
        const boxes = entry.target.querySelectorAll('.career-info-box');
        
        if (timeline) {
          timeline.style.maxHeight = '100%';
          timeline.style.opacity = '1';
          timeline.style.transition = 'all 2s ease-out';
        }
        
        boxes.forEach((box, index) => {
          setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
            box.style.transition = 'all 0.8s ease-out';
          }, 500 + (index * 300));
        });
        
        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -20% 0px'
  });

  const careerSection = document.querySelector('.career-section');
  if (careerSection) {
    observer.observe(careerSection);
  }
}