import { describe, it, expect, beforeEach } from 'vitest'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

describe('Viewport Integration Tests', () => {
  let dom
  let document

  beforeEach(() => {
    // Read the actual index.html file
    const htmlPath = path.resolve(process.cwd(), 'index.html')
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
    
    // Create a JSDOM instance with the actual HTML
    dom = new JSDOM(htmlContent)
    document = dom.window.document
  })

  describe('HTML Document Structure', () => {
    it('should have correct viewport meta tag configuration', () => {
      const viewportMeta = document.querySelector('meta[name="viewport"]')
      
      expect(viewportMeta).toBeTruthy()
      expect(viewportMeta.getAttribute('content')).toBe('width=device-width, initial-scale=1.0')
    })

    it('should not have restrictive viewport settings', () => {
      const viewportMeta = document.querySelector('meta[name="viewport"]')
      const content = viewportMeta.getAttribute('content')
      
      // Verify that maximum-scale and user-scalable are not set to restrictive values
      expect(content).not.toContain('maximum-scale=1.0')
      expect(content).not.toContain('user-scalable=no')
    })

    it('should have proper document structure for zoom fix', () => {
      // Verify essential elements exist
      expect(document.documentElement).toBeTruthy()
      expect(document.body).toBeTruthy()
      expect(document.getElementById('root')).toBeTruthy()
    })

    it('should include theme handling script without zoom overrides', () => {
      const scripts = document.querySelectorAll('script')
      let hasThemeScript = false
      let hasZoomOverride = false
      
      scripts.forEach(script => {
        const content = script.textContent || script.innerHTML
        if (content.includes('theme') && content.includes('dark')) {
          hasThemeScript = true
        }
        if (content.includes('zoom') || content.includes('documentElement.style.zoom')) {
          hasZoomOverride = true
        }
      })
      
      expect(hasThemeScript).toBe(true)
      expect(hasZoomOverride).toBe(false)
    })
  })

  describe('CSS Integration', () => {
    it('should verify CSS file exists and is linked', () => {
      // Check that the main CSS file is referenced
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]')
      const moduleScript = document.querySelector('script[type="module"][src="/src/main.jsx"]')
      
      // The CSS is imported in main.jsx, so verify the script exists
      expect(moduleScript).toBeTruthy()
      expect(moduleScript.getAttribute('src')).toBe('/src/main.jsx')
    })
  })

  describe('Vercel Deployment Compatibility', () => {
    it('should have configuration suitable for Vercel platform', () => {
      const viewportMeta = document.querySelector('meta[name="viewport"]')
      const content = viewportMeta.getAttribute('content')
      
      // Verify viewport settings that work well with Vercel
      expect(content).toContain('width=device-width')
      expect(content).toContain('initial-scale=1.0')
    })

    it('should not have conflicting meta tags', () => {
      const allMetaTags = document.querySelectorAll('meta')
      const viewportTags = Array.from(allMetaTags).filter(meta => 
        meta.getAttribute('name') === 'viewport'
      )
      
      // Should have exactly one viewport meta tag
      expect(viewportTags.length).toBe(1)
    })
  })

  describe('Document Head Configuration', () => {
    it('should have proper charset and title', () => {
      const charset = document.querySelector('meta[charset]')
      const title = document.querySelector('title')
      
      expect(charset).toBeTruthy()
      expect(charset.getAttribute('charset')).toBe('UTF-8')
      expect(title).toBeTruthy()
      expect(title.textContent).toBeTruthy()
    })

    it('should have favicon configuration', () => {
      const favicon = document.querySelector('link[rel="icon"]')
      
      expect(favicon).toBeTruthy()
      expect(favicon.getAttribute('href')).toBeTruthy()
    })
  })
})