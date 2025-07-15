import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";
import WasteFilterBar from "../atoms/WasteFilterBar";

const dummyData = [
  {
    date: "2025-07-07T09:42",
    location: "Sustainable Corner – Binus Anggrek",
    type: "Plastic",
  },
  {
    date: "2025-05-30T10:28",
    location: "Green Campus – Binus Alam Sutera",
    type: "Organic",
  },
  {
    date: "2025-05-28T23:41",
    location: "Eco Station – FX Sudirman Mall",
    type: "Plastic and Metal",
  },
  {
    date: "2025-05-27T09:12",
    location: "Smart Bin – Binus Senayan",
    type: "Plastic",
  },
  {
    date: "2025-05-25T12:42",
    location: "Community Center – Kebon Jeruk",
    type: "Plastic",
  },
  {
    date: "2025-05-23T15:21",
    location: "Smart Bin – Grand Indonesia",
    type: "Organic",
  },
  {
    date: "2025-05-20T17:05",
    location: "Green Spot – Kota Kasablanka",
    type: "Paper",
  },
];


const formatDate = (iso: string) => {
  const d = new Date(iso);
  const day = d.toLocaleString("en-GB", { day: "2-digit", month: "short" });
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${day}, ${time}`;
};

const WasteTracker: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = dummyData.filter(
    (item) =>
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase())
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-md mx-auto p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FaArrowLeft onClick={() => navigate(-1)} />
        <h2 className="text-xl font-semibold">Waste Tracker</h2>
      </div>

      {/* Search Bar */}
      <WasteFilterBar search={search} setSearch={setSearch} />

      {/* Today */}
      <h4 className="text-sm text-gray-500 mb-2">Today</h4>
      {filtered
        .filter((item) => item.date.startsWith(today))
        .map((item, i) => (
          <TrackerCard key={i} item={item} />
        ))}

      {/* Last Week */}
      <hr className="my-4" />
      <h4 className="text-sm text-gray-500 mb-2">Last Week</h4>
      {filtered
        .filter((item) => !item.date.startsWith(today))
        .map((item, i) => (
          <TrackerCard key={i} item={item} />
        ))}

      <MobileBottomNav />
    </div>
  );
};


const TrackerCard: React.FC<{ item: any }> = ({ item }) => (
  <div className="bg-[#D4EF8A] rounded-xl p-3 shadow mb-3">
    <p className="text-sm font-semibold mb-1">{formatDate(item.date)}</p>
    <p className="text-sm">
      <span className="block">Location: {item.location}</span>
      <span className="block">Waste Type: {item.type}</span>
    </p>
    <div className="flex justify-end mt-2">
      <button className="text-xs bg-[#7dbd44] hover:bg-[#6fa83d] text-white py-1 px-3 rounded-full">
        More Details
      </button>
    </div>
  </div>
);

export default WasteTracker;
