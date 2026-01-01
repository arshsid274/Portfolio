import { Suspense, lazy, useEffect, useState } from 'react';
import { Navbar } from './Components/Navbar';
import ScreenSizeHelper from './Components/ScreenSizeHelper';
import MainLoader from './Components/MainLoader.jsx';
import './App.css'
import ThreeJSErrorBoundary from './Components/ThreeJSErrorBoundary.jsx';
import { PageLoadingFallback } from './Components/LoadingFallback.jsx';

const MacbookScroll = lazy(() => import('./Components/macbookScroll.jsx').then(module => ({ default: module.MacbookScroll })));
const Home = lazy(() => import('../pages/Home.jsx'));

const Contact = lazy(() => import('../pages/Contact.jsx'));
const Work = lazy(() => import('../pages/Work.jsx'));
const Skills = lazy(() => import('../pages/Skills.jsx'));
const Experience = lazy(() => import('../pages/Experience.jsx'));

function App() {
  const [isMainLoading, setIsMainLoading] = useState(true);
  const [componentsReady, setComponentsReady] = useState({
    macbookScroll: false
  });

  // Check if all critical 3D components are ready
  const allComponentsReady = Object.values(componentsReady).every(ready => ready);

  useEffect(() => {
    // Minimum loading time
    const minLoadingTime = 2000; // 2 seconds minimum
    const startTime = Date.now();

    const checkReadiness = () => {
      const elapsedTime = Date.now() - startTime;
      const minTimeReached = elapsedTime >= minLoadingTime;

      if (allComponentsReady && minTimeReached) {
        setIsMainLoading(false);
      }
    };

    // Check readiness periodically
    const readinessInterval = setInterval(checkReadiness, 100);

    // Fallback timeout - hide loader after 8 seconds regardless
    const fallbackTimer = setTimeout(() => {
      setIsMainLoading(false);
    }, 8000);

    return () => {
      clearInterval(readinessInterval);
      clearTimeout(fallbackTimer);
    };
  }, [allComponentsReady]);

  // Callback functions for components to report readiness
  const markComponentReady = (componentName) => {
    setComponentsReady(prev => ({
      ...prev,
      [componentName]: true
    }));
  };

  // Ensure page starts at top (MacbookScroll) after loader completes
  useEffect(() => {
    if (!isMainLoading) {
      // Scroll to top to ensure we start from MacbookScroll
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

      // Small delay to ensure all components are rendered
      const scrollTimer = setTimeout(scrollToTop, 300);

      return () => clearTimeout(scrollTimer);
    }
  }, [isMainLoading]);

  const navItems = [
    { label: 'Home', href: '#home-section' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  const socialLinks = {
    github: 'https://github.com/arshsid274',
    twitter: 'https://twitter.com/arshsid274'
  };

  return (
    <>
      <MainLoader isLoading={isMainLoading} />
      <Navbar navItems={navItems} socialLinks={socialLinks} />
      <div className="min-h-screen w-full overflow-x-hidden">
        {/* <ScreenSizeHelper /> */}
        <ThreeJSErrorBoundary fallbackMessage="Unable to load the interactive MacBook display. The portfolio content is still available below.">
          <Suspense fallback={null}>
            <MacbookScroll
              src="https://cdn.jsdelivr.net/gh/arshsid274/Portfolio-assets@main/home.webm"
              onReady={() => markComponentReady('macbookScroll')}
            />
          </Suspense>
        </ThreeJSErrorBoundary>

        <Suspense fallback={null}>
          <Home onReady={() => markComponentReady('homeModel')} />
        </Suspense>

        <Suspense fallback={<PageLoadingFallback />}>
          <Work />
        </Suspense>

        <Suspense fallback={<PageLoadingFallback />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<PageLoadingFallback />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<PageLoadingFallback />}>
          <Contact />
        </Suspense>
      </div>
    </>
  )
}

export default App