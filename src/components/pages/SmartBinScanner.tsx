import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const SmartBinScan: React.FC = () => {
  const qrCodeRegionId = "html5qr-code-full-region";
  const navigate = useNavigate();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isStoppedRef = useRef(false); // ✅ mencegah double stop

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(qrCodeRegionId);
    scannerRef.current = html5QrCode;

    const config = { fps: 10, qrbox: 250 };

    html5QrCode.start(
      { facingMode: "environment" },
      config,
      (decodedText) => {
        console.log("QR detected: ", decodedText);
        if (!isStoppedRef.current) {
          isStoppedRef.current = true;
          html5QrCode.stop().then(() => {
            navigate("/BinVerified");
          });
        }
      },
      (_errorMessage) => {}
    );

    return () => {
      if (!isStoppedRef.current && scannerRef.current) {
        scannerRef.current.stop().catch((err) => console.error("Stop scan error", err));
      }
    };
  }, [navigate]);

  return (
    <div className="relative max-w-md mx-auto min-h-screen-dvh bg-black text-white flex flex-col">
      {/* Text di atas area scan */}
      <div className="text-center pt-6 pb-2">
        <h2 className="text-lg font-semibold text-green-400">🔎 Scanning Smartbin...</h2>
      </div>

      {/* QR Code Region */}
      <div id={qrCodeRegionId} className="flex-1 w-full"></div>

      {/* Overlay icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="w-20 h-20 border-4 border-green-400 rounded-lg animate-pulse flex items-center justify-center">
          <img src="/assets/img/icon/scan-qr.png" alt="Scan Icon" className="w-8 h-8 opacity-80" />
        </div>
      </div>

      {/* Instruction text */}
      <div className="absolute bottom-10 left-0 right-0 text-center text-sm text-white">
        Align the QR code within the frame
      </div>
    </div>
  );
};

export default SmartBinScan;
