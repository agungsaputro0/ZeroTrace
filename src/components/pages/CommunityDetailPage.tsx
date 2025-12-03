import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";
import dummyCommunities from "../../data/DummyCommunities";
import MobileBottomNav from "../organisms/MobileBottomNav";
import { Alert, Snackbar } from "@mui/material";

const CommunityDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = useState<any>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const found = dummyCommunities.find((c) => c.id === id);
    setCommunity(found);
  }, [id]);

 const handleJoin = () => {
    // Ambil currentUser dari localStorage
    const currentUserRaw = localStorage.getItem("currentUser");

    if (!currentUserRaw) {
      setErrorMessage("User not logged in!");
      setErrorOpen(true);
      return;
    }

    const currentUser = JSON.parse(currentUserRaw);
    const userId = currentUser?.idPengguna || "SystemUser01";

    // Ambil data existing dari localStorage
    const existingJoinsRaw = localStorage.getItem("joinedCommunities");
    const joins: { userId: string; communityId: string }[] = existingJoinsRaw
      ? JSON.parse(existingJoinsRaw)
      : [];

    // Cek apakah user sudah join komunitas ini
    const alreadyJoined = joins.some(
      (j) => j.userId === userId && j.communityId === id
    );

    if (!alreadyJoined) {
      joins.push({ userId, communityId: id || "" });
      localStorage.setItem("joinedCommunities", JSON.stringify(joins));
    }

    setSuccessOpen(true);
    setTimeout(() => navigate("/CommunityContent/" + id), 1500);
  };


  if (!community) {
    return <div className="text-center p-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-4 pb-24">
      {/* Header */}
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

      {/* Navigation */}
      <div className="flex items-center gap-3 py-4 relative z-20">
        <button onClick={() => navigate("/Community")} className="text-white">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl text-white font-zerotrace font-semibold">Community</h1>
      </div>

      {/* Profile Photo */}
      <div className="relative z-20 mt-10 flex justify-center">
        <img
          src={community.image}
          alt={community.name}
          className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-lg"
        />
      </div>

      {/* Info */}
      <div className="mt-6 flex flex-col items-center text-center px-4 relative z-20">
        <h2 className="text-2xl font-bold font-zerotrace text-green-800">{community.name}</h2>
        <p className="text-sm text-gray-500 mt-1 italic max-w-md">
          "Stargazer : Where Cosmic Enthusiasts Shine Brightest!"
        </p>

        <button
          onClick={handleJoin}
          className="mt-4 mb-3 bg-zeroTrace-gradient text-white py-2 px-6 rounded-full text-sm font-semibold hover:bg-green-700 transition"
        >
          JOIN COMMUNITY
        </button>

        <div className="flex gap-4 mt-3 mb-8">
        <div className="flex gap-1 items-center justify-center border border-secondColor text-secondColor rounded-lg font-semibold px-3 py-1 text-sm shadow-sm w-40">
          <FaPeopleGroup  /> 
          <span>{community.members.toLocaleString()} Members</span>
        </div>
        <div className="flex gap-1 items-center justify-center border border-secondColor text-secondColor rounded-lg font-semibold  px-3 py-1 text-sm shadow-sm w-40">
          <VscFeedback  /> 
          <span>{community.posts.toLocaleString()} Posts</span>
        </div>
      </div>

        <div className="w-full max-w-md text-left">
          <h4 className="text-green-800 text-base font-semibold mb-2">About</h4>
          <p className="text-gray-700 text-sm leading-relaxed text-justify">
            {community.description} We are a circle of individuals, students, professionals, and volunteers
            who care about the environment and want to make an impact — not just by talking,
            but by acting together.
          </p>
        </div>
      </div>
       <Snackbar
                    open={errorOpen}
                    autoHideDuration={3000}
                    onClose={() => setErrorOpen(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert
                      severity="error"
                      onClose={() => setErrorOpen(false)}
                      sx={{
                        width: "400px",
                        backgroundImage: "linear-gradient(to right, #FF5252, #FF7043)",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "12px",
                        paddingY: "4px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      {errorMessage}
                    </Alert>
                  </Snackbar>
       <Snackbar
                    open={successOpen}
                    autoHideDuration={3000}
                    onClose={() => setSuccessOpen(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert
                      severity="success"
                      onClose={() => setSuccessOpen(false)}
                      sx={{
                        width: "400px",
                        backgroundColor: "#66fbb8",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "12px",
                        paddingY: "4px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                        border: "1px solid rgba(255,255,255,0.3)",
                      }}
                    >
                      You’re now part of the community
                    </Alert>
                  </Snackbar>
      <MobileBottomNav />
    </div>
  );
};

export default CommunityDetailPage;
