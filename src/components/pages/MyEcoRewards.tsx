import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MobileBottomNav from "../organisms/MobileBottomNav";
import {
  userRewards,
  availableRewards,
  availableChallenges,
} from "../../data/DummyRewards";

const MyEcoRewardsPage: React.FC = () => {
  const navigate = useNavigate();
  const { points, badges } = userRewards;
  const target = 200;
  const [search, setSearch] = useState("");
  const [visibleRewards, setVisibleRewards] = useState(4);
  const [visibleChallenges, setVisibleChallenges] = useState(3);

  const filteredRewards = availableRewards.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredChallenges = availableChallenges.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
    );

 const location = useLocation();

useEffect(() => {
  if (location.hash === "#challenges") {
    const el = document.getElementById("challenges");
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // delay kecil agar halaman siap dirender dulu
    }
  }
}, [location]);

  return (
    <div className="max-w-md mx-auto pb-28 min-h-screen bg-white">
      <div className="pt-4">
        <h2 className="text-xl font-semibold text-green-800 mb-4 px-4">My Eco Rewards</h2>
         <div className="bg-gradient-to-b from-[#B8E986] to-[#ffffff] p-4">
        <p className="text-gray-600 text-sm mb-4">
          Kumpulkan poin dan tukarkan dengan hadiah menarik 🌿
        </p>

        {/* Progress */}
        <div className="bg-gray-100 rounded-full h-4 w-full mb-2">
          <div
            className="bg-green-500 h-4 rounded-full transition-all"
            style={{ width: `${(points / target) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          <strong>{points}</strong> / {target} Eco Points
        </p>

        {/* Badges */}
        <h3 className="text-md font-semibold text-green-700 mb-2">🎖️ Badges</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 mb-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="min-w-[140px] bg-green-50 border border-green-200 rounded-xl p-3 shadow text-center"
            >
              <div className="text-3xl mb-1">{badge.icon}</div>
              <p className="text-sm font-semibold text-green-800">{badge.title}</p>
              <p className="text-xs text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>

        {/* Redeem Button */}
        <button
          onClick={() => navigate("/Redeem")}
          className="mb-6 w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
        >
          🎁 Tukarkan Poin
        </button>

        {/* Search Box */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari reward atau tantangan..."
            className="w-full border rounded-full px-4 py-2 text-sm shadow"
          />
        </div>

        {/* Rewards List */}
        <h4 className="text-md font-semibold text-green-800 mb-2">🎁 Rewards</h4>
        <div className="grid gap-3">
        {filteredRewards.slice(0, visibleRewards).map((r) => (
            <div key={r.id} className="flex gap-3 bg-green-50 border border-green-100 rounded-xl p-3 shadow-sm hover:shadow-md hover:scale-103 transition duration-200 cursor-pointer">
            <img
                src={r.image}
                alt={r.name}
                className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1 text-sm">
                <p className="font-semibold text-green-800">{r.name}</p>
                <p className="text-xs text-gray-600">{r.description}</p>
                <p className="text-xs text-green-700 mt-1">🪙 {r.cost} poin</p>
            </div>
            </div>
        ))}
        </div>
        {visibleRewards < filteredRewards.length && (
        <div className="text-center mt-2 mb-4">
            <button
            onClick={() => setVisibleRewards((prev) => prev + 4)}
            className="text-green-600 text-sm underline"
            >
            Show more rewards
            </button>
        </div>
        )}

        {/* Challenges */}
        <h4 id="challenges" className="text-md font-semibold text-green-800 mt-6 mb-2">🔥 Tantangan Aktif</h4>
        <div className="grid gap-3">
        {filteredChallenges.slice(0, visibleChallenges).map((c) => (
            <div onClick={() => navigate("/ChallengeDetail/" + c.id)} key={c.id} className="flex gap-3 bg-lime-200 border border-lime-100 rounded-xl p-3 shadow-sm hover:shadow-md hover:scale-103 transition duration-200 cursor-pointer">
            <img
                src={c.image}
                alt={c.name}
                className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1 text-sm">
                <p className="font-semibold text-yellow-800">{c.name}</p>
                <p className="text-xs text-gray-600">{c.description}</p>
                <p className="text-xs text-yellow-700 mt-1">🎯 Hadiah: {c.reward} poin</p>
            </div>
            </div>
        ))}
        </div>
        {visibleChallenges < filteredChallenges.length && (
        <div className="text-center mt-2 mb-4">
            <button
            onClick={() => setVisibleChallenges((prev) => prev + 3)}
            className="text-yellow-700 text-sm underline"
            >
            Show more challenges
            </button>
        </div>
        )}


      </div>
    </div>
      <MobileBottomNav />
    </div>
  );
};

export default MyEcoRewardsPage;
