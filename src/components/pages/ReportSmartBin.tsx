import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import MobileBottomNav from "../organisms/MobileBottomNav";
import binsDataRaw from "../../pseudo_db/smartbin.json";
import { decryptData } from "../utils/encryptor";
import { Alert, Snackbar } from "@mui/material";

const typeColors: Record<string, string> = {
  plastic: "bg-yellow-100 text-yellow-700",
  paper: "bg-blue-100 text-blue-700",
  organic: "bg-green-100 text-green-700",
  metal: "bg-gray-200 text-gray-800",
  glass: "bg-purple-100 text-purple-700",
};

const ReportSmartBin: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [bin, setBin] = useState<any | null>(null);
  const [issue, setIssue] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const found = binsDataRaw.find((b) => b.id === decryptData(id || ""));
    if (found) setBin(found);
  }, [id]);

  const onDrop = (acceptedFiles: File[]) => {
    // Batasi maksimal 3 file
    setFiles((prev) => [...prev, ...acceptedFiles].slice(0, 3));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 3,
  });

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

    const handleSubmit = async () => {
    if (!issue) {
        setErrorMessage("Please describe the issue.");
        setErrorOpen(true);
        return;
    }
    setSubmitting(true);

    try {
        // Convert semua file ke base64
        const filesBase64 = await Promise.all(
        files.map(
            (file) =>
            new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (err) => reject(err);
                reader.readAsDataURL(file);
            })
        )
        );

        // Ambil data existing dari localStorage
        const existingReports = localStorage.getItem("smartbinReports");
        const reports: any[] = existingReports ? JSON.parse(existingReports) : [];

        // Buat objek report baru
        const newReport = {
        binId: decryptData(id || ""),
        issue,
        files: filesBase64, // simpan base64
        timestamp: new Date().toISOString(),
        };

        // Simpan ke localStorage
        localStorage.setItem("smartbinReports", JSON.stringify([...reports, newReport]));

        setSuccessOpen(true);
        setTimeout(() => navigate("/smartBinDetail/" + id), 1500);
    } catch (error) {
        console.error(error);
        setErrorMessage("Sorry, Failed to submit report.");
        setErrorOpen(true);
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen bg-white px-4 pb-24">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full h-[160px] z-0">
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
      <div className="flex items-center gap-3 py-4 relative z-20">
        <button onClick={() => navigate("/SmartBinDetail/" + id)} className="text-white">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl text-white font-zerotrace font-semibold">Report SmartBin</h1>
      </div>

      {/* SmartBin Card */}
      {bin && (
        <div className="relative z-20 mt-8 p-4 bg-gray-100 rounded-xl shadow-md flex items-center gap-4">
          {bin.photo && (
            <img
              src={bin.photo}
              alt={bin.name}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.onerror = null;
                target.src = "/assets/img/bin/smartbindummy.webp";
              }}
            />
          )}

          <div className="flex-1">
            <h2 className="text-lg font-semibold">{bin.name}</h2>
            <p className="text-gray-600 text-sm">{bin.address}</p>
            <div className="flex gap-2 flex-wrap mt-2">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  typeColors[bin.type.toLowerCase()] || "bg-gray-200 text-gray-700"
                }`}
              >
                {bin.type}
              </span>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  bin.capacity < 50
                    ? "bg-green-500 text-white"
                    : bin.capacity < 80
                    ? "bg-yellow-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {bin.capacity}% full
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="mt-6 space-y-4 relative z-20">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Describe the issue
          </label>
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="e.g., Bin is overflowing, broken lid..."
            className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none h-24"
          />
        </div>

        {/* Dropzone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload photos (optional, max 3)
          </label>
          <div
            {...getRootProps()}
            className={`border-2 min-h-[90px] flex flex-wrap gap-3 justify-center items-center border-dashed rounded-xl p-4 text-center cursor-pointer transition relative ${
              isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"
            }`}
          >
            <input {...getInputProps()} disabled={files.length >= 3} />
            {files.length === 0 ? (
              <p className="text-gray-500 text-sm">Drag images here or click to select</p>
            ) : (
              files.map((file) => {
                const preview = URL.createObjectURL(file);
                return (
                  <div
                    key={file.name}
                    className="relative border rounded-xl overflow-hidden shadow-sm w-28 h-28"
                  >
                    <img src={preview} alt={file.name} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.name);
                      }}
                      className="absolute top-1 right-1 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1 shadow"
                    >
                      <IoClose size={16} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
          {files.length >= 3 && (
            <p className="text-xs text-red-500 mt-1">Maximum 3 images allowed.</p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-2 bg-zeroTrace-gradient text-white rounded-lg disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </div>
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
                Report submitted successfully
              </Alert>
            </Snackbar>
      <MobileBottomNav />
    </div>
  );
};

export default ReportSmartBin;
