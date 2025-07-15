import React from "react";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <div  style={{ minHeight: '100dvh' }} className="max-w-[420px] mx-auto bg-white px-6 py-6 flex flex-col justify-between">
      {/* Logo */}
      <div className="flex justify-center mb-4 mt-2">
        <img
          src="/assets/img/ZeroTrace.png"
          alt="ZeroTrace Logo"
          className="w-16 h-16"
        />
      </div>

      {/* Title */}
      <h1 className="text-center text-2xl font-bold mb-4">Sign Up</h1>

      {/* Form */}
      <form className="flex flex-col gap-3">
        <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none" />
        <input type="text" placeholder="Gender" className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none" />
        <input type="date" placeholder="Birth of Date" className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none" />
        <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none" />
        <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none" />
        <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none" />
        <input type="password" placeholder="Re-password" className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none" />

        {/* Terms */}
        <label className="flex items-start gap-2 text-xs mt-2">
          <input type="checkbox" className="mt-[3px] accent-[#66BB00]" />
          <span>
            By checking the box you agree to our{" "}
            <span className="text-red-500">Terms and Conditions</span>
          </span>
        </label>
      </form>

      {/* Button */}
      <button
        type="submit"
        className="mt-6 w-full py-3 text-[#66BB00] border-2 border-[#66BB00] rounded-full font-semibold transition-all duration-300 hover:bg-[#f0fdf4] hover:text-[#4e9900] hover:border-[#4e9900] hover:shadow-md hover:scale-105 active:scale-95"
      >
        Sign Up
      </button>

      {/* Already have account */}
      <p className="text-center text-sm mt-4">
        Already have account?{" "}
        <Link to="/SignIn" className="text-[#66BB00] font-semibold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
