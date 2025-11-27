import React from 'react';

const LoadingSpinner: React.FC = () => {

  return (
    <>
    <div className={`bg-white bg-no-repeat bg-center bg-cover bg-fixed w-full h-screen flex flex-col items-center justify-center text-white`}>
      {/* Logo dan nama */}
      <div className="flex items-center mb-8">
        <img
          src="/assets/img/logo.png"
          alt="ZeroTrace Logo"
          className="h-16 w-16"
        />
        <span className="ml-3 text-4xl font-bold">
          <span className="text-mainColor font-dancingScript">ZeroTrace</span>
        </span>
      </div>

      {/* Animasi gelombang */}
      <div className="flex space-x-1 h-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 bg-mainColor animate-wave"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    </div>
    </>
  );
};

export default LoadingSpinner;
