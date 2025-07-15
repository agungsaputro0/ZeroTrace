import { FaHome, FaUsers, FaGift, FaUser } from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import { Link } from "react-router-dom";


const MobileBottomNav = () => {
  const showNotification = () => {
    
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md sm:hidden z-50">
      <div className="flex justify-around items-end py-2 relative">
        {/* Home */}
        <Link
          to="/HomeMobile"
          className="flex-1 flex flex-col items-center text-[#008000] hover:text-gray-800 text-center"
        >
          <FaHome size={24} />
          <span className="text-xs">Home</span>
        </Link>

        {/* Community */}
        <Link
          to="/Community"
          onClick={showNotification}
          className="flex-1 flex flex-col items-center text-[#008000] hover:text-gray-800 text-center"
        >
          <FaUsers size={24} />
          <span className="text-xs">Community</span>
        </Link>

        {/* Smart Bin - Highlighted */}
        <Link
          to="/SmartBinScanner"
          onClick={showNotification}
          className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center bg-[#336600] text-white p-3 rounded-full shadow-lg z-10 border-4 border-grey"
        >
          <MdQrCodeScanner size={28} />
        </Link>

        {/* Placeholder to maintain layout balance */}
        <div className="flex-1" />

        {/* Reward */}
        <Link
          to="/MyEcoReward"
          onClick={showNotification}
          className="flex-1 flex flex-col items-center text-[#008000] hover:text-gray-800 text-center"
        >
          <FaGift size={24} />
          <span className="text-xs">Reward</span>
        </Link>

        {/* Me */}
        <Link
          to="/MyAccount"
          onClick={showNotification}
          className="flex-1 flex flex-col items-center text-[#008000] hover:text-gray-800 text-center"
        >
          <FaUser size={24} />
          <span className="text-xs">Me</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomNav;
