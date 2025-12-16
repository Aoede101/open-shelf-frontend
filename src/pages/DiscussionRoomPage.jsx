import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, ArrowLeft, Users, Trash2 } from "lucide-react";
import { discussionService } from "../services/discussionService";
import { useAuth } from "../context/AuthContext";

export default function DiscussionRoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [discussion, setDiscussion] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchDiscussion();

    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchDiscussion, 5000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [discussion?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchDiscussion = async () => {
    try {
      const data = await discussionService.getDiscussion(id);
      setDiscussion(data);
    } catch (error) {
      console.error("Failed to fetch discussion:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !isAuthenticated) return;

    setSending(true);
    try {
      const updatedDiscussion = await discussionService.sendMessage(
        id,
        message
      );
      setDiscussion(updatedDiscussion);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleJoinDiscussion = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await discussionService.joinDiscussion(discussion.book._id);
      fetchDiscussion();
    } catch (error) {
      console.error("Failed to join discussion:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Discussion not found</p>
        <button
          onClick={() => navigate("/community")}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Back to Community
        </button>
      </div>
    );
  }

  const isParticipant = discussion.participants?.some(
    (p) => p._id === user?.id
  );

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <button
          onClick={() => navigate("/community")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-3"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Community</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {discussion.book?.title || "Discussion Room"}
            </h1>
            <p className="text-gray-600">{discussion.book?.author}</p>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="h-5 w-5" />
            <span>{discussion.participants?.length || 0} participants</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-lg shadow-md flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {discussion.messages && discussion.messages.length > 0 ? (
            discussion.messages.map((msg, index) => {
              const isOwn = msg.user?._id === user?.id;
              return (
                <div
                  key={msg._id || index}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] ${isOwn ? "order-2" : "order-1"}`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {!isOwn && (
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {msg.user?.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <span className="text-sm font-semibold text-gray-900">
                        {isOwn ? "You" : msg.user?.username || "Anonymous"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        isOwn
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p>No messages yet. Be the first to start the conversation!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          {isAuthenticated ? (
            isParticipant ? (
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={sending || !message.trim()}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>{sending ? "Sending..." : "Send"}</span>
                </button>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-3">
                  Join the discussion to send messages
                </p>
                <button
                  onClick={handleJoinDiscussion}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Join Discussion
                </button>
              </div>
            )
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-3">Please login to participate</p>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
