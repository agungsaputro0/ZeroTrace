import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import handleShowLoginInfo from "../atoms/SignInInfo";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi dummy login
    if (email === "sustainnovation@binus.ac.id" && password === "password") {
      navigate("/HomeMobile");
    } else {
      alert("Email atau password salah.");
    }
  };
  return (
    <div className="max-w-[420px] min-h-screen mx-auto bg-white px-6 py-6 flex flex-col justify-between">
      {/* Logo */}
      <div className="flex justify-center mb-4 mt-2">
        <img
          src="/assets/img/ZeroTrace.png"
          alt="ZeroTrace Logo"
          className="w-16 h-16"
        />
      </div>

      {/* Title */}
      <h1 className="text-center text-2xl font-bold mb-4">Sign In</h1>

      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
        />

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#66BB00]" />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-red-500 text-xs">
            Forgot password ?
          </Link>
        </div>
     

      {/* Social Sign-in */}
      <div className="mt-6 mb-4">
        {/* Divider Text */}
        <div className="flex items-center w-full text-sm text-gray-500">
            <div className="h-[1px] bg-gray-300 flex-grow" />
            <span className="px-4 whitespace-nowrap">or sign in with</span>
            <div className="h-[1px] bg-gray-300 flex-grow" />
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center items-center mt-4 space-x-6">
            <img src="/assets/img/google.png" alt="Google" className="w-6 h-6" />
            <img src="/assets/img/facebook.png" alt="Facebook" className="w-6 h-6" />
            <img src="/assets/img/twitter.png" alt="Twitter/X" className="w-6 h-6" />
        </div>
        </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 text-white bg-[#66BB00] rounded-full font-semibold transition-all duration-300 hover:bg-[#4e9900] hover:shadow-xl hover:scale-105 active:scale-95"
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={handleShowLoginInfo}
        className="w-full py-3 bg-white text-[#66BB00] border border-[#66BB00] rounded-full font-semibold transition-all duration-300 hover:bg-[#66BB00] hover:text-white hover:shadow-xl hover:scale-105 active:scale-95"
      >
        Cara Login
      </button>

       </form>
      {/* Bottom link */}
      <p className="text-center text-sm mt-6">
        Don’t have an account?{" "}
        <Link to="/SignUp" className="text-[#66BB00] font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
