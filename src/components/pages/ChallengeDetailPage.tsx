import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { availableChallenges } from "../../data/DummyRewards";
import { FaArrowLeft, FaMapMarkerAlt, FaShareAlt } from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";

const ChallengeDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const challenge = availableChallenges.find((c) => c.id === id);

  if (!challenge) {
    return <p className="p-4 text-red-600">Tantangan tidak ditemukan.</p>;
  }

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-4 pb-24">
      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full h-[160px] z-0">
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
        <button onClick={() => navigate("/MyEcoReward")} className="text-white">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl text-white font-zerotrace font-semibold">Challenge Detail</h1>
      </div>

      {/* Detail Challenge */}
      <div className="bg-white rounded-b-xl shadow-lg mt-8">
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-md mb-6">
          {challenge.image && (
            <img
              src={challenge.image}
              alt={challenge.name}
              className="w-full h-44 object-cover rounded mb-4"
            />
          )}
          <h3 className="text-green-800 font-bold text-xl mb-2">{challenge.name}</h3>
          <p className="text-gray-700 mb-3">{challenge.description}</p>

          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-yellow-700 font-semibold">
              🎯 Reward: {challenge.reward} poin
            </span>
            <span className="text-xs text-gray-500">{challenge.duration}</span>
          </div>

          {/* Tips */}
          {challenge.tips && challenge.tips.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-green-800 mb-1">Tips 🌿</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                {challenge.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-4">
            <span className="text-sm text-gray-600">Progress</span>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
              <div
                className="h-3 rounded-full bg-green-500 transition-all duration-500"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/NearbySmartBin")}
              className="w-full flex items-center justify-center gap-2 bg-zeroTrace-gradient hover:brightness-90 text-white py-2 rounded-full text-sm font-semibold transition"
            >
              <FaMapMarkerAlt /> View Nearby SmartBins
            </button>

            
              <button
                onClick={() => navigator.share?.({ title: challenge.name, text: challenge.description })}
                className="w-full flex items-center justify-center gap-2 border border-secondColor text-secondColor hover:bg-secondColor hover:text-white py-2 rounded-full text-sm font-semibold transition"
              >
                <FaShareAlt /> Share Challenge
              </button>
           
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default ChallengeDetailPage;
