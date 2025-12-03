import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newsData } from "../../data/DummyNewsData";
import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaComment,
  FaShare,
} from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";

interface Comment {
  id: number;
  user: string;
  content: string;
  avatar: string;
}

const NewsDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const news = newsData.find((n) => n.id === id);

  const currentUserStr =
    localStorage.getItem("currentUser") ||
    '{"namaPengguna":"Guest User","avatarUrl":"/assets/img/user.png"}';
  const currentUser = JSON.parse(currentUserStr);
  const userName = currentUser?.namaPengguna || "Guest User";
  const userAvatar = currentUser?.avatarUrl || "/assets/img/user.png";

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

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
      const newCmt: Comment = {
        id: comments.length + 1,
        user: userName,
        content: newComment.trim(),
        avatar: userAvatar,
      };
      setComments((prev) => [...prev, newCmt]);
      setNewComment("");
      setShowComments(true); // otomatis tunjukkan komentar baru
    }
  };

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen bg-white px-4 pb-24">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full h-[160px] z-0">
        <svg
          viewBox="0 0 1440 480"
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
            d="M0,200 C240,180 480,220 720,200 C960,180 1200,220 1440,200 V0 H0 Z"
          />
        </svg>
      </div>

      {/* Header Title */}
      <div className="flex items-center gap-3 py-4 relative z-20">
        <button
          onClick={() => navigate(-1)}
          className="text-white p-2 rounded-full hover:bg-white/20 transition"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-semibold font-zerotrace text-white">
          Read the news
        </h2>
      </div>

      {/* Content */}
      <div className="relative z-20 mt-4">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-52 object-cover rounded-xl shadow-md mb-4"
        />
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{news.title}</h3>
        <div className="text-gray-700 text-justify whitespace-pre-line leading-relaxed mb-6">
          {news.content}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6 text-secondColor">
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-2 px-4 py-2  transition"
          >
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            <span className="text-sm">{liked ? "Liked" : "Like"}</span>
          </button>

          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2  transition"
          >
            <FaComment />
            <span className="text-sm">{comments.length} Comment</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2  transition"
          >
            <FaShareAlt />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Comment Panel */}
        {showComments && (
          <div className="space-y-4">
            {/* Comment Input */}
            <div className="flex gap-2 mb-4 items-start">
              <img
                src={userAvatar}
                alt={userName}
                className="w-10 h-10 rounded-full object-cover mt-1"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                  rows={2}
                />
                <button
                  onClick={handleAddComment}
                  className="mt-2 bg-zeroTrace-gradient hover:brightness-90 w-full text-white text-sm py-1.5 px-4 rounded-full font-semibold transition"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Comment List */}
            {comments.length > 0 && (
              <div className="bg-white border-t mx-2 border-dashed border-gray-400  mt-4 p-2 space-y-3">
                 <h2 className="text-lg font-semibold text-black text-center">
                  All Comments
                </h2>
                <ul className="space-y-3">
                  {comments.map((cmt) => (
                    <li
                      key={cmt.id}
                      className="bg-white border rounded-lg px-3 py-2 shadow-sm hover:bg-mainColor/10 "
                    >
                      <div className="flex items-start gap-3 ">
                      <img
                        src={cmt.avatar}
                        alt={cmt.user}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-800 text-sm">{cmt.user}</span>
                          <span className="text-xs text-gray-500">
                            1 minute ago
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{cmt.content}</p>
                      </div>
                      </div>
                      <div className="flex justify-between items-center text-xs ml-12 border-t border-gray-200 border-dashed pt-2 text-secondColor mt-6">
                        <button className={`flex items-center gap-1`}>
                          <FaHeart /> <span>Like</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-green-800 transition">
                          <FaComment /> Comment
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-600 transition">
                          <FaShare /> Share
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default NewsDetailPage;
