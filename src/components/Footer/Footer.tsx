// components/Footer/Footer.tsx
"use client"

import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaLinkedin, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa"
import { motion } from "framer-motion"
import Image from "next/image"

export const Footer = () => {

  return (
    <>
      {/* Footer section */}
      {/* ใช้ Container เพื่อจัดเนื้อหาให้อยู่ตรงกลางและเพิ่มช่องว่าง */}
      <div className="bg-blue-950 pt-12 pb-6 text-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <CompanyDetails />
            <FooterLinks />
            <SocialMedia />
          </div>
        </div>
        <p className="text-white font-extralight text-center mt-8 pt-6 border-t border-gray-600/50 justify-center text-sm">&copy; 2025 J.F.Advance Med Co.,Ltd.. All Rights Reserved.</p> {/* text-sm for copyright */}
      </div>
    </>
  )
}

// ฟังก์ชันสำหรับแสดงรายละเอียดบริษัท
function CompanyDetails() {

  const jfLogo = "/images/LOGO-JF-White.png"

  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.6
      }}
      viewport={{ once: true }  }
      className="space-y-6 text-center md:text-left">
        <Image
          src={jfLogo}
          width={80}
          height={40}
          alt="JF Logo"
          className="w-40 h-auto object-contain mx-auto md:mx-0"
        />
        <div className="space-y-4 text-sm">
          <p className="font-extralight flex items-center justify-center md:justify-start gap-4">
            <FaPhone className="text-xl"/>
            +66 2514-0314-7
          </p>
          <p className="font-extralight flex items-start justify-center md:justify-start gap-4">
            <FaMapMarkedAlt className="text-3xl"/>
            2521/33-36 Ladprao Road, Khlongchaokhunsing, Wangthonglang, Bangkok 10310, Thailand
          </p>
          <p className="font-extralight flex items-center justify-center md:justify-start gap-4">
            <FaEnvelope className="text-xl"/>
            sales@jfav.co.th
          </p>
        </div>
      </motion.div>
    </>
  )
}

// ฟังก์ชันสำหรับแสดงลิงก์ใน Footer ปรับให้มี 2 คอลัมน์บนหน้าจอขนาดกลางขึ้น
function FooterLinks() {
  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.6
      }}
      viewport={{ once: true }  }
      className="space-y-6 text-center md:text-left">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* คอลัมน์แรก */}
          <div>
            <h1 className="text-xl tracking-wider mb-4 mx-auto md:mx-0">Useful Links</h1>
            <ul className="space-y-2">
              <li className="font-extralight cursor-pointer hover:text-gray-300 transition-colors duration-200">Home</li>
              <li className="font-extralight cursor-pointer hover:text-gray-300 transition-colors duration-200">About Us</li>
              <li className="font-extralight cursor-pointer hover:text-gray-300 transition-colors duration-200">Services</li>
              <li className="font-extralight cursor-pointer hover:text-gray-300 transition-colors duration-200">Terms of Service</li>
              <li className="font-extralight cursor-pointer hover:text-gray-300 transition-colors duration-200">Privacy Policy</li>
            </ul>
          </div>

          {/* คอลัมน์สอง */}
          <div className="mt-8 md:mt-0">
            <h2 className="text-xl tracking-wider mb-4">Our Services</h2>
            <ul className="space-y-2">
              <li className="font-extralight cursor-pointer hover:text-gray-300 transition-colors duration-200">Web Design</li>
              <li className="font-extralight cursor-pointer hover:text-gray-300 transition-colors duration-200">Web Development</li>
              <li className="font-extralight cursor-pointer hover:text-gray-300 transition-colors duration-200">Product Management</li>
              <li className="font-extralight cursor-pointer hover:text-gray-300 transition-colors duration-200">Marketing</li>
              <li className="font-extralight cursor-pointer hover:text-gray-300 transition-colors duration-200">Graphic Design</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  )
}

// ฟังก์ชันสำหรับแสดงไอคอนโซเชียลมีเดีย
function SocialMedia() {
  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.4,
        duration: 0.6
      }}
      viewport={{ once: true }  }
      className="space-y-6 text-center md:text-left">
        <h1 className="text-xl tracking-wider">Follow Us</h1>

        {/* ไอคอนโซเชียลมีเดีย */}
        <div className="flex items-center justify-center md:justify-start gap-4"> 
          <FaFacebook className="text-3xl hover:scale-110 transition-all duration-300 cursor-pointer"/>
          <FaInstagram className="text-3xl hover:scale-110 transition-all duration-300 cursor-pointer"/>
          <FaTwitter className="text-3xl hover:scale-110 transition-all duration-300 cursor-pointer"/>
          <FaLinkedin className="text-3xl hover:scale-110 transition-all duration-300 cursor-pointer"/>
        </div>
      </motion.div>
    </>
  )
}