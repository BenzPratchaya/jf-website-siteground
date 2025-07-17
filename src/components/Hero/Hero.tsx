// components/Hero/Hero.tsx
"use client"

import { useState, useEffect } from "react"

const images = [
  "/images/hero/hero_bg5.jpg",
  "/images/hero/hero_bg2.jpg",
  "/images/hero/hero_bg3.jpg",
]

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      className="relative w-full min-h-[480px] md:min-h-[580px] lg:min-h-[680px] flex items-center bg-blue-950"
    >
      {/* พื้นหลังภาพฝั่งขวา */}
      <div
        className="hidden md:block absolute top-0 right-0 h-full w-1/2"
        style={{
          backgroundImage: `url('${images[currentImageIndex]}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-blue-950/80 to-transparent" />
      </div>
      {/* พื้นหลังภาพเต็มจอบนมือถือ */}
      <div
        className="block md:hidden absolute inset-0"
        style={{
          backgroundImage: `url('${images[currentImageIndex]}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div className="absolute inset-0 bg-blue-950/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full md:w-1/2 px-6 md:px-16 py-16 flex flex-col justify-center">
        <span className="block text-2xl md:text-3xl font-bold text-blue-300 mb-4 drop-shadow">JF Advance Med.</span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
          <span>Innovative&nbsp;</span>
          <span className="text-blue-400">X-ray & PACS</span>
          <span>&nbsp;Solutions</span>
          <br />
          <span className="text-blue-200">for Every Life</span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded mb-8" />
        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-xl">
          We deliver advanced medical imaging and PACS technology for precise diagnosis and better healthcare, trusted by leading hospitals in Thailand.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center bg-blue-300 hover:bg-blue-800 text-blue-900 hover:text-blue-300 font-semibold text-base px-6 py-3 rounded-md shadow-md transition-all duration-300 w-auto max-w-xs"
        >
          Contact Us
        </a>
      </div>
    </section>
  )
}

export default Hero