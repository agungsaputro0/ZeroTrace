import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputElement from "../atoms/InputElement";
import { Snackbar, Alert } from "@mui/material";

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

  // Snackbar states
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (
      !form.fullName ||
      !form.phone ||
      !form.email ||
      !form.password ||
      !form.repassword
    ) {
      setErrorMessage("Lengkapi semua data!");
      setErrorOpen(true);
      return;
    }

    if (form.password !== form.repassword) {
      setErrorMessage("Password tidak cocok!");
      setErrorOpen(true);
      return;
    }

    if (!form.agree) {
      setErrorMessage("Setujui syarat & ketentuan terlebih dahulu 🌱");
      setErrorOpen(true);
      return;
    }

    // --- Simpan ke localStorage ---
    const newUserData = {
      idPengguna: `PG${String(Date.now()).slice(-3)}`,
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      points: 0,
      password: form.password,
      avatarUrl: "/assets/img/teams/default.jpg",
      waktuRekam: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("newUser") || "[]");
    existing.push(newUserData);

    localStorage.setItem("newUser", JSON.stringify(existing));

    // Tampilkan snackbar sukses
    setSuccessOpen(true);

    // Delay sebelum pindah halaman
    setTimeout(() => {
      navigate("/SignIn");
    }, 1500);
  };

  return (
    <div
      style={{ minHeight: "100dvh" }}
      className="relative max-w-[420px] mx-auto bg-white px-6 py-6 flex flex-col justify-between overflow-hidden"
    >
      {/* Logo */}
      <div className="absolute top-0 left-0 w-full h-[520px] z-0">
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

      <div className="flex flex-col justify-center items-center mb-4 mt-4 z-10">
        <img
          src="/assets/img/logo-white.png"
          alt="ZeroTrace Logo"
          className="w-24 h-24"
        />
        <h1 className="text-center text-3xl font-bold mb-8 mt-2 text-white z-10">
        Sign Up
      </h1>
      </div>


      <form className="flex flex-col gap-3 mt-8 z-20" onSubmit={handleSubmit}>
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
            </span>
            .
          </p>
        </label>

        <button
          type="submit"
          className="mt-4 w-full py-3 text-white bg-zeroTrace-gradient rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center text-lg mt-4">
        Already have account?{" "}
        <Link to="/SignIn" className="text-secondColor font-semibold">
          Sign In
        </Link>
      </p>

      {/* Snackbar Error */}
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

      {/* Snackbar Success */}
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
          Sign Up Success! Redirecting...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUp;
