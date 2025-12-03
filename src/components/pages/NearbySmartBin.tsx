import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { GiRadarSweep } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import MobileBottomNav from "../organisms/MobileBottomNav";
import binsDataRaw from "../../pseudo_db/smartbin.json";
import { encryptData } from "../utils/encryptor";

interface SmartBin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distance: number; // meters
  type: string;
  capacity: number; // 0–100 %
  photo?: string;
}

// tambahkan image dummy
const binsData: SmartBin[] = binsDataRaw.map((b, i) => ({
  ...b,
  photo: b.photo || `https://source.unsplash.com/collection/1163637/400x300?sig=${i}`,
}));

const NearbySmartBin: React.FC = () => {
  const navigate = useNavigate();
  const [bins, setBins] = useState<SmartBin[]>([]);
  const [filtered, setFiltered] = useState<SmartBin[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const dummyLat = -6.2088;
    const dummyLng = 106.8456;

    const calculateBinsDistance = (userLat: number, userLng: number) => {
      // Map koordinat unik agar jarak sama untuk lokasi sama
      const locationMap = new Map<string, number>();

      let binsWithDistance = binsData.map((bin) => {
        const key = `${bin.lat.toFixed(6)}-${bin.lng.toFixed(6)}`;
        let distance = locationMap.get(key);
        if (!distance) {
          distance = Math.round(getDistanceFromLatLonInMeters(userLat, userLng, bin.lat, bin.lng));
          // Jika semua > 1km, random 100–1000 m
          if (distance > 1000) distance = Math.floor(Math.random() * 900) + 100;
          locationMap.set(key, distance);
        }
        return { ...bin, distance };
      });

      binsWithDistance.sort((a, b) => a.distance - b.distance);

      setBins(binsWithDistance);
      setFiltered(binsWithDistance);
      setLoading(false);
    };

    if (!navigator.geolocation) {
      calculateBinsDistance(dummyLat, dummyLng);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => calculateBinsDistance(pos.coords.latitude, pos.coords.longitude),
      () => calculateBinsDistance(dummyLat, dummyLng)
    );
  }, []);

  function getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371000;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  // Search + Filter
  useEffect(() => {
    let list = [...bins];
    if (search.trim()) {
      list = list.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (filterType !== "all") {
      list = list.filter((b) => b.type.toLowerCase() === filterType.toLowerCase());
    }
    setFiltered(list);
  }, [search, filterType, bins]);

  const formatDistance = (d: number) => (d >= 1000 ? `${(d / 1000).toFixed(1)} km` : `${d} m`);

  const typeColors: Record<string, string> = {
    plastic: "bg-yellow-100 text-yellow-700",
    paper: "bg-blue-100 text-blue-700",
    organic: "bg-green-100 text-green-700",
    metal: "bg-gray-200 text-gray-800",
    glass: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-4 pb-24">
      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full h-[220px] z-0">
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
      <div className="flex items-center gap-3 py-4 mb-2 relative z-20">
        <button onClick={() => navigate("/HomeMobile")} className="text-white">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl text-white font-zerotrace font-semibold">Nearby SmartBin</h1>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-3">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Find Nearby SmartBin..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTER TYPE */}
    <div className="flex gap-2 overflow-x-auto pb-2 mb-4 relative z-20">
        {["all", "plastic", "paper", "glass", "metal", "organic"].map((type) => (
            <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`flex-none min-w-[80px] h-8 flex items-center justify-center rounded-full text-sm border ${
                filterType === type ? "bg-zeroTrace-gradient text-white" : "bg-white text-gray-600"
            }`}
            >
            {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
        ))}
        </div>

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center justify-center mt-12 animate-pulse">
          <GiRadarSweep className="w-20 h-20 text-teal-500 animate-spin" />
          <p className="text-gray-500 mt-3">Scanning SmartBin...</p>
        </div>
      )}

      {/* LIST SMARTBIN */}
      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No SmartBin found.</p>
      )}

      {!loading && (
        <div className="space-y-4 mt-4">
          {filtered.map((bin) => (
            <div
              key={bin.id}
              className="flex rounded-xl shadow border hover:scale-[1.02] transition overflow-hidden"
              onClick={() => navigate("/SmartBinDetail/" + encryptData(bin.id))}
            >
                <img
                  src={bin.photo}
                  alt={bin.name}
                  className="w-28 h-28 object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/assets/img/bin/smartbindummy.webp";
                  }}
                />
              
              {/* Info kanan */}
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-md font-semibold">{bin.name}</h3>
                    <p className="text-xs text-gray-500">{formatDistance(bin.distance)}</p>
                  </div>

                  {/* Chips tipe */}
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${typeColors[bin.type.toLowerCase()] || "bg-gray-100 text-gray-700"}`}>
                      {bin.type}
                    </span>
                  </div>

                  {/* Capacity bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        bin.capacity < 50 ? "bg-green-500" : bin.capacity < 80 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${bin.capacity}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Current Fill Level: {bin.capacity}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <MobileBottomNav />
    </div>
  );
};

export default NearbySmartBin;
