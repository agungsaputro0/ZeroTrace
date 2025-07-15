import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";
import dummyWasteBanks from "../../data/DummyWasteBanks";
import MobileBottomNav from "../organisms/MobileBottomNav";

const WasteBankDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bank = dummyWasteBanks.find((item) => item.id === id);

  if (!bank) {
    return (
      <div className="max-w-md mx-auto p-4">
        <p className="text-red-500">Waste bank not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 px-4 mt-4">
        <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h2 className="text-xl font-semibold">Waste Bank Details</h2>
      </div>
    <div className="bg-gradient-to-b from-[#B8E986] to-[#ffffff] p-4">
      {/* Image */}
      <img
        src={bank.image}
        alt={bank.name}
        className="w-full h-40 object-cover rounded-xl mb-4 mt-4"
      />

      {/* Info */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h3 className="text-lg font-semibold mb-1 text-[#385A00]">{bank.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{bank.description}</p>

        <div className="text-sm text-gray-700 space-y-2">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-600" />
            {bank.address}
          </p>
          <p className="flex items-center gap-2">
            <FaClock className="text-yellow-600" />
            {bank.openHours}
          </p>
          <p className="flex items-center gap-2">
            <FaPhone className="text-blue-600" />
            {bank.contact}
          </p>
          <p>
            <strong>Bin Full:</strong> {bank.binFull}
          </p>
          <p>
            <strong>Distance:</strong> {bank.distance} (estimated: {bank.time})
          </p>
          <p>
            <strong>Pickup Service:</strong>{" "}
            {bank.pickupAvailable ? "Available ✅" : "Not Available ❌"}
          </p>
          <p>
            <strong>Accepted Waste Types:</strong>{" "}
            {bank.acceptedWasteTypes.join(", ")}
          </p>
        </div>
      </div>

      {/* Direction Button */}
      <button
        onClick={() => alert("Opening directions...")}
        className="mt-6 w-full bg-[#7dbd44] hover:bg-[#6fa83d] text-white text-sm py-2 rounded-full"
      >
        Direction
      </button>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default WasteBankDetail;
