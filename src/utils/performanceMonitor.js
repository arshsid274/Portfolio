// Performance monitoring utility for mobile optimization
class PerformanceMonitor {
  constructor() {
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    this.memoryWarningThreshold = 0.8; // 80% memory usage
    this.performanceMode = 'auto';
    
    this.init();
  }

  init() {
    if (this.isMobile) {
      this.enableMobileOptimizations();
      this.startMemoryMonitoring();
    }
  }

  enableMobileOptimizations() {
    // Reduce animation frame rate
    if (window.requestAnimationFrame) {
      const originalRAF = window.requestAnimationFrame;
      let lastFrame = 0;
      const targetFPS = this.isLowMemory ? 30 : 45; // Reduced FPS for mobile
      const frameInterval = 1000 / targetFPS;

      window.requestAnimationFrame = (callback) => {
        return originalRAF((timestamp) => {
          if (timestamp - lastFrame >= frameInterval) {
            lastFrame = timestamp;
            callback(timestamp);
          }
        });
      };
    }

    // Disable complex CSS animations on low-end devices
    if (this.isLowMemory) {
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-delay: -0.01ms !important;
          transition-duration: 0.01ms !important;
          transition-delay: -0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  startMemoryMonitoring() {
    if (!('memory' in performance)) return;

    const checkMemory = () => {
      const memory = performance.memory;
      const usedMemoryRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;

      if (usedMemoryRatio > this.memoryWarningThreshold) {
        this.handleMemoryWarning();
      }
    };

    // Check memory every 5 seconds on mobile
    setInterval(checkMemory, 5000);
  }

  handleMemoryWarning() {
    console.warn('High memory usage detected, enabling emergency optimizations');
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }

    // Dispatch custom event for components to react
    window.dispatchEvent(new CustomEvent('memoryWarning', {
      detail: { performanceMode: 'emergency' }
    }));

    // Reduce quality settings
    this.performanceMode = 'emergency';
  }

  shouldUseReducedQuality() {
    return this.isMobile || this.isLowMemory || this.performanceMode === 'emergency';
  }

  getOptimalVideoSettings() {
    if (this.shouldUseReducedQuality()) {
      return {
        preload: 'none',
        quality: 'low',
        autoplay: false,
        poster: true
      };
    }
    
    return {
      preload: 'metadata',
      quality: 'high',
      autoplay: true,
      poster: false
    };
  }

  getOptimal3DSettings() {
    if (this.shouldUseReducedQuality()) {
      return {
        antialias: false,
        shadows: false,
        pixelRatio: Math.min(1.5, window.devicePixelRatio),
        powerPreference: 'low-power'
      };
    }

    return {
      antialias: true,
      shadows: true,
      pixelRatio: Math.min(2, window.devicePixelRatio),
      powerPreference: 'high-performance'
    };
  }
}

// Create global instance
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;