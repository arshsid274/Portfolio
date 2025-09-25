import { Navbar } from './Components/Navbar';
import { MacbookScroll } from './Components/macbookScroll.jsx'
import { Globe } from './Components/ui/globe'
import Home from './Components/Home.jsx'
import './App.css'
import About from './Components/About';
import Experience from './Components/Exprience';

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
      <MacbookScroll />
      <Navbar navItems={navItems} socialLinks={socialLinks} />
      <Home />
      <About/>
      <Experience/>
    </div>
    </>
  )
}

export default App
