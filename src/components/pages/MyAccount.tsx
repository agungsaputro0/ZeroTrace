import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaCog, FaHeadset, FaSignOutAlt } from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";

const MyAccountPage: React.FC = () => {
  const user = {
    name: "Octavia Halim",
    email: "octavialhalim@gmail.com",
    avatar: "/assets/img/profile-image.jpg", 
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/SignIn")
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pt-10 pb-20 px-4">
      <h2 className="text-xl font-semibold text-center mb-6">Profil</h2>

      {/* Profile Info */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-green-600"
        />
        <div className="bg-green-700 text-white px-4 py-2 mt-3 rounded-full text-center text-sm leading-tight w-full max-w-xs">
          <p className="font-semibold text-base">{user.name}</p>
          <p className="text-xs">{user.email}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 text-sm">
        <button className="w-full flex items-center justify-between bg-gray-100 py-3 px-4 rounded-full hover:bg-gray-200">
          Edit Profile <FaEdit />
        </button>
        <button className="w-full flex items-center justify-between bg-gray-100 py-3 px-4 rounded-full hover:bg-gray-200">
          Settings <FaCog />
        </button>
        <button className="w-full flex items-center justify-between bg-gray-100 py-3 px-4 rounded-full hover:bg-gray-200">
          Customer Service <FaHeadset />
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full text-sm font-semibold"
      >
        <FaSignOutAlt className="inline mr-2 mb-1" />
        Logout
      </button>
      <MobileBottomNav />
    </div>
  );
};

export default MyAccountPage;
