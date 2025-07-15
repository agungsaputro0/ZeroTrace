import React from "react";
import {
  FaGift,
  FaTasks,
  FaCommentDots,
  FaHeart,
  FaLeaf,
} from "react-icons/fa";
import { userRewards } from "../../data/DummyRewards";
import MobileBottomNav from "../organisms/MobileBottomNav";

const UserStatisticsPage: React.FC = () => {
  const stats = {
    totalPoints: userRewards.points,
    redeemedRewards: 5,
    challengesCompleted: 8,
    commentsGiven: 12,
    likesGiven: 20,
    badgesOwned: userRewards.badges.length,
  };

  const cards = [
    {
      label: "🌿 Total Poin",
      value: `${stats.totalPoints}`,
      icon: <FaLeaf className="text-green-600" />,
      bg: "bg-green-50",
    },
    {
      label: "🎁 Reward Ditukar",
      value: stats.redeemedRewards,
      icon: <FaGift className="text-yellow-600" />,
      bg: "bg-yellow-50",
    },
    {
      label: "✅ Tantangan Selesai",
      value: stats.challengesCompleted,
      icon: <FaTasks className="text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      label: "💬 Komentar Diberikan",
      value: stats.commentsGiven,
      icon: <FaCommentDots className="text-purple-600" />,
      bg: "bg-purple-50",
    },
    {
      label: "❤️ Like Diberikan",
      value: stats.likesGiven,
      icon: <FaHeart className="text-red-500" />,
      bg: "bg-red-50",
    },
    {
      label: "🏅 Badge Dimiliki",
      value: stats.badgesOwned,
      icon: <FaLeaf className="text-green-700" />,
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen-dvh">
      <div className="bg-gradient-to-b from-green-200 to-white p-6 rounded-b-3xl shadow-md">
        <h2 className="text-2xl font-semibold text-green-800 mb-1 flex items-center gap-2">
          📊 Statistik Saya
        </h2>
        <p className="text-sm text-gray-700">
          Berikut ringkasan aktivitas dan pencapaian kamu 🌱
        </p>
      </div>
        <div className="bg-gradient-to-b from-[#B8E986] to-[#ffffff] p-4">
      <div className="p-6 grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`rounded-2xl p-4 shadow-md hover:scale-105 transition-transform duration-200 flex flex-col justify-center items-center ${card.bg}`}
          >
            <div className="text-3xl mb-2">{card.icon}</div>
            <p className="text-xl font-bold text-gray-800">{card.value}</p>
            <p className="text-sm text-gray-600 text-center mt-1">{card.label}</p>
          </div>
        ))}
      </div>
        </div>
      <div className="fixed bottom-0 w-full max-w-md">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default UserStatisticsPage;
