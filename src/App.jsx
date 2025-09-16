import { Navbar } from './Components/Navbar';
import { MacbookScroll } from './Components/macbookScroll.jsx'
import { MacbookDesign } from './Components/MacbookDesign.jsx'




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
      {/* <div className="scale-50">
         <MacbookDesign />
      </div> */}
     
    
    <Navbar navItems={navItems} socialLinks={socialLinks} />
    
        <LetterGlitch
    glitchSpeed={50}
    centerVignette={true}
    outerVignette={false}
    smooth={true}
  />
 

    </div>
    </>
  )
}

export default App
