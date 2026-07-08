import { FaArrowUp, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import ParticlesBackground from "../components/ParticlesBackground"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-16 text-white sm:px-8 lg:px-20">
      <ParticlesBackground/>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_45%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Portfolio</p>
          <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
            Let&apos;s build something meaningful together.
          </h3>
          <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
            I create modern, responsive web experiences with thoughtful design, smooth interactions, and clean user-focused code.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Let&apos;s Connect</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/ShroudAnkit53"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20 hover:text-white"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.instagram.com/_.ursankitttt._/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20 hover:text-white"
              >
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-kumar-sahoo-9015b9271/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20 hover:text-white"
              >
                <FaLinkedinIn />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/30 bg-white/5 text-cyan-300 transition hover:bg-cyan-500/20 hover:text-white"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Ankit Kumar Sahoo. All rights reserved.</p>
        <p>Made with React, Tailwind CSS, and a lot of coffee.</p>
      </div>
    </footer>
  )
}

export default Footer