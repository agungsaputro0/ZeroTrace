import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

interface Props {
  search: string;
  setSearch: (val: string) => void;
}

const WasteFilterBar: React.FC<Props> = ({ search, setSearch }) => {
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <>
      <div className="flex items-center gap-2 border px-3 py-2 rounded-full shadow-sm mb-4 bg-white">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search waste type or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none text-sm"
        />
        <button onClick={() => setShowFilters(!showFilters)}>
          <FaFilter className="text-gray-500" />
        </button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h4 className="font-semibold text-sm mb-2">Filter by:</h4>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <label className="block text-gray-600 mb-1">Waste Type</label>
              <select className="w-full border px-2 py-1 rounded">
                <option>All</option>
                <option>Plastic</option>
                <option>Organic</option>
                <option>Metal</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Date</label>
              <select className="w-full border px-2 py-1 rounded">
                <option>Anytime</option>
                <option>Today</option>
                <option>This Week</option>
                <option>Last Month</option>
              </select>
            </div>
          </div>

          <button
            className="mt-4 w-full text-center bg-[#B8E986] text-sm py-1.5 rounded hover:bg-[#A3D873] transition"
            onClick={() => setShowFilters(false)}
          >
            Apply Filters
          </button>
        </div>
      )}
    </>
  );
};

export default WasteFilterBar;
