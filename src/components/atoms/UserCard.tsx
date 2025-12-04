import { FaLeaf, FaMedal, FaStar } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user, points }: { user: any; points: number }) => {
  const currentUserStr = localStorage.getItem("currentUser") ||
    '{"idPengguna":"PG006","avatarUrl":"/assets/img/user.png"}';
  const currentUser = JSON.parse(currentUserStr);
  const idPengguna = currentUser?.idPengguna || "Guest User";
  
  const ecoData: any[] = JSON.parse(localStorage.getItem("ecoData") || "[]");
  const usedPoint: any[] = JSON.parse(localStorage.getItem("usedPoint") || "[]");
  // Filter sesuai user
  const userData = ecoData.filter(item => item.idPengguna === idPengguna);
  const userPoinData = usedPoint.filter(item => item.idPengguna === idPengguna);

  // Hitung total poin
  const totalPoin = userData.reduce((acc, item) => acc + (item.tambahanPoin || 0), 0);
  const totalPoinUsed = userPoinData.reduce((acc, item) => acc + (item.cost || 0), 0);


  // Badge logic
  const getBadge = () => {
    if (points >= 1500)
      return { label: "ZeroHero Elite", next: 2000, color: "text-yellow-600", bg: "bg-yellow-100", icon: <FaStar /> };
    if (points >= 700)
      return { label: "Earth Guardian", next: 1500, color: "text-purple-600", bg: "bg-purple-100", icon: <FaMedal /> };
    if (points >= 300)
      return { label: "Eco Warrior", next: 700, color: "text-blue-600", bg: "bg-blue-100", icon: <FaLeaf /> };
    if (points >= 100)
      return { label: "Eco Explorer", next: 300, color: "text-green-600", bg: "bg-green-100", icon: <FaLeaf /> };

    return { label: "Beginner", next: 100, color: "text-gray-600", bg: "bg-gray-200", icon: <FaLeaf /> };
  };

  const badge = getBadge();

  // Progress to next badge
  const progress = Math.min(((points + totalPoin - totalPoinUsed) / badge.next) * 100, 100);
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-md px-4 py-4 mt-2 relative z-20">

      {/* Top Bar: Menu */}
      <div className="absolute right-3 top-3 cursor-pointer text-gray-600 hover:text-gray-900">
        <HiDotsVertical size={20} />
      </div>

            <div className="flex justify-between items-start">
        {/* Left: Avatar + Name */}
        <div className="flex items-center">
          <img
            src={user.avatarUrl ||  '/assets/img/user.png'}
            alt="Avatar"
            className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              target.src = '/assets/img/user.png';
            }}
          />

          <div className="flex flex-col ml-4">
            <p className="text-lg font-semibold">{user.namaPengguna}</p>
            <div className="flex gap-2 items-center">
                <div className="mt-1 bg-green-100 text-green-700 px-2 py-1 rounded-md w-fit text-xs font-medium">
                {points + totalPoin - totalPoinUsed} Points
                </div>
                <div
                    className={`flex items-center gap-2 px-3 py-1 mt-1 rounded-md text-xs font-semibold shadow-sm ${badge.bg} ${badge.color}`}
                >
                <span className="text-sm">{badge.icon}</span>
                {badge.label}
                </div>
            </div>
          </div>
        </div>

      </div>


      {/* PROGRESS BAR */}
      <div className="mt-4">
        <p className="text-xs text-gray-500 mb-1">
          {points + totalPoin - totalPoinUsed} / {badge.next} for {badge.label === "ZeroHero Elite" ? "maximum" : "the next badge"}
        </p>

        <div className="w-full h-2 rounded-full bg-gray-200">
          <div
            className="h-full bg-zeroTrace-gradient rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* CTA BUTTONS */}
      <div className="flex gap-2 mt-4">
        <button onClick={() => navigate("/ActivityHistory")} className="flex-1 py-2 text-sm font-medium bg-zeroTrace-gradient text-white rounded-xl hover:brightness-90 transition duration-300 ease-in-out">
          Activity History
        </button>

        <button onClick={() => navigate("/Leaderboard")} className="flex-1 py-2 text-sm font-medium border border-secondColor text-secondColor rounded-xl hover:bg-mainColor hover:text-white transition duration-300 ease-in-out">
          Leaderboard
        </button>
      </div>
    </div>
  );
};

export default UserCard;
