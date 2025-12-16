import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles } from "lucide-react";

// Using the latest Gemini API v1
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-exp:generateContent";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI book assistant powered by Google Gemini. Tell me what kind of books you enjoy, your favorite genres, or describe what you're looking for, and I'll recommend something perfect for you!",
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

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!GEMINI_API_KEY) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: input },
        {
          role: "assistant",
          content:
            "⚠️ Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.\n\nGet your free API key at: https://aistudio.google.com/app/apikey",
        },
      ]);
      setInput("");
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a knowledgeable and enthusiastic book recommendation assistant. A reader is asking: "${input}"

Please provide thoughtful book recommendations. For each book you recommend:
1. Give the title and author
2. Provide a brief, engaging description (2-3 sentences)
3. Explain why it matches what they're looking for
4. If relevant, mention the genre and any similar books

Keep your tone friendly and conversational. Recommend 2-4 books that truly match their interests. If they're asking about a specific genre or theme, focus on that. If they're asking for something new or different, feel free to suggest hidden gems or lesser-known titles alongside popular choices.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `API Error: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const assistantMessage = {
          role: "assistant",
          content: data.candidates[0].content.parts[0].text,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      let errorMessage =
        "Sorry, I encountered an error while processing your request.";

      if (error.message.includes("API_KEY_INVALID")) {
        errorMessage =
          "❌ Invalid API key. Please check your VITE_GEMINI_API_KEY in the .env file.";
      } else if (error.message.includes("RATE_LIMIT_EXCEEDED")) {
        errorMessage =
          "⏱️ Rate limit exceeded. Please wait a moment and try again.";
      } else if (error.message.includes("quota")) {
        errorMessage =
          "📊 API quota exceeded. You may need to upgrade your Gemini API plan.";
      } else {
        errorMessage = `❌ Error: ${error.message}\n\nPlease check your API key and try again.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
              Google Gemini 2.0
            </span>
          </p>
        </div>
      </div>

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
          {!GEMINI_API_KEY && (
            <p className="text-xs text-red-600 mt-2">
              ⚠️ API key not configured. Add VITE_GEMINI_API_KEY to your .env
              file.
            </p>
          )}
        </div>
      </div>

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
