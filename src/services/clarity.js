import { clarity } from '@microsoft/clarity';

class ClarityService {
  constructor() {
    this.projectId = 'tvoxyrtntp';
    this.isInitialized = false;
  }

  // Initialize Clarity
  init() {
    if (!this.isInitialized && typeof window !== 'undefined') {
      try {
        clarity.init(this.projectId);
        this.isInitialized = true;
        console.log('Microsoft Clarity initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Microsoft Clarity:', error);
      }
    }
  }

  // Identify user with custom data
  identify(customId, customSessionId = null, customPageId = null, friendlyName = null) {
    if (this.isInitialized) {
      try {
        clarity.identify(customId, customSessionId, customPageId, friendlyName);
        console.log('User identified in Clarity:', customId);
      } catch (error) {
        console.error('Failed to identify user in Clarity:', error);
      }
    }
  }

  // Set custom tags
  setTag(key, value) {
    if (this.isInitialized) {
      try {
        clarity.setTag(key, value);
        console.log(`Clarity tag set: ${key} = ${value}`);
      } catch (error) {
        console.error('Failed to set Clarity tag:', error);
      }
    }
  }

  // Track custom events
  event(eventName) {
    if (this.isInitialized) {
      try {
        clarity.event(eventName);
        console.log('Clarity event tracked:', eventName);
      } catch (error) {
        console.error('Failed to track Clarity event:', error);
      }
    }
  }

  // Set cookie consent
  consent(hasConsent = true) {
    if (this.isInitialized) {
      try {
        clarity.consent(hasConsent);
        console.log('Clarity consent set:', hasConsent);
      } catch (error) {
        console.error('Failed to set Clarity consent:', error);
      }
    }
  }

  // Upgrade session for priority recording
  upgrade(reason) {
    if (this.isInitialized) {
      try {
        clarity.upgrade(reason);
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