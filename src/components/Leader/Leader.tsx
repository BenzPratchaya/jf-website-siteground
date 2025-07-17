// components/Leader/Leader.tsx
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { IconDefinition, faTwitter, faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Leader = () => {

  const Img1 = "/images/leads/lead1.jpg"
  const Img2 = "/images/leads/lead2.jpg"
  const Img3 = "/images/leads/lead3.jpg"
  const Img4 = "/images/leads/lead4.jpg"

  interface SocialLink {
    icon: IconDefinition;
    url: string;
  }

  interface LeaderData {
    id: number;
    img: string;
    title: string;
    place: string;
    url: SocialLink[];
    delay: number;
  }

  const leaderData: LeaderData[] = [
    {
      id: 1,
      img: Img1,
      title: "Kajohn Uamsiri",
      place: "Managing Director",
      url: [
      { icon: faTwitter, url: "https://twitter.com/kajohn" }, 
      { icon: faFacebookF, url: "https://facebook.com/kajohn" },
      { icon: faInstagram, url: "https://instagram.com/kajohn" },
      { icon: faLinkedinIn, url: "https://linkedin.com/in/kajohn" },
    ],
      delay: 0.2
    },
    {
      id: 2,
      img: Img2,
      title: "Adisorn Taprig",
      place: "General Manager",
      url: [
      { icon: faTwitter, url: "https://twitter.com/kajohn" },
      { icon: faFacebookF, url: "https://facebook.com/kajohn" },
      { icon: faInstagram, url: "https://instagram.com/kajohn" },
      { icon: faLinkedinIn, url: "https://linkedin.com/in/kajohn" },
    ],
      delay: 0.3
    },
    {
      id: 3,
      img: Img3,
      title: "Warong Tocharoenchai",
      place: "Services Manager",
      url: [
      { icon: faTwitter, url: "https://twitter.com/kajohn" }, 
      { icon: faFacebookF, url: "https://facebook.com/kajohn" },
      { icon: faInstagram, url: "https://instagram.com/kajohn" },
      { icon: faLinkedinIn, url: "https://linkedin.com/in/kajohn" },
    ],
      delay: 0.4
    },
    {
      id: 4,
      img: Img4,
      title: "Navarat Bunnag",
      place: "Sales Manager",
      url: [
      { icon: faTwitter, url: "https://twitter.com/kajohn" }, 
      { icon: faFacebookF, url: "https://facebook.com/kajohn" },
      { icon: faInstagram, url: "https://instagram.com/kajohn" },
      { icon: faLinkedinIn, url: "https://linkedin.com/in/kajohn" },
    ],
      delay: 0.5
    },
  ]

  return (
    <>
      <section className="container py-8 space-y-6" id="explore">
        {/* หมวดหมู่ */}
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl mt-12 pt-12 uppercase text-blue-900 font-bold tracking-widest drop-shadow-lg"
        >
          Team Leaders
        </motion.h2>
        <div className="flex justify-center mt-2 mb-8">
          <span className="inline-block w-24 h-1 rounded bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-70"></span>
        </div>

        {/* แสดงข้อมูลเมนู */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center gap-6 sm:gap-8 xl:px-8">
          {leaderData.map((item) => (
            <motion.div
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.06,
                transition: { duration: 0.4, ease: "easeInOut" }
              }}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-white w-full h-full max-w-xs flex flex-col items-center pt-6 pb-0"
              key={item.id}
            >
              {/* รูปสำหรับเมนู */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 mx-auto mb-4">
                <Image
                  className="object-cover w-full h-full"
                  src={item.img}
                  alt={item.title}
                  width={144}
                  height={144}
                  priority
                />
              </div>

              {/* ข้อมูลที่ใช้สำหรับการแสดงผลในหน้า */}
              <div className="relative w-full flex flex-col items-center px-2 sm:px-4 pb-4">
                <motion.h3
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.6
                  }}
                  viewport={{ once: true }}
                  className="text-gray-900 text-base sm:text-lg md:text-xl font-bold tracking-wider text-center drop-shadow"
                >
                  {item.title}
                </motion.h3>
                <motion.h3
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.6
                  }}
                  viewport={{ once: true }}
                  className="text-gray-600 text-xs sm:text-sm md:text-base uppercase tracking-wider text-center mb-2"
                >
                  {item.place}
                </motion.h3>
                {/* โลโก้ */}
                <div className="flex space-x-3 mt-2">
                  {item.url.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-blue-900 hover:text-blue-400 text-base sm:text-lg md:text-xl"
                    >
                      <FontAwesomeIcon
                        icon={social.icon}
                        className="bg-white/20 rounded-full p-2 w-7 h-7 flex items-center justify-center"
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Leader