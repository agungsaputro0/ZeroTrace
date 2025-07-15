import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import dummyWasteBanks from "../../data/DummyWasteBanks";
import pickupPoints from "../../data/DummyPickUpPoint";
import MobileBottomNav from "../organisms/MobileBottomNav";

const PickupScheduleForm: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const mechanism = searchParams.get("mechanism") || "door-to-door";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bank = dummyWasteBanks.find((b) => b.id === id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [locationDetail, setLocationDetail] = useState("");
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);
  const [estimatedWeight, setEstimatedWeight] = useState("");
  const [selectedPickupPointId, setSelectedPickupPointId] = useState("");
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);

  const selectedPoint = pickupPoints.find(p => p.id === selectedPickupPointId);

  const handleWasteTypeToggle = (type: string) => {
    setSelectedWasteTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhotoBase64(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      bankId: bank?.id,
      bankName: bank?.name,
      bankAddress: bank?.address,
      mechanism,
      estimatedWeight,
      locationDetail: mechanism === "Door-to-Door" ? locationDetail : selectedPoint?.location,
      date: mechanism === "Door-to-Door" ? date : selectedPoint?.date,
      time: mechanism === "Door-to-Door" ? time : selectedPoint?.time,
      wasteTypes: selectedWasteTypes,
      photoBase64, // Tambahkan foto jika ada
    };

    localStorage.setItem("pickupRequest", JSON.stringify(payload));
    navigate("/PickupConfirmation");
  };

  useEffect(() => {
    localStorage.removeItem("pickupRequest");
  }, []);

  if (!bank) return <div className="p-4">Bank not found</div>;

  const wasteCategories = [
    "Organic", "Plastic", "Paper", "Metal", "Glass",
    "Electronic", "Hazardous", "Residual", "Others"
  ];

  return (
    <div className="max-w-md mx-auto pb-24">
      <div className="flex items-center p-4 gap-2">
        <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h2 className="text-xl font-semibold">Pickup Schedule ({mechanism})</h2>
      </div>
      <div className="bg-gradient-to-b from-[#B8E986] to-[#ffffff] p-4">
        <div className="mb-4 text-sm text-gray-700">
          <p className="font-semibold text-green-700">{bank.name}</p>
          <p>{bank.address}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mechanism === "Door-to-Door" ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pickup Location</label>
                <textarea
                  value={locationDetail}
                  onChange={(e) => setLocationDetail(e.target.value)}
                  placeholder="e.g., Depan rumah no. 21, RT 03 RW 05"
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">Select Meeting Point</label>
              <select
                value={selectedPickupPointId}
                onChange={(e) => setSelectedPickupPointId(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Select Meeting Point --</option>
                {pickupPoints.map((point) => (
                  <option key={point.id} value={point.id}>
                    {point.location} - {point.time}
                  </option>
                ))}
              </select>
              {selectedPoint && (
                <div className="mt-2 text-sm text-gray-600">
                  📍 <strong>{selectedPoint.location}</strong><br />
                  📅 {selectedPoint.dateReadable} – 🕗 {selectedPoint.time}
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Estimated Weight Total (kg)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={estimatedWeight}
              onChange={(e) => setEstimatedWeight(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. 1.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Waste Categories</label>
            <div className="grid grid-cols-3 gap-3">
              {wasteCategories.map((type) => (
                <div
                  key={type}
                  onClick={() => handleWasteTypeToggle(type)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border shadow-sm cursor-pointer transition text-xs font-medium ${
                    selectedWasteTypes.includes(type)
                      ? "bg-green-100 border-green-600 text-green-700"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  <img
                    src={`/assets/img/icon/${type.toLowerCase().replace(/[\s-]/g, "")}.png`}
                    alt={type}
                    className="w-6 h-6 mb-1"
                  />
                  {type}
                </div>
              ))}
            </div>
          </div>

         <div>
  <label className="block text-sm font-medium mb-1">Foto Sampah (Opsional)</label>
  
  <div className="relative">
  <div
  className="w-full border-2 border-dashed border-slate-400 rounded-md p-4 text-center text-gray-500 hover:border-green-500 cursor-pointer transition"
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // reset input
        }
      };
      reader.readAsDataURL(file);
    }
  }}
  onClick={() => fileInputRef.current?.click()}
>
  {photoBase64 ? (
    <div className="relative inline-block">
      <img
        src={photoBase64}
        alt="Preview Sampah"
        className="mx-auto rounded max-h-60 object-contain"
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setPhotoBase64("");
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // reset input
          }
        }}
        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600"
      >
        ✕
      </button>
    </div>
  ) : (
    <p>📤 Klik atau seret gambar ke sini untuk mengunggah</p>
  )}
</div>

<input
  id="photoUploadInput"
  type="file"
  accept="image/*"
  ref={fileInputRef}
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // reset input
        }
      };
      reader.readAsDataURL(file);
    }
  }}
  className="hidden"
/>
  <input
    id="photoUploadInput"
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoBase64(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }}
    className="hidden"
  />


</div>

  <input
    id="photoUploadInput"
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoBase64(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }}
    className="hidden"
  />

  
</div>


          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
          >
            Submit Request
          </button>
          <p className="mt-3 text-xs text-gray-500 text-justify">
              ♻️ <strong>Catatan:</strong> Pastikan sampah <strong>dipilah rapi</strong> dan <strong>dalam kondisi bersih/kering</strong> sebelum penjemputan.
            </p>
        </form>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default PickupScheduleForm;
