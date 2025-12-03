import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaRecycle,
  FaChartLine,
  FaExclamationTriangle,
  FaEllipsisH,
  FaBars,
  FaLeaf,
  FaTimes,
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

  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false); 
  const [showAll, setShowAll] = useState(false); 
  const [notifications, setNotifications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const currentUserStr = localStorage.getItem("currentUser") ||
    '{"idPengguna":"PG006","avatarUrl":"/assets/img/user.png"}';
  const user = JSON.parse(currentUserStr);
  const idPengguna = user?.idPengguna || "Guest User";
  
   const dummyData = Array.from({ length: 10 }, (_, i) => ({
    idPengguna,
    tambahanPoin: Math.floor(Math.random() * 10) + 1,
    statusDilihat: true, // semua dummy dianggap sudah dibaca
    timestamp: new Date(Date.now() - i * 24 * 3600 * 1000).toISOString()
  }));

 useEffect(() => {
    const ecoData: any[] = JSON.parse(localStorage.getItem("ecoData") || "[]");
    const combined = [...dummyData, ...ecoData]; 
    setNotifications(combined);

    const unread = combined.filter(
      (item) => item.idPengguna === idPengguna && item.statusDilihat === false
    );
    setUnreadCount(unread.length);
  }, [idPengguna]);

   const displayedNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter((item) => item.statusDilihat === false);


  const handleClosePanel = () => setShowPanel(false);

  const handleBellClick = () => {
    setShowPanel(!showPanel);

    // Optional: set semua statusDilihat menjadi true ketika panel dibuka
    const ecoData: any[] = JSON.parse(localStorage.getItem("ecoData") || "[]");
    const updatedData = ecoData.map((item) =>
      item.idPengguna === idPengguna ? { ...item, statusDilihat: true } : item
    );
    localStorage.setItem("ecoData", JSON.stringify(updatedData));
    setUnreadCount(0);
  };

  
  const formatTime = (timestamp: string | null) => {
    const date = timestamp ? new Date(timestamp) : new Date();
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()} ${String(date.getHours()).padStart(
      2,
      "0"
    )}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

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
          <div className="relative cursor-pointer" onClick={handleBellClick}>
            <FaBell className="text-white w-7 h-7" />
            {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
           {showPanel && (
            <div
              className="absolute right-0 w-72 bg-white border border-gray-200 shadow-lg rounded-lg p-3 z-50"
              onClick={(e) => e.stopPropagation()} // mencegah panel tertutup saat diklik
            >
              {/* Header + Close */}
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-700">Notifications</h4>
                <button onClick={handleClosePanel} className="text-gray-400 hover:text-gray-600">
                  <FaTimes />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex mb-2 border-b border-gray-200">
                <button
                  onClick={() => { setActiveTab("all"); setShowAll(false); }}
                  className={`flex-1 py-1 text-sm font-medium ${
                    activeTab === "all" ? "text-secondColor border-b-2 border-secondColor" : "text-gray-500"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("unread")}
                  className={`flex-1 py-1 text-sm font-medium ${
                    activeTab === "unread" ? "text-secondColor border-b-2 border-secondColor" : "text-gray-500"
                  }`}
                >
                  Unread
                </button>
              </div>

              {/* List */}
              {displayedNotifications.length === 0 ? (
                <p className="text-gray-500 text-sm mt-2">No notifications</p>
              ) : (
                <ul className="space-y-2 max-h-60 overflow-y-auto mt-1">
                  {(activeTab === "unread"
                    ? displayedNotifications
                    : showAll
                      ? displayedNotifications
                      : displayedNotifications.slice(0, 5)
                  ).map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-700 text-sm border-b border-gray-200 pb-2"
                    >
                      <FaLeaf className="text-green-500 mt-1" />
                      <div className="flex flex-col">
                        <span>
                          You earned <strong>{item.tambahanPoin} Eco Points</strong>
                        </span>
                        <span className="text-gray-400 text-xs">{formatTime(item.timestamp)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* See All button untuk All tab */}
              {activeTab === "all" && !showAll && displayedNotifications.length > 5 && (
                <button
                  onClick={() => setShowAll(true)}
                  className="text-secondColor text-sm w-full text-center mt-1 hover:text-mainColor font-bold"
                >
                  See All
                </button>
              )}
            </div>
          )}
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
