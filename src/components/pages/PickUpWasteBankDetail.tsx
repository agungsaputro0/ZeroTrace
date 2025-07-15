import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import dummyWasteBanks from "../../data/DummyWasteBanks";
import { FaArrowLeft, FaTruck, FaInfoCircle } from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";

const PickupWasteBankDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const bank = dummyWasteBanks.find((item) => item.id === id);

  if (!bank || !bank.pickupAvailable) {
    return (
      <div className="max-w-md mx-auto p-4">
        <p className="text-center text-gray-500">Bank sampah tidak ditemukan atau tidak memiliki layanan pickup.</p>
      </div>
    );
  }

  const handleMechanismSelect = (mechanism: string) => {
    navigate(`/PickupScheduleForm/${bank.id}?mechanism=${encodeURIComponent(mechanism)}`);
  };

  return (
    <div className="max-w-md mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center pt-4 px-4 gap-2 mb-4">
        <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h2 className="text-xl font-semibold">{bank.name}</h2>
      </div>
      <div className="bg-gradient-to-b from-[#B8E986] to-[#ffffff] p-4">
      {/* Banner */}
      <img src={bank.image} alt={bank.name} className="rounded-lg w-full h-40 object-cover mb-4" />

      {/* Info */}
      <div className="space-y-1 text-sm mb-4">
        <p><strong>Alamat:</strong> {bank.address}</p>
        <p><strong>Kontak:</strong> {bank.contact}</p>
        <p><strong>Jam Operasional:</strong> {bank.openHours}</p>
        <p className="text-green-700 font-medium"><FaTruck className="inline mr-1" /> Pickup Service Available</p>
        <p className="text-gray-700"><FaInfoCircle className="inline mr-1" /> {bank.description}</p>
      </div>

      {/* Pilih Mekanisme */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Pilih Mekanisme Pickup:</h3>
        {bank.pickupMechanism?.map((mechanism, idx) => (
          <button
            key={idx}
            onClick={() => handleMechanismSelect(mechanism)}
            className="block w-full text-left bg-white border px-4 py-2 rounded-lg shadow mb-2 hover:bg-green-400"
          >
            {mechanism}
          </button>
        ))}
      </div>
      <MobileBottomNav />
    </div>
    </div>
  );
};

export default PickupWasteBankDetail;
