import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaMapMarkerAlt, FaExclamationCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import binsDataRaw from "../../pseudo_db/smartbin.json";
import { decryptData } from "../utils/encryptor";
import MobileBottomNav from "../organisms/MobileBottomNav";

interface SmartBin {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: string;
  capacity: number;
  distance: number;
  lastUpdated: string;
  photo?: string;
}

const typeColors: Record<string, string> = {
  plastic: "bg-yellow-100 text-yellow-700",
  paper: "bg-blue-100 text-blue-700",
  organic: "bg-green-100 text-green-700",
  metal: "bg-gray-200 text-gray-800",
  glass: "bg-purple-100 text-purple-700",
};

const SmartBinDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [bin, setBin] = useState<SmartBin | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [nearbyTypes, setNearbyTypes] = useState<string[]>([]);

  useEffect(() => {
    const found = binsDataRaw.find((b) => b.id === decryptData(id || ""));
    if (found) {
      setBin(found);

      // Dummy jarak 100–900 m
      setDistance(Math.floor(Math.random() * 800) + 100);

      // Cek smartbin lain di lokasi sama
      const sameLocationBins = binsDataRaw.filter(
        (b) =>
          b.id !== found.id &&
          b.lat.toFixed(6) === found.lat.toFixed(6) &&
          b.lng.toFixed(6) === found.lng.toFixed(6)
      );
      setNearbyTypes(sameLocationBins.map((b) => b.type));
    }
  }, [id]);

  if (!bin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>SmartBin data not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const formatDistance = (d: number) =>
    d >= 1000 ? `${(d / 1000).toFixed(1)} km` : `${d} m`;

  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${bin.lat},${bin.lng}`;
    window.open(url, "_blank");
  };

  const reportSmartBin = () => {
    navigate("/ReportSmartBin/" + id);
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
        <button onClick={() => navigate("/NearbySmartBin")} className="text-white">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl text-white font-zerotrace font-semibold">SmartBin Detail</h1>
      </div>

      {/* IMAGE */}
      {bin.photo && (
        <img
          src={bin.photo}
          alt={bin.name}
          className="w-full h-48 object-cover rounded-xl mb-4 relative z-20"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.onerror = null;
            target.src = "/assets/img/bin/smartbindummy.webp";
          }}
        />
      )}

      {/* INFO */}
      <div className="space-y-2">
       <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{bin.name}</h2>
        <span className="text-gray-500 text-xs">{formatDistance(distance)}</span>
      </div>
        <p className="text-gray-600 text-sm">{bin.address}</p>
         {/* Chips */}
        <div className="flex gap-2 flex-wrap mt-2">
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              typeColors[bin.type.toLowerCase()] || "bg-gray-100 text-gray-700"
            }`}
          >
            {bin.type}
          </span>
        </div>

        {/* Nearby smartbin */}
        {nearbyTypes.length > 0 && (
          <>
           <p className="text-gray-600 text-sm mt-2">This location also has another smartbin with type : </p> 
          <div className="flex gap-2 flex-wrap mt-1">
            {nearbyTypes.map((t, i) => (
              <span
                key={i}
                className={`px-3 py-1 text-xs rounded-full ${
                  typeColors[t.toLowerCase()] || "bg-gray-100 text-gray-700"
                }`}
              >
               {t}
              </span>
            ))}
          </div>
          </>
        )}

        {/* Capacity bar */}
        <div className="mt-3">
          <p className="text-xs text-gray-600 mb-1">
            Current Fill Level: {bin.capacity}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${
                bin.capacity < 50
                  ? "bg-green-500"
                  : bin.capacity < 80
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${bin.capacity}%` }}
            />
          </div>
        </div>

        {/* Last updated */}
        <p className="text-gray-400 text-xs mt-2 mb-8">
          Last Updated: {formatDate(bin.lastUpdated)}
        </p>
        </div>
        <div>
        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={openGoogleMaps}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-zeroTrace-gradient text-white rounded-xl"
          >
            <FaMapMarkerAlt /> Guide to Location
          </button>
          <button
            onClick={reportSmartBin}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-white text-secondColor border border-secondColor rounded-xl"
          >
            <FaExclamationCircle /> Report SmartBin
          </button>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default SmartBinDetail;
