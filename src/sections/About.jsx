// import React from 'react'
import {AnimatePresence, motion} from "framer-motion"
import {useEffect, useState} from "react"
import profile1 from "../assets/profile1.jpeg"
import profile2 from "../assets/profile2.jpeg"
import ParticlesBackground from "../components/ParticlesBackground"

const About = () => {
  const [imageIndex, setImageIndex] = useState(0)
  const images = [profile1, profile2]

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [images.length])
  const stats = [
    {label: "Speciality", value: "Full Stack"},
    {label: "Focus", value: "Performance & UX"},
  ]
  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-0 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]"
  ]
  return (
    <section id="about" className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden">
      <ParticlesBackground />
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c,i) => (
           <div key={i} className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`}/>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        <motion.div className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
        inital={{opacity: 0, y: 24}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.8}}
        viewport={{once: true, amount: 0.4}}>
          <motion.div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1cd8d2]/20 via-[#302b63]/20 border to-[#1cd8d2]/25"
          whileHover={{scale: 1.05}}
          transition={{type: "spring", stiffness: 200, damping: 10}}>
            <AnimatePresence mode="wait">
              <motion.img
                key={images[imageIndex]}
                src={images[imageIndex]}
                alt="Profile"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{opacity: 0, scale: 0.96}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 1.04}}
                transition={{duration: 0.6, ease: "easeInOut"}}
              />
            </AnimatePresence>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]">
              Ankit Kumar Sahoo
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">Full Stack Developer</p>
            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl mx-auto md:mx-0">I'm a passionate full-stack developer with a strong focus on creating scalable and maintainable web applications. I have experience working with various technologies and frameworks to deliver high-quality solutions.</p>
            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl mx-auto md:mx-0">My expertise lies in building modern web applications with a keen eye for performance, user experience, and clean architecture. I enjoy collaborating with cross-functional teams to bring ideas to life and solve complex problems.</p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto md:mx-0">
              {stats.map((item, i) => (
                <motion.div key={i} className="rounded-xl border-white/10 bg-white/5 px-4 py-3 text-center"
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.4, delay: 0.05*i}}
                viewport={{once: true, amount: 0.3}}>
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold">{item.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start items-center md:items-start">
              <a href="#projects" className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition">View Projects</a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg bg-transparent border border-white text-white font-semibold px-5 py-3 hover:bg-white/10 transition">Get In Touch</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About