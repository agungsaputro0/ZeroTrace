import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import handleShowLoginInfo from "../atoms/SignInInfo";
import InputElement from "../atoms/InputElement";
import { FaApple, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { Snackbar, Alert } from "@mui/material";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi dummy login
    if (email.trim() === "zeroTrace6@binus.ac.id" && password === "zeroTrace") {
      navigate("/HomeMobile");
    } else {
      setOpen(true);
    }
  };
  return (
   <div
      style={{ minHeight: "100dvh" }}
      className="relative max-w-[420px] mx-auto bg-white px-6 py-6 flex flex-col justify-between overflow-hidden"
    >
    {/* Logo */}
        <div className="absolute top-0 left-0 w-full h-[70dvh] z-0">
        <svg
          viewBox="0 0 1440 480"
          xmlns="http://www.w3.org/2000/svg"
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
            d="
              M0,200 
              C240,180 480,220 720,200 
              C960,180 1200,220 1440,200 
              V0 H0 Z
            "
          />
        </svg>
      </div>
      
      <div className="flex justify-center mb-4 mt-4 z-10">
        <img
          src="/assets/img/logo-white.png"
          alt="ZeroTrace Logo"
          className="w-24 h-24"
        />
      </div>

      {/* Title */}
      <h1 className="text-center text-4xl font-bold mb-8 -mt-8 text-white z-10">Sign In</h1>
      {/* Form */}
      <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
        <InputElement
          forwhat="email"
          labelMessage="Email"
          typeInput="text"
          inputName="email"
          inputPlaceholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputElement
          inputClass="mb-4"
          forwhat="password"
          labelMessage="Password"
          typeInput="password"
          inputName="password"
          inputPlaceholder="••••••••"
          autoComplete="none"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember + Forgot */}
        <div className="flex justify-end items-center -mt-6 text-md">
          <Link to="/forgot-password" className="text-gray-700 text-md">
            Forgot password ?
          </Link>
        </div>
     

      {/* Social Sign-in */}
      <div className="mt-6 mb-4">
        {/* Divider Text */}
        <div className="flex items-center w-full text-md text-gray-500">
            <div className="h-[1px] bg-gray-300 flex-grow" />
            <span className="px-4 whitespace-nowrap">or sign in with</span>
            <div className="h-[1px] bg-gray-300 flex-grow" />
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center items-center mt-4 space-x-6">
            <FaGoogle className="text-2xl hover:text-mainColor text-secondColor" />
            <FaMicrosoft className="text-2xl hover:text-mainColor text-secondColor" />
            <FaApple className="text-3xl mt-[-4.5px] hover:text-mainColor text-secondColor" />
        </div>
        </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 text-white bg-zeroTrace-gradient rounded-full font-semibold transition-all duration-300 hover:bg-[#4e9900] hover:shadow-xl hover:scale-105 active:scale-95"
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={handleShowLoginInfo}
        className="w-full py-3 bg-white text-secondColor border border-secondColor rounded-full font-semibold transition-all duration-300 hover:bg-mainColor hover:text-white hover:shadow-xl hover:scale-105 active:scale-95"
      >
        Akun Dummy
      </button>

       </form>
      {/* Bottom link */}
      <p className="text-center text-lg mt-6">
        Don’t have an account?{" "}
        <Link to="/SignUp" className="text-secondColor font-semibold">
          Sign Up
        </Link>
      </p>
      <Snackbar
        open={open} 
        autoHideDuration={3000} 
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setOpen(false)}>
          Sign In Error, Please check your crendential
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignIn;
