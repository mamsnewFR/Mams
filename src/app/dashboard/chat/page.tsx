"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Loader2, BookOpen, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [courseContent, setCourseContent] = useState("");
  const [courseSet, setCourseSet] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSetCourse = () => {
    if (courseContent.trim()) {
      setCourseSet(true);
      setMessages([{
        role: "assistant",
        content: "Bonjour ! J'ai analysé ton cours. Tu peux maintenant me poser toutes tes questions sur ce contenu. Je suis là pour t'aider à mieux comprendre ! 📚",
      }]);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          courseContent,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la réponse");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: "assistant", content: accumulated };
            return newMessages;
          });
        }
      }
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Désolé, une erreur s'est produite. Réessaie.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Chat avec ton cours</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Pose des questions sur ton cours et obtiens des réponses précises instantanément.
        </p>
      </div>

      {!courseSet ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Commence par charger ton cours
            </h3>
          </div>
          <textarea
            value={courseContent}
            onChange={(e) => setCourseContent(e.target.value)}
            placeholder="Colle le contenu de ton cours ici. Leo AI utilisera ce texte pour répondre à tes questions..."
            rows={10}
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all mb-4"
          />
          <button
            onClick={handleSetCourse}
            disabled={!courseContent.trim()}
            className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary-500/25"
          >
            Charger le cours et commencer le chat
          </button>
        </div>
      ) : (
        <div className="flex flex-col flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden" style={{ minHeight: "500px" }}>
          {/* Chat header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Leo AI — Mode cours</span>
            </div>
            <button
              onClick={() => {
                setMessages([]);
                setCourseSet(false);
                setCourseContent("");
              }}
              className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center mr-2 shrink-0 mt-0.5 shadow-sm">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "gradient-bg text-white rounded-br-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                    {msg.role === "assistant" && msg.content === "" && loading && (
                      <span className="inline-flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Pose une question sur ton cours..."
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="gradient-bg text-white w-11 h-11 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary-500/25 shrink-0"
              >
                {loading
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <Send className="w-4 h-4" />
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
