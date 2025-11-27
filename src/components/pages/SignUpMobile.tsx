import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InputElement from "../atoms/InputElement";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    repassword: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validasi sederhana
  if (
    !form.fullName ||
    !form.phone ||
    !form.email ||
    !form.password ||
    !form.repassword
  ) {
    return Swal.fire({
      title: "<p class='text-lg font-semibold text-gray-800'>Lengkapi semua data!</p>",
      background: "#fefefe",
      confirmButtonColor: "#66BB00",
      showClass: { popup: 'swal2-show' },
      hideClass: { popup: 'swal2-hide' }
    });
  }

  if (form.password !== form.repassword) {
    return Swal.fire({
      title: "<p class='text-lg font-semibold text-gray-800'>Password tidak cocok!</p>",
      background: "#fefefe",
      confirmButtonColor: "#66BB00",
    });
  }

  if (!form.agree) {
    return Swal.fire({
      title: "<p class='text-lg font-semibold text-gray-800'>Setujui syarat & ketentuan terlebih dahulu 🌱</p>",
      background: "#fefefe",
      confirmButtonColor: "#66BB00",
    });
  }

  await Swal.fire({
    title: "<p class='text-lg font-semibold text-gray-800'>Pendaftaran Berhasil</p>",
    html: "<p class='text-sm text-gray-600'>Selamat datang di ZeroTrace 🌿</p>",
    background: "#fefefe",
    confirmButtonColor: "#66BB00",
  });

  navigate("/SignIn");
};


  return (
    <div
      style={{ minHeight: "100dvh" }}
      className="relative max-w-[420px] mx-auto bg-white px-6 py-6 flex flex-col justify-between overflow-hidden"
    >
    {/* Logo */}
        <div className="absolute top-0 left-0 w-full h-[65dvh] z-0">
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
      <h1 className="text-center text-4xl font-bold mb-8 -mt-4 text-white z-10">Sign Up</h1>

      {/* Form */}
      <form className="flex flex-col gap-3 mt-8" onSubmit={handleSubmit}>
        <InputElement
          forwhat="fullName"
          labelMessage="Full Name"
          typeInput="text"
          inputName="fullName"
          inputPlaceholder="Full Name"
          onChange={handleChange}
        />

        <InputElement
          forwhat="phone"
          labelMessage="Phone Number"
          typeInput="text"
          inputName="phone"
          inputPlaceholder="Phone Number"
          onChange={handleChange}
        />

        <InputElement
          forwhat="email"
          labelMessage="Email"
          typeInput="email"
          inputName="email"
          inputPlaceholder="Email"
          onChange={handleChange}
        />

        <InputElement
          forwhat="password"
          labelMessage="Password"
          typeInput="password"
          inputName="password"
          inputPlaceholder="Password"
          onChange={handleChange}
        />

        <InputElement
          forwhat="repassword"
          labelMessage="Re-enter Password"
          typeInput="password"
          inputName="repassword"
          inputPlaceholder="Re-enter Password"
          onChange={handleChange}
        />


        {/* Terms */}
        <label className="flex items-start gap-2 text-md mt-2">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="mt-[1px] accent-secondColor h-6 w-6"
          />
          <p className="text-md leading-relaxed text-justify">
            By checking this box, you agree to our{" "}
            <span className="text-secondColor font-bold">
              Terms and Conditions
            </span>.
          </p>
        </label>

        {/* Button */}
        <button
          type="submit"
          className="mt-4 w-full py-3 text-white bg-zeroTrace-gradient rounded-full font-semibold transition-all duration-300 hover:bg-[#f0fdf4] hover:text-[#4e9900] hover:border-[#4e9900] hover:shadow-md hover:scale-105 active:scale-95"
        >
          Sign Up
        </button>
      </form>

      {/* Already have account */}
      <p className="text-center text-lg mt-4">
        Already have account?{" "}
        <Link to="/SignIn" className="text-secondColor font-semibold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
