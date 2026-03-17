"use client";

import { useState } from "react";
import { ContentInput } from "@/components/dashboard/content-input";
import { Brain, ChevronLeft, ChevronRight, RotateCcw, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Flashcard {
  question: string;
  answer: string;
}

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const handleGenerate = async (content: string) => {
    setLoading(true);
    setError("");
    setFlashcards([]);
    setCurrentIndex(0);
    setFlipped(false);

    try {
      const res = await fetch("/api/ai/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error("Erreur lors de la génération");

      const data = await res.json();
      if (data.flashcards) {
        setFlashcards(data.flashcards);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    setFlipped(false);
    setTimeout(() => setCurrentIndex((i) => Math.min(i + 1, flashcards.length - 1)), 150);
  };

  const prev = () => {
    setFlipped(false);
    setTimeout(() => setCurrentIndex((i) => Math.max(i - 1, 0)), 150);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Flashcards intelligentes</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Génère des flashcards interactives à partir de ton cours pour mémoriser plus efficacement.
        </p>
      </div>

      <ContentInput
        onContentReady={handleGenerate}
        loading={loading}
        placeholder="Colle le texte de ton cours pour générer des flashcards..."
        buttonLabel="Générer les flashcards"
      />

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl">
          {error}
        </div>
      )}

      <AnimatePresence>
        {flashcards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            {/* Controls */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-white">{flashcards.length}</strong> flashcards générées
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("card")}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                    viewMode === "card"
                      ? "gradient-bg text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Carte
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                    viewMode === "list"
                      ? "gradient-bg text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Liste
                </button>
              </div>
            </div>

            {viewMode === "card" ? (
              <div>
                {/* Flashcard */}
                <div className="perspective-1000 mb-4">
                  <motion.div
                    className="relative w-full cursor-pointer"
                    style={{ minHeight: "280px" }}
                    onClick={() => setFlipped(!flipped)}
                  >
                    <AnimatePresence mode="wait">
                      {!flipped ? (
                        <motion.div
                          key="front"
                          initial={{ rotateY: -90, opacity: 0 }}
                          animate={{ rotateY: 0, opacity: 1 }}
                          exit={{ rotateY: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 bg-white dark:bg-slate-900 border-2 border-primary-200 dark:border-primary-800 rounded-2xl p-8 flex flex-col items-center justify-center"
                        >
                          <p className="text-xs text-primary-500 font-medium uppercase tracking-wide mb-4">Question</p>
                          <p className="text-xl font-semibold text-slate-900 dark:text-white text-center leading-relaxed">
                            {flashcards[currentIndex]?.question}
                          </p>
                          <p className="mt-6 text-sm text-slate-400 flex items-center gap-1.5">
                            <Eye className="w-4 h-4" />
                            Clique pour voir la réponse
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="back"
                          initial={{ rotateY: -90, opacity: 0 }}
                          animate={{ rotateY: 0, opacity: 1 }}
                          exit={{ rotateY: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 gradient-bg rounded-2xl p-8 flex flex-col items-center justify-center"
                          style={{ minHeight: "280px" }}
                        >
                          <p className="text-xs text-white/70 font-medium uppercase tracking-wide mb-4">Réponse</p>
                          <p className="text-xl font-semibold text-white text-center leading-relaxed">
                            {flashcards[currentIndex]?.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={prev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 disabled:opacity-40 hover:text-primary-600 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Précédente
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">
                      {currentIndex + 1} / {flashcards.length}
                    </span>
                    <button
                      onClick={() => { setFlipped(false); setCurrentIndex(0); }}
                      className="p-1.5 text-slate-400 hover:text-primary-600 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={next}
                    disabled={currentIndex === flashcards.length - 1}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 disabled:opacity-40 hover:text-primary-600 transition-colors"
                  >
                    Suivante
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress dots */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {flashcards.slice(0, Math.min(20, flashcards.length)).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setFlipped(false); setCurrentIndex(i); }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentIndex
                          ? "bg-primary-500 w-4"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {flashcards.map((card, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                    <p className="text-xs text-primary-500 font-medium uppercase tracking-wide mb-1">Q{i + 1}</p>
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">{card.question}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{card.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
