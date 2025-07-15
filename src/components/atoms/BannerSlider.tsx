import React, { useState, useEffect } from "react";

const bannerImages = [
  "/assets/img/banner-1.jpg",
  "/assets/img/banner-2.jpg",
  "/assets/img/banner-3.jpg",
];

const BannerSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 3000); // 3 detik per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[120px] rounded-xl overflow-hidden mb-4 transition-all duration-500">
      {bannerImages.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Banner ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Dot Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {bannerImages.map((_, i) => (
            <div
            key={i}
            className={`transition-all duration-300 ${
                i === current
                ? "w-6 h-2 bg-[#66BB00] rounded-full"
                : "w-2 h-2 bg-white rounded-full"
            }`}
            ></div>
        ))}
        </div>
    </div>
  );
};

export default BannerSlider;
