import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
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
    <div className="max-w-md mx-auto bg-white pb-28 min-h-screen">
      <div className="px-4 pt-6 mb-2">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Communities</h2>

        {/* Search bar */}
        <div className="flex items-center gap-2 border px-3 py-2 rounded-full shadow-sm bg-gray-50">
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
      <div className="px-4">
        {visibleCommunities.map((community) => (
          <div
            key={community.id}
            onClick={() => navigate(`/CommunityDetail/${community.id}`)}
            className="flex gap-3 bg-[#F0FDF4] hover:bg-[#e8f5e9] rounded-xl p-3 mb-3 cursor-pointer shadow-sm transition"
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
              className="text-green-700 text-sm font-medium underline"
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
