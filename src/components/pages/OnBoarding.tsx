// src/pages/Onboarding.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingSlide from "../atoms/OnBoardingSlide";

interface Slide {
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    title: "Every Action Counts",
    description:
      "Waste mismanagement causes pollution & climate change.\nWith one scan, you help recycle right and reduce carbon emissions.",
  },
  {
    title: "Smarter Waste Start with You",
    description:
      "Start managing your waste the smart way.\nTrack, sort, and earn eco-points — all in one app.",
  },
  {
    title: "Scan. Throw. Save.",
    description:
      "Scan the bin QR\nThrow your waste\nEarn points and track your eco-impact!",
  },
];

const Onboarding: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const navigate = useNavigate();

  function goToSignInPage() {
    navigate("/SignIn");
  }

  function goToSignUpPage() {
    navigate("/SignUp");
  }

  // Auto slide every 4s (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100dvh' }} className="max-w-[420px] mx-auto bg-white flex flex-col items-center relative overflow-hidden">
      {/* Wave Background */}
      <div className="w-full absolute top-0 z-[-1]">
        <svg
          viewBox="0 0 375 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="#B8E986"
            d="M0,0 C150,100 225,0 375,100 L375,0 L0,0 Z"
          />
        </svg>
      </div>

      {/* Slides */}
      <div className="flex-1 w-full flex flex-col justify-center space-y-6  transition-all duration-500">
        <OnboardingSlide
          title={slides[current].title}
          description={slides[current].description}
        />

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all cursor-pointer ${
                i === current
                  ? "w-6 h-2 bg-[#66BB00] rounded-full"
                  : "w-2 h-2 bg-gray-300 rounded-full"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full space-y-3 pb-6 px-8">
        {/* Sign In */}
        <button
            onClick={goToSignInPage}
            className="w-full py-3 text-white bg-[#66BB00] rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-[#4e9900] hover:shadow-xl hover:scale-105 active:scale-95"
        >
        Sign In
        </button>

        {/* Sign Up */}
        <button
            onClick={goToSignUpPage}
            className="w-full py-3 text-[#66BB00] border-2 border-[#66BB00] rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-[#f0fdf4] hover:text-[#4e9900] hover:border-[#4e9900] hover:shadow-md hover:scale-105 active:scale-95"
        >
        Sign Up
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
