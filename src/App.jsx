import { Navbar } from './Components/Navbar';
import { MacbookScroll } from './Components/macbookScroll.jsx'

import { Globe } from './Components/ui/globe'
import PortfolioBase from './Components/PortfolioBase.jsx'





import LetterGlitch from './Components/LetterGlitch'
import './App.css'

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
      {/* */}
       {/* <Globe /> */}
     <Navbar navItems={navItems} socialLinks={socialLinks} />

     <div className="relative w-full h-screen ">
  {/* LetterGlitch as background */}
  <div className="absolute inset-0 z-0 ">
    <LetterGlitch 
      glitchSpeed={50}
      centerVignette={true}
      outerVignette={false}
      smooth={true}
    />
  </div>

  {/* PortfolioBase and other content on top */}
  <div className="relative z-10">
    <PortfolioBase className="absolute inset-0 z-10" />
    {/* Add other content here if needed */}
  </div>
</div>
    
      
 
 

    </div>
    </>
  )
}

export default App
