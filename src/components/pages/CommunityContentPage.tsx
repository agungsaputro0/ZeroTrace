import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaComment, FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import MobileBottomNav from "../organisms/MobileBottomNav";
import ForumPostBox from "../atoms/ForumPostBox";

interface Post {
  id: number;
  userName: string;
  avatarUrl: string;
  text: string;
  hashtags: string[];
  attachments: { name: string; data: string }[];
  likes: number;
  liked: boolean;
  createdAt: string;
}

const CommunityContentPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentUserStr =
    localStorage.getItem("currentUser") ||
    '{"namaPengguna":"Guest User","avatarUrl":"/assets/img/user.png"}';
  const currentUser = JSON.parse(currentUserStr);
  const userName = currentUser?.namaPengguna || "Guest User";

  const [activeTab, setActiveTab] = useState<"forum" | "members" | "gallery">("forum");
  const [showPostForm, setShowPostForm] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState<Record<number, boolean>>({});
  const [posts, setPosts] = useState<Post[]>([]);

  const communityName = id?.replace(/-/g, " ").toUpperCase();

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Bulan mulai dari 0
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${dd}-${mm}-${yyyy} pukul ${hh}:${min}`;
  };

  // Ambil post dari localStorage saat halaman dibuka
  useEffect(() => {
    const existingPostsStr = localStorage.getItem("forumPosts");
    const existingPosts: Post[] = existingPostsStr
      ? JSON.parse(existingPostsStr).map((p: any) => ({
          ...p,
          likes: 0,
          liked: false,
        }))
      : [];

    // Dummy posts
    const dummyPosts: Post[] = [
      {
        id: 1,
        userName: "Joko Prabogo",
        avatarUrl: "/assets/img/user.png",
        text: "Can we organize a cleanup on the 21st? Many reported piles near the bridge.",
        hashtags: ["#cleanup", "#community"],
        attachments: [],
        likes: 5,
        liked: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        userName: "Yanto Galon",
        avatarUrl: "/assets/img/user.png",
        text: "I can help bring some tools. Let me know what’s needed.",
        hashtags: ["#volunteer"],
        attachments: [],
        likes: 3,
        liked: false,
        createdAt: new Date().toISOString(),
      },
    ];

    // Gabungkan: LocalStorage + dummy
    setPosts([...existingPosts, ...dummyPosts]);
  }, []);


  // Fungsi refreshPosts agar bisa dipanggil dari ForumPostBox
  const refreshPosts = () => {
    const existingPostsStr = localStorage.getItem("forumPosts");
    if (existingPostsStr) {
      const existingPosts: Post[] = JSON.parse(existingPostsStr).map((p: any) => ({
        ...p,
        likes: 0,
        liked: false,
      }));
      setPosts(existingPosts);
    } else {
      // Tetap gunakan dummy kalau kosong
      const dummyPosts: Post[] = [
        {
          id: 1,
          userName: "Joko Prabogo",
          avatarUrl: "/assets/img/user.png",
          text: "Can we organize a cleanup on the 21st? Many reported piles near the bridge.",
          hashtags: ["#cleanup", "#community"],
          attachments: [],
          likes: 5,
          liked: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          userName: "Yanto Galon",
          avatarUrl: "/assets/img/user.png",
          text: "I can help bring some tools. Let me know what’s needed.",
          hashtags: ["#volunteer"],
          attachments: [],
          likes: 3,
          liked: false,
          createdAt: new Date().toISOString(),
        },
      ];
      setPosts(dummyPosts);
    }
  };

  const toggleCommentBox = (index: number) => {
    setShowCommentBox((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleLike = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].liked = !updatedPosts[index].liked;
    updatedPosts[index].likes += updatedPosts[index].liked ? 1 : -1;
    setPosts(updatedPosts);
  };

  const handleShare = async (post: Post) => {
    const shareData = {
      title: `${communityName} Community`,
      text: `${post.userName} says: ${post.text}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert("Post copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="relative max-w-[420px] mx-auto min-h-screen-dvh bg-white px-4 pb-24">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full h-[160px] z-0">
        <svg viewBox="0 0 1440 480" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#26C6DA" />
              <stop offset="100%" stopColor="#26D6A8" />
            </linearGradient>
          </defs>
          <path fill="url(#waveGradient)" d="M0,200 C240,180 480,220 720,200 C960,180 1200,220 1440,200 V0 H0 Z" />
        </svg>
      </div>

      <div className="flex items-center text-white gap-2 px-4 pt-4 mb-8 relative z-20">
        <FaArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h2 className="text-xl font-semibold flex-1 font-zerotrace">{communityName}</h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-around text-sm text-green-800 border-b mb-4 relative z-20">
        {["forum", "members", "gallery"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`py-2 flex-1 ${activeTab === tab ? "border-b-2 text-secondColor border-secondColor font-medium" : ""}`}
          >
            {tab === "forum" && "Forum"}
            {tab === "members" && "Members"}
            {tab === "gallery" && "Gallery"}
          </button>
        ))}
      </div>

      <div className="px-4 text-sm text-gray-700 relative z-20">
        {/* Forum Section */}
        {activeTab === "forum" && (
          <>
            <button
              onClick={() => setShowPostForm(!showPostForm)}
              className={`w-full mb-4 ${showPostForm ? "border border-secondColor text-secondColor hover:brightness-90" : "bg-zeroTrace-gradient text-white hover:bg-secondColor"} py-2 rounded-full text-sm font-medium transition`}
            >
              {showPostForm ? "Cancel Post" : "Post Forum"}
            </button>

            {showPostForm && <ForumPostBox refreshPosts={refreshPosts} />}

            {/* Forum Posts */}
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={post.id} className="bg-white border border-gray-200 shadow-md p-3 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    {/* Avatar + Nama + Tanggal */}
                    <div className="flex items-center gap-3">
                      <img
                        src={post.avatarUrl || "/assets/img/user.png"}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-secondColor">{post.userName}</p>
                        <p className="text-[0.8em] text-gray-600">{formatDateTime(post.createdAt)}</p>
                      </div>
                    </div>

                    {/* Three dots hanya untuk post milik user */}
                    {post.userName === userName && (
                      <div className="cursor-pointer">
                        <BsThreeDots className="text-lg" />
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-800">{post.text}</p>

                  {/* Hashtags */}
                  {post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 mb-2">
                      {post.hashtags.map((tag, idx) => (
                        <span key={idx} className="bg-zeroTrace-gradient text-white px-2 py-1 rounded-full text-xs">{tag}</span>
                      ))}
                    </div>
                  )}

                  {post.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.attachments.map((att, idx) => (
                        <div
                          key={idx}
                          className={`${post.attachments.length == 1 ? "w-full h-[200px]" : ""} ${post.attachments.length == 2 ? "w-[48%] h-[100px]" : ""} ${post.attachments.length == 3 ? "w-[31%] h-[100px]" : ""} ${post.attachments.length > 3 ? "w-20 h-20" : ""} bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center`}
                        >
                          <img
                            src={att.data}
                            alt={att.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex justify-around items-center text-sm text-secondColor mt-4">
                    <button onClick={() => toggleLike(index)} className={`flex items-center gap-1 ${post.liked ? "text-red-500" : "hover:text-red-400 transition"}`}>
                      <FaHeart /> <span>{post.likes}</span>
                    </button>
                    <button onClick={() => toggleCommentBox(index)} className="flex items-center gap-1 hover:text-green-800 transition">
                      <FaComment /> Comment
                    </button>
                    <button onClick={() => handleShare(post)} className="flex items-center gap-1 hover:text-blue-600 transition">
                      <FaShare /> Share
                    </button>
                  </div>

                  {/* Comment box */}
                  {showCommentBox[index] && (
                    <div className="mt-3">
                      <textarea placeholder="Write a comment..." rows={2} className="w-full px-3 py-2 bg-white border rounded-xl text-sm resize-none" />
                      <button className="mt-2 w-full h-8 bg-zeroTrace-gradient text-white rounded-full text-xs hover:bg-green-700 transition">
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
          <>
          <ul className="space-y-3">
            {["Yanto Galon", "Fero Messi", "Sepatu Rizieq", "Lukas hartanto", "Joko Prabogo", "Mbah Kekong", "Meggy", "Marinta Gabriella", "Adam Fariski"].map((user, idx) => (
              <li key={idx} className="flex items-center gap-3 p-2 rounded-md hover:bg-mainColor/20">
                <img src={`https://picsum.photos/50/50?random=${idx}`} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                <span>{user}</span>
              </li>
            ))}
          </ul>
          <div className="text-center mt-4">
            <button
              className="text-secondColor text-sm font-medium"
            >
              Show More
            </button>
          </div>
          </>
        )}

        {/* Gallery Section */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`w-full h-24 bg-cover bg-center flex items-center justify-center text-gray-500 text-xs`}
                style={{ backgroundImage: `url('/assets/img/community/community${num}.jpg')` }}
              >
                Community {num}
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
