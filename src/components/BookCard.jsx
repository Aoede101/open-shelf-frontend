import { Star, ThumbsUp, MessageCircle } from "lucide-react";

export default function BookCard({ book, onClick }) {
  const getCoverUrl = (cover) => {
    if (!cover) return "https://via.placeholder.com/400x600?text=No+Cover";
    if (cover.startsWith("http")) return cover;
    const baseUrl =
      import.meta.env.VITE_API_URL?.replace("/api", "") ||
      "http://localhost:5000";
    return `${baseUrl}${cover}`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <img
          src={getCoverUrl(book.cover)}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x600?text=No+Cover";
          }}
        />
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center space-x-1 shadow-md">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {book.rating?.toFixed(1) || "0.0"}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {book.author}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{book.votes || 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{book.reviewCount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
