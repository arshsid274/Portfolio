/**
 * Scroll Animation Diagnostics
 * Helps identify differences in scroll behavior between environments
 */

export class ScrollDiagnostics {
  constructor() {
    this.isVercel = this.detectVercelEnvironment();
    this.scrollData = [];
    this.animationData = [];
    this.isLogging = false;
  }

  detectVercelEnvironment() {
    if (typeof window === 'undefined') return false;
    
    return (
      window.location.hostname.includes('.vercel.app') ||
      window.location.hostname.includes('.vercel.com') ||
      import.meta.env.PROD
    );
  }

  log(message, type = 'info', data = null) {
    const timestamp = performance.now();
    const prefix = `[ScrollDiag ${timestamp.toFixed(2)}ms]`;
    
    const logData = data ? { message, data } : message;
    
    switch (type) {
      case 'error':
        console.error(`${prefix} ❌`, logData);
        break;
      case 'warn':
        console.warn(`${prefix} ⚠️`, logData);
        break;
      case 'success':
        console.log(`${prefix} ✅`, logData);
        break;
      default:
        console.log(`${prefix} ℹ️`, logData);
    }
  }

  startScrollLogging() {
    if (this.isLogging) return;
    
    this.isLogging = true;
    this.log('Starting scroll diagnostics logging');
    
    const logScrollData = () => {
      if (!this.isLogging) return;
      
      const scrollData = {
        timestamp: performance.now(),
        scrollY: window.scrollY,
        scrollX: window.scrollX,
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        documentHeight: document.documentElement.scrollHeight,
        documentWidth: document.documentElement.scrollWidth,
        scrollProgress: window.scrollY / (document.documentElement.scrollHeight - window.innerHeight),
        viewport: {
          top: window.scrollY,
          bottom: window.scrollY + window.innerHeight,
          left: window.scrollX,
          right: window.scrollX + window.innerWidth
        }
      };
      
      this.scrollData.push(scrollData);
      
      // Keep only last 100 entries
      if (this.scrollData.length > 100) {
        this.scrollData.shift();
      }
      
      requestAnimationFrame(logScrollData);
    };
    
    requestAnimationFrame(logScrollData);
  }

  stopScrollLogging() {
    this.isLogging = false;
    this.log('Stopped scroll diagnostics logging');
  }

  logAnimationFrame(componentName, transforms) {
    const frameData = {
      timestamp: performance.now(),
      component: componentName,
      transforms: { ...transforms },
      scrollY: window.scrollY,
      scrollProgress: window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    };
    
    this.animationData.push(frameData);
    
    // Keep only last 50 animation frames
    if (this.animationData.length > 50) {
      this.animationData.shift();
    }
    
    // Log significant changes
    if (this.animationData.length > 1) {
      const prev = this.animationData[this.animationData.length - 2];
      const curr = frameData;
      
      if (Math.abs(curr.scrollProgress - prev.scrollProgress) > 0.01) {
        this.log(`Animation frame: ${componentName}`, 'info', {
          scrollProgress: curr.scrollProgress,
          transforms: curr.transforms
        });
      }
    }
  }

  checkScrollBehavior() {
    this.log('Checking scroll behavior...');
    
    const behavior = {
      smoothScrollSupported: 'scrollBehavior' in document.documentElement.style,
      scrollSnapSupported: 'scrollSnapType' in document.documentElement.style,
      intersectionObserverSupported: !!window.IntersectionObserver,
      resizeObserverSupported: !!window.ResizeObserver,
      requestAnimationFrameSupported: !!window.requestAnimationFrame,
      passiveEventListenerSupported: this.checkPassiveEventListeners(),
      scrollRestoration: history.scrollRestoration
    };
    
    this.log('Scroll behavior check', 'info', behavior);
    return behavior;
  }

  checkPassiveEventListeners() {
    let passiveSupported = false;
    try {
      const options = {
        get passive() {
          passiveSupported = true;
          return false;
        }
      };
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    } catch (err) {
      passiveSupported = false;
    }
    return passiveSupported;
  }

  checkFramerMotionConfig() {
    this.log('Checking Framer Motion configuration...');
    
    // Check if Framer Motion is loaded
    const hasFramerMotion = typeof window !== 'undefined' && 
                           (window.FramerMotion || document.querySelector('[data-framer-motion]'));
    
    const config = {
      hasFramerMotion,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      devicePixelRatio: window.devicePixelRatio,
      hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
      memory: navigator.deviceMemory || 'unknown'
    };
    
    this.log('Framer Motion config', 'info', config);
    return config;
  }

  compareEnvironments() {
    this.log('Comparing environment differences...');
    
    const comparison = {
      environment: this.isVercel ? 'vercel' : 'local',
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio
      },
      document: {
        readyState: document.readyState,
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight
      },
      performance: {
        now: performance.now(),
        timeOrigin: performance.timeOrigin,
        memory: performance.memory ? {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit
        } : null
      },
      css: {
        supportsTransform3d: CSS.supports('transform', 'translateZ(0px)'),
        supportsWillChange: CSS.supports('will-change', 'transform'),
        supportsBackfaceVisibility: CSS.supports('backface-visibility', 'hidden'),
        supportsPerspective: CSS.supports('perspective', '1000px')
      }
    };
    
    this.log('Environment comparison', 'info', comparison);
    return comparison;
  }

  getScrollAnalysis() {
    if (this.scrollData.length === 0) {
      return { message: 'No scroll data collected yet' };
    }
    
    const analysis = {
      totalFrames: this.scrollData.length,
      scrollRange: {
        min: Math.min(...this.scrollData.map(d => d.scrollY)),
        max: Math.max(...this.scrollData.map(d => d.scrollY))
      },
      progressRange: {
        min: Math.min(...this.scrollData.map(d => d.scrollProgress)),
        max: Math.max(...this.scrollData.map(d => d.scrollProgress))
      },
      averageFrameTime: this.scrollData.length > 1 ? 
        (this.scrollData[this.scrollData.length - 1].timestamp - this.scrollData[0].timestamp) / this.scrollData.length : 0,
      lastFrame: this.scrollData[this.scrollData.length - 1]
    };
    
    return analysis;
  }

  getAnimationAnalysis() {
    if (this.animationData.length === 0) {
      return { message: 'No animation data collected yet' };
    }
    
    const analysis = {
      totalFrames: this.animationData.length,
      components: [...new Set(this.animationData.map(d => d.component))],
      transformKeys: this.animationData.length > 0 ? 
        Object.keys(this.animationData[0].transforms || {}) : [],
      lastFrame: this.animationData[this.animationData.length - 1]
    };
    
    return analysis;
  }

  runFullDiagnostic() {
    this.log('Running full scroll diagnostic...');
    
    const diagnostic = {
      environment: this.compareEnvironments(),
      scrollBehavior: this.checkScrollBehavior(),
      framerMotion: this.checkFramerMotionConfig(),
      scrollAnalysis: this.getScrollAnalysis(),
      animationAnalysis: this.getAnimationAnalysis(),
      timestamp: new Date().toISOString()
    };
    
    this.log('Full scroll diagnostic complete', 'success', diagnostic);
    return diagnostic;
  }

  exportData() {
    return {
      scrollData: this.scrollData,
      animationData: this.animationData,
      diagnostic: this.runFullDiagnostic()
    };
  }
}

// Auto-initialize for debugging
if (typeof window !== 'undefined') {
  const scrollDiag = new ScrollDiagnostics();
  window.scrollDiagnostics = scrollDiag;
  
  // Auto-start logging in development or Vercel
  if (import.meta.env.DEV || scrollDiag.isVercel) {
    setTimeout(() => {
      scrollDiag.runFullDiagnostic();
      scrollDiag.startScrollLogging();
    }, 2000);
  }
}

export default ScrollDiagnostics;