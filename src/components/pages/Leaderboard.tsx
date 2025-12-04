import React from "react";
import { FaArrowLeft, FaMedal, FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MobileBottomNav from "../organisms/MobileBottomNav";

const LeaderBoard: React.FC = () => {
  const navigate = useNavigate();

  // Dummy Data
  const users = [
    { id: 1, name: "Sena Nugraha", points: 2500, avatar: "/assets/img/user.png" },
    { id: 2, name: "Ariana", points: 1980, avatar: "/assets/img/user.png" },
    { id: 3, name: "Bima", points: 1550, avatar: "/assets/img/user.png" },
    { id: 4, name: "Rizky", points: 1200, avatar: "/assets/img/user.png" },
    { id: 5, name: "Vina", points: 1100, avatar: "/assets/img/user.png" },
    { id: 6, name: "Rahmat", points: 980, avatar: "/assets/img/user.png" },
    { id: 7, name: "Dewi", points: 860, avatar: "/assets/img/user.png" },
  ];

  const sorted = [...users].sort((a, b) => b.points - a.points);
  const top3 = sorted.slice(0, 3);
  const others = sorted.slice(3);

  // Tinggi podium (1 tertinggi)
  const podiumHeight = ["h-40", "h-32", "h-28"]; // index 0 = juara 1

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
        <h1 className="text-xl text-white font-zerotrace font-semibold">Leaderboard</h1>
      </div>

      {/* INFO EXPLAIN SECTION */}
      <div className="relative z-20 mt-8 p-4 rounded-xl shadow bg-white border border-gray-100">
        <h2 className="font-semibold text-gray-800 text-base">How Leaderboard Works</h2>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          This leaderboard shows the top users with the highest Eco Points.  
          Earn points by completing challenges, recycling consistently,  
          and contributing to sustainable actions through the SmartEco platform.
        </p>
        <div className="mt-3 text-xs text-secondColor font-semibold">
          Keep participating — climb the ranks and inspire others!
        </div>
      </div>

      {/* PODIUM TOP 3 */}
      <div className="mt-4 relative z-10 grid grid-cols-3 gap-4 items-end text-center">

        {top3.map((u, index) => (
          <div key={u.id} className="flex flex-col items-center">

            {/* Badge rank */}
            <div
              className={`px-3 py-1 text-xs font-semibold text-white rounded-full shadow 
              ${index === 0 ? "bg-secondColor" : "bg-gray-600"}`}
            >
              #{index + 1}
            </div>

            {/* Avatar */}
            <img
              src={`https://picsum.photos/50/50?random=${index}`}
              alt={u.name}
              className="w-16 h-16 rounded-full border-2 border-secondColor object-cover shadow mt-2"
            />

            {/* Podium bar */}
            <div
              className={`mt-3 w-full rounded-xl flex flex-col items-center justify-end pb-2 
              bg-gradient-to-b from-secondColor to-[#24c0ac] shadow-md ${podiumHeight[index]}`}
            >
              <div className="text-white text-sm font-semibold">{u.points} pts</div>

              <div className="mt-2 text-white">
                {index === 0 ? <FaCrown size={18} /> : <FaMedal size={18} />}
              </div>
            </div>

            {/* Name */}
            <p className="mt-2 font-semibold text-gray-700">{u.name}</p>
          </div>
        ))}

      </div>

      {/* OTHER USERS */}
      <div className="mt-8 border border-gray-200 bg-white rounded-xl shadow p-3 relative z-10 divide-y">

        {others.map((u, index) => (
          <div
            key={u.id}
            className="flex items-center justify-between py-3 px-2 hover:bg-gray-100 rounded-lg transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-500 font-semibold w-6 text-center">
                {index + 4}
              </span>

              <img
                src={`https://picsum.photos/50/50?random=${index + 4}`}
                alt={u.name}
                className="w-10 h-10 rounded-full border border-secondColor object-cover"
              />

              <div>
                <p className="font-medium text-gray-700">{u.name}</p>
                <p className="text-xs text-gray-500">{u.points} pts</p>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-secondColor text-white text-xs font-semibold shadow">
              Rank #{index + 4}
            </div>
          </div>
        ))}
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default LeaderBoard;
