import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaUser, FaArrowLeft, FaDiagnoses, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import MobileBottomNav from "../organisms/MobileBottomNav";

interface ReportData {
  title: string;
  location: string;
  timestamp: string;
  reporter: string;
  wasteType: string;
  status: string;
  scheduledDate: string;
}

const JoinCleanUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ⬅️ ambil ID dari URL

  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  // Simulasi ambil data berdasarkan ID (nanti ganti ke fetch API)
  useEffect(() => {
    const fakeReportDatabase: Record<string, ReportData> = {
      "1": {
        title: "Construction Dumping",
        location: "Jl. Pembangunan VI, Tanah Abang",
        timestamp: "12 July 2025 - 5.50 PM",
        reporter: "@greeneey",
        wasteType: "Mixed Trash",
        status: "Urgent",
        scheduledDate: "14 July 2025 - 08.00 AM",
      },
      "2": {
        title: "Plastic Overflow",
        location: "Jl. Kemang Raya, Jakarta Selatan",
        timestamp: "10 July 2025 - 3.30 PM",
        reporter: "@eco_ranger",
        wasteType: "Plastic Only",
        status: "Pending Clean Up",
        scheduledDate: "15 July 2025 - 07.30 AM",
      },
    };

    if (id && fakeReportDatabase[id]) {
      setReportData(fakeReportDatabase[id]);
    } else {
      Swal.fire("Error", "Report not found!", "error").then(() => {
        navigate("/ReportIllegalDumping");
      });
    }

    setLoading(false);
  }, [id, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    Swal.fire({
      title: "Successfully Joined",
      text: "Thanks for joining the clean-up mission! We'll contact you if there are any updates.",
      icon: "success",
      confirmButtonText: "Great!",
      confirmButtonColor: "#66BB00",
    }).then(() => {
      navigate("/ReportDetail/" + id);
    });

    console.log({ reportId: id, fullName, phone, note });
  };

  if (loading || !reportData) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-[420px] mx-auto bg-white min-h-screen-dvh pb-20">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 mb-2">
        <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h2 className="text-xl font-semibold">Join Clean Up</h2>
      </div>

      {/* Report Summary */}
      <div className="bg-[#e6f6d8] rounded-xl mx-4 mt-8 p-4 border border-lime-300">
        <h3 className="text-lg font-semibold">{reportData.title}</h3>
        <p className="text-sm text-gray-700 mb-2">
          A report of waste that requires action in the community.
        </p>
        <div className="text-sm flex items-center gap-2 text-gray-700">
          <FaMapMarkerAlt className="text-green-600" />
          <span>{reportData.location}</span>
        </div>
        <div className="text-sm flex items-center gap-2 text-gray-700 mt-1">
          <FaClock className="text-yellow-500" />
          <span>{reportData.timestamp}</span>
        </div>
        <div className="text-sm flex items-center gap-2 text-gray-700 mt-1">
          <FaUser className="text-blue-500" />
          <span>Reported by: <strong>{reportData.reporter}</strong></span>
        </div>
         <div className="text-sm flex items-center gap-2 text-gray-700 mt-1">
            <FaTrash className="text-orange-600" />
            <span><strong>Waste Type:</strong> {reportData.wasteType}</span>
        </div>
         <div className="text-sm flex items-center gap-2 text-gray-700 mt-1">
          <FaDiagnoses className="text-red-600" />
        <span className="text-sm"><strong>Status:</strong> {reportData.status}</span>
        </div>
        <p className="text-sm text-green-800 mt-2">
          <strong>Scheduled Cleanup:</strong> {reportData.scheduledDate}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 px-4 flex flex-col gap-4 pb-20">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Your Full Name"
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Your Phone"
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Note (Optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any message for the team?"
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full py-3 text-white border-2 bg-[#66BB00] border-[#66BB00] rounded-full font-semibold transition-all duration-300 hover:bg-[#f0fdf4] hover:text-[#4e9900] hover:border-[#4e9900] hover:shadow-md hover:scale-101 active:scale-95"
        >
          Join Now
        </button>
      </form>
      <MobileBottomNav />
    </div>
  );
};

export default JoinCleanUpPage;
