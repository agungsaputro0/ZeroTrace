import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    birthDate: "",
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
    !form.gender ||
    !form.birthDate ||
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
      className="max-w-[420px] mx-auto bg-white px-6 py-6 flex flex-col justify-between"
    >
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
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
        />
        <input
          name="gender"
          type="text"
          placeholder="Gender"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
        />
        <input
          name="birthDate"
          type="date"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
        />
        <input
          name="repassword"
          type="password"
          placeholder="Re-password"
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
        />

        {/* Terms */}
        <label className="flex items-start gap-2 text-xs mt-2">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="mt-[3px] accent-[#66BB00]"
          />
          <span>
            By checking the box you agree to our{" "}
            <span className="text-red-500">Terms and Conditions</span>
          </span>
        </label>

        {/* Button */}
        <button
          type="submit"
          className="mt-4 w-full py-3 text-[#66BB00] border-2 border-[#66BB00] rounded-full font-semibold transition-all duration-300 hover:bg-[#f0fdf4] hover:text-[#4e9900] hover:border-[#4e9900] hover:shadow-md hover:scale-105 active:scale-95"
        >
          Sign Up
        </button>
      </form>

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
