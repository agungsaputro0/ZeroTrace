import React from "react";
import { useNavigate } from "react-router-dom";
import BannerSlider from "../atoms/BannerSlider";
import MobileBottomNav from "../organisms/MobileBottomNav";
import NewsListPage from "../molecules/NewsList";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
   <div className="relative max-w-[420px] mx-auto min-h-screen bg-white px-4 pb-8">
    {/* Background hijau */}
    <div className="absolute inset-0 h-[160px] bg-gradient-to-b from-[#66BB00] to-[#336600]"></div>

      {/* Header */}
      <div className="flex items-center justify-between py-4 relative">
        <div className="flex items-center gap-3">
          <img
            src="/assets/img/profile-image.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-sm text-white">
            <p className="opacity-80">Good Morning!</p>
            <p className="font-semibold">
              Octavia Halim{" "}
              <span className="text-xs text-[#FFD700]">41 pts</span>
            </p>
          </div>
        </div>
        <div className="relative">
          <img
            src="/assets/img/icon/bell.png"
            alt="Notification"
            className="w-8 h-8"
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            1
          </span>
        </div>
      </div>

      {/* Banner Slider */}
      <BannerSlider />

      {/* Our Services */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">Our Services</h3>
        <div className="grid grid-cols-2 gap-4">
            {/* Pick Up */}
            <div onClick={() => navigate("/PickUpWasteBank")} className="rounded-xl p-3 shadow-md text-center bg-[#D4EF8A] transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer">
            <img
                src="/assets/img/icon/pickup.png"
                alt="Pick Up"
                className="mx-auto w-12 h-10 mb-2"
            />
            <p className="text-sm font-medium">Pick Up</p>
            </div>

            {/* Waste Bank */}
            <div onClick={() => navigate("/NearbyWasteBank")} className="rounded-xl p-3 shadow-md text-center bg-[#F3EF9D] transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer">
            <img
                src="/assets/img/icon/wastebank.png"
                alt="Waste Bank"
                className="mx-auto w-12 h-10 mb-2"
            />
            <p className="text-sm font-medium">Waste Bank</p>
            </div>
        </div>
        </div>


      {/* Quick Menu */}
      <div className="bg-white rounded-xl border shadow px-4 py-3 flex justify-between items-center mb-5">
        {[
            { icon: "recycle.png", label: "Waste Tracker", path: "/WasteTracker" },
            { icon: "statistic.png", label: "Statistics", path: "/statistics" },
            { icon: "paperplane.png", label: "Report Trash", path: "/ReportIllegalDumping" },
            { icon: "more.png", label: "More", path: "/more" },
        ].map((item) => (
            <div
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
            <div className="bg-[#DAF8C8] p-2 rounded-full mb-1">
                <img
                src={`/assets/img/icon/${item.icon}`}
                className="w-6 h-6"
                alt={item.label}
                />
            </div>
            <p className="text-xs">{item.label}</p>
            </div>
        ))}
        </div>

      {/* News Section */}
      <NewsListPage />
      <MobileBottomNav />
    </div>
  );
};

export default Home;
