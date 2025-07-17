import { motion } from 'framer-motion';
import React from 'react';
import { FaLightbulb, FaBullseye, FaEye } from 'react-icons/fa';

const MissionVision = () => {
  return (
    <div className="bg-gray-50 py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl uppercase text-blue-900 font-bold tracking-widest drop-shadow-lg"
        >
          Our Mission
        </motion.h2>
        <div className="flex justify-center mt-2 mb-8 sm:mb-12">
          <span className="inline-block w-24 h-1 rounded bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-70"></span>
        </div>

        {/* Mission, Vision, Goals Flow */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center space-y-2 md:space-y-0 lg:space-x-4">
          {/* Mission Circle */}
          <div className="relative z-10 w-full max-w-sm"> {/* Added max-w-sm for better control on smaller screens */}
            <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 relative mx-auto"> {/* Adjusted sizes */}
              {/* Outer Ring - Mission */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '4px solid transparent',
                  backgroundImage: 'linear-gradient(to right, #DC2626 30%, transparent 50%)', // Mobile: ครึ่งซ้าย (Red-500)
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'content-box, border-box',
                }}
              ></div>
              {/* Overlay div for desktop to override mobile styles */}
              <div
                className="hidden md:block absolute inset-0 rounded-full"
                style={{
                  border: '4px solid transparent',
                  backgroundImage: 'linear-gradient(to top, transparent 10%, #DC2626 100%)', // Desktop: ครึ่งบน (Red-500)
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'content-box, border-box',
                }}
              ></div>

              {/* Inner Content */}
              <div className="absolute inset-4 sm:inset-6 bg-white rounded-full shadow-lg flex flex-col items-center justify-center p-6 sm:p-8 text-center"> {/* Adjusted inset and padding */}
                <div className="mb-3 sm:mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full mb-2 sm:mb-3">
                    <FaLightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <div className="bg-red-500 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-full font-bold text-xs sm:text-sm">
                    MISSION
                  </div>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Our goal is to facilitate our customers’ business, by offering them excellent products.
                </p>
              </div>
            </div>
          </div>

          {/* Vision Circle */}
          <div className="relative z-10 w-full max-w-sm">
            <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 relative mx-auto">
              {/* Outer Ring - Vision */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '4px solid transparent',
                  backgroundImage: 'linear-gradient(to left, #06B6D4 30%, transparent 50%)', // Mobile: ครึ่งขวา (Cyan-500)
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'content-box, border-box',
                }}
              ></div>
              {/* Overlay div for desktop to override mobile styles */}
              <div
                className="hidden md:block absolute inset-0 rounded-full"
                style={{
                  border: '4px solid transparent',
                  backgroundImage: 'linear-gradient(to top, #06B6D4 10%, transparent 100%)', // Desktop: ครึ่งล่าง (Cyan-500)
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'content-box, border-box',
                }}
              ></div>

              {/* Inner Content */}
              <div className="absolute inset-4 sm:inset-6 bg-white rounded-full shadow-lg flex flex-col items-center justify-center p-6 sm:p-8 text-center">
                <div className="mb-3 sm:mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-cyan-100 rounded-full mb-2 sm:mb-3">
                    <FaEye className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500" />
                  </div>
                  <div className="bg-cyan-500 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-full font-bold text-xs sm:text-sm">
                    VISION
                  </div>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Creating a trustworthy and dependable experience through outstanding products and services for our customers.
                </p>
              </div>
            </div>
          </div>

          {/* Goals Circle */}
          <div className="relative z-10 w-full max-w-sm">
            <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 relative mx-auto">
              {/* Outer Ring - Values (Changed to Goals for consistency with text) */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '4px solid transparent',
                  backgroundImage: 'linear-gradient(to right, #F97316 30%, transparent 50%)', // Mobile: ครึ่งซ้าย (Orange-500)
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'content-box, border-box',
                }}
              ></div>
              {/* Overlay div for desktop to override mobile styles */}
              <div
                className="hidden md:block absolute inset-0 rounded-full"
                style={{
                  border: '4px solid transparent',
                  backgroundImage: 'linear-gradient(to top, transparent 10%, #F97316 100%)', // Desktop: ครึ่งบน (Orange-500)
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'content-box, border-box',
                }}
              ></div>

              {/* Inner Content */}
              <div className="absolute inset-4 sm:inset-6 bg-white rounded-full shadow-lg flex flex-col items-center justify-center p-6 sm:p-8 text-center">
                <div className="mb-3 sm:mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full mb-2 sm:mb-3">
                    <FaBullseye className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  </div>
                  <div className="bg-orange-500 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-full font-bold text-xs sm:text-sm">
                    GOALS
                  </div>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  We provide the best choice to our customers with professional services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;