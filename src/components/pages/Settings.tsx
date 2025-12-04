import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaLock,
  FaBell,
  FaShieldAlt,
  FaGlobe,
  FaInfoCircle,
} from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Privacy");

  const menuItems = [
    { label: "Privacy", icon: <FaLock className="text-gray-500" /> },
    { label: "Notifications", icon: <FaBell className="text-gray-500" /> },
    { label: "Security", icon: <FaShieldAlt className="text-gray-500" /> },
    { label: "Language", icon: <FaGlobe className="text-gray-500" /> },
    { label: "About", icon: <FaInfoCircle className="text-gray-500" /> },
  ];

  // ---------- BEAUTIFUL TOGGLE COMPONENT ----------
  const Toggle = ({ value, onChange }: any) => (
    <button
      onClick={() => onChange(!value)}
      className={`
        w-12 h-6 flex items-center rounded-full transition-all
        ${value ? "bg-secondColor" : "bg-gray-300"}
      `}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow transform transition-all ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      ></div>
    </button>
  );

  // ---------- CONTENT ----------
  const renderContent = () => {
    switch (activeMenu) {
      case "Privacy":
        return (
          <div>
            <h2 className="text-lg font-semibold">Privacy</h2>
            <p className="text-sm text-gray-600">Control your privacy settings.</p>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span>Hide Activity Status</span>
                <Toggle value={true} onChange={() => {}} />
              </div>

              <div className="flex items-center justify-between">
                <span>Allow Messages</span>
                <Toggle value={false} onChange={() => {}} />
              </div>
            </div>
          </div>
        );

      case "Notifications":
        return (
          <div>
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-sm text-gray-600">Manage your notifications.</p>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <Toggle value={true} onChange={() => {}} />
              </div>

              <div className="flex items-center justify-between">
                <span>Eco Points Updates</span>
                <Toggle value={true} onChange={() => {}} />
              </div>

              <div className="flex items-center justify-between">
                <span>Bin Full Alerts</span>
                <Toggle value={false} onChange={() => {}} />
              </div>
            </div>
          </div>
        );

      case "Security":
        return (
          <div>
            <h2 className="text-lg font-semibold">Security</h2>
            <p className="text-sm text-gray-600">Extra safety features.</p>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span>Two-Factor Authentication</span>
                <Toggle value={false} onChange={() => {}} />
              </div>

              <div className="flex items-center justify-between">
                <span>Login Alerts</span>
                <Toggle value={true} onChange={() => {}} />
              </div>

              <div className="flex items-center justify-between">
                <span>Device Access Protection</span>
                <Toggle value={false} onChange={() => {}} />
              </div>
            </div>
          </div>
        );

      case "Language":
        return (
          <div>
            <h2 className="text-lg font-semibold">Language</h2>
            <p className="text-sm text-gray-600">Select your preferred language.</p>

            <select className="mt-4 w-full p-3 border rounded-xl">
              <option>English</option>
              <option>Bahasa Indonesia</option>
            </select>
          </div>
        );

      case "About":
        return (
          <div>
            <h2 className="text-lg font-semibold">About</h2>
            <p className="text-sm text-gray-600">SmartBin App information.</p>

            <div className="mt-4 p-4 border rounded-lg">
              <p className="font-medium">SmartBin App</p>
              <p className="text-sm text-gray-500">Version 1.0.0</p>

              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p>✔ AI-powered waste monitoring</p>
                <p>✔ SmartBin detection & eco-points</p>
                <p>✔ Real-time bin level analytics</p>
                <p>✔ Motivation to engage in green habits</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ---------- MAIN UI ----------
  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-6 pb-32 flex flex-col">

      {/* Background Wave */}
      <div className="absolute top-0 left-0 w-full h-[150px] z-0">
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

      {/* Header */}
      <div className="flex items-center gap-3 py-4 relative z-20">
        <button onClick={() => navigate(-1)} className="text-white">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl text-white font-zerotrace font-semibold">Settings</h1>
      </div>

      {/* Menu */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-md mt-4 p-3 space-y-1 relative z-10">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveMenu(item.label)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition
              hover:bg-gray-100
              ${activeMenu === item.label ? "border border-secondColor" : ""}
            `}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="mt-5 p-5 rounded-xl bg-white shadow relative z-10">
        {renderContent()}
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default Settings;
