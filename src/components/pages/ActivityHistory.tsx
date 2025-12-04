import React from "react";
import { FaArrowLeft, FaExclamationTriangle, FaRecycle, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MobileBottomNav from "../organisms/MobileBottomNav";

const ActivityHistory: React.FC = () => {
  const navigate = useNavigate();

  // Dummy Waste Disposal History
  const wasteHistory = [
    {
      id: 1,
      type: "Organic Waste",
      points: 20,
      bin: "SmartBin Anggrek",
      date: "2025-12-02 14:22",
    },
    {
      id: 2,
      type: "Plastic Waste",
      points: 30,
      bin: "SmartBin Syahdan",
      date: "2025-12-01 09:10",
    },
    {
      id: 3,
      type: "Paper Waste",
      points: 15,
      bin: "SmartBin Kemanggisan",
      date: "2025-11-30 18:40",
    },
  ];

  // Dummy SmartBin Reports
  const reportHistory = [
    {
      id: 11,
      issue: "Bin Full",
      bin: "SmartBin Anggrek",
      severity: "High",
      date: "2025-12-02 08:33",
    },
    {
      id: 12,
      issue: "Bad Smell Detected",
      bin: "SmartBin Syahdan",
      severity: "Medium",
      date: "2025-12-01 11:10",
    },
    {
      id: 13,
      issue: "Sensor Error",
      bin: "SmartBin Kemanggisan",
      severity: "High",
      date: "2025-11-29 16:05",
    },
  ];

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-6 pb-32 flex flex-col">

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

      {/* HEADER */}
      <div className="flex items-center gap-3 py-4 relative z-20">
        <button onClick={() => navigate(-1)} className="text-white">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl text-white font-zerotrace font-semibold">Activity History</h1>
      </div>

      {/* WASTE DISPOSAL SECTION */}
      <div className="relative z-20 mt-6 p-4 rounded-xl shadow bg-white border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Waste Disposal</h2>
        <p className="text-sm text-gray-600 mt-1">Your recent waste disposal actions.</p>

        <div className="mt-4 divide-y">
          {wasteHistory.map((w) => (
            <div
              key={w.id}
              className="flex items-start gap-4 py-3"
            >
              <div className="w-10 h-10 rounded-full bg-secondColor flex items-center justify-center text-white">
                <FaRecycle />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-700">{w.type}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-secondColor" />
                  {w.bin}
                </p>
                <p className="text-xs text-gray-400 mt-1">{w.date}</p>
              </div>

              <div className="text-secondColor font-semibold text-sm">
                +{w.points} pts
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SMARTBIN REPORT SECTION */}
      <div className="relative z-20 mt-6 p-4 rounded-xl shadow bg-white border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">SmartBin Reports</h2>
        <p className="text-sm text-gray-600 mt-1">Your submitted SmartBin issue reports.</p>

        <div className="mt-4 divide-y">
          {reportHistory.map((r) => (
            <div key={r.id} className="flex items-start gap-4 py-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                  ${r.severity === "High" ? "bg-red-500" : "bg-yellow-500"}
                `}
              >
                <FaExclamationTriangle />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-700">{r.issue}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-secondColor" />
                  {r.bin}
                </p>
                <p className="text-xs text-gray-400 mt-1">{r.date}</p>
              </div>

              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full shadow
                ${r.severity === "High" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"}`}
              >
                {r.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default ActivityHistory;
