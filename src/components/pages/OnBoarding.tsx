// src/pages/Onboarding.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingSlide from "../atoms/OnBoardingSlide";

interface Slide {
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Every Action Counts",
    description:
      "Waste mismanagement causes pollution & climate change. With one scan, you help recycle right and reduce carbon emissions.",
    image:
      "/assets/img/onboarding1.png",
  },
  {
    title: "Smarter Waste Start with You",
    description:
      "Start managing your waste the smart way.Track, sort, and earn eco-points - all in one app.",
    image:
      "/assets/img/onboarding2.png",
  },
  {
    title: "Building a ZeroWaste Future",
    description:
      "Every proper disposal supports a cleaner, smarter city powered by data-driven recycling.",
    image: "/assets/img/onboarding4.png",
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
    <div className="max-w-[420px] min-h-screen-dvh mx-auto bg-white flex flex-col justify-between overflow-hidden">
      {/* Slides */}
      <div className="flex-1 w-full flex flex-col justify-center space-y-6  transition-all duration-500">
        <OnboardingSlide
          title={slides[current].title}
          description={slides[current].description}
          image={slides[current].image}
        />

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all cursor-pointer ${
                i === current
                  ? "w-12 h-2 bg-zeroTrace-gradient rounded-full"
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
            className="w-full py-3 text-white bg-zeroTrace-gradient rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-[#4e9900] hover:shadow-xl hover:scale-105 active:scale-95"
        >
        Sign In
        </button>

        {/* Sign Up */}
        <button
            onClick={goToSignUpPage}
            className="w-full py-3 text-secondColor border-2 border-secondColor rounded-full font-semibold transition-all duration-300 ease-in-out hover:bg-secondColor hover:text-white hover:border-secondColor hover:shadow-md hover:scale-105 active:scale-95"
        >
        Sign Up
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
