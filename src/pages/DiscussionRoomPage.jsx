import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, ArrowLeft, Users, Clock, MessageCircle } from "lucide-react";
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
  const [isJoining, setIsJoining] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    fetchDiscussion();
    const interval = setInterval(() => {
      fetchDiscussion(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [id, isAuthenticated]);

  useEffect(() => {
    scrollToBottom();
  }, [discussion?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchDiscussion = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const data = await discussionService.getDiscussion(id);
      setDiscussion(data);
      console.log("Discussion fetched:", {
        participants: data.participants?.length,
        messages: data.messages?.length,
        currentUserId: user?.id,
        participantIds: data.participants?.map((p) => p._id),
      });
    } catch (error) {
      console.error("Failed to fetch discussion:", error);
      if (!silent) {
        alert("Discussion not found");
        navigate("/community");
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleJoinDiscussion = async () => {
    setIsJoining(true);
    try {
      console.log(
        "Attempting to join discussion for book:",
        discussion.book._id
      );
      const updatedDiscussion = await discussionService.joinDiscussion(
        discussion.book._id
      );
      console.log("Join successful, updated discussion:", updatedDiscussion);
      setDiscussion(updatedDiscussion);
    } catch (error) {
      console.error("Failed to join discussion:", error);
      alert("Failed to join discussion. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || sending) return;

    setSending(true);
    const tempMessage = message;
    setMessage("");

    try {
      console.log("Sending message:", tempMessage);
      const updatedDiscussion = await discussionService.sendMessage(
        id,
        tempMessage
      );
      console.log(
        "Message sent successfully, new message count:",
        updatedDiscussion.messages?.length
      );
      setDiscussion(updatedDiscussion);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessage(tempMessage);
      alert(
        error.response?.data?.error ||
          "Failed to send message. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffMs = now - messageDate;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return messageDate.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          Loading discussion...
        </p>
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Discussion not found
        </p>
        <button
          onClick={() => navigate("/community")}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Back to Community
        </button>
      </div>
    );
  }

  // FIXED: Check if current user is a participant
  const isParticipant = discussion.participants?.some(
    (p) => p._id === user?.id || p.toString() === user?.id
  );

  console.log("Is participant check:", {
    isParticipant,
    userId: user?.id,
    participantIds: discussion.participants?.map((p) => p._id || p),
  });

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <button
          onClick={() => navigate("/community")}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-3 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Community</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            {discussion.book?.cover && (
              <img
                src={
                  discussion.book.cover.startsWith("http")
                    ? discussion.book.cover
                    : `${import.meta.env.VITE_API_URL.replace("/api", "")}${
                        discussion.book.cover
                      }`
                }
                alt={discussion.book.title}
                className="w-12 h-16 object-cover rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/100x150?text=Book";
                }}
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {discussion.book?.title || "Discussion Room"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                by {discussion.book?.author}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>{discussion.participants?.length || 0}</span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs ${
                discussion.isActive
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {discussion.isActive ? "Active" : "Inactive"}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {discussion.messages && discussion.messages.length > 0 ? (
            discussion.messages.map((msg, index) => {
              const isOwnMessage = msg.user?._id === user?.id;
              const showAvatar =
                index === 0 ||
                discussion.messages[index - 1]?.user?._id !== msg.user?._id;

              return (
                <div
                  key={msg._id || index}
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] ${
                      isOwnMessage ? "order-2" : "order-1"
                    }`}
                  >
                    {showAvatar && !isOwnMessage && (
                      <div className="flex items-center space-x-2 mb-1 ml-1">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {msg.user?.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {msg.user?.username || "Unknown User"}
                        </span>
                      </div>
                    )}

                    <div
                      className={`rounded-lg p-3 ${
                        isOwnMessage
                          ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      }`}
                    >
                      <p className="text-sm break-words">{msg.content}</p>
                      <div
                        className={`flex items-center space-x-1 mt-1 text-xs ${
                          isOwnMessage
                            ? "text-purple-100"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <Clock className="h-3 w-3" />
                        <span>{formatTime(msg.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <MessageCircle className="h-16 w-16 mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-lg font-medium">No messages yet</p>
              <p className="text-sm">Be the first to start the conversation!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input - SHOWS BASED ON PARTICIPANT STATUS */}
        <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
          {isParticipant ? (
            // USER HAS JOINED - SHOW INPUT
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                disabled={sending}
                autoFocus
              />
              <button
                type="submit"
                disabled={sending || !message.trim()}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {sending ? "Sending..." : "Send"}
                </span>
              </button>
            </form>
          ) : (
            // USER NOT JOINED - SHOW JOIN BUTTON
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Join this discussion to send messages
              </p>
              <button
                onClick={handleJoinDiscussion}
                disabled={isJoining}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
              >
                <Users className="h-4 w-4" />
                <span>{isJoining ? "Joining..." : "Join Discussion"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Participants */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Participants ({discussion.participants?.length || 0})</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {discussion.participants && discussion.participants.length > 0 ? (
            discussion.participants.map((participant) => (
              <div
                key={participant._id}
                className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
              >
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {participant.username?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {participant.username}
                  {(participant._id === user?.id ||
                    participant.toString() === user?.id) &&
                    " (You)"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No participants yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
