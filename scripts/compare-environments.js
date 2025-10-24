#!/usr/bin/env node

/**
 * Environment Comparison Script
 * Helps identify differences between local and Vercel environments
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class EnvironmentComparison {
  constructor() {
    this.projectRoot = join(__dirname, '..');
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = `[EnvCompare ${timestamp}]`;
    
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
      case 'header':
        console.log(`\n${'='.repeat(60)}`);
        console.log(`${prefix} ${message}`);
        console.log(`${'='.repeat(60)}\n`);
        break;
      default:
        console.log(`${prefix} ℹ️`, message);
    }
  }

  checkBuildConfiguration() {
    this.log('Build Configuration Analysis', 'header');
    
    try {
      // Check package.json
      const packagePath = join(this.projectRoot, 'package.json');
      const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));
      
      this.log(`Project: ${pkg.name} v${pkg.version}`, 'success');
      this.log(`Node.js requirement: ${pkg.engines?.node || 'not specified'}`);
      
      // Check critical dependencies
      const criticalDeps = ['react', 'react-dom', 'framer-motion', 'gsap', 'three'];
      criticalDeps.forEach(dep => {
        if (pkg.dependencies[dep]) {
          this.log(`${dep}: ${pkg.dependencies[dep]}`, 'success');
        } else {
          this.log(`${dep}: not found`, 'error');
        }
      });
      
      // Check Vite config
      const viteConfigPath = join(this.projectRoot, 'vite.config.js');
      const viteConfig = readFileSync(viteConfigPath, 'utf-8');
      
      if (viteConfig.includes('manualChunks')) {
        this.log('Manual chunks configured for optimization', 'success');
      }
      
      if (viteConfig.includes('optimizeDeps')) {
        this.log('Dependency optimization configured', 'success');
      }
      
    } catch (error) {
      this.log(`Configuration check failed: ${error.message}`, 'error');
    }
  }

  checkVercelConfiguration() {
    this.log('Vercel Configuration Analysis', 'header');
    
    try {
      const vercelConfigPath = join(this.projectRoot, 'vercel.json');
      const vercelConfig = JSON.parse(readFileSync(vercelConfigPath, 'utf-8'));
      
      this.log('Vercel configuration found', 'success');
      
      if (vercelConfig.rewrites) {
        this.log(`Rewrites configured: ${vercelConfig.rewrites.length} rules`, 'success');
        vercelConfig.rewrites.forEach(rewrite => {
          this.log(`  ${rewrite.source} → ${rewrite.destination}`);
        });
      }
      
      if (vercelConfig.headers) {
        this.log(`Headers configured: ${vercelConfig.headers.length} rules`, 'success');
      }
      
      if (vercelConfig.functions) {
        this.log('Serverless functions configured', 'success');
      }
      
    } catch (error) {
      this.log('No vercel.json found or invalid configuration', 'warn');
    }
  }

  analyzeScrollConfiguration() {
    this.log('Scroll Configuration Analysis', 'header');
    
    try {
      const scrollConfigPath = join(this.projectRoot, 'src/utils/ScrollConfig.js');
      const scrollConfig = readFileSync(scrollConfigPath, 'utf-8');
      
      this.log('Environment-aware scroll configuration found', 'success');
      
      // Check for environment-specific configurations
      if (scrollConfig.includes('isVercel') && scrollConfig.includes('isProduction')) {
        this.log('Multi-environment configuration detected', 'success');
      }
      
      if (scrollConfig.includes('macbookRotateRange')) {
        this.log('MacBook rotation configuration found', 'success');
      }
      
      if (scrollConfig.includes('scaleXValues') && scrollConfig.includes('scaleYValues')) {
        this.log('Scale animation configuration found', 'success');
      }
      
    } catch (error) {
      this.log('Scroll configuration not found', 'warn');
    }
  }

  provideTroubleshootingSteps() {
    this.log('Troubleshooting Steps', 'header');
    
    console.log('🔍 To diagnose the design differences:');
    console.log('');
    console.log('1. Open browser console on both environments');
    console.log('2. Look for scroll configuration logs');
    console.log('3. Compare animation transform values');
    console.log('');
    console.log('🛠️  Available debugging tools:');
    console.log('');
    console.log('In browser console:');
    console.log('  window.scrollDiagnostics.runFullDiagnostic()');
    console.log('  window.scrollDiagnostics.startScrollLogging()');
    console.log('  window.vercelDiagnostics.runFullDiagnostic()');
    console.log('');
    console.log('📊 Compare these values between environments:');
    console.log('  - scrollYProgress values');
    console.log('  - scaleX/scaleY transform values');
    console.log('  - rotate transform values');
    console.log('  - viewport dimensions');
    console.log('  - device pixel ratio');
    console.log('');
    console.log('🚀 Quick fixes to try:');
    console.log('  1. Hard refresh both environments (Ctrl+Shift+R)');
    console.log('  2. Check if scroll position affects initial state');
    console.log('  3. Compare network tab for asset loading differences');
    console.log('  4. Check console for any JavaScript errors');
    console.log('');
  }

  runComparison() {
    console.log('🔍 Starting Environment Comparison Analysis...\n');
    
    this.checkBuildConfiguration();
    this.checkVercelConfiguration();
    this.analyzeScrollConfiguration();
    this.provideTroubleshootingSteps();
    
    this.log('Environment comparison analysis complete', 'success');
  }
}

// Run the comparison
const comparison = new EnvironmentComparison();
comparison.runComparison();