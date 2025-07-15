import React from "react";

interface OnboardingSlideProps {
  title: string;
  description: string;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center text-center w-full">
      {/* Area Hijau dengan SVG Jam Pasir */}
      <img
          src="/assets/img/ZeroTrace.png"
          alt="ZeroTrace Logo"
          className="w-20 h-20 z-10 mt-[-20px]"
        />
      <div className="w-full relative overflow-hidden h-[160px] bg-transparent flex items-center justify-center">
  <svg
    viewBox="0 0 375 220"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute top-0 left-0 w-full h-full"
    preserveAspectRatio="none"
  >
    <defs>
      <pattern
        id="bg-image"
        patternUnits="userSpaceOnUse"
        width="375"
        height="220"
      >
        <image
          href="/assets/img/bg-default-us.jpg" 
          x="0"
          y="0"
          width="375"
          height="220"
          preserveAspectRatio="xMidYMid slice"
        />
      </pattern>
    </defs>

    <path
      d="M0,0 C160,40 215,40 375,0 L375,220 C215,180 160,180 0,220 Z"
      fill="url(#bg-image)"
    />
  </svg>
</div>


      {/* Teks (di bagian putih) */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="min-h-[96px] flex items-center justify-center">
          <p className="text-sm text-gray-600 whitespace-pre-line mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlide;
