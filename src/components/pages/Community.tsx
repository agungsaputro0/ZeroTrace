import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";
import communityData from "../../data/DummyCommunities";

const CommunityListPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(10); // 👈 tampilkan 10 awal
  const navigate = useNavigate();

  const filteredCommunities = communityData.filter((community) =>
    community.name.toLowerCase().includes(search.toLowerCase())
  );

  const visibleCommunities = filteredCommunities.slice(0, visibleCount); // 👈 hanya yang terlihat

  const showMore = () => {
    setVisibleCount((prev) => prev + 10); // 👈 tambah 10 lagi
  };

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-4 pb-24">
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
      <div className="px-2 pt-6 mb-2 relative z-20">
        
        <div className="flex items-center gap-3 mb-2 -mt-2 relative z-20">
                <button onClick={() => navigate("/HomeMobile")} className="text-white">
                  <FaArrowLeft />
                </button>
                <h1 className="text-2xl text-white font-zerotrace font-semibold">Community</h1>
       </div>

        {/* Search bar */}
        <div className="flex items-center gap-2 border px-1 py-2 mt-12 rounded-full shadow-sm bg-gray-50">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for any community you're interested in"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(10); // reset pagination saat search berubah
            }}
            className="flex-1 outline-none text-sm bg-transparent"
          />
        </div>
      </div>

      {/* List */}
      <div className="px-4 mt-4">
        {visibleCommunities.map((community) => (
          <div
            key={community.id}
            onClick={() => navigate(`/CommunityDetail/${community.id}`)}
            className="flex gap-3 bg-mainColor/60 hover:bg-secondColor/60 rounded-xl p-3 mb-3 cursor-pointer shadow-sm transition duration-300 ease-in-out"
          >
            <img
              src={community.image}
              alt={community.name}
              className="w-14 h-14 rounded object-cover"
            />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-green-800">{community.name}</p>
              <p className="text-gray-600 text-xs">{community.description}</p>
              <p className="text-gray-700 mt-1 text-xs">
                {community.members.toLocaleString()} Members
              </p>
            </div>
          </div>
        ))}

        {/* Show More Button */}
        {visibleCount < filteredCommunities.length && (
          <div className="text-center mt-4">
            <button
              onClick={showMore}
              className="text-secondColor text-sm font-medium"
            >
              Show More
            </button>
          </div>
        )}
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default CommunityListPage;
