import { Suspense, lazy, useEffect, useRef } from 'react';
import { Navbar } from './Components/Navbar';
import ResponsiveWrapper from './Components/ResponsiveWrapper';
import ScreenSizeHelper from './Components/ScreenSizeHelper';
import './App.css'
import ThreeJSErrorBoundary from './Components/ThreeJSErrorBoundary.jsx';
import { PageLoadingFallback, ThreeJSLoadingFallback } from './Components/LoadingFallback.jsx';

const MacbookScroll = lazy(() => import('./Components/macbookScroll.jsx').then(module => ({ default: module.MacbookScroll })));
const Home = lazy(() => import('../pages/Home.jsx'));
const About = lazy(() => import('../pages/About.jsx'));
const Contact = lazy(() => import('../pages/Contact.jsx'));
const Work = lazy(() => import('../pages/Work.jsx'));
const Skills = lazy(() => import('../pages/Skills.jsx'));
const Experience = lazy(() => import('../pages/Experience.jsx'));

function App() {
  // Removed viewport height tracking and reload logic

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
    <div className="min-h-screen w-full overflow-x-hidden">
      <ScreenSizeHelper />
      <ThreeJSErrorBoundary fallbackMessage="Unable to load the interactive MacBook display. The portfolio content is still available below.">
        <Suspense fallback={<ThreeJSLoadingFallback />}>
          <MacbookScroll src="https://res.cloudinary.com/dgpzvkjki/video/upload/v1760959660/src2_cmjedk.mp4" />
        </Suspense>
      </ThreeJSErrorBoundary>
      <Navbar navItems={navItems} socialLinks={socialLinks} />

      <Suspense fallback={<PageLoadingFallback />}>
        <Home />
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
        <About />
      </Suspense>

      <Suspense fallback={<PageLoadingFallback />}>
        <Contact />
      </Suspense>
    </div>
  )
}

export default App