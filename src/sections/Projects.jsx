// import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useMemo } from "react"
import photo1 from "../assets/photo1.png"
import img1 from "../assets/img1.png"
import photo2 from "../assets/photo2.png"
import img2 from "../assets/img2.png"
import photo3 from "../assets/photo3.png"
import img3 from "../assets/img3.png"
import { AnimatePresence, useMotionValueEvent, useScroll, motion } from "framer-motion"
import ParticlesBackground from "../components/ParticlesBackground"

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() =>{
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(query)
    const handler = (e) => setIsMobile(e.matches)

    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  },[query])
  return isMobile
}

const Projects = () => {
  const isMobile = useIsMobile()
  const sceneRef = useRef(null)

  const projects = useMemo(() => [
    {
      title: "E-Commerce Website",
      link: "https://github.com/ShroudAnkit53/E-Commerce-Shopping-Website.git",
      bgColor: "#0f1629",
      image: isMobile ? photo1 : img1
    },
    {
      title: "Expense Tracker Website",
      link: "https://github.com/ShroudAnkit53/Expense-Tracker-MERN.git",
      bgColor: "#0f1815",
      image: isMobile ? photo2 : img2
    },
    {
      title: "Real Estate Website",
      link: "https://github.com/ShroudAnkit53/Real-Estate-Website-MERN-.git",
      bgColor: "#1a0f05",
      image: isMobile ? photo3 : img3
    },
  ], [isMobile])

  const {scrollYProgress} = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  })

  const thresholds = projects.map((_, i)=>(i+1)/projects.length)
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = thresholds.findIndex((t) => v <= t)
    setActiveIndex(idx === -1 ? thresholds.length - 1: idx)
  })

  const activeProject = projects[activeIndex]
  return (
      <section id="projects" ref={sceneRef} className="relative text-white" style={{ height: `${100 * projects.length}vh`, backgroundColor: activeProject.bgColor, transition: "background-color 400ms ease" }}>
      <ParticlesBackground />
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2 className={`text-2xl sm:text-4xl font-semibold z-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] ${
          isMobile ? "mb-2" : "mt-8"
        }`}>My Work</h2>

        <div className={`relative w-full flex justify-center ${
          isMobile ? "" : "flex-1 items-center"
        }`}>
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={
                isMobile
                  ? `${activeIndex === idx ? "block" : "hidden"} w-[85%]`
                  : `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                      activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"
                    }`
              }
              style={!isMobile ? { width: "85%", maxWidth: "1200px" } : { width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.h3 key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center italic font-semibold text-white/95 ${
                      isMobile
                        ? "text-2xl mb-3 leading-tight"
                        : "text-[clamp(2.5rem,6vw,5rem)] sm:absolute sm:-top-20 sm:left-[35%] lg:left-[5%] sm:mb-0"
                    }`}
                    style={{ zIndex: 5, textAlign: isMobile ? "center" : "left" }}
                  >{project.title}</motion.h3>
                )}
              </AnimatePresence>

              <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_rgba(0,0,0,0.7)] ${
                isMobile ? "mb-4 rounded-lg h-[42vh]" : "mb-10 sm:mb-12 rounded-xl h-[66vh]"
              }`} style={{ zIndex: 10, transition: "box-shadow 250ms ease" }}>
                <img src={project.image} alt={project.title}
                  className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-xl"
                  style={{ position: "relative", zIndex: 10, filter: "drop-shadow(0, 16px 40px rgba(0,0,0,0.65))", transition: "filter 200ms ease" }}
                  loading="lazy" />
                <div className="pointer-events-none absolute inset-0" style={{ zIndex: 11, background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)" }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className={`${isMobile ? "mt-6" : "absolute bottom-10"}`}>
          <a href={activeProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
            aria-label={`View ${activeProject?.title}`}>View Github Repo</a>
        </div>
      </div>
    </section>
  )
}

export default Projects