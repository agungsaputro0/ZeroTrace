import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import MobileBottomNav from "../organisms/MobileBottomNav";
import { GiCrownCoin, GiPodiumWinner, GiStarMedal } from "react-icons/gi";
import { BiSolidCoupon } from "react-icons/bi";

// Dummy data
const userStats = {
  badgesOwned: 2,
  totalWasteKg: 42,
  recycledKg: 30,
  organicKg: 15,
  plasticKg: 10,
  paperKg: 12,
  otherKg: 5,
  monthlyWaste: [
    { month: "Jan", kg: 20 },
    { month: "Feb", kg: 18 },
    { month: "Mar", kg: 25 },
    { month: "Apr", kg: 22 },
    { month: "May", kg: 30 },
    { month: "Jun", kg: 28 },
  ],
};

const UserStatisticsPage: React.FC = () => {

  const wasteData = [
    { name: "Organic", kg: userStats.organicKg },
    { name: "Plastic", kg: userStats.plasticKg },
    { name: "Paper", kg: userStats.paperKg },
    { name: "Other", kg: userStats.otherKg },
  ];

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
      setPoints(user.points || 0);
    }, []);

  const ecoData: any[] = JSON.parse(localStorage.getItem("ecoData") || "[]");
  const usedPoint: any[] = JSON.parse(localStorage.getItem("usedPoint") || "[]");
  // Filter sesuai user
  const userData = ecoData.filter(item => item.idPengguna === userId);
  const userPoinData = usedPoint.filter(item => item.idPengguna === userId);

  // Hitung total poin
  const totalPoin = userData.reduce((acc, item) => acc + (item.tambahanPoin || 0), 0);
  const totalPoinUsed = userPoinData.reduce((acc, item) => acc + (item.cost || 0), 0);

  const cards = [
    {
      label: "Total Points",
      value: points + totalPoin - totalPoinUsed,
      icon: <GiCrownCoin className="text-yellow-700" />,
      bg: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    },
    {
      label: "Badges Owned",
      value: userStats.badgesOwned,
      icon: <GiStarMedal className="text-gray-800" />,
      bg: "bg-gradient-to-br from-gray-100 to-gray-200",
    },
    {
      label: "Reward Claimed",
      value: userStats.recycledKg, // bisa diganti sesuai data reward
      icon: <BiSolidCoupon className="text-blue-600" />,
      bg: "bg-gradient-to-br from-blue-100 to-blue-200",
    },
    {
      label: "Challenges Fulfilled",
      value: userStats.totalWasteKg, // bisa diganti sesuai jumlah challenge
      icon: <GiPodiumWinner className="text-purple-600" />,
      bg: "bg-gradient-to-br from-purple-100 to-purple-200",
    },
  ];

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-4 pb-24">
      {/* HEADER */}
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
      <div className="flex justify-center items-center gap-3 py-4 mb-2 relative z-20">
        <h1 className="text-2xl text-white font-zerotrace font-semibold">User Statistics</h1>
      </div>

      <p className="text-gray-700 text-md mb-4 mt-6 text-justify font-bold">
        Overview of your activities and contributions in the platform.
      </p>

      <div className="p-4 bg-white">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`rounded-3xl p-5 shadow-xl hover:scale-105 transition-transform duration-200 flex flex-col justify-center items-center ${card.bg}`}
            >
              <div className="text-4xl mb-2">{card.icon}</div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-sm text-gray-600 text-center mt-1">{card.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-lg mt-8 p-4 border border-gray-200">
        {/* Bar Chart: Waste per Category */}
        <h3 className="text-gray-700 font-semibold mb-8">Waste per Category (kg)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={wasteData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="kg" fill="#26C6DA" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-1 text-justify">
          Analysis: Plastic and paper make up the largest portion of your waste. Consider prioritizing recycling for these categories.
        </p>
        </div>
         <div className="bg-white rounded-xl shadow-lg mt-8 p-4 border border-gray-200">
        {/* Line Chart: Monthly Waste */}
        <h3 className="text-gray-700 font-semibold mb-8">Monthly Waste (kg)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={userStats.monthlyWaste}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="kg"
              stroke="#26C6DA"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#26D6A8", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-1 text-justify">
          Analysis: Your waste generation trends are increasing in May. Try spreading activities evenly each month.
        </p>
        </div>
        
         <div className="bg-white rounded-xl shadow-lg mt-8 p-4 border border-gray-200">
        {/* Line Chart: Monthly Crowd Action */}
        <h3 className="text-gray-700 font-semibold mb-8">
          Monthly Crowd Action Participation
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={[
              { month: "Jan", actions: 2 },
              { month: "Feb", actions: 3 },
              { month: "Mar", actions: 1 },
              { month: "Apr", actions: 4 },
              { month: "May", actions: 5 },
              { month: "Jun", actions: 3 },
            ]}
          >
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(value: number) => `${value} actions`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="actions"
              stroke="#26C6DA"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#26D6A8", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-1 text-justify">
          Analysis: Your participation in crowd actions has been consistent with peaks in May. Keep engaging regularly for maximum impact.
        </p>
      </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-md">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default UserStatisticsPage;
