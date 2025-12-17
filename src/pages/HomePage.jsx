import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Library, Bot, Upload, MessageSquare, ChevronRight } from 'lucide-react';
import { bookService } from '../services/bookService';
import BookCard from '../components/BookCard';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrendingBooks();
  }, []);

  const fetchTrendingBooks = async () => {
    try {
      const data = await bookService.getBooks({ sort: '-votes', limit: 4 });
      setBooks(data.books || []);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Welcome to OpenShelf
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your community-driven digital library. Share, discover, and discuss
          books with fellow enthusiasts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => navigate('/library')}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2"
          >
            <Library className="h-5 w-5" />
            <span>Explore Library</span>
          </button>
          <button
            onClick={() => navigate('/ai-assistant')}
            className="px-8 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition flex items-center justify-center space-x-2"
          >
            <Bot className="h-5 w-5" />
            <span>Get AI Recommendations</span>
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={Upload}
          title="Share Books"
          description="Upload and share your favorite books with the community"
          color="purple"
        />
        <FeatureCard
          icon={MessageSquare}
          title="Discussion Rooms"
          description="Join chat rooms to discuss and review books with others"
          color="blue"
        />
        <FeatureCard
          icon={Bot}
          title="AI Recommendations"
          description="Get personalized book suggestions from our AI assistant"
          color="indigo"
        />
      </div>

      {/* Trending Books */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Books</h2>
          <button
            onClick={() => navigate('/library')}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center space-x-2"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onClick={() => navigate(`/books/${book._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color }) {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}