import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaRecycle,
  FaWeightHanging,
  FaClock,
  FaBarcode,
  FaLeaf,
  FaSeedling,
} from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";

const SmartBinResult: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto min-h-screen-dvh flex flex-col items-center justify-center px-4 bg-gradient-to-b from-green-400 to-white">
      <div className="bg-green-50 p-5 rounded-xl shadow-md w-full max-w-sm text-center animate-fadeIn">
        <div className="text-green-600 text-5xl mb-2">✅</div>
        <h2 className="font-semibold text-lg mb-1 text-green-800">Waste Dropped Successfully</h2>
        <p className="text-sm text-gray-600 mb-4">🎉 + 8 Eco Points Earned</p>

        {/* Detail Data */}
        <div className="text-left text-sm text-gray-800 space-y-2">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-600" />
            <span><strong>Location:</strong> Sustainable Corner - Binus Anggrek</span>
          </div>

          <div className="flex items-center gap-2">
            <FaRecycle className="text-green-600" />
            <span><strong>Category:</strong> Plastic</span>
          </div>

          <div className="flex items-center gap-2">
            <FaWeightHanging className="text-green-600" />
            <span><strong>Weight:</strong> 0.85 kg</span>
          </div>

          <div className="flex items-center gap-2">
            <FaClock className="text-green-600" />
            <span><strong>Drop Time:</strong> 07 July 2025 – 09:24 AM</span>
          </div>

          <div className="flex items-center gap-2">
            <FaBarcode className="text-green-600" />
            <span><strong>Smart Bin ID:</strong> SB045029001</span>
          </div>

          <hr className="my-3 border-t border-green-200" />

          <div className="flex items-center gap-2">
            <FaLeaf className="text-green-600" />
            <span><strong>CO₂ Saved:</strong> 1.2 kg</span>
          </div>

          <div className="flex items-center gap-2">
            <FaSeedling className="text-green-600" />
            <span><strong>Recyclability Score:</strong> 78%</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/HomeMobile")}
          className="mt-6 bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
        >
          Done
        </button>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default SmartBinResult;
