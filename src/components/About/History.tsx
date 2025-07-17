// src/app/about/page.tsx
"use client"

import { motion } from 'framer-motion';
import React from 'react';

const timelineEvents = [
  {
    date: '2537',
    title: 'The Beginning of the Company',
    details: "J.F. Advanced COMPANY was founded with a clear vision to capitalize on the benefits and opportunities within the Medical Business sector. At its establishment in 2537 (1994), there was no leading Thai national supplier of medical services for the X-ray department, a gap we aimed to fill.",
  },
  {
    date: '2544',
    title: 'A Major Transformation',
    details: "Since 2544 (2001), we have been consistently chosen to install advanced digital radiography management and transfer systems (integral to X-ray department information technology) in numerous hospitals. This reflects the deep trust our target customers place in our products and services.",
  },
  {
    date: '2568',
    title: 'Currently',
    details: "In recent years, our company has been selected for installations in medical schools nationwide. We have also expanded our services to include comprehensive IT products, supported by our highly experienced and strong sales and maintenance teams.",
  },
];

const History = () => {
  return (
    <div
      className="min-h-screen py-16 px-6 sm:px-10 lg:px-12 relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/about/about.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Semi-transparent overlay for better text readability and visual depth */}
      <div className="absolute inset-0 bg-black opacity-75"></div>

      <div className="max-w-5xl mx-auto relative z-10 pt-16 md:pt-24 pb-10">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center text-3xl sm:text-4xl uppercase text-blue-300 font-bold tracking-widest drop-shadow-lg"
        >
          Our Journey
        </motion.h2>
        <div className="flex justify-center mt-2 mb-8">
          <span className="inline-block w-24 h-1 rounded bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-70"></span>
        </div>

        <div className="relative">
          {/* Timeline Vertical Line (only for md and up) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-blue-400 to-transparent h-full top-0"></div>

          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`mb-20 flex flex-col items-start relative ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot (for md and up) */}
              <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 -mt-2 items-center justify-center w-8 h-8 rounded-full bg-blue-500 border-4 border-blue-200 shadow-xl z-20">
                <span className="w-3 h-3 rounded-full bg-white animate-pulse"></span>
              </div>

              {/* Date Column */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -70 : 70 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.6 }}
                className={`w-full md:w-1/2 flex-shrink-0 mb-4 md:mb-0 ${
                  index % 2 === 0 ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'
                }`}
              >
                <div className="text-blue-200 text-6xl sm:text-7xl font-semibold py-3 md:py-4 leading-none text-center md:inline-block drop-shadow-xl">
                  {event.date}
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 70 : -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.6 }}
                className={`flex-grow w-full md:w-1/2 bg-white bg-opacity-95 p-6 sm:p-8 rounded-xl shadow-2xl transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-700 hover:bg-opacity-95 group transform hover:-translate-y-2 hover:scale-[1.02] ${
                  index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                }`}
              >
                <p className="text-2xl sm:text-3xl font-bold text-blue-700 mb-3 group-hover:text-white transition-colors duration-300">
                  {event.title}
                </p>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed group-hover:text-blue-100 transition-colors duration-300">
                  {event.details}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;