// import React from 'react'

import { useScroll, useTransform, motion } from "framer-motion"
import { useState, useEffect, useRef, useMemo } from "react"
import ParticlesBackground from "../components/ParticlesBackground"

const experiences = [
  {
    role: "Web developer Intern",
    company: "Prodigy InfoTech",
    duration: "June 2024 - July 2024",
    description: "Built UX and frontend for websites, collaborated with colleagues etc."
  },{
    role: "Open Source Intern",
    company: "GSSoC 2025",
    duration: "July 2025 - October 2025",
    description: "Collaborated on bug fixes, feature enhancements, UI/UX improvements, and Git/GitHub-based open-source development."
  },
  {
    role: "Trainee(Apprenticeship Program)",
    company: "Caterpillar",
    duration: "July 2025 - November 2025",
    description: "Developed professional skills in Emotional Intelligence, Written Communication, and Workplace Communication.Also gained hands-on experience on PowerBI"
  }
]

const DOT_SIZE = 28
const LINE_LEN = 40
const CARD_OFFSET = DOT_SIZE + LINE_LEN

function ExperienceItem({ exp, idx, layout, visible }) {
  // Visibility is now purely state-driven (visible: boolean), animated
  // declaratively. It is NOT tied to scrollYProgress ranges anymore, so it
  // can never silently reset/clamp while scrolling further down.
  const fadeTransition = { duration: 0.45, delay: visible ? idx * 0.12 : 0 }

  if (layout === "desktop") {
    const isUp = idx % 2 === 0
    const lineStyle = isUp
      ? { bottom: DOT_SIZE, height: LINE_LEN }
      : { top: DOT_SIZE, height: LINE_LEN }
    const cardStyle = isUp
      ? { bottom: CARD_OFFSET, maxWidth: "90vw" }
      : { top: CARD_OFFSET, maxWidth: "90vw" }

    return(
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
          transition={fadeTransition}
        />

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-white/40"
          style={lineStyle}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={fadeTransition}
        />

        <motion.article
          className="absolute left-1/2 -ml-40 bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg"
          style={{ ...cardStyle, pointerEvents: visible ? "auto" : "none" }}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : (idx % 2 === 0 ? 20 : -20)
          }}
          transition={fadeTransition}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">{exp.company} | {exp.duration}</p>
          <p className="text-md text-gray-300 break-words">{exp.description}</p>
        </motion.article>
      </div>
    )
  }

  return(
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
        transition={fadeTransition}
      />
      <motion.div
        className="absolute left-[14px] -translate-y-1/2 rounded"
        style={{ top: 26, width: 12, height: 4, backgroundColor: "rgba(255,255,255,0.6)" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={fadeTransition}
      />
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ pointerEvents: visible ? "auto" : "none" }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -24 }}
        transition={fadeTransition}
      >
        <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2 break-words">{exp.company} | {exp.duration}</p>
        <p className="text-sm text-gray-300 break-words">{exp.description}</p>
      </motion.article>
    </div>
  )
}

const Experience = () => {
  const sceneRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [visible, setVisible] = useState(() => experiences.map(() => false))

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const thresholds = useMemo(
    () => experiences.map((_, i) => (i + 1) / experiences.length),
    []
  )

  useEffect(() => {
    if (!scrollYProgress || !scrollYProgress.onChange) return
    const unsub = scrollYProgress.onChange((v) => {
      setVisible((prev) => {
        let changed = false
        const next = prev.map((wasVisible, idx) => {
          // A card's own "start" is where it should begin appearing.
          // It stays visible for ALL v beyond that point (no matter how far
          // you scroll down), and only hides again if v drops back below
          // its own start (i.e. scrolling back up past it).
          const ownStart = idx === 0 ? 0 : thresholds[idx - 1]
          const shouldBeVisible = v > ownStart 
          if (shouldBeVisible !== wasVisible) changed = true
          return shouldBeVisible
        })
        return changed ? next : prev
      })
    })
    return () => unsub && unsub()
  }, [scrollYProgress, thresholds])

  const SCENE_HEIGHT_VH = isMobile ? 160 * experiences.length : 120 * experiences.length
  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`)

  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-0 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]"
  ]

  return (
    <section id="experience" className="relative bg-black text-white">
      <ParticlesBackground/>
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c,i) => (
           <div key={i} className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`}/>
        ))}
      </div>
      <div ref={sceneRef} className="relative" style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}>
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-2xl sm:text-4xl font-semibold mt-5 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">Experience</h2>
          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative z-20 w-full rounded" style={{ height: 6, backgroundColor: "rgba(255,255,255,0.4)" }}>
                  <motion.div className="absolute left-0 top-0 h-full bg-white rounded origin-left" style={{ width: lineSize }} />
                </div>

                <div className="relative z-0 flex justify-between items-center mt-0">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem key={idx} exp={exp} idx={idx} layout="desktop" visible={visible[idx]} />
                  ))}
                </div>
              </div>
            )}

            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute top-0 bottom-0 left-10 -translate-x-1/2 rounded z-20" style={{ width: 6, backgroundColor: "rgba(255,255,255,0.4)" }}>
                  <motion.div className="absolute top-0 left-0 w-full bg-white rounded origin-top" style={{ height: lineSize }} />
                </div>

                <div className="relative z-0 flex flex-col gap-10 ml-10 mt-6 pb-28">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem key={idx} exp={exp} idx={idx} layout="mobile" visible={visible[idx]} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience