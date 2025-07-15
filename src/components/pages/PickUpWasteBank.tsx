import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaTruck,
  FaClock,
  FaIdBadge,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MobileBottomNav from "../organisms/MobileBottomNav";
import dummyWasteBanks from "../../data/DummyWasteBanks";

const PickupWasteBank: React.FC = () => {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [pickupScheme, setPickupScheme] = useState("All");
  const [wasteType, setWasteType] = useState("All");
  const [confirmedPickups, setConfirmedPickups] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("pickupRequestConfirmed");
    if (stored) {
        try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
            setConfirmedPickups(parsed);
        }
        } catch (error) {
        console.error("Failed to parse pickupRequestConfirmed", error);
        }
    }
    }, []);

  useEffect(() => {
    setTimeout(() => setLocationAllowed(true), 1500);
  }, []);

  useEffect(() => {
    if (locationAllowed) {
      setLoadingBanks(true);
      setTimeout(() => setLoadingBanks(false), 1500);
    }
  }, [locationAllowed]);

  const pickupBanks = dummyWasteBanks.filter((item) => {
    if (!item.pickupAvailable) return false;
    if (!item.name.toLowerCase().includes(search.toLowerCase())) return false;

    // Filter berdasarkan skema pickup (jika nanti ada detail per skema di data)
    if (pickupScheme !== "All" && item.pickupMechanism && !item.pickupMechanism.includes(pickupScheme)) {
      return false;
    }

    // Filter berdasarkan kategori sampah
    if (wasteType !== "All" && !item.acceptedWasteTypes.includes(wasteType)) {
      return false;
    }

    return true;
  });
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return (
    <div className="max-w-md mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center gap-2  p-4">
        <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h2 className="text-xl font-semibold">Pickup Waste Service</h2>
      </div>
      <div className="bg-gradient-to-b from-[#B8E986] to-[#ffffff] p-4">
      {confirmedPickups.length > 0 && (
        <div className="mb-4 bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-green-700 mb-2">My Pickup Schedule</h3>
            <div className="space-y-2 text-sm">
            {confirmedPickups.map((pickup) => (
                <div
                key={pickup.pickupId}
                className="p-3 bg-green-50 rounded border border-green-200"
                >
                <div className="bg-white shadow-md rounded-lg p-4 mb-4 text-sm text-gray-800">
                <div className="flex items-center gap-2 mb-1 text-green-700 font-semibold">
                    <FaMapMarkerAlt />
                    <span>{pickup.bankName}</span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                    <FaTruck className="text-green-600" />
                    <span>{pickup.mechanism} Pickup</span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                    <FaClock className="text-green-600" />
                    <span>{new Date(pickup.date).toLocaleDateString("id-ID", options)} – {pickup.time}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <FaIdBadge />
                    <span>ID: {pickup.pickupId}</span>
                </div>
                </div>

                </div>
            ))}
            </div>
        </div>
        )}
      {/* Search & Filter Bar */}
      <div className="flex items-center gap-2 border px-3 py-2 rounded-full shadow-sm mb-4 bg-white">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search waste bank..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none text-sm"
        />
        <button onClick={() => setShowFilters(!showFilters)}>
          <FaFilter className="text-gray-500" />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h4 className="font-semibold text-sm mb-2">Filter by:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <label className="block text-gray-600 mb-1">Pickup Scheme</label>
              <select
                className="w-full border px-2 py-1 rounded"
                value={pickupScheme}
                onChange={(e) => setPickupScheme(e.target.value)}
              >
                <option>All</option>
                <option>Meeting Point</option>
                <option>Door-to-Door</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Waste Category</label>
              <select
                className="w-full border px-2 py-1 rounded"
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
              >
                <option>All</option>
                <option>Plastic</option>
                <option>Paper</option>
                <option>Organic</option>
                <option>Metal</option>
                <option>Glass</option>
                <option>E-Waste</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(false)}
            className="mt-4 w-full text-center bg-[#B8E986] text-sm py-1.5 rounded hover:bg-[#A3D873] transition"
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* Location Status */}
      {!locationAllowed ? (
        <div className="bg-yellow-100 text-sm text-yellow-800 p-3 rounded-lg mb-4">
          <p>
            <strong>Location Permission Required:</strong> Please allow access to show banks with pickup service.
          </p>
        </div>
      ) : (
        <div className="flex items-center text-sm text-green-800 bg-green-50 px-3 py-2 rounded-full mb-4">
          <FaMapMarkerAlt className="mr-2" />
          <span>You're near: Jl. Meruya Selatan, Jakarta Barat</span>
        </div>
      )}

      {/* Bank List */}
      {!locationAllowed ? null : loadingBanks ? (
        <div>
          {[1, 2].map((i) => (
            <div
              key={i}
              className="animate-pulse flex bg-gray-200 rounded-xl p-3 mb-3"
            >
              <div className="w-16 h-16 bg-gray-300 rounded mr-3" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/2" />
                <div className="h-3 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-300 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : pickupBanks.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">No pickup-enabled waste banks match your filter.</p>
      ) : (
        pickupBanks.map((bank) => (
          <div
            key={bank.id}
            onClick={() => navigate(`/PickupWasteBankDetail/${bank.id}`)}
            className="flex bg-[#A4E7C4] rounded-xl p-3 shadow mb-3 cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <img
              src={bank.image}
              alt={bank.name}
              className="w-16 h-16 rounded object-cover mr-3"
            />
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">
                {bank.distance} | {bank.time}
              </p>
              <p className="font-semibold text-sm flex items-center gap-1">
                <FaTruck className="text-green-600" /> {bank.name}
              </p>
              <p className="text-xs text-gray-700">{bank.address}</p>
              <p className="text-xs mt-1 text-green-900">Pickup Available</p>
            </div>
          </div>
        ))
      )}
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default PickupWasteBank;
