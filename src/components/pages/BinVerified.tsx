import React from "react";
import { useNavigate } from "react-router-dom";
import MobileBottomNav from "../organisms/MobileBottomNav";

const BinVerified: React.FC = () => {
  const navigate = useNavigate();

  // Dummy data
  const smartBinId = "SB045029001";
  const location = "Sustainable Corner - Binus Anggrek";
  const wasteType = "Plastic"; // 🧴 contoh jenis sampah

  return (
    <div className="max-w-md mx-auto min-h-screen-dvh flex flex-col justify-center items-center px-4 bg-gradient-to-b from-green-400 to-white text-center">
      <img src="/assets/img/icon/smartbin.png" alt="bin" className="w-28 mb-4" />

      <h2 className="text-xl font-bold mb-1">Bin Verified</h2>
      <p className="text-sm text-gray-600">Smart Bin Linked. You may now dispose waste.</p>

      <div className="mt-4 mb-6 text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium text-green-700">Smart Bin ID:</span> {smartBinId}
        </p>
        <p>
          <span className="font-medium text-green-700">Location:</span> {location}
        </p>
        <p>
          <span className="font-medium text-green-700">Waste Type:</span> {wasteType}
        </p>
      </div>

      <button
        onClick={() => navigate("/WeightDetected")}
        className="bg-green-600 text-white py-2 px-6 rounded-full shadow hover:bg-green-700 transition"
      >
        Continue
      </button>

      <MobileBottomNav />
    </div>
  );
};

export default BinVerified;
