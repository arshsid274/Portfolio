/**
 * Viewport Fix for Vercel Scaling Issues
 * Applies environment-specific viewport corrections
 */

class ViewportFix {
  constructor() {
    this.isVercel = this.detectVercelEnvironment();
    this.isProduction = import.meta.env.PROD;
    this.applied = false;
  }

  detectVercelEnvironment() {
    if (typeof window === 'undefined') return false;
    
    return (
      window.location.hostname.includes('.vercel.app') ||
      window.location.hostname.includes('.vercel.com')
    );
  }

  log(message, type = 'info') {
    const prefix = '[ViewportFix]';
    
    switch (type) {
      case 'error':
        console.error(`${prefix} ❌`, message);
        break;
      case 'warn':
        console.warn(`${prefix} ⚠️`, message);
        break;
      case 'success':
        console.log(`${prefix} ✅`, message);
        break;
      default:
        console.log(`${prefix} ℹ️`, message);
    }
  }

  getViewportInfo() {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      devicePixelRatio: window.devicePixelRatio,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      zoomLevel: window.outerWidth / window.innerWidth
    };
  }

  applyEnvironmentSpecificFixes() {
    if (this.applied) return;

    const viewport = this.getViewportInfo();
    this.log('Applying viewport fixes', 'info', viewport);

    // Create a style element for fixes
    const style = document.createElement('style');
    style.id = 'viewport-fixes';
    
    let css = `
      /* Base viewport fixes */
      html, body {
        width: 100%;
        max-width: 100vw;
        overflow-x: hidden;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        text-size-adjust: 100%;
      }
      
      /* Prevent zoom issues */
      * {
        box-sizing: border-box;
      }
      
      /* Fix for iOS zoom on input focus */
      input, select, textarea, button {
        font-size: 16px !important;
        transform: scale(1);
      }
    `;

    // Environment-specific fixes
    if (this.isVercel && this.isProduction) {
      // Vercel production fixes
      css += `
        /* Vercel production scaling fix */
        html {
          font-size: 16px !important;
          zoom: 1 !important;
        }
        
        body {
          zoom: 1 !important;
          transform: scale(1) !important;
          transform-origin: top left !important;
        }
        
        /* Ensure consistent text sizing */
        .text-3xl {
          font-size: 1.875rem !important;
        }
        
        .text-2xl {
          font-size: 1.5rem !important;
        }
        
        /* Fix container scaling */
        .container, .max-w-7xl, .max-w-6xl {
          max-width: min(100vw, 1280px) !important;
        }
        
        /* Prevent over-scaling on high DPI */
        @media (-webkit-min-device-pixel-ratio: 2) {
          html {
            font-size: 16px !important;
          }
        }
        
        @media (-webkit-min-device-pixel-ratio: 3) {
          html {
            font-size: 16px !important;
          }
        }
      `;
    } else if (this.isVercel && !this.isProduction) {
      // Vercel dev fixes
      css += `
        /* Vercel dev environment fixes */
        html {
          font-size: 16px;
        }
        
        body {
          zoom: 1;
        }
      `;
    } else {
      // Local development fixes
      css += `
        /* Local development fixes */
        html {
          font-size: 16px;
        }
      `;
    }

    style.textContent = css;
    document.head.appendChild(style);
    
    this.applied = true;
    this.log('Viewport fixes applied successfully', 'success');
  }

  fixViewportMeta() {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) return;

    const currentContent = viewportMeta.content;
    let newContent;

    if (this.isVercel && this.isProduction) {
      // More restrictive viewport for production
      newContent = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no';
    } else {
      // Standard responsive viewport
      newContent = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }

    if (currentContent !== newContent) {
      viewportMeta.content = newContent;
      this.log(`Updated viewport meta: ${newContent}`, 'success');
    }
  }

  preventZoomGestures() {
    // Prevent pinch-to-zoom
    document.addEventListener('gesturestart', (e) => {
      e.preventDefault();
    });

    document.addEventListener('gesturechange', (e) => {
      e.preventDefault();
    });

    document.addEventListener('gestureend', (e) => {
      e.preventDefault();
    });

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }

  monitorViewportChanges() {
    let resizeTimeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const viewport = this.getViewportInfo();
        this.log('Viewport changed', 'info', viewport);
        
        // Reapply fixes if needed
        if (viewport.zoomLevel !== 1) {
          this.log(`Zoom detected: ${viewport.zoomLevel}`, 'warn');
          this.applyEnvironmentSpecificFixes();
        }
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 500);
    });
  }

  initialize() {
    if (typeof window === 'undefined') return;

    this.log(`Initializing viewport fix (${this.isVercel ? 'vercel' : 'local'}, ${this.isProduction ? 'prod' : 'dev'})`);
    
    // Apply fixes immediately
    this.fixViewportMeta();
    this.applyEnvironmentSpecificFixes();
    this.preventZoomGestures();
    this.monitorViewportChanges();
    
    // Apply fixes after DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.applyEnvironmentSpecificFixes(), 100);
      });
    } else {
      setTimeout(() => this.applyEnvironmentSpecificFixes(), 100);
    }
  }
}

// Auto-initialize
const viewportFix = new ViewportFix();
viewportFix.initialize();

// Make available globally for debugging
if (typeof window !== 'undefined') {
  window.viewportFix = viewportFix;
}

export default ViewportFix;