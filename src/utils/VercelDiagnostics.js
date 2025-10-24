/**
 * Vercel-specific Diagnostics
 * Helps identify differences between local and Vercel environments
 */

export class VercelDiagnostics {
  constructor() {
    this.isVercel = this.detectVercelEnvironment();
    this.diagnostics = [];
  }

  detectVercelEnvironment() {
    if (typeof window === 'undefined') return false;
    
    return (
      window.location.hostname.includes('.vercel.app') ||
      window.location.hostname.includes('.vercel.com') ||
      window.location.hostname.includes('localhost:3000') // Vercel dev
    );
  }

  log(message, type = 'info', data = null) {
    const timestamp = new Date().toISOString();
    const prefix = `[VercelDiag ${timestamp}]`;
    
    const logEntry = { message, type, data, timestamp };
    this.diagnostics.push(logEntry);
    
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

  async checkAssetLoading() {
    this.log('Checking critical asset loading...');
    
    const criticalAssets = [
      'https://res.cloudinary.com/dgpzvkjki/video/upload/v1760959660/src2_cmjedk.mp4',
      'https://res.cloudinary.com/dgpzvkjki/video/upload/v1760972230/Mobile_view_iwhclu.mp4'
    ];

    const results = [];
    
    for (const asset of criticalAssets) {
      try {
        const response = await fetch(asset, { method: 'HEAD' });
        if (response.ok) {
          this.log(`Asset loaded successfully: ${asset}`, 'success');
          results.push({ asset, status: 'success' });
        } else {
          this.log(`Asset failed to load: ${asset} (${response.status})`, 'error');
          results.push({ asset, status: 'failed', error: response.status });
        }
      } catch (error) {
        this.log(`Asset error: ${asset} - ${error.message}`, 'error');
        results.push({ asset, status: 'error', error: error.message });
      }
    }
    
    return results;
  }

  checkAnimationSupport() {
    this.log('Checking animation support...');
    
    const support = {
      requestAnimationFrame: !!window.requestAnimationFrame,
      intersectionObserver: !!window.IntersectionObserver,
      resizeObserver: !!window.ResizeObserver,
      webGL: !!window.WebGLRenderingContext,
      webGL2: !!window.WebGL2RenderingContext,
      cssTransforms: CSS.supports('transform', 'translateZ(0px)'),
      cssAnimations: CSS.supports('animation-name', 'test')
    };

    this.log('Animation support check', 'info', support);
    
    const unsupported = Object.entries(support)
      .filter(([key, value]) => !value)
      .map(([key]) => key);
    
    if (unsupported.length > 0) {
      this.log(`Unsupported features: ${unsupported.join(', ')}`, 'warn');
    } else {
      this.log('All animation features supported', 'success');
    }
    
    return support;
  }

  checkViewportStability() {
    this.log('Checking viewport stability...');
    
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
      isTouch: 'ontouchstart' in window
    };

    this.log('Viewport info', 'info', viewport);
    
    // Check for common mobile viewport issues
    if (viewport.isTouch && viewport.height < 600) {
      this.log('Small mobile viewport detected - may affect animations', 'warn');
    }
    
    if (viewport.devicePixelRatio > 2) {
      this.log('High DPI display detected - may affect performance', 'info');
    }
    
    return viewport;
  }

  checkNetworkConditions() {
    this.log('Checking network conditions...');
    
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
      const networkInfo = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
      
      this.log('Network info', 'info', networkInfo);
      
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        this.log('Slow network detected - may affect asset loading', 'warn');
      }
      
      if (connection.saveData) {
        this.log('Data saver mode detected', 'warn');
      }
      
      return networkInfo;
    } else {
      this.log('Network API not supported', 'warn');
      return null;
    }
  }

  async runFullDiagnostic() {
    this.log(`Starting Vercel diagnostic (isVercel: ${this.isVercel})...`);
    
    const results = {
      environment: {
        isVercel: this.isVercel,
        hostname: window.location.hostname,
        port: window.location.port,
        protocol: window.location.protocol,
        userAgent: navigator.userAgent
      },
      assets: await this.checkAssetLoading(),
      animations: this.checkAnimationSupport(),
      viewport: this.checkViewportStability(),
      network: this.checkNetworkConditions(),
      timestamp: new Date().toISOString()
    };
    
    this.log('Full diagnostic complete', 'success', results);
    
    // Check for potential issues
    const issues = [];
    
    if (results.assets.some(a => a.status !== 'success')) {
      issues.push('Asset loading issues detected');
    }
    
    if (!results.animations.webGL) {
      issues.push('WebGL not supported - 3D animations may fail');
    }
    
    if (results.network && results.network.effectiveType.includes('2g')) {
      issues.push('Slow network detected');
    }
    
    if (issues.length > 0) {
      this.log(`Potential issues found: ${issues.join(', ')}`, 'warn');
    } else {
      this.log('No issues detected', 'success');
    }
    
    return results;
  }

  getDiagnosticHistory() {
    return this.diagnostics;
  }
}

// Auto-run diagnostics in development or Vercel environment
if (import.meta.env.DEV || (typeof window !== 'undefined' && window.location.hostname.includes('vercel'))) {
  const vercelDiag = new VercelDiagnostics();
  
  // Run diagnostics after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => vercelDiag.runFullDiagnostic(), 1000);
    });
  } else {
    setTimeout(() => vercelDiag.runFullDiagnostic(), 1000);
  }
  
  // Make it available globally for debugging
  window.vercelDiagnostics = vercelDiag;
}

export default VercelDiagnostics;