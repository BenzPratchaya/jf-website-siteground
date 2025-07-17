// components/Contact/Contact.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFax } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white via-blue-50 to-white">
      <motion.h2
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="text-center text-3xl sm:text-4xl mt-12 pt-12 uppercase text-blue-900 font-bold tracking-widest drop-shadow-lg"
      >
        Contact Us
      </motion.h2>
      <div className="flex justify-center mt-2 mb-8">
        <span className="inline-block w-24 h-1 rounded bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-70"></span>
      </div>

      {/* ส่วนที่ 1: Info Cards */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Our Main Office */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 flex flex-col items-center text-center hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
          >
            <div className="text-blue-900 text-5xl mb-4 drop-shadow-lg">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-lg font-bold mb-2 text-blue-900 uppercase tracking-wide">Our Address</h3>
            <p className="text-sm text-gray-700">
              2521/33-26 Ladprao Road,<br />
              Khlongchaokhunsing, Wangthonglang,<br />
              Bangkok 10310, Thailand
            </p>
          </motion.div>
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 flex flex-col items-center text-center hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
          >
            <div className="text-blue-900 text-5xl mb-4 drop-shadow-lg">
              <FaPhoneAlt />
            </div>
            <h3 className="text-lg font-bold mb-2 text-blue-900 uppercase tracking-wide">Phone</h3>
            <p className="text-sm text-gray-700">
              +66 2514-0314-7
            </p>
          </motion.div>
          {/* Fax */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 flex flex-col items-center text-center hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
          >
            <div className="text-blue-900 text-5xl mb-4 drop-shadow-lg">
              <FaFax />
            </div>
            <h3 className="text-lg font-bold mb-2 text-blue-900 uppercase tracking-wide">Fax</h3>
            <p className="text-sm text-gray-700">
              +66 2514-0328
            </p>
          </motion.div>
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 flex flex-col items-center text-center hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
          >
            <div className="text-blue-900 text-5xl mb-4 drop-shadow-lg">
              <FaEnvelope />
            </div>
            <h3 className="text-lg font-bold mb-2 text-blue-900 uppercase tracking-wide">Email</h3>
            <p className="text-sm text-blue-900">
              <a href="mailto:sales@jfav.co.th" className="hover:underline">sales@jfav.co.th</a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* ส่วนที่ 2: Map + Form */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.726898697226!2d100.60831667455936!3d13.787170896474692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29dfa553d2875%3A0xc8eb628a884b0c61!2sJ.F.%20Advance%20Med!5e0!3m2!1sth!2sth!4v1750135770407!5m2!1sth!2sth"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="J.F.Advance Med Co.,Ltd. Location Map"
            ></iframe>
          </motion.div>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }} 
            className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 flex flex-col justify-center"
          >
            <form className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 shadow-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 shadow-sm"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 shadow-sm"
                required
              />
              <textarea
                placeholder="Message"
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 shadow-sm resize-none"
                required
              ></textarea>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-950 hover:bg-blue-900 text-white font-semibold px-10 py-3 rounded-lg shadow transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;