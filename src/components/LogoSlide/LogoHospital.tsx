// components/LogoSlide/LogoHospital.tsx
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode } from "swiper/modules"
import "swiper/css"
import "swiper/css/free-mode"

const LogoHospital = () => {
  const techStack = [
    { imageUrl: "/images/logos_hospital/chula_logo.png", alt: "Chulalongkorn University Logo" },
    { imageUrl: "/images/logos_hospital/cmu_logo.png", alt: "Chiang Mai University Logo" },
    { imageUrl: "/images/logos_hospital/cph_logo.png", alt: "CPH Logo" },
    { imageUrl: "/images/logos_hospital/kku_logo.png", alt: "Khon Kaen University Logo" },
    { imageUrl: "/images/logos_hospital/lph_logo.png", alt: "LPH Logo" },
    { imageUrl: "/images/logos_hospital/MU_logo.png", alt: "Mahidol University Logo" },
    { imageUrl: "/images/logos_hospital/NTV_logo.png", alt: "NTV Logo" },
    { imageUrl: "/images/logos_hospital/paolo_spk_logo.png", alt: "Paolo Hospital Samut Prakan Logo" },
    { imageUrl: "/images/logos_hospital/pcmc_logo.png", alt: "PCMC Logo" },
    { imageUrl: "/images/logos_hospital/pednat_logo.png", alt: "Pednat Logo" },
    { imageUrl: "/images/logos_hospital/PIH_logo.png", alt: "PIH Logo" },
    { imageUrl: "/images/logos_hospital/pr9_logo.png", alt: "PR9 Logo" },
    { imageUrl: "/images/logos_hospital/psu_logo.png", alt: "Prince of Songkla University Logo" },
    { imageUrl: "/images/logos_hospital/pyt_logo.png", alt: "PYT Logo" },
    { imageUrl: "/images/logos_hospital/qsm_logo.png", alt: "QSM Logo" },
    { imageUrl: "/images/logos_hospital/rjh_logo.png", alt: "RJH Logo" },
    { imageUrl: "/images/logos_hospital/rm_logo.png", alt: "RM Logo" },
    { imageUrl: "/images/logos_hospital/siph_logo.png", alt: "Siph Logo" },
    { imageUrl: "/images/logos_hospital/siriraj_logo.png", alt: "Siriraj Hospital Logo" },
    { imageUrl: "/images/logos_hospital/smsk_logo.png", alt: "SMSK Logo" },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-b from-white to-gray-200"
      >
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl mt-12 pt-12 uppercase text-blue-900 font-bold tracking-widest drop-shadow-lg"
        >
          our clients
        </motion.h2>
        <div className="flex justify-center mt-2 mb-8">
          <span className="inline-block w-24 h-1 rounded bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-70"></span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-2xl shadow-xl bg-white/70 backdrop-blur-md p-4 sm:p-8">
            <Swiper
              modules={[Autoplay, FreeMode]}
              slidesPerView={2}
              spaceBetween={24}
              freeMode={true}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              speed={4000}
              breakpoints={{
                480: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
                1280: { slidesPerView: 8 },
              }}
              className="my-8"
            >
              {[...techStack, ...techStack].map((item, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] mx-2 sm:mx-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-400">
                    <Image
                      src={item.imageUrl}
                      alt={item.alt || `Logo ${index}`}
                      width={100}
                      height={100}
                      className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default LogoHospital