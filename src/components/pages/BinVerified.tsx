import React from "react";
import { useNavigate } from "react-router-dom";
import MobileBottomNav from "../organisms/MobileBottomNav";
import binsDataRaw from "../../pseudo_db/smartbin.json";
import { FaExclamationCircle } from "react-icons/fa";
import { encryptData } from "../utils/encryptor";

const BinVerified: React.FC = () => {
  const navigate = useNavigate();

  // Ambil satu smartBin random
  const smartBin = binsDataRaw[Math.floor(Math.random() * binsDataRaw.length)];

  // Format tanggal terakhir update
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
  };

  const reportSmartBin = () => {
    navigate("/ReportSmartBin/" + encryptData(smartBin.id));
  };

  const typeColors: Record<string, string> = {
    plastic: "bg-yellow-100 text-yellow-700",
    paper: "bg-blue-100 text-blue-700",
    organic: "bg-green-100 text-green-700",
    metal: "bg-gray-200 text-gray-800",
    glass: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-4 pb-24 flex flex-col items-center px-6 bg-white text-center">
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
      <div className="flex items-center gap-3 py-4 mb-2 relative z-20">
        <h1 className="text-xl text-white font-zerotrace font-semibold">ZeroTrace</h1>
      </div>
      <img src="/assets/img/icon/smartbin.png" alt="Smart smartBin" className="w-28 mb-4 mt-8" />

      <h2 className="text-2xl font-bold mb-2 text-secondColor">SmartBin Verified</h2>
      <p className="text-sm text-gray-700 mb-4">
        Smart smartBin linked successfully. You may now dispose your waste.
      </p>

      <div className="w-full bg-white border border-gray-200 rounded-xl shadow-md p-4 mb-6 text-left space-y-2">
         <div className="space-y-2">
       <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{smartBin.name}</h2>
        
      </div>
        <p className="text-gray-600 text-sm">{smartBin.address}</p>
         {/* Chips */}
        <div className="flex gap-2 flex-wrap mt-2">
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              typeColors[smartBin.type.toLowerCase()] || "bg-gray-100 text-gray-700"
            }`}
          >
            {smartBin.type}
          </span>
        </div>

        {/* Capacity bar */}
        <div className="mt-3">
          <p className="text-xs text-gray-600 mb-1">
            Current Fill Level: {smartBin.capacity}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${
                smartBin.capacity < 50
                  ? "bg-green-500"
                  : smartBin.capacity < 80
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${smartBin.capacity}%` }}
            />
          </div>
        </div>

        {/* Last updated */}
        <p className="text-gray-400 text-xs mt-2 mb-8">
          Last Updated: {formatDate(smartBin.lastUpdated)}
        </p>
        </div>
      </div>

      <button
        onClick={() => navigate("/WeightDetected")}
        className="bg-zeroTrace-gradient w-full text-white py-2 px-6 rounded-full shadow hover:bg-green-700 transition"
      >
        Continue
      </button>

      <button
          onClick={reportSmartBin}
          className="w-full mt-[15px] flex items-center justify-center gap-2 py-2 bg-white text-secondColor border border-secondColor rounded-full"
        >
        <FaExclamationCircle /> Report SmartBin
      </button>

      <MobileBottomNav />
    </div>
  );
};

export default BinVerified;
