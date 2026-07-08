// import React from 'react'
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaPhp } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { FaReact } from "react-icons/fa";
import { DiNodejs } from "react-icons/di";
import { FaPython } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import {FaJava} from "react-icons/fa"
import { FaGitAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import {motion, useMotionValue} from "framer-motion"
import { useEffect, useState, useRef } from "react";
import ParticlesBackground from "../components/ParticlesBackground"

const Skills = () => {
  const skills = [
    {icon:<FaHtml5 />, name: "HTML"},
    {icon:<FaCss3Alt />, name: "CSS"},
    {icon:<IoLogoJavascript />, name: "JavaScript"},
    {icon:<FaPhp />, name: "PHP"},
    {icon:<SiMysql />, name: "MySQL"},
    {icon:<DiMongodb />, name: "MongoDB"},
    {icon:<FaReact />, name: "React"},
    {icon:<DiNodejs />, name: "Node.js"},
    {icon:<FaPython />, name: "Python"},
    {icon:<SiCplusplus />, name: "C++"},
    {icon:<FaJava />, name: "Java"},
    {icon:<FaGitAlt />, name: "Git"},
    {icon:<FaGithub />, name: "GitHub"},
  ]

  const repeated = [...skills, ...skills]

  const[dir, setDir] = useState(-1)
  const[active, setActive] = useState(false)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const touchY = useRef(null)
  const x = useMotionValue(0)

  useEffect(() => {
    const el = sectionRef.current
    if(!el) return

    const io = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting && entry.intersectionRatio > 0.1)
    },{threshold: [0.1]})

    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if(!active) return

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1)
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY)
    const onTouchMove = (e) => {
      if(touchY.current == null) return
      const delta = e.touches[0].clientY - touchY.current
      setDir(delta > 0 ? 1: -1)
      touchY.current = e.touches[0].clientY
    }
    window.addEventListener('wheel', onWheel, {passive: true})
    window.addEventListener('touchstart', onTouchStart, {passive: true})
    window.addEventListener('touchmove', onTouchMove, {passive:true})

    return() => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [active])

  useEffect(() => {
    let id 
    let last = performance.now()

    const SPEED = 80

    const tick = (now) =>{
      const dt = (now - last)/1000
      last = now
      let next = x.get() + SPEED*dir*dt
      const loop = trackRef.current?.scrollWidth/2 || 0

      if(loop){
        if(next <= -loop) next += loop
        if(next >= 0) next -= loop
      }
      x.set(next)
      id= requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  },[dir, x])

  return (
    <section ref={sectionRef} id="skills" className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden">
      <ParticlesBackground />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 blur-[120px] animate-pulse [animation-delay:0.5s]"/>
      </div>

      <motion.h2 className="text-3xl mt-5 sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My Skills
      </motion.h2>

      <motion.p className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10 text-center"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      <div className="relative w-full overflow-hidden flex justify-center">
        <motion.div ref={trackRef} className="flex gap-10 text-6xl text-[#1cd8d2]" style={{x, whiteSpace:"nowrap", willChange:"transform"}}>
          {repeated.map((s, i) => (
            <motion.div
              key={i} className="flex flex-col items-center min-w-[120px] gap-2"
              // initial={{ opacity: 0 }}
              // whileInView={{ opacity: 1 }}
              // transition={{ duration: 0.5, delay: 0.1 }}
              aria-label={s.name}
              title={s.name}
            >
              <span className="hover:scale-120 transition-transform duration-300">{s.icon}</span>
              <p className="text-sm">{s.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills