import React, { useState } from "react";
import { FaBook, FaAppleAlt, FaBox, FaGlassMartini, FaArrowLeft } from "react-icons/fa";
import { FaBottleWater } from "react-icons/fa6";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import MobileBottomNav from "../organisms/MobileBottomNav";
import { useNavigate } from "react-router-dom";

interface GuideItem {
  type: string;
  icon: JSX.Element;
  description: string;
  tips: string[];
  color: string;
  textColor: string;
}

const recyclingGuideData: GuideItem[] = [
  {
    type: "Plastic",
    icon: <FaBottleWater className="w-8 h-8 text-yellow-600" />,
    description: "Plastics like bottles, containers, and packaging.",
    tips: [
      "Rinse bottles and containers before recycling",
      "Remove caps and labels if possible",
      "Do not recycle plastic bags with curbside bins",
    ],
    color: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  {
    type: "Paper",
    icon: <FaBook className="w-8 h-8 text-blue-600" />,
    description: "Paper, newspapers, cardboard, office paper.",
    tips: [
      "Avoid wet or greasy paper",
      "Flatten cardboard boxes",
      "Remove tape and staples if possible",
    ],
    color: "bg-blue-100",
    textColor: "text-blue-800",
  },
  {
    type: "Organic",
    icon: <FaAppleAlt className="w-8 h-8 text-green-600" />,
    description: "Food scraps, leaves, garden waste.",
    tips: [
      "Use a compost bin for kitchen scraps",
      "Do not include meat or dairy in compost",
      "Leaves and garden waste can be shredded for faster decomposition",
    ],
    color: "bg-green-100",
    textColor: "text-green-800",
  },
  {
    type: "Metal",
    icon: <FaBox className="w-8 h-8 text-gray-700" />,
    description: "Cans, tins, aluminum foil.",
    tips: [
      "Rinse cans and foil before recycling",
      "Do not crush aerosol cans",
      "Separate lids from cans if possible",
    ],
    color: "bg-gray-200",
    textColor: "text-gray-800",
  },
  {
    type: "Glass",
    icon: <FaGlassMartini className="w-8 h-8 text-purple-600" />,
    description: "Bottles and jars.",
    tips: [
      "Remove lids and rinse before recycling",
      "Do not recycle broken glass in curbside bins",
      "Colored glass is recycled separately from clear glass",
    ],
    color: "bg-purple-100",
    textColor: "text-purple-800",
  },
];

const RecyclingGuide: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const toggleExpand = (type: string) => {
    setExpanded((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-4 pb-24">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full h-[160px] z-0">
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
      <div className="flex items-center gap-3 py-4 mb-2 relative z-20">
        <button onClick={() => navigate("/HomeMobile")} className="text-white">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl text-white font-zerotrace font-semibold">Recycling Guide</h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 mt-8 relative z-20">
        {recyclingGuideData.map((item) => {
          const isExpanded = expanded[item.type];
          return (
            <div
              key={item.type}
              className={`p-4 rounded-xl shadow-lg transform transition hover:scale-[1.02] cursor-pointer ${item.color}`}
              onClick={() => toggleExpand(item.type)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <h2 className={`font-semibold ${item.textColor} text-lg`}>{item.type}</h2>
                </div>
                <div>
                  {isExpanded ? (
                    <HiChevronUp className="w-6 h-6 text-gray-600 transition-transform duration-300" />
                  ) : (
                    <HiChevronDown className="w-6 h-6 text-gray-600 transition-transform duration-300" />
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{item.description}</p>
              <div
                className={`overflow-hidden transition-all duration-500`}
                style={{ maxHeight: isExpanded ? `${item.tips.length * 1.5}rem` : "0" }}
              >
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                  {item.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default RecyclingGuide;
