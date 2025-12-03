import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileBottomNav from "../organisms/MobileBottomNav";

const WeightDetected: React.FC = () => {
  const [weight, setWeight] = useState(0);
  const [progress, setProgress] = useState(0);
  const [counting, setCounting] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const navigate = useNavigate();

  const targetWeight = 0.85; // kg
  const duration = 2000; // animasi 2 detik

  useEffect(() => {
    // Debounce 3 detik sebelum mulai
    const timer = setTimeout(() => setCounting(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!counting) return;

    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percentage = Math.min(elapsed / duration, 1);

      const newWeight = parseFloat((percentage * targetWeight).toFixed(2));
      setWeight(newWeight);
      setProgress(percentage * 100);

      // Tampilkan tip ketika animasi selesai
      if (percentage === 1) setShowTip(true);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [counting]);

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-6 pb-32 flex flex-col items-center text-center">
      {/* Background Wave */}
      <div className="absolute top-0 left-0 w-full h-[150px] z-0">
        <svg viewBox="0 0 1440 480" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#26C6DA" />
              <stop offset="100%" stopColor="#26D6A8" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,200 C240,180 480,220 720,200 C960,180 1200,220 1440,200 V0 H0 Z"
          />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 py-4 mb-2 relative z-20">
        <h1 className="text-xl text-white font-zerotrace font-semibold">ZeroTrace</h1>
      </div>

      <h2 className="text-2xl font-bold mb-2 mt-4 relative z-20">Weight Detected</h2>

      {/* Donut Progress */}
      <div className="relative w-56 h-56 mb-6 z-20">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="50%"
            cy="50%"
            r="80"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="80"
            stroke="#26C6DA"
            strokeWidth="12"
            strokeDasharray={440}
            strokeDashoffset={440 - (440 * progress) / 100}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Emoji sampah animasi */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-secondColor">{weight.toFixed(2)} kg</span>
          <span className="text-sm text-gray-600 mt-1">Garbage weight</span>
        </div>
      </div>

      {/* Info Countdown */}
      {!counting && (
        <p className="text-gray-500 mb-4 animate-pulse">
          Preparing to measure... please wait
        </p>
      )}

      {/* Tips & Info */}
      {showTip && (
       <div className="bg-secondColor/10 border border-green-200 rounded-xl p-4 mb-6 w-full shadow-sm animate-fadeIn">
          <h3 className="text-secondColor font-bold text-lg mb-4">Environmental Impact</h3>

          <div className="text-gray-700 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Landfill reduction:</span>
              <span>{weight.toFixed(2)} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">CO₂ reduced:</span>
              <span>{(weight * 1.5).toFixed(2)} kg</span>
            </div>
          </div>

          {/* Pesan motivasi */}
          {weight > 0 && (
            <p className="mt-3 text-justify text-green-700 text-sm font-medium">
              Great job! You have just reduced waste and carbon emissions that could have harmed the environment. Every small action you take makes a difference for the planet.
            </p>
          )}
        </div>
      )}

     

      {/* Continue Button */}
      <button
        disabled={!counting}
        onClick={() => navigate("/SmartBinResult")}
        className={`w-full py-2 px-6 rounded-full text-white shadow-lg transition ${
          counting
            ? "bg-zeroTrace-gradient hover:bg-green-700"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Continue
      </button>

      <MobileBottomNav />
    </div>
  );
};

export default WeightDetected;
