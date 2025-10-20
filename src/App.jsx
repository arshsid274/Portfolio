// Replace your App.jsx with this:
import { Navbar } from './Components/Navbar';
import { MacbookScroll } from './Components/macbookScroll.jsx'
import { Globe } from './Components/ui/globe'
import Home from '../pages/Home.jsx'
import './App.css'
import About from '../pages/About';
import Experience from '../pages/Exprience';
import Contact from '../pages/Contact';
import Work from '../pages/Work';
import './index.css';


function App() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ];

  const socialLinks = {
    github: 'https://github.com/username',
    twitter: 'https://twitter.com/username'
  };

  return (
    <div className="overflow-x-hidden">
      <MacbookScroll src="https://res.cloudinary.com/dgpzvkjki/video/upload/v1760959660/src2_cmjedk.mp4" />
      <Navbar navItems={navItems} socialLinks={socialLinks} />
      <Home />
      <Work/>
      <About/>
      <Experience/>
      <Contact/>
    </div>
  )
}

export default App
