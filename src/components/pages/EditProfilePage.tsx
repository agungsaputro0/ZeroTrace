import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import MobileBottomNav from "../organisms/MobileBottomNav";
import { FaArrowLeft } from "react-icons/fa";

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
 

  const currentUserStr = localStorage.getItem("currentUser");
  const userNow = currentUserStr ? JSON.parse(currentUserStr) : null;

  const [namaPengguna, setNamaPengguna] = useState(userNow?.namaPengguna || "");
  const [email, setEmail] = useState(userNow?.email || "");
  const [nomorTelepon, setNomorTelepon] = useState(userNow?.nomorTelepon || "");
  const [avatarUrl, _setAvatarUrl] = useState(userNow?.avatarUrl || "/assets/img/user.png");
  const [password, setPassword] = useState(userNow?.avatarUrl || "/assets/img/user.png");

  const [successOpen, setSuccessOpen] = useState(false);

  const handleSave = () => {
    const updatedUser = {
      ...userNow,
      namaPengguna,
      email,
      nomorTelepon,
      password,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setSuccessOpen(true);

    setTimeout(() => {
      navigate("/MyAccount");
    }, 1200);
  };

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-6 pb-32 flex flex-col ">
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
                            Profile Updated Successfully!
                          </Alert>
                        </Snackbar>

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
      <div className="flex items-center gap-3 py-4 relative z-20">
              <button onClick={() => navigate(-1)} className="text-white">
                <FaArrowLeft />
              </button>
              <h1 className="text-xl text-white font-zerotrace font-semibold">Edit Profile</h1>
            </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-5 mt-8">
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-secondColor object-cover"
          onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              target.src = '/assets/img/user.png';
            }}
        />
      </div>

      <div className="space-y-4 w-full">
        {/* Nama */}
        <div>
          <label className="text-sm font-semibold">Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-lg"
            value={namaPengguna}
            onChange={(e) => setNamaPengguna(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Nomor Telepon */}
        <div>
          <label className="text-sm font-semibold">Phone</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-lg"
            value={nomorTelepon}
            onChange={(e) => setNomorTelepon(e.target.value)}
          />
        </div>

        {/* Avatar URL */}
        <div>
          <label className="text-sm font-semibold">Password</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-6 w-full bg-zeroTrace-gradient hover:brightness-90 text-white py-3 rounded-full text-sm font-semibold"
      >
        Save Changes
      </button>
      <MobileBottomNav />
    </div>
  );
};

export default EditProfilePage;
