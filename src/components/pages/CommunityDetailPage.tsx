import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import dummyCommunities from "../../data/DummyCommunities";
import MobileBottomNav from "../organisms/MobileBottomNav";

const CommunityDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = useState<any>(null);

  useEffect(() => {
    const found = dummyCommunities.find((c) => c.id === id);
    setCommunity(found);
  }, [id]);

  const handleJoin = () => {
    Swal.fire({
      title: "Welcome!",
      text: `You've successfully joined ${community?.name}.`,
      icon: "success",
      confirmButtonText: "Great!",
      confirmButtonColor: "#66BB00",
    }).then(() => {
      navigate("/CommunityContent/" + id);
    });
  };

  if (!community) {
    return <div className="text-center p-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-28">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 px-4 mt-4">
              <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
              <h2 className="text-xl font-semibold">Community</h2>
            </div>
      <div className="bg-gradient-to-b from-[#B8E986] to-[#ffffff] p-4">
      {/* Cover */}
      <img
        src={community.image}
        alt={community.name}
        className="w-full h-48 object-contain rounded-xl mt-4"
      />

      {/* Detail */}
      <div className="px-4 mt-4 flex flex-col items-center text-center">
        <h3 className="text-2xl font-semibold text-green-800">{community.name}</h3>
        <p className="text-sm text-gray-500 mt-1 italic max-w-md">
            "Stargazer : Where Cosmic Enthusiasts Shine Brightest!"
        </p>

        <button
            onClick={handleJoin}
            className="mt-4 mb-3 bg-green-600 text-white py-2 px-6 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
            JOIN COMMUNITY
        </button>

        <div className="bg-[#e6f6d8] rounded-xl p-4 text-sm font-medium text-green-800 mb-4 w-full max-w-xs">
            {community.members.toLocaleString()} Members
        </div>

        <div className="w-full max-w-md text-left">
            <h4 className="text-base font-semibold mb-2 text-green-800">About</h4>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">
            {community.description} We are a circle of individuals, students, professionals, and volunteers
            who care about the environment and want to make an impact — not just by talking,
            but by acting together.
            </p>
        </div>
        </div>

      </div>
      <MobileBottomNav />
    </div>
  );
};

export default CommunityDetailPage;
