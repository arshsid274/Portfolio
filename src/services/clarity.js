class ClarityService {
  constructor() {
    this.projectId = 'tvoxyrtntp';
    this.isInitialized = false;
  }

  // Initialize Clarity using script injection (more reliable for builds)
  init() {
    if (!this.isInitialized && typeof window !== 'undefined') {
      try {
        // Check if Clarity is already loaded
        if (window.clarity) {
          window.clarity.init(this.projectId);
          this.isInitialized = true;
          console.log('Microsoft Clarity initialized successfully');
          return;
        }

        // Load Clarity script dynamically
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://www.clarity.ms/tag/' + this.projectId;
        
        script.onload = () => {
          this.isInitialized = true;
          console.log('Microsoft Clarity loaded and initialized successfully');
        };
        
        script.onerror = () => {
          console.error('Failed to load Microsoft Clarity script');
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to initialize Microsoft Clarity:', error);
      }
    }
  }

  // Identify user with custom data
  identify(customId, customSessionId = null, customPageId = null, friendlyName = null) {
    if (typeof window !== 'undefined' && window.clarity && typeof window.clarity.identify === 'function') {
      try {
        window.clarity.identify(customId, customSessionId, customPageId, friendlyName);
        console.log('User identified in Clarity:', customId);
      } catch (error) {
        console.error('Failed to identify user in Clarity:', error);
      }
    }
  }

  // Set custom tags
  setTag(key, value) {
    if (typeof window !== 'undefined' && window.clarity && typeof window.clarity.setTag === 'function') {
      try {
        window.clarity.setTag(key, value);
        console.log(`Clarity tag set: ${key} = ${value}`);
      } catch (error) {
        console.error('Failed to set Clarity tag:', error);
      }
    }
  }

  // Track custom events
  event(eventName) {
    if (typeof window !== 'undefined' && window.clarity && typeof window.clarity.event === 'function') {
      try {
        window.clarity.event(eventName);
        console.log('Clarity event tracked:', eventName);
      } catch (error) {
        console.error('Failed to track Clarity event:', error);
      }
    }
  }

  // Set cookie consent
  consent(hasConsent = true) {
    if (typeof window !== 'undefined' && window.clarity && typeof window.clarity.consent === 'function') {
      try {
        window.clarity.consent(hasConsent);
        console.log('Clarity consent set:', hasConsent);
      } catch (error) {
        console.error('Failed to set Clarity consent:', error);
      }
    }
  }

  // Upgrade session for priority recording
  upgrade(reason) {
    if (typeof window !== 'undefined' && window.clarity && typeof window.clarity.upgrade === 'function') {
      try {
        window.clarity.upgrade(reason);
        console.log('Clarity session upgraded:', reason);
      } catch (error) {
        console.error('Failed to upgrade Clarity session:', error);
      }
    }
  }
}

// Create and export a singleton instance
const clarityService = new ClarityService();
export default clarityService;