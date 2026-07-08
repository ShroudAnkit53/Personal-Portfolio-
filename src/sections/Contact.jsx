import emailjs from "@emailjs/browser"
import { useRef, useState } from "react"
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import ParticlesBackground from "../components/ParticlesBackground"
import Astra from "../assets/Astra.png"

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

const Contact = () => {
  const form = useRef(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    const fieldName = name === "user_name" ? "name" : name === "user_email" ? "email" : name
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email"
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      setStatus("Please fill out the form correctly.")
      return
    }

    setIsSending(true)
    setStatus("")

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          user_name: formData.name,
          name: formData.name,
          from_email: formData.email,
          user_email: formData.email,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        {
          publicKey: PUBLIC_KEY,
        }
      )

      setStatus("Thanks! Your message has been sent successfully.")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setErrors({})
    } catch (error) {
      console.error("EmailJS error:", error)
      setStatus("Sorry, your message could not be sent. Please try again later.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full overflow-hidden bg-black px-6 py-20 text-white md:px-20"
    >
      <ParticlesBackground />

      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[90px] sm:blur-[130px] md:blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10 blur-[90px] sm:blur-[130px] md:blur-[150px] animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 md:grid md:grid-cols-2 md:items-center">
        <div className="flex w-full justify-center md:justify-start">
          <div className="w-full max-w-[22rem] sm:max-w-md">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cyan-500/20 to-transparent p-2 shadow-[0_0_40px_rgba(34,211,238,0.15)] sm:p-3">
              <img
                src={Astra}
                alt="Contact illustration"
                className="h-[280px] w-full rounded-[1.2rem] object-cover sm:h-[360px] md:h-[420px] animate-[float_3s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </div>

        <div className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Let&apos;s talk</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Contact Me</h2>
          <p className="mt-3 text-sm leading-7 text-gray-300 sm:text-base">
            Have a project in mind or want to work together? Send me a message and I&apos;ll get back to you soon.
          </p>

          <form ref={form} onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input
                  type="text"
                  name="user_name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none ring-0 transition placeholder:text-gray-400 focus:border-cyan-400"
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="user_email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-cyan-400"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-cyan-400"
              />
              {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-cyan-400"
              />
              {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-cyan-700"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>

          

          {status && <p className="mt-4 text-sm text-cyan-300">{status}</p>}
        </div>
      </div>
    </section>
  )
}

export default Contact