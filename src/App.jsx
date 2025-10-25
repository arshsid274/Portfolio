import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Navbar } from './Components/Navbar';
import ScreenSizeHelper from './Components/ScreenSizeHelper';
import MainLoader from './Components/MainLoader.jsx';
import './App.css'
import ThreeJSErrorBoundary from './Components/ThreeJSErrorBoundary.jsx';
import { PageLoadingFallback, ThreeJSLoadingFallback } from './Components/LoadingFallback.jsx';

const MacbookScroll = lazy(() => import('./Components/macbookScroll.jsx').then(module => ({ default: module.MacbookScroll })));
const Home = lazy(() => import('../pages/Home.jsx'));

const Contact = lazy(() => import('../pages/Contact.jsx'));
const Work = lazy(() => import('../pages/Work.jsx'));
const Skills = lazy(() => import('../pages/Skills.jsx'));
const Experience = lazy(() => import('../pages/Experience.jsx'));

function App() {
  const [isMainLoading, setIsMainLoading] = useState(true);
  const homeRef = useRef(null);

  useEffect(() => {
    // Show loader for initial load time to allow 3D models and videos to load
    const loadingTimer = setTimeout(() => {
      setIsMainLoading(false);
    }, 3000); // 3 seconds loading time

    // Also listen for window load event
    const handleLoad = () => {
      setTimeout(() => {
        setIsMainLoading(false);
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(loadingTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Scroll to Home section after loader completes
  useEffect(() => {
    if (!isMainLoading && homeRef.current) {
      const scrollToHome = () => {
        homeRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      };
      
      // Small delay to ensure all components are rendered
      const scrollTimer = setTimeout(scrollToHome, 500);
      
      return () => clearTimeout(scrollTimer);
    }
  }, [isMainLoading]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
    { label: 'Skills', href: '/skills' }
  ];

  const socialLinks = {
    github: 'https://github.com/username',
    twitter: 'https://twitter.com/username'
  };

  return (
    <>
      <MainLoader isLoading={isMainLoading} />
      <div className="min-h-screen w-full overflow-x-hidden">
        <ScreenSizeHelper />
        <ThreeJSErrorBoundary fallbackMessage="Unable to load the interactive MacBook display. The portfolio content is still available below.">
          <Suspense fallback={<ThreeJSLoadingFallback />}>
            <MacbookScroll src="https://res.cloudinary.com/dgpzvkjki/video/upload/v1760959660/src2_cmjedk.mp4" />
          </Suspense>
        </ThreeJSErrorBoundary>
        <Navbar navItems={navItems} socialLinks={socialLinks} />

        <div ref={homeRef}>
          <Suspense fallback={<PageLoadingFallback />}>
            <Home />
          </Suspense>
        </div>

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