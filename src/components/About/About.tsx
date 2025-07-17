// components/About/About.tsx
"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const About = () => {

  const aboutImage = "/images/about/about.jpg"

  return (
    <div className="bg-gray-100 min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center mt-4">
      <section id="about" className="py-8">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl uppercase text-blue-900 font-bold tracking-widest drop-shadow-lg"
        >
          About Us
        </motion.h2>
        <div className="flex justify-center mt-2 mb-8">
          <span className="inline-block w-24 h-1 rounded bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-70"></span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-12 p-4 ">
          {/* ฝั่งซ้าย: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.7
            }}
            viewport={{ once: true }}
            className="text-center md:text-left md:w-1/2 space-y-6 mb-8 md:mb-0"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-blue-900 mb-4 tracking-wide drop-shadow">
              WHY JF ADVANCE MED
            </h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              J.F. Advanced caused by the appreciation of the benefits and opportunities. Business Medical At the time the company was established (in the year.. 2537) there is no company that is. Thailand is a leading supplier Nationality And medical services for the X-ray department and the Company is a major change in the year.. Since 2544
            </p>
            <a
              href="/about"
              className="inline-block mt-2 px-6 py-2 rounded-full border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-semibold shadow transition-all duration-300"
            >
              Read More
            </a>
          </motion.div>

          {/* ฝั่งขวา: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.7
            }}
            viewport={{ once: true }}
            className="md:w-1/2 flex justify-center items-center"
          >
            <div className="relative group">
              <Image
                width={600}
                height={500}
                src={aboutImage}
                alt="aboutImage"
                className="max-w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About;