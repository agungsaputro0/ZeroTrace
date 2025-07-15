import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newsData } from "../../data/DummyNewsData";
import { FaArrowLeft, FaHeart, FaRegHeart, FaShareAlt, FaComment } from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";

const NewsDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const news = newsData.find((n) => n.id === id);

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  if (!news) return <p className="p-4 text-red-600">Berita tidak ditemukan.</p>;

  const handleShare = async () => {
    const shareData = {
      title: news.title,
      text: news.summary,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link disalin ke clipboard");
      }
    } catch (error) {
      alert("Gagal membagikan");
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [...prev, newComment.trim()]);
      setNewComment("");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen-dvh">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 ">
        <button onClick={() => navigate(-1)} className="text-green-700">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold text-green-800">Detail Berita</h2>
      </div>
      <div className="bg-gradient-to-b from-[#B8E986] to-[#ffffff] p-4">
      <div className="pb-20">
      {/* Image & Title */}
      <img src={news.image} alt={news.title} className="w-full h-48 object-cover rounded mb-4" />
      <h3 className="text-xl font-bold text-gray-800 mb-2">{news.title}</h3>
      <div className="text-sm text-gray-700 text-justify whitespace-pre-line mb-6">{news.content}</div>

      {/* Actions: Like, Comment, Share */}
      <div className="flex justify-around text-green-700 text-sm mb-4">
        <button onClick={() => setLiked(!liked)} className="flex items-center gap-1 hover:text-green-900">
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />} {liked ? "Disukai" : "Suka"}
        </button>
        <button className="flex items-center gap-1 hover:text-green-900">
          <FaComment /> {comments.length} Komentar
        </button>
        <button onClick={handleShare} className="flex items-center gap-1 hover:text-green-900">
          <FaShareAlt /> Bagikan
        </button>
      </div>

      {/* Komentar Form */}
      <div className="mb-6">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Tulis komentar..."
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm mb-2"
        />
        <button
          onClick={handleAddComment}
          className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-full font-semibold transition"
        >
          Kirim Komentar
        </button>
      </div>

      {/* Daftar Komentar */}
      {comments.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Komentar</h4>
          <ul className="space-y-2 text-sm text-gray-800">
            {comments.map((cmt, i) => (
              <li key={i} className="bg-white border rounded px-3 py-2 shadow-sm">
                {cmt}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default NewsDetailPage;
