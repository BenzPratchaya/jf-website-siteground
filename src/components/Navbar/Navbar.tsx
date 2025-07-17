// components/Navbar/Navbar.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { FaBars, FaTimes } from 'react-icons/fa';
import React from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const jfLogo = "/images/LOGO-JF.png"
  const navMenu = "whitespace-nowrap hover:underline text-base md:text-sm lg:text-md p-2";

  // รูปแบบแอนิเมชั่นสำหรับเมนู (การเลื่อนจากขวาไปซ้าย) ใช้สำหรับเมนูในมือถือ
  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "tween", duration: 0.3 } },
    exit: { x: "100%", transition: { type: "tween", duration: 0.3 } }
  };

  // รูปแบบแอนิเมชั่นสำหรับรายการเมนู (การเลื่อนขึ้นลง) ใช้สำหรับรายการเมนูในมือถือ
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // ฟังก์ชันสำหรับสลับสถานะของเมนู (เปิด/ปิด) และจัดการการเลื่อนของ body
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-7 sm:h-9 md:h-11 flex items-center justify-center z-50 bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="container flex items-center justify-between w-full h-full px-2 sm:px-4">
        {/* Logo Section (ฝั่งซ้าย) */}
        <motion.div
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
        >
          <Link href={"/"} onClick={() => setIsOpen(false)}>
            <Image
              className="w-[110px] xs:w-[120px] sm:w-[135px] md:w-[140px] lg:w-[150px] h-auto object-contain"
              priority={true}
              src={jfLogo}
              alt="J.F.Advance Med Co.,Ltd. Logo"
              width={150}
              height={50}
            />
          </Link>
        </motion.div>

        {/* Navigation Menu (ฝั่งขวา) */}
        {/* Desktop Menu */}
        {/* เปลี่ยนจาก justify-between เป็น justify-center สำหรับ container และลบ justify-between ออกจาก div ที่ครอบเมนูหลัก */}
        <div className="hidden md:flex flex-grow justify-center items-center gap-3 lg:gap-6 text-gray-800">
          <motion.div initial="hidden" animate="visible" whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }} className={navMenu}>
            <Link href={"/"}>Home</Link>
          </motion.div>
          <motion.div initial="hidden" animate="visible" whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }} className={navMenu}>
            <Link href={"/about"}>About</Link>
          </motion.div>
          <motion.div initial="hidden" animate="visible" whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }} className={navMenu}>
            <Link href={"/products"}>Products</Link>
          </motion.div>
          <motion.div initial="hidden" animate="visible" whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }} className={navMenu}>
            <Link href={"/news"}>News</Link>
          </motion.div>
          <motion.div initial="hidden" animate="visible" whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }} className={navMenu}>
            <Link href={"/contact"}>Contact</Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button - ย้ายไปอยู่ขวาสุดเสมอ */}
        <div className="md:hidden z-50">
          <button onClick={toggleMenu} className={`text-sm focus:outline-none ${isOpen ? 'text-white' : 'text-gray-800'}`}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 h-screen w-screen bg-blue-950 bg-opacity-90 flex flex-col items-center justify-center space-y-8 z-40 md:hidden"
          >
            <motion.ul className="space-y-6 text-xl xs:text-2xl sm:text-3xl"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Product", href: "/products" },
                { name: "News", href: "/news" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <motion.li key={item.name} variants={listItemVariants} onClick={toggleMenu}>
                  <Link href={item.href} className="block text-center text-white hover:text-gray-300 transition-colors">
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar