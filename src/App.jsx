import Navbar from "./components/Navbar"
import About from "./sections/About"
import Experience from "./sections/Experience"
import Home from "./sections/Home"
import Projects from "./sections/Projects"
import Skills from "./sections/Skills"
import Contact from "./sections/Contact"
import Footer from "./sections/Footer"
// import ParticlesBackground from "./components/ParticlesBackground"
import CustomCursor from "./components/CustomCursor"
import {useState} from "react"
import IntroAnimation from "./components/IntroAnimation"
import { Analytics } from "@vercel/analytics/react"


function App() {
  const [introDone, setIntroDone] = useState(false)
  return (
    <>
    { !introDone && <IntroAnimation onFinish={() => setIntroDone(true)} /> }

    {introDone && (
      <div className="relative gradient text-white">
      <CustomCursor />
      {/* <ParticlesBackground /> */}
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <Analytics/>
    </div>
    )}
    
    </>
  )
}

export default App
