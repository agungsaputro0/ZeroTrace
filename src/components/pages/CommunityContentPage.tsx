import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPaperclip, FaHeart, FaComment, FaShare } from "react-icons/fa";
import MobileBottomNav from "../organisms/MobileBottomNav";

const CommunityContentPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState<"forum" | "members" | "gallery">("forum");
  const [showPostForm, setShowPostForm] = useState(false);
  const [forumText, setForumText] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [showCommentBox, setShowCommentBox] = useState<Record<number, boolean>>({});

  const communityName = id?.replace(/-/g, " ").toUpperCase();

  const handlePost = () => {
    if (forumText.trim()) {
      alert("Forum post submitted!");
      setForumText("");
      setAttachment(null);
      setShowPostForm(false);
    }
  };

  const toggleCommentBox = (index: number) => {
    setShowCommentBox((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const dummyPosts = [
    {
      user: "@earthlover",
      text: "Can we organize a cleanup on the 21st? Many reported piles near the bridge.",
    },
    {
      user: "@greenbean",
      text: "I can help bring some tools. Let me know what’s needed.",
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen-dvh pb-20">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 mb-2">
        <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h2 className="text-xl font-semibold flex-1 text-center">{communityName}</h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-around text-sm text-green-800 border-b mb-4">
        {["forum", "members", "gallery"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`py-2 flex-1 ${activeTab === tab ? "border-b-2 border-green-600 font-medium" : ""}`}
          >
            {tab === "forum" && "💬 Forum"}
            {tab === "members" && "🧑‍🤝‍🧑 Members"}
            {tab === "gallery" && "📸 Gallery"}
          </button>
        ))}
      </div>

      <div className="px-4 text-sm text-gray-700">
        {/* Forum Section */}
        {activeTab === "forum" && (
          <>
            <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="w-full mb-4 bg-green-600 text-white py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
            >
              {showPostForm ? "Cancel Post" : "Post Forum"}
            </button>

            {showPostForm && (
              <div className="mb-6 bg-green-50 p-3 rounded-lg shadow-sm">
                <textarea
                  placeholder="Write your post..."
                  value={forumText}
                  onChange={(e) => setForumText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-white border rounded mb-2 text-sm resize-none"
                />
                <label className="flex items-center gap-2 text-sm cursor-pointer text-green-700 mb-2">
                  <FaPaperclip />
                  Attach file
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setAttachment(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </label>
                {attachment && (
                  <p className="text-xs text-gray-600 italic">Attached: {attachment.name}</p>
                )}
                <button
                  onClick={handlePost}
                  className="mt-2 w-full bg-green-700 text-white py-2 rounded-full text-sm hover:bg-green-800 transition"
                >
                  Post Forum
                </button>
              </div>
            )}

            {/* Dummy Forum Posts */}
            <div className="space-y-4">
              {dummyPosts.map((post, index) => (
                <div key={index} className="bg-green-50 p-3 rounded-lg shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src="/assets/img/user.png"
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="font-semibold text-green-700">{post.user}</p>
                  </div>
                  <p className="text-sm text-gray-800">{post.text}</p>

                  {/* Action buttons */}
                  <div className="flex justify-between items-center text-xs text-green-700 mt-3 px-1">
                    <button className="flex items-center gap-1">
                        <FaHeart className="text-red-500" /> <span>12</span>
                    </button>
                    <button
                        onClick={() => toggleCommentBox(index)}
                        className="flex items-center gap-1"
                    >
                        <FaComment /> Comment
                    </button>
                    <button className="flex items-center gap-1">
                        <FaShare /> Share
                    </button>
                    </div>


                  {/* Comment box */}
                  {showCommentBox[index] && (
                    <div className="mt-3">
                      <textarea
                        placeholder="Write a comment..."
                        rows={2}
                        className="w-full px-3 py-2 bg-white border rounded text-sm resize-none"
                      />
                      <button className="mt-2 w-full h-8 bg-green-600 text-white py-1 px-4 rounded-full text-xs hover:bg-green-700 transition">
                        Post Comment
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Members Section */}
        {activeTab === "members" && (
          <ul className="space-y-3">
            {["@earthlover", "@greenbean", "@naturehero", "@recycleready", "@planetfirst"].map(
              (user, idx) => (
                <li key={idx} className="flex items-center gap-3 border-b pb-2">
                  <img
                    src="/assets/img/user.png"
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user}</span>
                </li>
              )
            )}
          </ul>
        )}

        {/* Gallery Section */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((img) => (
              <div
                key={img}
                className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs"
              >
                📷 Photo {img}
              </div>
            ))}
          </div>
        )}
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default CommunityContentPage;
