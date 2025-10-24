/**
 * Environment-aware Scroll Configuration
 * Provides consistent scroll behavior across different environments
 */

export class ScrollConfig {
  constructor() {
    this.isVercel = this.detectVercelEnvironment();
    this.isProduction = import.meta.env.PROD;
    this.config = this.getEnvironmentConfig();
  }

  detectVercelEnvironment() {
    if (typeof window === 'undefined') return false;
    
    return (
      window.location.hostname.includes('.vercel.app') ||
      window.location.hostname.includes('.vercel.com')
    );
  }

  getEnvironmentConfig() {
    // Base configuration
    const baseConfig = {
      // Scroll progress ranges
      macbookRotateRange: [0.1, 0.12, 0.3],
      macbookRotateValues: [-28, -28, 0],
      
      // Scale configurations
      scaleXRange: [0, 1],
      scaleYRange: [0, 1],
      
      // Translation
      translateRange: [0, 1],
      translateValue: 2500,
      
      // Opacity ranges
      textOpacityRange: [0, 0.2],
      lidOpacityRange: [0.8, 1],
      
      // Smooth scroll settings
      smoothScrollDuration: 3000,
      scrollThreshold: 100
    };

    // Environment-specific adjustments
    if (this.isVercel && this.isProduction) {
      // Vercel production adjustments
      return {
        ...baseConfig,
        // Slightly different rotation timing for production
        macbookRotateRange: [0.08, 0.1, 0.28],
        macbookRotateValues: [-30, -30, 0], // Slightly more rotation
        
        // Adjusted scale values for production
        scaleXValues: {
          desktop: [1.2, 5.5], // Slightly different scaling
          xl: [1.2, 6.2],
          mobile: [1.2, 3.2]
        },
        scaleYValues: {
          desktop: [0.6, 3.7],
          mobile: [0.6, 2.2]
        },
        
        // Production-specific smooth scroll
        smoothScrollDuration: 2800,
        scrollThreshold: 80
      };
    } else if (this.isVercel && !this.isProduction) {
      // Vercel dev adjustments
      return {
        ...baseConfig,
        // Dev environment adjustments
        macbookRotateRange: [0.09, 0.11, 0.29],
        macbookRotateValues: [-29, -29, 0],
        
        scaleXValues: {
          desktop: [1.2, 5.2],
          xl: [1.2, 6.1],
          mobile: [1.2, 3.1]
        },
        scaleYValues: {
          desktop: [0.6, 3.6],
          mobile: [0.6, 2.1]
        },
        
        smoothScrollDuration: 2900,
        scrollThreshold: 90
      };
    } else {
      // Local development
      return {
        ...baseConfig,
        scaleXValues: {
          desktop: [1.2, 5],
          xl: [1.2, 6],
          mobile: [1.2, 3]
        },
        scaleYValues: {
          desktop: [0.6, 3.5],
          mobile: [0.6, 2.0]
        }
      };
    }
  }

  getScaleXValues(isMobile, isXl) {
    const values = this.config.scaleXValues;
    if (isMobile) return values.mobile;
    if (isXl) return values.xl;
    return values.desktop;
  }

  getScaleYValues(isMobile) {
    const values = this.config.scaleYValues;
    return isMobile ? values.mobile : values.desktop;
  }

  getMacbookRotateConfig() {
    return {
      range: this.config.macbookRotateRange,
      values: this.config.macbookRotateValues
    };
  }

  getSmoothScrollConfig() {
    return {
      duration: this.config.smoothScrollDuration,
      threshold: this.config.scrollThreshold
    };
  }

  logConfiguration() {
    console.log('🔧 Scroll Configuration:', {
      environment: this.isVercel ? (this.isProduction ? 'vercel-prod' : 'vercel-dev') : 'local',
      config: this.config
    });
  }
}

// Create singleton instance
const scrollConfig = new ScrollConfig();

// Log configuration in development
if (import.meta.env.DEV || scrollConfig.isVercel) {
  scrollConfig.logConfiguration();
}

export default scrollConfig;