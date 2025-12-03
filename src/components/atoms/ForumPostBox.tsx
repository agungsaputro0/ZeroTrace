import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { FaPaperclip, FaTimes } from "react-icons/fa";

interface Attachment {
  file: File;
  id: string;
}

interface ForumPostBoxProps {
  refreshPosts?: () => void; // prop baru
}

const ForumPostBox: React.FC<ForumPostBoxProps> = ({ refreshPosts }) => {
  const currentUserStr =
    localStorage.getItem("currentUser") ||
    '{"namaPengguna":"Guest User","avatarUrl":"/assets/img/user.png"}';
  const currentUser = JSON.parse(currentUserStr);
  const userName = currentUser?.namaPengguna || "Guest User";
  const avatarUrl = currentUser?.avatarUrl || "/assets/img/user.png";

  const [successOpen, setSuccessOpen] = useState(false);
  const [forumText, setForumText] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    const lastChar = value[value.length - 1];
    const isDelimiter = lastChar === " " || lastChar === "\n";
    const words = value.split(/\s+/);
    const newTags: string[] = [];
    const remainingWords: string[] = [];

    words.forEach((word, idx) => {
      if (
        word.startsWith("#") &&
        word.length > 1 &&
        !hashtags.includes(word) &&
        (idx < words.length - 1 || isDelimiter)
      ) {
        newTags.push(word);
      } else {
        remainingWords.push(word);
      }
    });

    if (newTags.length) {
      setHashtags([...hashtags, ...newTags]);
    }

    setForumText(remainingWords.join(" "));
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const handleAddAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      file,
      id: `${file.name}-${Date.now()}`,
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter((att) => att.id !== id));
  };

  const handlePost = async () => {
    if (!forumText.trim() && hashtags.length === 0 && attachments.length === 0) return;

    // Konversi semua attachment menjadi base64
    const attachmentsBase64 = await Promise.all(
      attachments.map((att) => {
        return new Promise<{ name: string; data: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ name: att.file.name, data: reader.result as string });
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(att.file);
        });
      })
    );

    // Ambil post yang sudah ada di localStorage
    const existingPostsStr = localStorage.getItem("forumPosts");
    const existingPosts = existingPostsStr ? JSON.parse(existingPostsStr) : [];

    const newPost = {
      id: Date.now(),
      userName,
      avatarUrl,
      text: forumText,
      hashtags,
      attachments: attachmentsBase64,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("forumPosts", JSON.stringify([newPost, ...existingPosts]));

    // Reset state
    setSuccessOpen(true);
    setForumText("");
    setHashtags([]);
    setAttachments([]);

    // Panggil refreshPosts jika ada
    if (refreshPosts) refreshPosts();
  };

  return (
    <div className="mb-6 p-4 bg-white border border-gray-200 rounded-xl shadow-md">
      {/* User info */}
      <div className="flex items-center gap-4 mb-2">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.onerror = null;
            target.src = "/assets/img/user.png";
          }}
        />
        <p className="text-lg font-semibold">{userName}</p>
      </div>

      {/* Textarea */}
      <textarea
        placeholder="Write your post..."
        value={forumText}
        onChange={handleChange}
        rows={3}
        className="w-full px-3 py-2 mt-2 bg-white border rounded-xl mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-secondColor"
      />

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {hashtags.map((tag, idx) => (
            <div
              key={idx}
              className={`flex items-center bg-zeroTrace-gradient text-white px-3 py-1 rounded-full text-xs`}
            >
              {tag}
              <button
                onClick={() => handleRemoveHashtag(tag)}
                className="ml-1 text-red-500"
              >
                <FaTimes size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Attachments */}
      <div className="flex flex-wrap gap-2 mb-2">
        {attachments.map((att) => (
          <div
            key={att.id}
            className={`relative ${attachments.length == 1 ? "w-full" : ""} ${attachments.length == 2 ? "w-[48%]" : ""} ${attachments.length == 3 ? "w-[31%]" : ""} ${attachments.length > 3 ? "w-20" : ""} h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center`}
          >
            <img
              src={URL.createObjectURL(att.file)}
              alt={att.file.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.onerror = null;
                target.src = "/assets/img/file.png";
              }}
            />
            <button
              type="button"
              onClick={() => handleRemoveAttachment(att.id)}
              className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>

      {/* Attach file */}
      <label className="flex items-center gap-2 text-sm cursor-pointer text-secondColor font-semibold border border-secondColor rounded-xl p-2 mb-2">
        <FaPaperclip /> Attach file to your post
        <input type="file" className="hidden" multiple onChange={handleAddAttachment} />
      </label>

      {/* Post button */}
      <button
        onClick={handlePost}
        className="mt-2 w-full bg-zeroTrace-gradient text-white py-2 rounded-full text-sm hover:bg-green-800 transition"
      >
        Post Forum
      </button>

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
          Feed posted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForumPostBox;
