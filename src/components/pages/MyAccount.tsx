import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaCog, FaHeadset, FaSignOutAlt } from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";
import { handleLogout as logout } from '../hooks/HandleLogin';
import { Alert, Snackbar } from "@mui/material";
const MyAccountPage: React.FC = () => {
  const [successOpen, setSuccessOpen] = useState(false);
  const navigate = useNavigate();

  // Ambil user dari localStorage
  const currentUserStr =
    localStorage.getItem("currentUser") ||
    '{"idPengguna":"PG006","namaPengguna":"Guest User","email":"-","avatarUrl":"/assets/img/user.png"}';

  const userNow = JSON.parse(currentUserStr);

   const handleLogout = async () => {
    try {
      logout();
      setSuccessOpen(true);
      setTimeout(() => {
        window.location.href = '/SignIn';
      }, 1000); 
    } catch (error) {

    }
  };

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-6 pb-32 flex flex-col items-center">
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
                      Logout Successful!
                    </Alert>
                  </Snackbar>
      {/* Title */}
      <div className="absolute top-0 left-0 w-full h-[150px] z-0">
        <svg
          viewBox="0 0 1440 480"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
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

      {/* Header */}
      <div className="flex items-center gap-3 py-4 mb-2 relative z-20">
        <h1 className="text-xl text-white font-zerotrace font-semibold">
          My Account
        </h1>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center mb-6 mt-8">
        <img
          src={userNow.avatarUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-secondColor"
          onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              target.src = '/assets/img/user.png';
            }}
        />

        <div className="bg-zeroTrace-gradient text-white min-w-[250px] px-4 py-2 mt-3 rounded-full text-center text-sm leading-tight w-full max-w-xs">
          <p className="font-semibold text-lg">
            {userNow.namaPengguna || "Guest User"}
          </p>
          <p className="text-md pb-1">{userNow.email || "-"}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 text-sm w-full">

        {/* Edit Profile */}
        <button
          onClick={() =>
            navigate("/EditProfile")
          }
          className="w-full flex items-center justify-between bg-gray-100 py-3 px-4 rounded-full hover:bg-gray-200"
        >
          Edit Profile <FaEdit />
        </button>

        {/* Settings */}
        <button
          onClick={() => navigate("/Settings")}
          className="w-full flex items-center justify-between bg-gray-100 py-3 px-4 rounded-full hover:bg-gray-200"
        >
          Settings <FaCog />
        </button>

        {/* Customer Service */}
        <button
          className="w-full flex items-center justify-between bg-gray-100 py-3 px-4 rounded-full hover:bg-gray-200"
        >
          Customer Service <FaHeadset />
        </button>

      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full text-sm font-semibold"
      >
        <FaSignOutAlt className="inline mr-2 mb-1" />
        Logout
      </button>

      {/* Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default MyAccountPage;
