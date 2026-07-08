// import React from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useState, useEffect } from "react"

const IntroAnimation = ({ onFinish }) => {
  const greetings = useMemo(() => [
    "Hello", "नमस्ते", "Hola", "Bonjour",
    "Ciao", "Olá", "Здравствуйте",
    "Merhaba", "Γειά", "Hej", "Hallo", "Salam"
  ], [])

  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setInterval(() => setIndex((i) => i + 1), 140)
      return () => clearInterval(id)
    } else {
      const t = setTimeout(() => setVisible(false), 900)
      return () => clearTimeout(t)
    }
  }, [index, greetings.length])

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050816] text-white"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(48,43,99,0.22),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(0,191,143,0.2),_transparent_40%)]" />

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[70vh] sm:w-[70vh]" />
            <div className="absolute left-1/2 top-1/2 h-[44vh] w-[44vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1cd8d2]/30 sm:h-[58vh] sm:w-[58vh]" />
          </motion.div>

          <motion.div
            className="absolute h-48 w-48 rounded-full bg-[#1cd8d2]/20 blur-[90px] sm:h-72 sm:w-72 sm:blur-[120px]"
            animate={{ scale: [1, 1.25, 1], x: [0, 32, -24, 0], y: [0, -20, 18, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-40 w-40 rounded-full bg-[#302b63]/20 blur-[90px] sm:h-64 sm:w-64 sm:blur-[120px]"
            animate={{ scale: [1.1, 0.95, 1.1], x: [0, -28, 22, 0], y: [0, 24, -16, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center sm:px-8">
            <motion.div
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_60px_rgba(28,216,210,0.2)] backdrop-blur-xl sm:mb-8 sm:h-24 sm:w-24"
              animate={{ rotate: 360, scale: [1, 1.06, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="h-10 w-10 rounded-full border-4 border-transparent border-t-[#1cd8d2] border-r-[#302b63] sm:h-12 sm:w-12"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            <motion.h1
              key={index}
              className="bg-gradient-to-r from-[#1cd8d2] via-white to-[#302b63] bg-clip-text text-4xl font-bold tracking-[0.16em] text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {greetings[index]}
            </motion.h1>

            <motion.p
              className="mt-3 text-[10px] uppercase tracking-[0.3em] text-gray-400 sm:text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              Loading portfolio
            </motion.p>

            <div className="mt-6 flex w-56 items-center justify-center sm:mt-8 sm:w-64">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute left-0 top-0 h-full w-full rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="h-2.5 w-2.5 rounded-full bg-[#1cd8d2]/80"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.2 }}
                />
              ))}
            </div>

            <motion.p
              className="mt-3 max-w-[90vw] text-center text-[10px] uppercase tracking-[0.24em] text-gray-400 sm:text-[11px] md:text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              “Any sufficiently advanced technology is indistinguishable from magic.”
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroAnimation