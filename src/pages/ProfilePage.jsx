import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, BookOpen, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userService";
import BookCard from "../components/BookCard";

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await userService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user?.username}
            </h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          icon={BookOpen}
          label="Uploaded Books"
          value={profile?.uploadedBooks?.length || 0}
        />
        <StatCard
          icon={Heart}
          label="Favorite Books"
          value={profile?.favoriteBooks?.length || 0}
        />
        <StatCard
          icon={User}
          label="Member Since"
          value={new Date(profile?.createdAt).toLocaleDateString()}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          My Uploaded Books
        </h2>
        {profile?.uploadedBooks?.length > 0 ? (
          <div className="grid md:grid-cols-4 gap-6">
            {profile.uploadedBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onClick={() => navigate(`/books/${book._id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">You haven't uploaded any books yet</p>
            <button
              onClick={() => navigate("/upload")}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Upload Your First Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
