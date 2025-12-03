import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaRecycle,
  FaChartLine,
  FaExclamationTriangle,
  FaEllipsisH,
  FaBars,
} from "react-icons/fa";
import { GiRadarSweep } from "react-icons/gi";
import { BiTask } from "react-icons/bi";
import UserCard from "../atoms/UserCard";
import MobileBottomNav from "../organisms/MobileBottomNav";
import NewsListPage from "../molecules/NewsList";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [points, setPoints] = useState<number>(0);

 useEffect(() => {
    const data = localStorage.getItem("currentUser");
    if (data) {
      const parsed = JSON.parse(data);
      setCurrentUser(parsed);

      // points langsung ambil dari object user
      setPoints(parsed.points ?? 0);
    }
  }, []);

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-4 pb-8">
      {/* Background Hijau */}
     <div className="absolute top-0 left-0 w-full h-[320px] z-0">
        <svg
          viewBox="0 0 1440 480"
          xmlns="http://www.w3.org/2000/svg"
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
            d="
              M0,200 
              C240,180 480,220 720,200 
              C960,180 1200,220 1440,200 
              V0 H0 Z
            "
          />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between py-4 relative">
        <p className="font-zerotrace text-2xl text-white font-semibold">
          ZeroTrace
        </p>

        <div className="flex items-center gap-4">
          <div className="relative">
            <FaBell className="text-white w-7 h-7" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </div>

          {/* Hamburger */}
          <FaBars className="text-white w-8 h-8 cursor-pointer" />
        </div>
      </div>

      {/* USER CARD */}
      {currentUser && <UserCard user={currentUser} points={points} />}

      {/* Services */}
      <div className="mb-4 mt-5">
        
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => navigate("/NearbySmartBin")}
            className="rounded-xl p-3 shadow-md text-center bg-zeroTrace-gradient hover:scale-105 transition cursor-pointer"
          >
            <GiRadarSweep className="mx-auto text-white w-8 h-8 mb-2" />
            <p className="text-sm text-white font-medium">SmartBin Nearby</p>
          </div>

          <div
            onClick={() => navigate("/RecyclingGuide")}
            className="rounded-xl p-3 shadow-md text-center bg-zeroTrace-gradient hover:scale-105 transition cursor-pointer"
          >
            <FaRecycle className="mx-auto text-white w-8 h-8 mb-2" />
            <p className="text-sm text-white font-medium">Recycling Guide</p>
          </div>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="bg-white rounded-xl border shadow px-4 py-3 flex justify-between items-center mb-5">
        {[
          { icon: <BiTask className="w-6 h-6" />, label: "Mission", path: "/tasks" },
          { icon: <FaChartLine className="w-6 h-6" />, label: "Statistics", path: "/statistics" },
          { icon: <FaExclamationTriangle className="w-6 h-6" />, label: "Report Trash", path: "/ReportIllegalDumping" },
          { icon: <FaEllipsisH className="w-6 h-6" />, label: "More", path: "/more" },
        ].map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center hover:scale-105 cursor-pointer"
          >
            <div className="bg-zeroTrace-gradient p-2 rounded-full mb-1 text-white">
              {item.icon}
            </div>
            <p className="text-xs">{item.label}</p>
          </div>
        ))}
      </div>

      <NewsListPage />
      <MobileBottomNav />
    </div>
  );
};

export default Home;
