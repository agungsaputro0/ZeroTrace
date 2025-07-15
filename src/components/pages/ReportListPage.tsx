import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaPlusCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dummyDumpReports from "../../data/DummyDumpReports";
import MobileBottomNav from "../organisms/MobileBottomNav";

const ReportListPage: React.FC = () => {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLocationAllowed(true), 1500);
  }, []);

  useEffect(() => {
    if (locationAllowed) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1500);
    }
  }, [locationAllowed]);

  const filteredReports = dummyDumpReports.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes("urgent")) return "text-red-600";
    if (status.toLowerCase().includes("waiting")) return "text-orange-600";
    if (status.toLowerCase().includes("needs")) return "text-yellow-600";
    if (status.toLowerCase().includes("pending")) return "text-blue-600";
    return "text-green-700";
  };

  return (
    <div className="max-w-md mx-auto p-4 pb-28">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h2 className="text-xl font-semibold flex-1 text-center">
          Report Illegal Dumping
        </h2>
      </div>

      {/* Create Report Button */}
      <button
        onClick={() => navigate("/CreateReport")}
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white text-sm font-semibold py-2 mt-8 rounded-lg mb-4 hover:bg-green-700 transition"
      >
        <FaPlusCircle /> Create New Report
      </button>

      {/* Search & Filter */}
      <div className="flex items-center gap-2 border px-3 py-2 rounded-full shadow-sm mb-4 bg-white">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search report..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none text-sm"
        />
        <button onClick={() => setShowFilters(!showFilters)}>
          <FaFilter className="text-gray-500" />
        </button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-lg shadow p-4 mb-4 text-sm">
          <label className="block text-gray-600 mb-1">Sort by Distance</label>
          <select className="w-full border px-2 py-1 rounded">
            <option value="near">Nearest First</option>
            <option value="far">Farthest First</option>
          </select>
        </div>
      )}

      {/* Location Notice */}
      {!locationAllowed ? (
        <div className="bg-yellow-100 text-sm text-yellow-800 p-3 rounded-lg mb-4">
          <p>
            <strong>Location Required:</strong> Please allow access to see
            reports near you.
          </p>
        </div>
      ) : (
        <div className="flex items-center text-sm text-green-800 bg-green-50 px-3 py-2 rounded-full mb-4">
          <FaMapMarkerAlt className="mr-2" />
          <span>You're near: Jl. Meruya Selatan, Jakarta Barat</span>
        </div>
      )}

      {/* Report Cards */}
      {!locationAllowed ? null : loading ? (
        <div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse flex bg-gray-200 rounded-xl p-3 mb-3"
            >
              <div className="w-16 h-20 bg-gray-300 rounded mr-3" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/2" />
                <div className="h-3 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-300 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        filteredReports.map((report) => (
          <div
            key={report.id}
            onClick={() => navigate(`/ReportDetail/${report.id}`)}
            className="flex bg-[#ECF9C0] rounded-xl p-3 shadow mb-3 hover:scale-[1.01] cursor-pointer transition"
          >
            <img
              src={report.images[0]}
              alt={report.title}
              className="w-16 h-20 object-cover rounded mr-3"
            />
            <div className="flex-1 text-sm">
              <p className="font-semibold">{report.title}</p>
              <p className="text-xs text-gray-700">{report.location}</p>
              <p className="text-xs text-gray-500">{report.timestamp}</p>
              <p className="text-xs">{report.images.length} Photo Attached</p>
              <p className={`text-xs mt-1 ${getStatusColor(report.status)}`}>
                Status: {report.status}
              </p>
            </div>
          </div>
        ))
      )}
      <MobileBottomNav />
    </div>
  );
};

export default ReportListPage;
