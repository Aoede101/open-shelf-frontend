import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { pipeline } from "@xenova/transformers";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI book assistant. Tell me what kind of books you enjoy, your favorite genres, or describe what you're looking for, and I'll recommend something perfect for you!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 const handleSend = () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", content: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  // Simulate AI thinking delay
  setTimeout(() => {
    const assistantMessage = {
      role: "assistant",
      content: `📘 **Atomic Habits** by James Clear

**Description:**
Atomic Habits explores how tiny daily habits can lead to massive personal and professional growth. James Clear breaks down the science of habit formation into practical, easy-to-follow strategies.

**Why this book fits you:**
If you're interested in self-improvement, productivity, or making lasting positive changes, this book offers actionable advice that actually works. It's especially great if you want small steps with big results.`,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setLoading(false);
  }, 900); // 0.9 second delay for realism
};

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            AI Book Assistant
          </h1>
          <p className="text-gray-600 flex items-center space-x-2">
            <span>Powered by</span>
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Local MPT-7B-Instruct
            </span>
          </p>
        </div>
      </div>

      {/* Chat area */}
      <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t p-4 bg-gray-50">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
              placeholder="Ask about any book genre, author, or what you'd like to read..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>{loading ? "Thinking..." : "Send"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          💡 Tips for better recommendations:
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Mention your favorite books or authors</li>
          <li>
            • Tell me what genres you enjoy (mystery, sci-fi, romance, etc.)
          </li>
          <li>• Describe the mood or themes you're looking for</li>
          <li>• Let me know if you want classics or contemporary books</li>
        </ul>
      </div>
    </div>
  );
}
