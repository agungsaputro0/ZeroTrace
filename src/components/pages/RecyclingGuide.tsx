import React, { useState } from "react";
import { FaBook, FaAppleAlt, FaBox, FaGlassMartini, FaArrowLeft } from "react-icons/fa";
import { FaBottleWater } from "react-icons/fa6";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import MobileBottomNav from "../organisms/MobileBottomNav";
import { useNavigate } from "react-router-dom";
import { Timeline } from "antd";

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
    description:
      "Plastics are everywhere in daily life, from bottles to packaging materials. Recycling plastics reduces pollution and conserves natural resources. Understanding how to properly handle plastics helps improve the recycling process.",
    tips: [
      "Rinse bottles and containers to remove leftover liquids; dirty plastics can contaminate recycling batches.",
      "Remove caps and labels; some labels are non-recyclable and can hinder processing.",
      "Do not put plastic bags in curbside bins; use designated collection points.",
      "Prefer reusable alternatives to single-use plastics whenever possible.",
    ],
    color: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  {
    type: "Paper",
    icon: <FaBook className="w-8 h-8 text-blue-600" />,
    description:
      "Paper is a common material in offices and homes. Recycling paper saves trees, water, and energy. Proper preparation ensures cleaner recycling streams.",
    tips: [
      "Avoid recycling wet or greasy paper; contamination reduces quality.",
      "Flatten cardboard boxes to save space and improve processing.",
      "Remove tape, staples, or bindings; they can interfere with machinery.",
      "Separate glossy or colored paper; some types require special handling.",
    ],
    color: "bg-blue-100",
    textColor: "text-blue-800",
  },
  {
    type: "Organic",
    icon: <FaAppleAlt className="w-8 h-8 text-green-600" />,
    description:
      "Organic waste includes food scraps and garden material. Composting these materials reduces landfill waste and creates nutrient-rich soil for gardening.",
    tips: [
      "Use a compost bin for kitchen scraps like fruit and vegetable peels.",
      "Avoid adding meat, dairy, or oily foods; they attract pests.",
      "Shred leaves and garden waste for faster decomposition.",
      "Turn your compost regularly to aerate and speed up the process.",
    ],
    color: "bg-green-100",
    textColor: "text-green-800",
  },
  {
    type: "Metal",
    icon: <FaBox className="w-8 h-8 text-gray-700" />,
    description:
      "Metal items include cans, tins, and aluminum foil. Recycling metals conserves resources and energy. Proper handling ensures metals are fully reusable.",
    tips: [
      "Rinse cans and foil to remove residues before recycling.",
      "Do not crush aerosol cans; they can be hazardous.",
      "Separate lids from cans if possible to simplify processing.",
      "Avoid mixing metals with non-metallic waste.",
    ],
    color: "bg-gray-200",
    textColor: "text-gray-800",
  },
  {
    type: "Glass",
    icon: <FaGlassMartini className="w-8 h-8 text-purple-600" />,
    description:
      "Glass bottles and jars are fully recyclable without loss of quality. Proper sorting ensures clear and colored glass is recycled efficiently.",
    tips: [
      "Remove lids and rinse glass items before recycling.",
      "Do not place broken glass in curbside bins; it can be dangerous.",
      "Separate colored glass from clear glass for proper processing.",
      "Reuse glass containers when possible to reduce energy consumption.",
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

             

              {/* Timeline tips */}
              <div
              className={`overflow-hidden transition-all duration-500`}
              style={{ maxHeight: isExpanded ? "1000px" : "3.5rem" }} // default line-clamp 3
            >
              <p
                className={`text-sm text-gray-700 mb-2 text-justify ${
                  !isExpanded ? "line-clamp-3" : ""
                }`}
              >
                {item.description}
              </p>

              {/* Timeline tips */}
              {isExpanded && (
                <Timeline
                  className="mt-6 bg-transparent"
                  mode="left"
                  items={item.tips.map((tip, idx) => ({
                    children: <p className="text-gray-700 bg-transparent text-sm">{tip}</p>,
                    dot: <span className="w-3 h-3 bg-secondColor rounded-full block"></span>,
                    key: idx,
                  }))}
                />
              )}
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
