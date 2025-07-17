"use client";

import React from "react";
import Image from "next/image";

const images = [
  "/images/latestproduct/test1.png",
  "/images/latestproduct/test2.png",
  "/images/latestproduct/test3.png",
  "/images/latestproduct/test4.png",
  "/images/latestproduct/test5.png",
  "/images/latestproduct/test6.png",
];

const LatestProduct = () => {
  return (
    <section className="py-4 px-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3">
        {" "}
        {/* Increased gap for better spacing */}
        {images.map((image, index) => (
          <div
            key={index}
            className="shadow-lg p-6 sm:p-8 flex flex-col justify-end items-center text-center border relative overflow-hidden"
            style={{ paddingTop: "75%" }} // Example: 4:3 aspect ratio
          >
            <Image
              src={image}
              alt="product image"
              fill
              className="absolute inset-0 w-full h-full z-0"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestProduct;