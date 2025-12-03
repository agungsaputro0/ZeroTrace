import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MobileBottomNav from "../organisms/MobileBottomNav";
import { FaStar, FaMedal, FaLeaf } from "react-icons/fa";
import {
  availableRewards,
  availableChallenges,
} from "../../data/DummyRewards";
import { GiMedal, GiStarMedal } from "react-icons/gi";
import { IoMedal } from "react-icons/io5";
import { Alert, Snackbar } from "@mui/material";

const MyEcoRewardsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil currentUser dari localStorage
  const [_currentUser, setCurrentUser] = useState<any>(null);
  const [points, setPoints] = useState<number>(0);

  const currentUserStr = localStorage.getItem("currentUser") ||
    '{"idPengguna":"PG006","avatarUrl":"/assets/img/user.png"}';
  const userNow = JSON.parse(currentUserStr);
  const userId = userNow?.idPengguna || "Guest User";

  useEffect(() => {
    const userStr =
      localStorage.getItem("currentUser") ||
      '{"idPengguna":"PG006","avatarUrl":"/assets/img/user.png","points":0}';
    const user = JSON.parse(userStr);
    setCurrentUser(user);
    setPoints(user.points || 0);
  }, []);
  const [activeTab, setActiveTab] = useState<"rewards" | "redeemed">("rewards");
  const [search, setSearch] = useState("");
  const [visibleRewards, setVisibleRewards] = useState(4);
  const [visibleChallenges, setVisibleChallenges] = useState(3);
  // Tambahkan state untuk menyimpan rewards yang sudah diredeem
  const [redeemedRewards, setRedeemedRewards] = useState<any[]>([]);
  const [activeQRCode, setActiveQRCode] = useState<string | null>(null);
  useEffect(() => {
    const used = JSON.parse(localStorage.getItem("usedPoint") || "[]");
    setRedeemedRewards(used);
  }, []);

  // Fungsi untuk redeem reward
  
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleRedeem = (reward: any) => {
    // Cek cukup poin
    if ((points + totalPoin) < reward.cost) {
      setErrorMessage("You do not have enough points!");
      setErrorOpen(true);
      return;
    }
  
    setPoints(points);

    // Tambahkan reward ke redeemedRewards dengan idPengguna
    const rewardWithUser = { ...reward, idPengguna: userId };
    const newRedeemed = [...redeemedRewards, rewardWithUser];
    setRedeemedRewards(newRedeemed);
    localStorage.setItem("usedPoint", JSON.stringify(newRedeemed));

    // Tampilkan snackbar
    setSuccessOpen(true);
  };

  // Badge logic
  const getBadge = () => {
    if (points >= 1500)
      return {
        label: "ZeroHero Elite",
        next: 2000,
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        icon: <FaStar />,
      };
    if (points >= 700)
      return {
        label: "Earth Guardian",
        next: 1500,
        color: "text-purple-600",
        bg: "bg-purple-100",
        icon: <FaMedal />,
      };
    if (points >= 300)
      return {
        label: "Eco Warrior",
        next: 700,
        color: "text-blue-600",
        bg: "bg-blue-100",
        icon: <FaLeaf />,
      };
    if (points >= 100)
      return {
        label: "Eco Explorer",
        next: 300,
        color: "text-green-600",
        bg: "bg-green-100",
        icon: <FaLeaf />,
      };

    return {
      label: "Beginner",
      next: 100,
      color: "text-gray-600",
      bg: "bg-gray-200",
      icon: <FaLeaf />,
    };
  };

  const ecoData: any[] = JSON.parse(localStorage.getItem("ecoData") || "[]");
  const usedPoint: any[] = JSON.parse(localStorage.getItem("usedPoint") || "[]");
  // Filter sesuai user
  const userData = ecoData.filter(item => item.idPengguna === userId);
  const userPoinData = usedPoint.filter(item => item.idPengguna === userId);

  // Hitung total poin
  const totalPoin = userData.reduce((acc, item) => acc + (item.tambahanPoin || 0), 0);
  const totalPoinUsed = userPoinData.reduce((acc, item) => acc + (item.cost || 0), 0);

  const badge = getBadge();
  const progress = Math.min((points / badge.next) * 100, 100);

  const filteredRewards = availableRewards.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredChallenges = availableChallenges.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

 
  
  // Scroll to challenges jika ada hash
  useEffect(() => {
    if (location.hash === "#challenges") {
      const el = document.getElementById("challenges");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, [location]);

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-6 pb-32 flex flex-col items-center">
      {/* Background Wave */}
       <Snackbar
              open={successOpen}
              autoHideDuration={3000}
              onClose={() => setSuccessOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                severity="success"
                onClose={() => setSuccessOpen(false)}
                sx={{
                  width: "400px",
                  backgroundColor: "#66fbb8",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  paddingY: "4px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                Reward Successfully Redeemed
              </Alert>
            </Snackbar>
      <Snackbar
              open={errorOpen}
              autoHideDuration={3000}
              onClose={() => setErrorOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                severity="error"
                onClose={() => setErrorOpen(false)}
                sx={{
                  width: "400px",
                  backgroundImage: "linear-gradient(to right, #FF5252, #FF7043)",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  paddingY: "4px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>
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
          My Eco Rewards
        </h1>
      </div>

      <div className="pt-4 w-full max-w-sm">
        {/* Intro */}
        <p className="text-gray-600 text-sm mb-4">
          Collect points and redeem exciting rewards 🌿
        </p>

        {/* Progress */}
        <div className="bg-gray-100 rounded-full h-4 w-full mb-2">
          <div
            className={`bg-zeroTrace-gradient h-4 rounded-full transition-all`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          <strong>{points + totalPoin - totalPoinUsed}</strong> / {badge.next} Eco Points
        </p>

        
        {/* Badges */}
        <h3 className="text-md font-semibold text-green-700 mb-2">🎖️ Badges</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 mb-4">
          {[
            { label: "Beginner", points: 0, color: "text-gray-600", bg: "bg-gray-200", icon: <FaMedal /> },
            { label: "Eco Explorer", points: 100, color: "text-green-600", bg: "bg-green-100", icon: <IoMedal /> },
            { label: "Eco Warrior", points: 300, color: "text-blue-600", bg: "bg-blue-100", icon: <GiMedal /> },
            { label: "Earth Guardian", points: 700, color: "text-purple-600", bg: "bg-purple-100", icon: <GiStarMedal /> },
            { label: "ZeroHero Elite", points: 1500, color: "text-yellow-600", bg: "bg-yellow-100", icon: <FaStar /> },
          ]
            .filter(b => (points + totalPoin) >= b.points) 
            .map((b, idx) => (
              <div
                key={idx}
                className={`${b.bg} min-w-[140px] border border-gray-200 rounded-xl p-3 shadow text-center`}
              >
                <div className="text-3xl mb-1 text-center flex justify-center">{b.icon}</div>
                <p className={`text-sm font-semibold ${b.color}`}>{b.label}</p>
              </div>
            ))}
        </div>
        

        {/* Search Box */}
        <div className="mb-4 border-t border-dashed pt-5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rewards or challenges..."
            className="w-full border rounded-full px-4 py-2 text-sm shadow"
          />
        </div>

        
         {/* Tab Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab("rewards")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === "rewards"
                  ? "bg-mainColor text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              🎁 Rewards
            </button>
            <button
              onClick={() => setActiveTab("redeemed")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === "redeemed"
                  ? "bg-secondColor text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              🎫 Redeemed ({redeemedRewards.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "rewards" && (
            <div className="grid gap-3">
              {filteredRewards
                .filter(r => !redeemedRewards.find(rr => rr.id === r.id))
                .slice(0, visibleRewards)
                .map((r) => (
                  <div
                    key={r.id}
                    className="flex gap-3 bg-secondColor/10 border border-secondColor/20 rounded-xl p-3 shadow-sm hover:shadow-md hover:scale-103 transition duration-200"
                  >
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-20 h-full rounded object-cover"
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-semibold text-green-800">{r.name}</p>
                      <p className="text-xs text-gray-600">{r.description}</p>
                      <p className="text-xs text-green-700 mt-1">🪙 {r.cost} points</p>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleRedeem(r)}
                          className="mt-2 w-20 ml-auto bg-zeroTrace-gradient text-white py-1 rounded-lg text-xs hover:bg-green-700 transition"
                        >
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "redeemed" && redeemedRewards.length > 0 && (
            <div className="flex flex-col gap-4">
                  {redeemedRewards.map((r, idx) => (
                    <div
                      key={idx}
                      className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 shadow text-center"
                    >
                      <p className="font-semibold text-yellow-800">{r.name}</p>
                      <p className="text-xs text-gray-600">{r.description}</p>
                      <p className="text-xs text-yellow-700 mt-1">🪙 {r.cost} points</p>
                     <button
                        onClick={() => setActiveQRCode(r.id)}
                        className="mt-2 w-40 bg-yellow-500 text-white py-2 px-4 rounded-lg text-xs hover:bg-yellow-600 transition"
                      >
                        Use Coupon
                      </button>

                      {/* QRCode muncul saat active dengan fade in */}
                      <div
                        className={`mt-2 flex justify-center transition-opacity duration-500 ${
                          activeQRCode === r.id ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
                        }`}
                      >
                        {activeQRCode === r.id && (
                          <img
                            src="/assets/img/qrcode.png"
                            alt="QR Code"
                            className="w-32 h-32 rounded object-cover"
                          />
                        )}
                      </div>

                    </div>
                  ))}
                </div>
          )}

        {visibleRewards < filteredRewards.length && (
          <div className="text-center mt-2 mb-4">
            <button
              onClick={() => setVisibleRewards((prev) => prev + 4)}
              className="text-secondColor text-sm font-semibold"
            >
              Show more rewards
            </button>
          </div>
        )}

        {/* Challenges */}
        <h4
          id="challenges"
          className="text-md font-semibold text-secondColor mt-6 mb-2"
        >
          🔥 Active Challenges
        </h4>
        <div className="grid gap-3">
          {filteredChallenges.slice(0, visibleChallenges).map((c) => (
            <div
              onClick={() => navigate("/ChallengeDetail/" + c.id)}
              key={c.id}
              className="flex gap-3 bg-mainColor/30 border border-mainColor/40 rounded-xl p-3 shadow-sm hover:shadow-md hover:scale-103 transition duration-200 cursor-pointer"
            >
              <img
                src={c.image}
                alt={c.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-yellow-800">{c.name}</p>
                <p className="text-xs text-gray-600">{c.description}</p>
                <p className="text-xs text-yellow-700 mt-1">
                  🎯 Hadiah: {c.reward} poin
                </p>
              </div>
            </div>
          ))}
        </div>
        {visibleChallenges < filteredChallenges.length && (
          <div className="text-center mt-2 mb-4">
            <button
              onClick={() =>
                setVisibleChallenges((prev) => prev + 3)
              }
              className="text-mainColor font-semibold text-sm "
            >
              Show more challenges
            </button>
          </div>
        )}
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default MyEcoRewardsPage;
