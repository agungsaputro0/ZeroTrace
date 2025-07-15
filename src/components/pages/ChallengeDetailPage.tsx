import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { availableChallenges } from "../../data/DummyRewards";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";

const ChallengeDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const challenge = availableChallenges.find((c) => c.id === id);

  const [proofText, setProofText] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!challenge) {
    return <p className="p-4 text-red-600">Tantangan tidak ditemukan.</p>;
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setProofFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProofFile(file);
  };

  const handleSubmit = async () => {
    if (!proofText.trim() && !proofFile) {
      return Swal.fire({
        title: "Bukti masih kosong!",
        text: "Silakan isi catatan atau upload bukti terlebih dahulu.",
        icon: "warning",
        confirmButtonColor: "#16a34a",
      });
    }

    const result = await Swal.fire({
      title: `<div class="text-green-800 font-semibold text-lg mb-1">Kirim Bukti?</div>`,
      html: `<p class="text-sm text-gray-700">Bukti akan diperiksa oleh tim kami. Kamu akan mendapat <strong>${challenge.reward} poin</strong> bila lolos verifikasi 🌿</p>`,
      showCancelButton: true,
      confirmButtonText: "Kirim Sekarang",
      cancelButtonText: "Batal",
      confirmButtonColor: "#16a34a",
      background: "#f0fdf4",
    });

    if (result.isConfirmed) {
      setSubmitted(true);
      Swal.fire({
        icon: "success",
        title: "Terkirim!",
        text: "Bukti kamu telah dikirim untuk ditinjau.",
        confirmButtonColor: "#16a34a",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen-dvh bg-white py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 px-4">
        <button onClick={() => navigate(-1)} className="text-green-700">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold text-green-800">Tantangan</h2>
      </div>

      {/* Detail Challenge */}
      <div className="bg-gradient-to-b from-[#B8E986] to-[#ffffff] p-4">
      <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 shadow mb-6">
        {challenge.image && (
          <img
            src={challenge.image}
            alt={challenge.name}
            className="w-full h-40 object-cover rounded mb-3"
          />
        )}
        <h3 className="text-green-800 font-bold text-lg">{challenge.name}</h3>
        <p className="text-sm text-gray-700 mt-1">{challenge.description}</p>
        <p className="text-xs text-yellow-700 mt-2">🎯 Hadiah: {challenge.reward} poin</p>
      </div>

      {/* Form */}
      {!submitted ? (
        <>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Catatan / Link Bukti
          </label>
          <textarea
            value={proofText}
            onChange={(e) => setProofText(e.target.value)}
            rows={3}
            placeholder="Contoh: Link Drive, catatan kegiatan..."
            className="w-full border border-gray-300 rounded-lg p-2 text-sm mb-4 shadow-sm"
          />

          {/* Dropzone */}
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Upload Bukti (opsional)
          </label>
          {!proofFile ? (
            <div
              className="w-full border-2 border-dashed border-green-300 rounded-lg p-4 text-center text-sm text-gray-600 cursor-pointer hover:border-green-400 bg-green-50 mb-4"
              onClick={() => inputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              Seret file ke sini atau klik untuk unggah
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                hidden
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 mb-4 bg-gray-100 p-2 rounded shadow-sm">
              <img
                src={URL.createObjectURL(proofFile)}
                alt="Preview"
                className="w-12 h-12 object-cover rounded"
              />
              <span className="text-sm flex-1 truncate">{proofFile.name}</span>
              <button
                onClick={() => setProofFile(null)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full text-sm font-semibold transition"
          >
            Kirim Bukti
          </button>
        </>
      ) : (
        <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center shadow-sm">
          <p className="text-green-800 font-semibold mb-2">✅ Bukti telah dikirim!</p>
          <p className="text-sm text-gray-600">
            Tunggu proses verifikasi. Kamu akan mendapatkan poin setelah disetujui 🌿
          </p>
        </div>
      )}
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default ChallengeDetailPage;
