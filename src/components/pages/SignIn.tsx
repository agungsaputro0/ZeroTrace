import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import InputElement from "../atoms/InputElement";
import { FaApple, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";
import { handleLogin } from "../hooks/HandleLogin";

const SignIn: React.FC = () => {

  const dispatch = useDispatch(); 
  const [loading, setLoading] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (loginFailed) {
      timer = setTimeout(() => {
        setLoginFailed("");
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [loginFailed]);

  const handleShowLoginInfo = () => {
    const dummy = {
      email: "guest.zerotrace@binus.ac.id",
      password: "guest123",
    };

    const emailInput = document.querySelector("input[name='email']") as HTMLInputElement;
    const passwordInput = document.querySelector("input[name='password']") as HTMLInputElement;

    if (emailInput && passwordInput) {
      emailInput.value = dummy.email;
      passwordInput.value = dummy.password;
    }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginStart());
    setLoading(true);

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
        const user = await handleLogin(email, password); 
        dispatch(loginSuccess(email));
        if(user.success === true){
            setSuccessOpen(true);
          setTimeout(() => {
            window.location.href = '/HomeMobile'; 
          }, 1000); 
        } else {
            setOpen(true);
        }
    } catch (error) {
        setLoginFailed("Invalid credentials");
        dispatch(loginFailure());
        setOpen(true);
    } finally {
        setLoading(false);
    }
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
        <h1 className="text-center text-3xl font-bold mb-8 mt-2 text-white z-10">Sign In</h1>
      </div>

      {/* Title */}
      
      {/* Form */}
      <form className="flex flex-col gap-4 mt-8 z-20" onSubmit={handleSubmit}>
        <InputElement
          forwhat="email"
          labelMessage="Email"
          typeInput="text"
          inputName="email"
          inputPlaceholder="example@example.com"
          
        />
        <InputElement
          inputClass="mb-4"
          forwhat="password"
          labelMessage="Password"
          typeInput="password"
          inputName="password"
          inputPlaceholder="••••••••"
          autoComplete="none"
        />

        {/* Remember + Forgot */}
        <div className="flex justify-end items-center -mt-6 text-md">
          <Link to="#" className="text-gray-700 text-md">
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
        disabled={loading}
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
        <Alert 
          severity="error" 
          onClose={() => setOpen(false)}
          sx={{
            width: "400px",
            backgroundImage: "linear-gradient(to right, #f17a7aff, #FF7043)", 
            color: "white",
            fontWeight: "bold",
            borderRadius: "12px",
            paddingY: "4px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)", 
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}
        >
          Login Error, Please check your crendential
        </Alert>
      </Snackbar>
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
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",   
          border: "1px solid rgba(255, 255, 255, 0.3)"  
        }}
      >
        Login Success!, Please wait...
      </Alert>
    </Snackbar>
    </div>
  );
};

export default SignIn;
