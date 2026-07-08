// import React from 'react'
import {motion, AnimatePresence} from "framer-motion"
import {FiX} from "react-icons/fi"
const OverlayMenu = ({isOpen, onClose, menuOrigin = "50% 50%"}) => {
  return (
    <AnimatePresence>
        {isOpen && (
            <motion.div className="fixed inset-0 flex items-center justify-center z-50"
             initial={{clipPath: `circle(0% at ${menuOrigin})`}}
             animate={{clipPath: `circle(150% at ${menuOrigin})`}}
             exit={{clipPath: `circle(0% at ${menuOrigin})`}}
             transition={{duration: 0.7, ease: [0.4, 0, 0.2, 1]}}
             style={{background: "rgba(0, 0, 0, 0.95)"}}
            >
               <button onClick={onClose} className="absolute top-6 right-6 text-white text-3xl" aria-label="Close Menu"><FiX /></button>
               <ul className="space-y-6 text-center">
                {["Home", "About", "Skills", "Projects", "Experience","Contact"].map((item, index) => (
                    <motion.li key={index} className="text-2xl font-semibold cursor-pointer hover:text-pink-500 transition-colors duration-300" onClick={onClose} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}} transition={{delay:0.3 + index * 0.1}}>
                        <a href={`#${item.toLowerCase()}`} onClick={onClose} className="text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300">{item}</a>
                    </motion.li>
                ))}
               </ul>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default OverlayMenu