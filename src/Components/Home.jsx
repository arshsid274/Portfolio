import { MacbookModel } from './MacbookModel.jsx';
import LetterGlitch from './LetterGlitch';

function Home() {
    return ( 
    <div className='flex justify-center items-center h-screen relative'>
        {/* LetterGlitch as background */}
        <div className="absolute inset-0 z-0">
            <LetterGlitch 
                glitchSpeed={50}
                centerVignette={true}
                outerVignette={false}
                smooth={true}
            />
        </div>
        
        {/* Content on top */}
        <div className="relative z-10 mt-20 min-w-[80%] justify-center items-center min-h-[80vh] text-black text-4xl flex rounded-lg shadow-lg bg-white dark:bg-black">
            <div className="">
                <h1>Your Portfolio</h1>
            </div>
            <div className="w-[600px] h-[600px]">
                <MacbookModel 
                  screenImage="/src/assets/react.svg"
                  scale={[5, 5, 5]}
                />
            </div> 
        </div>
    </div>
     );
}
export default Home;
