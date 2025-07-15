import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaRecycle,
  FaWeightHanging,
  FaClock,
  FaBarcode,
  FaTruck,
} from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";

interface PickupRequest {
  pickupId: string;
  bankId: string;
  bankName: string;
  bankAddress: string;
  mechanism: string;
  estimatedWeight: string;
  locationDetail: string;
  date: string;
  time: string;
  wasteTypes: string[];
}

const PickupConfirmationResult: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [pickupData, setPickupData] = useState<PickupRequest | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("pickupRequestConfirmed");
    if (stored && id) {
      const parsed: PickupRequest[] = JSON.parse(stored);
      const matched = parsed.find((item) => item.pickupId === id);
      if (matched) setPickupData(matched);
    }
  }, [id]);

  const handleDone = () => {
    navigate("/HomeMobile");
  };

  if (!pickupData) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">No pickup data found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen-dvh flex flex-col items-center justify-center px-4 bg-gradient-to-b from-green-400 to-white">
      <div className="bg-green-50 p-5 rounded-xl shadow-md w-full max-w-sm text-center animate-fadeIn">
        <div className="text-green-600 text-5xl mb-2">✅</div>
        <h2 className="font-semibold text-lg mb-1 text-green-800">
          Pickup Request Confirmed
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          📦 Terima kasih telah menjadwalkan penjemputan
        </p>

        <div className="text-left text-sm text-gray-800 space-y-2">
          <div className="flex items-center gap-2">
            <FaBarcode className="text-green-600" />
            <span><strong>Pickup ID:</strong> {pickupData.pickupId}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-600" />
            <span><strong>Bank:</strong> {pickupData.bankName}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaTruck className="text-green-600" />
            <span><strong>Mekanisme:</strong> {pickupData.mechanism}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaClock className="text-green-600" />
            <span><strong>Jadwal:</strong> {pickupData.date} – {pickupData.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaWeightHanging className="text-green-600" />
            <span><strong>Estimasi Berat:</strong> {pickupData.estimatedWeight} kg</span>
          </div>

          <div className="flex items-center gap-2">
            <FaRecycle className="text-green-600" />
            <span><strong>Jenis Sampah:</strong> {pickupData.wasteTypes.join(", ")}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-600" />
            <span><strong>Lokasi Pickup:</strong> {pickupData.locationDetail}</span>
          </div>
        </div>

        <button
          onClick={handleDone}
          className="mt-6 bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
        >
          Done
        </button>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default PickupConfirmationResult;
