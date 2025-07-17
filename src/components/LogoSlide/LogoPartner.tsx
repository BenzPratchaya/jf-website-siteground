// components/LogoSlide/LogoPartner.tsx
"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import Image from "next/image"

const LogoPartner = () => {

  const fujifilmLogo = "/images/logos_partner/fujifilm_logo.png"
  const mbitsLogo = "/images/logos_partner/mbits_logo.png"
  const mindrayLogo = "/images/logos_partner/mindray_logo.png"
  const samsungLogo = "/images/logos_partner/samsung_logo.png" 
  const synapseLogo = "/images/logos_partner/synapse_logo.png"
  const vieworksLogo = "/images/logos_partner/vieworks_logo.png"
  const geLogo = "/images/logos_partner/ge_logo.png"
  const uritLogo = "/images/logos_partner/urit_logo.png"
  const lunitLogo = "/images/logos_partner/lunit_logo.png"
  const vinnoLogo = "/images/logos_partner/vinno_logo.png"

  // โลโก้ประเภทและข้อมูลที่ใช้สำหรับการแสดงผล
  type StackLogoType = {
    stack: string;
    logoSrc: string;
    altText: string;
    className: string;
    variants: Variants
  }

  // ฟังก์ชันสำหรับสร้าง Variants ของโลโก้ ใช้สำหรับการเคลื่อนไหวของโลโก้ในแต่ละช่วง
  const iconVariants = (duration: number): Variants => ({
    initial: { y: -10 },
    animate: {
      y: [10, -10],
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "reverse" as const,
      }
    }
  })

  // ข้อมูลโลโก้ที่ใช้สำหรับการแสดงผลในหน้า Partner
  const StackLogos: StackLogoType[] = [
    {
      stack: "Fujifilm",
      logoSrc: fujifilmLogo,
      altText: "Fujifilm Logo",
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(2),
    },
    {
      stack: "Mbits",
      logoSrc: mbitsLogo,
      altText: "Mbits Logo", 
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(3),
    },
    {
      stack: "Mindray",
      logoSrc: mindrayLogo,
      altText: "Mindray Logo",
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(5),
    },
    {
      stack: "Samsung",
      logoSrc: samsungLogo,
      altText: "Samsung Logo",
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(2),
    },
    {
      stack: "Synapse",
      logoSrc: synapseLogo,
      altText: "Synapse Logo",
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(3),
    },
    {
      stack: "Vieworks",
      logoSrc: vieworksLogo,
      altText: "Vieworks Logo",
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(5),
    },
    {
      stack: "GE",
      logoSrc: geLogo,
      altText: "Ge Logo",
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(5),
    },
    {
      stack: "Urit",
      logoSrc: uritLogo,
      altText: "Urit Logo",
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(5),
    },
    {
      stack: "Lunit",
      logoSrc: lunitLogo,
      altText: "Lunit Logo",
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(5),
    },
    {
      stack: "Vinno",
      logoSrc: vinnoLogo,
      altText: "Vinno Logo",
      className: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain",
      variants: iconVariants(5),
    },
  ];

  return (
    <>
      <div className="py-12 mt-4 bg-gradient-to-b from-gray-100 via-white to-gray-50">
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl uppercase text-blue-900 font-bold tracking-widest drop-shadow-lg"
        >
          Partnership
        </motion.h2>
        <div className="flex justify-center mt-2 mb-12">
          <span className="inline-block w-24 h-1 rounded bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-70"></span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 px-4">
          {StackLogos.map((item, index) => (
            <motion.div
              variants={item.variants}
              initial="initial"
              animate="animate"
              className="flex items-center justify-center p-4 bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 group"
              key={index}
            >
              <Image
                width={100}
                height={100}
                src={item.logoSrc}
                alt={item.altText}
                className={item.className + " group-hover:scale-110 transition-transform duration-300"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

export default LogoPartner