import { Navbar } from './Components/Navbar';
import { MacbookScroll } from './Components/macbookScroll.jsx'
import { Globe } from './Components/ui/globe'
import Home from '../pages/Home.jsx'
import './App.css'
import About from '../pages/About';
import Experience from '../pages/Exprience';
import Contact from '../pages/Contact';
import Work from '../pages/Work';

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
  <>
  <div>
    <div className="overflow-x-hidden">
      <MacbookScroll src="/src2.mp4" />
    </div>
    <Navbar navItems={navItems} socialLinks={socialLinks} />
    <div className="overflow-x-hidden">
      <Home />
    </div>
    <Work/>
    <div className="overflow-x-hidden">
      <About/>
      <Experience/>
      <Contact/>
    </div>
  </div>
  </>
)


}

export default App
