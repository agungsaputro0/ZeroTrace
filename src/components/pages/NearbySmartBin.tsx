// import React, { useEffect, useState } from "react";
// import {
//   FaArrowLeft,
//   FaSearch,
//   FaFilter,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import MobileBottomNav from "../organisms/MobileBottomNav";
// import dummySmartBins from "../../data/DummySmartBins";

// const NearbySmartBin: React.FC = () => {
//   const [locationAllowed, setLocationAllowed] = useState(false);
//   const [loadingBins, setLoadingBins] = useState(false);
//   const [search, setSearch] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const navigate = useNavigate();

//   // Simulasi izin lokasi
//   useEffect(() => {
//     setTimeout(() => setLocationAllowed(true), 1500);
//   }, []);

//   // Simulasi loading daftar SmartBin setelah lokasi diizinkan
//   useEffect(() => {
//     if (locationAllowed) {
//       setLoadingBins(true);
//       setTimeout(() => setLoadingBins(false), 1500);
//     }
//   }, [locationAllowed]);

//   const filteredBins = dummySmartBins.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="max-w-md mx-auto p-4 pb-24">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-4">
//         <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
//         <h2 className="text-xl font-semibold">Nearby SmartBin</h2>
//       </div>

//       {/* Filter Bar */}
//       <div className="flex items-center gap-2 border px-3 py-2 rounded-full shadow-sm mb-4 bg-white">
//         <FaSearch className="text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search SmartBin..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="flex-1 outline-none text-sm"
//         />
//         <button onClick={() => setShowFilters(!showFilters)}>
//           <FaFilter className="text-gray-500" />
//         </button>
//       </div>

//       {/* Dummy Filters */}
//       {showFilters && (
//         <div className="bg-white rounded-lg shadow p-4 mb-4">
//           <h4 className="font-semibold text-sm mb-2">Filter by:</h4>
//           <div className="grid grid-cols-2 gap-2 text-sm">
//             <div>
//               <label className="block text-gray-600 mb-1">Bin Fullness</label>
//               <select className="w-full border px-2 py-1 rounded">
//                 <option>Any</option>
//                 <option>&lt; 50%</option>
//                 <option>50–80%</option>
//                 <option>&gt; 80%</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-600 mb-1">Distance</label>
//               <select className="w-full border px-2 py-1 rounded">
//                 <option>All</option>
//                 <option>&lt; 100m</option>
//                 <option>100–300m</option>
//                 <option>&gt; 300m</option>
//               </select>
//             </div>
//           </div>
//           <button
//             onClick={() => setShowFilters(false)}
//             className="mt-4 w-full text-center bg-[#B8E986] text-sm py-1.5 rounded hover:bg-[#A3D873] transition"
//           >
//             Apply Filters
//           </button>
//         </div>
//       )}

//       {/* Location Access Notification */}
//       {!locationAllowed ? (
//         <div className="bg-yellow-100 text-sm text-yellow-800 p-3 rounded-lg mb-4">
//           <p>
//             <strong>Location Permission Required:</strong> Please allow access
//             to your location to show nearby SmartBins.
//           </p>
//         </div>
//       ) : (
//         <div className="flex items-center text-sm text-green-800 bg-green-50 px-3 py-2 rounded-full mb-4">
//           <FaMapMarkerAlt className="mr-2" />
//           <span>You're near: Jl. Meruya Selatan, Jakarta Barat</span>
//         </div>
//       )}

//       {/* Loading State */}
//       {!locationAllowed ? null : loadingBins ? (
//         <div>
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="animate-pulse flex bg-gray-200 rounded-xl p-3 mb-3"
//             >
//               <div className="w-16 h-16 bg-gray-300 rounded mr-3" />
//               <div className="flex-1 space-y-2">
//                 <div className="h-4 bg-gray-300 rounded w-1/2" />
//                 <div className="h-3 bg-gray-300 rounded w-3/4" />
//                 <div className="h-3 bg-gray-300 rounded w-1/3" />
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         filteredBins.map((bin) => (
//           <div
//             key={bin.id}
//             onClick={() => navigate(`/SmartBinDetail/${bin.id}`)}
//             className="flex bg-[#D4EF8A] rounded-xl p-3 shadow mb-3 transition duration-300 transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
//           >
//             <img
//               src={bin.image}
//               alt={bin.name}
//               className="w-16 h-16 rounded object-cover mr-3"
//             />
//             <div className="flex-1">
//               <p className="text-xs text-gray-600 mb-1">
//                 {bin.distance} | {bin.time}
//               </p>
//               <p className="font-semibold text-sm">{bin.name}</p>
//               <p className="text-xs text-gray-700">{bin.address}</p>
//               <p className="text-xs mt-1 text-green-900">
//                 Bin Full: {bin.binFull}
//               </p>
//             </div>
//           </div>
//         ))
//       )}

//       <MobileBottomNav />
//     </div>
//   );
// };

// export default NearbySmartBin;
