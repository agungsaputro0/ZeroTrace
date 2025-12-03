import React from "react";
import {
  FaLeaf,
  FaRecycle,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
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

// Dummy data smartBin
const userStats = {
  totalPoints: 1250,
  badgesOwned: 3,
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
  const cards = [
    {
      label: "Total Poin",
      value: userStats.totalPoints,
      icon: <FaLeaf className="text-green-700" />,
      bg: "bg-gradient-to-br from-green-100 to-green-200",
    },
    {
      label: "Badge Dimiliki",
      value: userStats.badgesOwned,
      icon: <FaStar className="text-yellow-600" />,
      bg: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    },
    {
      label: "Sampah Didaur Ulang (kg)",
      value: userStats.recycledKg,
      icon: <FaRecycle className="text-blue-600" />,
      bg: "bg-gradient-to-br from-blue-100 to-blue-200",
    },
    {
      label: "Total Sampah Dibuat (kg)",
      value: userStats.totalWasteKg,
      icon: <FaMapMarkerAlt className="text-purple-600" />,
      bg: "bg-gradient-to-br from-purple-100 to-purple-200",
    },
  ];

  const wasteData = [
    { name: "Organik", kg: userStats.organicKg },
    { name: "Plastik", kg: userStats.plasticKg },
    { name: "Kertas", kg: userStats.paperKg },
    { name: "Lainnya", kg: userStats.otherKg },
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen-dvh">
      <div className="bg-gradient-to-b from-green-200 to-white p-6 rounded-b-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          Statistik Pengguna
        </h2>
        <p className="text-gray-700 text-sm">
          Ringkasan aktivitas dan kontribusi kamu di smartBin
        </p>
      </div>

      <div className="p-4 bg-gradient-to-b from-[#B8E986] to-[#ffffff]">
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

        {/* Bar Chart: Sampah per kategori */}
        <h3 className="text-gray-700 font-semibold mb-2">Sampah per Kategori (kg)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={wasteData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="kg" fill="#4CAF50" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        {/* Line Chart: Sampah Bulanan */}
        <h3 className="text-gray-700 font-semibold mt-6 mb-2">Sampah Bulanan (kg)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={userStats.monthlyWaste}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="kg"
              stroke="#FF9800"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#FF9800", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Pie Chart: Distribusi tipe sampah */}
        <h3 className="text-gray-700 font-semibold mt-6 mb-2">
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
              stroke="#FF9800"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#FF9800", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="fixed bottom-0 w-full max-w-md">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default UserStatisticsPage;
