import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileBottomNav from "../organisms/MobileBottomNav";

const WeightDetected: React.FC = () => {
  const [weight, setWeight] = useState(0);
  const [progress, setProgress] = useState(0); // untuk donut
  const navigate = useNavigate();

  const targetWeight = 0.85; // kg
  const duration = 2000; // ms

  useEffect(() => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percentage = Math.min(elapsed / duration, 1);

      const newWeight = parseFloat((percentage * targetWeight).toFixed(2));
      setWeight(newWeight);
      setProgress(percentage * 100);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen-dvh flex flex-col items-center justify-center px-4 text-center bg-gradient-to-b from-green-400 to-white">
      <h2 className="text-xl font-bold mb-4">Weight Detected</h2>

      <div className="relative w-48 h-48 mb-6">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="50%"
            cy="50%"
            r="70"
            stroke="#e5e7eb" // Tailwind gray-200
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="70"
            stroke="#22c55e" // Tailwind green-500
            strokeWidth="12"
            strokeDasharray={440}
            strokeDashoffset={440 - (440 * progress) / 100}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-green-700">{weight.toFixed(2)} kg</span>
          <span className="text-sm text-gray-600 mt-1">Garbage weight</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/SmartBinResult")}
        className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
      >
        Continue
      </button>

      <MobileBottomNav />
    </div>
  );
};

export default WeightDetected;
