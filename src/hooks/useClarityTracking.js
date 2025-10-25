import { useEffect } from 'react';
import clarityService from '../services/clarity.js';

export const useClarityTracking = () => {
  // Track page views
  const trackPageView = (pageName) => {
    clarityService.event(`page_view_${pageName}`);
    clarityService.setTag('current_page', pageName);
  };

  // Track section views (for scroll-based sections)
  const trackSectionView = (sectionName) => {
    clarityService.event(`section_view_${sectionName}`);
    clarityService.setTag('current_section', sectionName);
  };

  // Track user interactions
  const trackInteraction = (interactionType, element) => {
    clarityService.event(`interaction_${interactionType}_${element}`);
    clarityService.setTag('last_interaction', `${interactionType}_${element}`);
  };

  // Track 3D model interactions
  const track3DInteraction = (modelName, action) => {
    clarityService.event(`3d_${action}_${modelName}`);
    clarityService.setTag('3d_interaction', `${action}_${modelName}`);
    clarityService.upgrade('3d_interaction'); // Prioritize 3D interactions
  };

  // Track contact form interactions
  const trackContactInteraction = (action) => {
    clarityService.event(`contact_${action}`);
    clarityService.setTag('contact_interaction', action);
    clarityService.upgrade('contact_interaction');
  };

  // Track skill hover/click interactions
  const trackSkillInteraction = (skillName, action) => {
    clarityService.event(`skill_${action}_${skillName}`);
    clarityService.setTag('skill_interaction', `${action}_${skillName}`);
  };

  return {
    trackPageView,
    trackSectionView,
    trackInteraction,
    track3DInteraction,
    trackContactInteraction,
    trackSkillInteraction
  };
};

// Hook for tracking scroll behavior
export const useScrollTracking = () => {
  useEffect(() => {
    let scrollTimeout;
    let lastScrollY = 0;
    let scrollDirection = 'down';

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        scrollDirection = 'down';
      } else {
        scrollDirection = 'up';
      }
      
      lastScrollY = currentScrollY;

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Set new timeout to track scroll end
      scrollTimeout = setTimeout(() => {
        const scrollPercentage = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );

        clarityService.event(`scroll_${scrollDirection}_${scrollPercentage}percent`);
        clarityService.setTag('scroll_depth', `${scrollPercentage}%`);
        clarityService.setTag('scroll_direction', scrollDirection);

        // Track deep engagement (scrolled more than 75%)
        if (scrollPercentage > 75) {
          clarityService.upgrade('deep_engagement');
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
};