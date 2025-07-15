import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaUserAlt,
  FaTrash,
  FaDiagnoses,
} from "react-icons/fa";
import dummyDumpReports from "../../data/DummyDumpReports";
import MobileBottomNav from "../organisms/MobileBottomNav";
import ImageCarousel from "../atoms/ImageCarousel";

const ReportDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const report = dummyDumpReports.find((item) => item.id === id);
  const [_currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (report && report.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % report.images.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [report]);

  if (!report) {
    return (
      <div className="max-w-md mx-auto p-4">
        <p className="text-red-500">Report not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 px-4 mt-4">
        <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h2 className="text-xl font-semibold">Schedule</h2>
      </div>
      <div className="bg-gradient-to-b from-[#B8E986] to-[#ffffff] p-4">
      {/* Image / Carousel */}
      <ImageCarousel images={report.images} />

      {/* Content */}
      <div className="bg-white p-4 mt-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
        <p className="text-sm text-gray-700 mb-3">
          {report.description}
        </p>

        <div className="text-sm space-y-2 mb-4">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-600" />
            {report.location}
          </p>
          <p className="flex items-center gap-2">
            <FaClock className="text-yellow-600" />
            Reported on {report.timestamp}
          </p>
          <p className="flex items-center gap-2">
            <FaUserAlt className="text-blue-600" />
            Reported by: <span className="font-medium">@greeneey</span>
          </p>
          <p className="flex items-center gap-2">
            <FaTrash className="text-orange-600" />
            Waste Type: <span className="font-medium">Mixed Trash</span>
          </p>
          <p className="flex items-center gap-2">
            <FaDiagnoses className="text-red-600" />
            Status: <span className="font-medium">{report.status}</span>
          </p>
        </div>

        {/* Cleanup Participation */}
        <div className="bg-[#B8E986] text-sm rounded-lg p-3 mb-4">
          <p className="font-semibold">Cleanup Participation</p><hr className="border-t border-[#000000] mt-1 mb-1" />
          <p>Volunteers Joined: 5 Peoples</p>
          <p>Scheduled Cleanup: 14 July 2025 – 08.00 AM</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/JoinCleanUp/" + id)}
            className="flex-1 bg-green-600 text-white text-sm py-2 rounded-full hover:bg-green-700 transition"
          >
            Join Clean Up
          </button>
          <button
            onClick={() => alert("Opening Google Maps...")}
            className="flex-1 bg-gray-200 text-sm py-2 rounded-full hover:bg-gray-300 transition"
          >
            View Maps
          </button>
        </div>
      </div>
    </div>
      <MobileBottomNav />
    </div>
  );
};

export default ReportDetail;
