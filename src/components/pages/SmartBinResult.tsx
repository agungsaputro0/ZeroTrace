import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaRecycle,
  FaWeightHanging,
  FaClock,
  FaBarcode,
  FaLeaf,
} from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";

const SmartBinResult: React.FC = () => {
  const navigate = useNavigate();

  // Ambil tanggal dan waktu sekarang
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${now.getFullYear()} ${String(now.getHours()).padStart(
    2,
    "0"
  )}:${String(now.getMinutes()).padStart(2, "0")}`;

  const currentUserStr = localStorage.getItem("currentUser") ||
    '{"idPengguna":"PG006","avatarUrl":"/assets/img/user.png"}';
  const currentUser = JSON.parse(currentUserStr);
  const userId = currentUser?.idPengguna || "Guest User";

  const handleSaveToLocalStorage = () => {
    const dataToSave = {
      idPengguna: userId,      // ganti sesuai user session
      tambahanPoin: 8,            // jumlah poin yang diperoleh
      statusDilihat: false          // menandai data sudah dilihat
    };

    const existingData = JSON.parse(localStorage.getItem("ecoData") || "[]");

    // Tambahkan data baru
    existingData.push(dataToSave);

    // Simpan kembali ke LocalStorage
    localStorage.setItem("ecoData", JSON.stringify(existingData));
    navigate("/HomeMobile");
  };

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-6 pb-32 flex flex-col items-center text-center">
      {/* Background Wave */}
      <div className="absolute top-0 left-0 w-full h-[150px] z-0">
        <svg
          viewBox="0 0 1440 480"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
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
        <h1 className="text-xl text-white font-zerotrace font-semibold">
          ZeroTrace
        </h1>
      </div>

      <div className="bg-green-100 p-5 rounded-xl mt-8 shadow-md w-full max-w-sm text-center animate-fadeIn">
        <div className="text-green-600 text-5xl mb-2">✅</div>
        <h2 className="font-semibold text-lg mb-1 text-green-800">
          Waste Dropped Successfully
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          + 8 Eco Points Earned
        </p>

        {/* Detail Data */}
        <div className="text-left text-sm text-gray-800 space-y-2">
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-600" /> Location:
            </span>
            <span className="font-bold">Smart Bin Binus Anggrek</span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <FaRecycle className="text-green-600" /> Category:
            </span>
            <span className="font-bold">Plastic</span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <FaWeightHanging className="text-green-600" /> Weight:
            </span>
            <span className="font-bold">0.85 kg</span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <FaClock className="text-green-600" /> Drop Time:
            </span>
            <span className="font-bold">{formattedDate}</span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <FaBarcode className="text-green-600" /> Smart Bin ID:
            </span>
            <span className="font-bold">SB045029001</span>
          </div>

          <hr className="my-3 border-t border-green-200" />

          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <FaLeaf className="text-green-600" /> CO₂ Saved:
            </span>
            <span className="font-bold">1,27 kg</span>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl text-justify p-4 mt-3 shadow-sm animate-fadeIn text-gray-700 text-sm">
          <p>
           By disposing of 0.85 kg of this plastic waste properly, you have helped reduce 1.27 kg of CO₂ emissions and diverted waste from the landfill. This waste has a high recycling potential, so every kilogram you collect makes a tangible contribution to the environment.
          </p>
        </div>


          {/* Motivational message */}
        </div>

        <button
          onClick={handleSaveToLocalStorage}
          className="mt-6 bg-zeroTrace-gradient w-full text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
        >
          Done
        </button>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default SmartBinResult;
