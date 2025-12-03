import React from "react";
import { useNavigate } from "react-router-dom";
import { newsData } from "../../data/DummyNewsData";

const NewsListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto p-4 pb-20 bg-white">
      <h2 className="text-xl font-bold text-secondColor mb-4">News and Activity</h2>

      {newsData.map((news) => (
        <div
          key={news.id}
          onClick={() => navigate(`/NewsDetail/${news.id}`)}
          className="flex gap-3 mb-4 cursor-pointer hover:bg-green-50 p-2 rounded transition"
        >
          <img
            src={news.image}
            alt={news.title}
            className="w-16 h-16 rounded-md object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">{news.title}</p>
            <p className="text-xs text-gray-500">{news.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsListPage;
