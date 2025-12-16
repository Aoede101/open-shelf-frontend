import { Star, ThumbsUp, MessageCircle } from "lucide-react";

export default function BookCard({ book, onClick }) {
  // FIX: Proper cover URL handling
  const getCoverUrl = (cover) => {
    if (!cover) return "https://via.placeholder.com/400x600?text=No+Cover";
    if (cover.startsWith("http")) return cover;
    // Remove /api from URL and add the cover path
    const baseUrl =
      import.meta.env.VITE_API_URL?.replace("/api", "") ||
      "http://localhost:5000";
    return `${baseUrl}${cover}`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer group"
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
        <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm font-semibold">
            {book.rating?.toFixed(1) || "0.0"}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{book.author}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
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
