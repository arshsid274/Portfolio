/**
 * Viewport Diagnostics
 * Helps identify and fix viewport scaling issues between environments
 */

export class ViewportDiagnostics {
  constructor() {
    this.isVercel = this.detectVercelEnvironment();
    this.initialViewport = this.getViewportInfo();
    this.viewportHistory = [];
  }

  detectVercelEnvironment() {
    if (typeof window === 'undefined') return false;
    
    return (
      window.location.hostname.includes('.vercel.app') ||
      window.location.hostname.includes('.vercel.com')
    );
  }

  log(message, type = 'info', data = null) {
    const timestamp = new Date().toISOString();
    const prefix = `[ViewportDiag ${timestamp}]`;
    
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

  getViewportInfo() {
    if (typeof window === 'undefined') return null;

    return {
      // Window dimensions
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      
      // Screen dimensions
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      
      // Device info
      devicePixelRatio: window.devicePixelRatio,
      orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
      
      // Viewport meta tag info
      viewportMeta: document.querySelector('meta[name="viewport"]')?.content || 'not found',
      
      // Document dimensions
      documentWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
      
      // Computed styles
      htmlFontSize: parseFloat(getComputedStyle(document.documentElement).fontSize),
      bodyFontSize: parseFloat(getComputedStyle(document.body).fontSize),
      
      // Zoom detection
      zoomLevel: this.detectZoomLevel(),
      
      timestamp: Date.now()
    };
  }

  detectZoomLevel() {
    // Multiple methods to detect zoom
    const methods = {
      devicePixelRatio: window.devicePixelRatio,
      screenVsWindow: window.screen.width / window.innerWidth,
      outerVsInner: window.outerWidth / window.innerWidth
    };
    
    // Most reliable method for zoom detection
    const zoom = Math.round((window.outerWidth / window.innerWidth) * 100) / 100;
    
    return {
      detected: zoom,
      methods,
      isZoomed: Math.abs(zoom - 1) > 0.1
    };
  }

  checkViewportIssues() {
    this.log('Checking for viewport issues...');
    
    const viewport = this.getViewportInfo();
    const issues = [];
    
    // Check viewport meta tag
    if (!viewport.viewportMeta.includes('width=device-width')) {
      issues.push({
        type: 'viewport-meta',
        severity: 'high',
        message: 'Viewport meta tag should use width=device-width',
        current: viewport.viewportMeta,
        recommended: 'width=device-width, initial-scale=1.0'
      });
    }
    
    // Check for fixed width viewport
    if (viewport.viewportMeta.includes('width=1920') || viewport.viewportMeta.includes('width=1440')) {
      issues.push({
        type: 'fixed-width',
        severity: 'critical',
        message: 'Fixed width viewport detected - causes scaling issues',
        current: viewport.viewportMeta,
        fix: 'Change to width=device-width'
      });
    }
    
    // Check zoom level
    if (viewport.zoomLevel.isZoomed) {
      issues.push({
        type: 'zoom-detected',
        severity: 'medium',
        message: `Browser zoom detected: ${viewport.zoomLevel.detected}x`,
        recommendation: 'Test at 100% zoom level'
      });
    }
    
    // Check for unusual aspect ratios
    const aspectRatio = viewport.innerWidth / viewport.innerHeight;
    if (aspectRatio < 0.5 || aspectRatio > 3) {
      issues.push({
        type: 'unusual-aspect-ratio',
        severity: 'medium',
        message: `Unusual aspect ratio: ${aspectRatio.toFixed(2)}`,
        dimensions: `${viewport.innerWidth}x${viewport.innerHeight}`
      });
    }
    
    // Check device pixel ratio
    if (viewport.devicePixelRatio > 3) {
      issues.push({
        type: 'high-dpi',
        severity: 'low',
        message: `Very high DPI display: ${viewport.devicePixelRatio}x`,
        recommendation: 'Test scaling on high-DPI displays'
      });
    }
    
    return { viewport, issues };
  }

  compareWithProduction() {
    this.log('Comparing viewport with production environment...');
    
    const current = this.getViewportInfo();
    
    // Expected production viewport characteristics
    const productionExpected = {
      viewportMeta: 'width=device-width, initial-scale=1.0',
      responsiveDesign: true,
      fixedWidth: false
    };
    
    const comparison = {
      environment: this.isVercel ? 'vercel' : 'local',
      current: current,
      expected: productionExpected,
      matches: {
        viewportMeta: current.viewportMeta.includes('width=device-width'),
        noFixedWidth: !current.viewportMeta.includes('width=1920') && !current.viewportMeta.includes('width=1440'),
        normalZoom: !current.zoomLevel.isZoomed
      }
    };
    
    this.log('Viewport comparison', 'info', comparison);
    return comparison;
  }

  monitorViewportChanges() {
    this.log('Starting viewport monitoring...');
    
    const checkViewport = () => {
      const current = this.getViewportInfo();
      this.viewportHistory.push(current);
      
      // Keep only last 10 entries
      if (this.viewportHistory.length > 10) {
        this.viewportHistory.shift();
      }
      
      // Check for significant changes
      if (this.viewportHistory.length > 1) {
        const prev = this.viewportHistory[this.viewportHistory.length - 2];
        const widthChange = Math.abs(current.innerWidth - prev.innerWidth);
        const heightChange = Math.abs(current.innerHeight - prev.innerHeight);
        
        if (widthChange > 50 || heightChange > 50) {
          this.log('Significant viewport change detected', 'warn', {
            previous: { width: prev.innerWidth, height: prev.innerHeight },
            current: { width: current.innerWidth, height: current.innerHeight },
            change: { width: widthChange, height: heightChange }
          });
        }
      }
    };
    
    // Monitor resize events
    window.addEventListener('resize', checkViewport);
    window.addEventListener('orientationchange', () => {
      setTimeout(checkViewport, 500); // Delay for orientation change
    });
    
    // Initial check
    checkViewport();
    
    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('orientationchange', checkViewport);
    };
  }

  fixViewportIssues() {
    this.log('Attempting to fix viewport issues...');
    
    const fixes = [];
    
    // Check and fix viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      const currentContent = viewportMeta.content;
      
      if (currentContent.includes('width=1920') || currentContent.includes('width=1440')) {
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        fixes.push({
          type: 'viewport-meta-fixed',
          from: currentContent,
          to: viewportMeta.content
        });
        this.log('Fixed viewport meta tag', 'success');
      }
    }
    
    // Add CSS to prevent zoom issues
    const style = document.createElement('style');
    style.textContent = `
      html, body {
        width: 100%;
        overflow-x: hidden;
      }
      
      * {
        box-sizing: border-box;
      }
      
      /* Prevent zoom on input focus on iOS */
      input, select, textarea {
        font-size: 16px !important;
      }
      
      /* Ensure consistent viewport behavior */
      @media screen and (max-width: 768px) {
        body {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
      }
    `;
    document.head.appendChild(style);
    fixes.push({ type: 'css-fixes-applied' });
    
    this.log('Applied viewport fixes', 'success', fixes);
    return fixes;
  }

  runFullDiagnostic() {
    this.log('Running full viewport diagnostic...');
    
    const diagnostic = {
      environment: this.isVercel ? 'vercel' : 'local',
      viewport: this.getViewportInfo(),
      issues: this.checkViewportIssues(),
      comparison: this.compareWithProduction(),
      timestamp: new Date().toISOString()
    };
    
    // Auto-fix critical issues
    if (diagnostic.issues.issues.some(issue => issue.severity === 'critical')) {
      this.log('Critical viewport issues detected, applying fixes...', 'warn');
      diagnostic.fixes = this.fixViewportIssues();
    }
    
    this.log('Full viewport diagnostic complete', 'success', diagnostic);
    return diagnostic;
  }
}

// Auto-initialize for debugging
if (typeof window !== 'undefined') {
  const viewportDiag = new ViewportDiagnostics();
  window.viewportDiagnostics = viewportDiag;
  
  // Auto-run diagnostic in development or Vercel
  if (import.meta.env.DEV || viewportDiag.isVercel) {
    setTimeout(() => {
      viewportDiag.runFullDiagnostic();
      viewportDiag.monitorViewportChanges();
    }, 1000);
  }
}

export default ViewportDiagnostics;