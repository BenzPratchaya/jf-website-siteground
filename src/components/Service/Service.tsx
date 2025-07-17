// src/components/Service/Service.tsx
"use client"

import { motion } from "framer-motion"
import React from "react"
import { FaInstalod, FaScrewdriver, FaLightbulb } from "react-icons/fa"

const services = [
  {
    icon: <FaInstalod className="text-4xl mb-4" />, 
    title: "Installation & Commissioning",
    desc: "Ensure seamless integration and optimal performance from day one. Our skilled engineers provide precise installation, thorough testing, and initial operational setup for all your medical equipment.",
  },
  {
    icon: <FaScrewdriver className="text-4xl mb-4" />, 
    title: "Preventive Maintenance & Calibration Contracts",
    desc: "Maximize equipment lifespan and accuracy with our tailored service contracts. We offer proactive maintenance, regular calibration, and prompt technical support to guarantee reliable, compliant, and continuous operation.",
  },
  {
    icon: <FaLightbulb className="text-4xl mb-4" />, 
    title: "Consulting & Technical Training",
    desc: "Empower your medical staff with essential knowledge and skills. We provide hands-on training for equipment operation, basic troubleshooting, and offer expert consultation to optimize workflow and enhance diagnostic capabilities.",
  },
]

const Service = () => {
  return (
    <section 
      className="py-14 mt-4 bg-cover bg-center" // Add bg-cover and bg-center for background image
      style={{ backgroundImage: "url('/images/hero/cta_bg.jpg')" }} // Add your image path here
    >
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl uppercase text-white font-bold tracking-widest drop-shadow-lg" // Changed text color to white for better contrast
        >
          Service
        </motion.h2>
        <div className="flex justify-center mt-2 mb-8">
          <span className="inline-block w-24 h-1 rounded bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-70"></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              key={i}
              className="group rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 bg-gray-100 text-blue-900 hover:bg-blue-900 hover:text-white hover:shadow-xl"
            >
              <div>
                {React.cloneElement(s.icon, {
                  className: `${s.icon.props.className || ''} ${ "text-blue-900 group-hover:text-white"}`
                })}
              </div>
              <h3 className="font-bold text-lg mb-2 text-blue-900 group-hover:text-white">{s.title}</h3>
              <p className="mb-6 text-gray-500 group-hover:text-blue-100">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Service;