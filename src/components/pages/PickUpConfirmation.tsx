import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";

interface PickupRequest {
  bankId: string;
  bankName: string;
  bankAddress: string;
  mechanism: string;
  estimatedWeight: string;
  locationDetail: string;
  date: string;
  time: string;
  wasteTypes: string[];
  photoBase64?: string;
}

const PickupConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [pickupData, setPickupData] = useState<PickupRequest | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("pickupRequest");
    if (stored) {
      setPickupData(JSON.parse(stored));
    }
  }, []);



const generatePickupId = () => {
  return `PR-${Date.now().toString(36)}`;
};

const handleConfirm = () => {
  const id = generatePickupId();

  if (pickupData) {
    const confirmedData = { ...pickupData, pickupId: id };

    // Ambil array lama dari localStorage (kalau ada)
    const existing = JSON.parse(localStorage.getItem("pickupRequestConfirmed") || "[]");

    // Tambahkan data baru ke array
    const updated = [confirmedData, ...existing];

    // Simpan kembali ke localStorage
    localStorage.setItem("pickupRequestConfirmed", JSON.stringify(updated));

    // Hapus pickupRequest sementara
    localStorage.removeItem("pickupRequest");

    // Navigasi ke halaman hasil
    navigate("/PickUpConfirmationResult/" + id);
  }
};



  if (!pickupData) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">No pickup data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto pb-24">
      <div className="flex items-center p-4 gap-2">
        <FaArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <h2 className="text-xl font-semibold">Confirm Your Pickup</h2>
      </div>
      <div className="bg-gradient-to-b from-[#B8E986] to-[#ffffff] p-4">
      <div className="space-y-3 bg-white rounded shadow p-4 text-sm">
        <div>
          <strong>Bank Sampah:</strong>
          <p className="text-green-700">{pickupData.bankName}</p>
          <p className="text-gray-600">{pickupData.bankAddress}</p>
        </div>

        <div>
          <strong>Mekanisme:</strong>
          <p>{pickupData.mechanism}</p>
        </div>

        <div>
          <strong>Lokasi Penjemputan:</strong>
          <p>{pickupData.locationDetail}</p>
        </div>

        <div>
          <strong>Tanggal & Waktu:</strong>
          <p>{pickupData.date} – {pickupData.time}</p>
        </div>

        <div>
          <strong>Perkiraan Berat:</strong>
          <p>{pickupData.estimatedWeight} kg</p>
        </div>

        <div>
          <strong>Jenis Sampah:</strong>
          <ul className="list-disc list-inside text-gray-700">
            {pickupData.wasteTypes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>

        {pickupData.photoBase64 && (
          <div>
            <strong>Foto Sampah:</strong>
            <img
              src={pickupData.photoBase64}
              alt="Foto Sampah"
              className="mt-2 rounded w-full max-h-60 object-contain border"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleConfirm}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
      >
        Konfirmasi Penjemputan
      </button>
        </div>
      <MobileBottomNav />
    </div>
  );
};

export default PickupConfirmation;
