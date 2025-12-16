import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MessageCircle, Book } from 'lucide-react';
import { discussionService } from '../services/discussionService';

export default function CommunityPage() {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const data = await discussionService.getDiscussions();
      setDiscussions(data);
    } catch (error) {
      console.error('Failed to fetch discussions:', error);
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
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Community Discussions</h1>
        <p className="text-gray-600">Join conversations about your favorite books</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {discussions.length > 0 ? (
          discussions.map((discussion) => (
            <div
              key={discussion._id}
              onClick={() => navigate(`/discussions/${discussion._id}`)}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-start space-x-4 mb-4">
                {discussion.book?.cover && (
                  <img
                    src={discussion.book.cover}
                    alt={discussion.book.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {discussion.book?.title || 'Unknown Book'}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm flex-shrink-0 ${
                        discussion.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {discussion.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {discussion.book?.author}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{discussion.participants?.length || 0} participants</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>{discussion.messages?.length || 0} messages</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Last active: {new Date(discussion.lastActivity).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 bg-white rounded-lg shadow-md">
            <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No discussions yet</p>
            <button
              onClick={() => navigate('/library')}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Browse Books to Start a Discussion
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
