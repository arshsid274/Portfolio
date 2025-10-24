/**
 * Diagnostic Manager
 * Coordinates all diagnostic utilities and provides a unified interface
 */

class DiagnosticManager {
  constructor() {
    this.isInitialized = false;
    this.diagnosticData = {
      environment: null,
      assets: null,
      animations: null,
      performance: null
    };
    this.enableLogging = import.meta.env.PROD || import.meta.env.VITE_DEBUG_DIAGNOSTICS === 'true';
  }

  log(message, type = 'info', data = null) {
    if (!this.enableLogging) return;
    
    const timestamp = new Date().toISOString();
    const prefix = `[DiagnosticManager ${timestamp}]`;
    
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

  /**
   * Initialize diagnostic tools
   */
  async initialize() {
    if (this.isInitialized) {
      this.log('Diagnostic manager already initialized');
      return;
    }

    this.log('Initializing diagnostic manager...');

    try {
      // Log environment information
      this.diagnosticData.environment = this.getEnvironmentInfo();
      
      this.log('Diagnostic manager initialized successfully', 'success');
      this.isInitialized = true;
      
    } catch (error) {
      this.log(`Failed to initialize diagnostic manager: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Get environment information
   */
  getEnvironmentInfo() {
    const info = {
      // Environment type
      isProduction: import.meta.env.PROD,
      isDevelopment: import.meta.env.DEV,
      isVercel: typeof window !== 'undefined' && (
        window.location.hostname.includes('.vercel.app') ||
        window.location.hostname.includes('.vercel.com')
      ),
      
      // Build info
      buildMode: import.meta.env.MODE,
      
      // Runtime info
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      language: typeof navigator !== 'undefined' ? navigator.language : 'unknown',
      platform: typeof navigator !== 'undefined' ? navigator.platform : 'unknown',
      
      // URL info
      url: typeof window !== 'undefined' ? {
        hostname: window.location.hostname,
        port: window.location.port,
        protocol: window.location.protocol,
        pathname: window.location.pathname
      } : null,
      
      // Viewport info
      viewport: typeof window !== 'undefined' ? {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1,
        orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      } : null,
      
      // Timing
      timestamp: new Date().toISOString(),
      performanceNow: performance.now()
    };

    return info;
  }

  /**
   * Get complete diagnostic report
   */
  getDiagnosticReport() {
    const report = {
      timestamp: new Date().toISOString(),
      environment: this.diagnosticData.environment || this.getEnvironmentInfo(),
      performance: {
        memory: performance.memory ? {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit
        } : null,
        timing: performance.timing ? {
          domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
          windowLoad: performance.timing.loadEventEnd - performance.timing.navigationStart
        } : null,
        now: performance.now()
      }
    };

    return report;
  }

  /**
   * Log complete diagnostic report
   */
  logDiagnosticReport() {
    const report = this.getDiagnosticReport();
    this.log('Complete diagnostic report', 'info', report);
    return report;
  }
}

// Create singleton instance
const diagnosticManager = new DiagnosticManager();

export default diagnosticManager;