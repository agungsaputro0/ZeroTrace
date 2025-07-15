import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import {
  FaArrowLeft,  
} from "react-icons/fa";
import Swal from "sweetalert2";
import MobileBottomNav from "../organisms/MobileBottomNav";
const CreateReportPage: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending Clean Up");
  const [images, setImages] = useState<File[]>([]);
  const [wasteType, setWasteType] = useState("Mixed Trash");

  const onDrop = (acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });



const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ Menampilkan notifikasi mirip gambar
  Swal.fire({
    title: "Report Successfully Sent",
    text: "Thank you for reporting! Your report helps us take action to keep the environment clean. We'll review it shortly and update the status.",
    icon: "success",
    confirmButtonText: "Done",
    confirmButtonColor: "#A1DC5B", // sesuai tombol pada gambar
    customClass: {
      popup: 'rounded-xl p-6',
      title: 'text-lg font-semibold',
      confirmButton: 'text-white font-medium text-sm px-6 py-2 rounded-md',
    }
  }).then(() => {
    navigate("/ReportIllegalDumping");
  });

  // Optional: kirim ke API
  console.log({ title, location, description, status, wasteType, images });
};


  return (
    <div className="max-w-[420px] mx-auto bg-white  pb-6 min-h-screen-dvh">
      <div className="flex items-center gap-2 mb-4 px-4 mt-4">
             <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
             <h2 className="text-xl font-semibold">Create Report</h2>
           </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 mt-10 pb-20">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
          <input
            type="text"
            placeholder="Report Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Location</label>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none resize-none"
            required
          />
        </div>
        <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Waste Type</label>
            <select
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
            >
                <option value="Mixed Trash">Mixed Trash</option>
                <option value="Plastic Waste">Plastic Waste</option>
                <option value="Organic Waste">Organic Waste</option>
                <option value="E-Waste">E-Waste</option>
                <option value="Construction Waste">Construction Waste</option>
                <option value="Hazardous Waste">Hazardous Waste</option>
                <option value="Others">Others</option>
            </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm focus:outline-none"
          >
            <option value="Pending Clean Up">Pending Clean Up</option>
            <option value="Urgent">Urgent</option>
            <option value="Report - Waiting Volunteer">Report - Waiting Volunteer</option>
            <option value="Needs Special Handling">Needs Special Handling</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Upload Image(s)</label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer bg-gray-50 text-sm ${
              isDragActive ? "border-green-500 bg-green-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {images.length === 0 ? (
              <p>Drag & drop or click to upload image(s)</p>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            handleRemoveImage(index);
                        }}
                      className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 hover:bg-red-600"
                      title="Delete image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full py-3 text-white border-2 bg-[#66BB00] border-[#66BB00] rounded-full font-semibold transition-all duration-300 hover:bg-[#f0fdf4] hover:text-[#4e9900] hover:border-[#4e9900] hover:shadow-md hover:scale-101 active:scale-95"
        >
          Submit Report
        </button>
      </form>
      <MobileBottomNav />
    </div>
  );
};

export default CreateReportPage;
