import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userRewards, availableRewards } from "../../data/DummyRewards";
import MobileBottomNav from "../organisms/MobileBottomNav";
import { FaArrowLeft } from "react-icons/fa";

const RedeemPage: React.FC = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(userRewards.points);
  const [redeemedIds, setRedeemedIds] = useState<string[]>([]);

  const redeemableRewards = availableRewards.filter(
    (r) => r.cost <= points && !redeemedIds.includes(r.id)
  );

  const handleRedeem = async (rewardId: string) => {
    const reward = availableRewards.find((r) => r.id === rewardId);
    if (!reward) return;

   const result = await Swal.fire({
        title: `<div class="text-green-800 font-bold text-lg mb-1">Tukar ${reward.name}?</div>`,
        html: `
            <p class="text-gray-700 text-sm mb-2">Hadiah ini membutuhkan <strong>${reward.cost} poin</strong>.</p>
            <p class="text-gray-600 text-xs">Pastikan kamu benar-benar ingin menukar ya! 🌿</p>
        `,
        showCancelButton: true,
        confirmButtonText: "Tukar Sekarang",
        cancelButtonText: "Batal",
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#d1d5db",
        background: "#f0fdf4",
        customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 rounded-full text-sm",
            cancelButton: "px-4 py-2 rounded-full text-sm",
        },
    });


    if (result.isConfirmed) {
      setPoints((prev) => prev - reward.cost);
      setRedeemedIds((prev) => [...prev, reward.id]);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: `Kamu telah menukar ${reward.name}`,
        confirmButtonColor: "#16a34a",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-28">
      <div className="pt-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 px-4 ">
          <button onClick={() => navigate("/MyEcoReward")} className="text-green-700">
            <FaArrowLeft />
          </button>
          <h2 className="text-xl font-semibold text-green-800">Tukarkan Poin</h2>
        </div>
       <div className="bg-gradient-to-b from-[#B8E986] to-[#ffffff] p-4">
        <p className="text-sm text-gray-600 mb-4">
          Gunakan poin kamu untuk mendapatkan hadiah menarik 🌿
        </p>

        {/* Poin User */}
        <div className="mb-4 bg-green-100 border border-green-200 text-green-800 text-center py-4 rounded-xl shadow-inner">
          <p className="text-sm">Total Poin Kamu</p>
          <p className="text-3xl font-bold tracking-wide flex justify-center items-center gap-1">
            {points} <span className="text-2xl">🪙</span>
          </p>
        </div>

        <div className="text-center mb-6">
          <span className="text-sm text-gray-600">
            Ingin dapat poin lebih?{" "}
          </span>
          <button
            onClick={() => navigate("/MyEcoReward#challenges")}
            className="text-green-700 text-sm font-semibold underline hover:text-green-900 transition"
          >
            Ikuti tantangan ➜
          </button>
        </div>

        {/* List Reward */}
        {redeemableRewards.length === 0 ? (
          <p className="text-sm text-gray-500 mb-10 text-center">
            Belum ada reward yang bisa ditukar.
          </p>
        ) : (
          <div className="grid gap-4 mb-10">
            {redeemableRewards.map((r) => (
              <div
                key={r.id}
                className="flex gap-3 items-center bg-green-50 border border-green-100 rounded-xl p-3 shadow hover:shadow-md hover:bg-green-100 transition"
              >
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-green-800">{r.name}</p>
                  <p className="text-xs text-gray-600">{r.description}</p>
                  <p className="text-xs text-green-700 mt-1">🪙 {r.cost} poin</p>
                </div>
                <button
                  onClick={() => handleRedeem(r.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg text-xs font-medium transition"
                >
                  Tukar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
        </div>
      <MobileBottomNav />
    </div>
  );
};

export default RedeemPage;
