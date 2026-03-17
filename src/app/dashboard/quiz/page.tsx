"use client";

import { useState } from "react";
import { ContentInput } from "@/components/dashboard/content-input";
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [quizDone, setQuizDone] = useState(false);

  const handleGenerate = async (content: string) => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setQuizDone(false);

    try {
      const res = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error("Erreur lors de la génération");
      const data = await res.json();
      if (data.questions) {
        setQuestions(data.questions);
        setAnswers(new Array(data.questions.length).fill(null));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(answers[currentIndex + 1]);
    } else {
      setQuizDone(true);
    }
  };

  const score = answers.filter((a, i) => a === questions[i]?.correctIndex).length;

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers(new Array(questions.length).fill(null));
    setQuizDone(false);
  };

  const current = questions[currentIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-950/30 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-accent-600 dark:text-accent-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Quiz personnalisé</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Teste tes connaissances avec un quiz généré à partir de ton cours.
        </p>
      </div>

      {questions.length === 0 && !quizDone && (
        <ContentInput
          onContentReady={handleGenerate}
          loading={loading}
          placeholder="Colle le texte de ton cours pour générer un quiz..."
          buttonLabel="Générer le quiz"
        />
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl">
          {error}
        </div>
      )}

      {/* Quiz results */}
      <AnimatePresence>
        {quizDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center"
          >
            <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Quiz terminé !</h2>
            <div className="text-5xl font-bold gradient-text mb-2">{score}/{questions.length}</div>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              {score === questions.length
                ? "Parfait ! Tu maîtrises ce cours."
                : score >= questions.length / 2
                ? "Bien joué ! Continue à réviser."
                : "Continue à réviser, tu vas y arriver !"}
            </p>

            {/* Review */}
            <div className="text-left space-y-3 mb-8">
              {questions.map((q, i) => {
                const isCorrect = answers[i] === q.correctIndex;
                return (
                  <div key={i} className={`p-4 rounded-xl border ${
                    isCorrect
                      ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                  }`}>
                    <div className="flex items-start gap-2">
                      {isCorrect
                        ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        : <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      }
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">{q.question}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Bonne réponse : <span className="font-medium text-green-600 dark:text-green-400">{q.options[q.correctIndex]}</span>
                        </p>
                        {q.explanation && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">{q.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Recommencer
              </button>
              <button
                onClick={() => { setQuestions([]); setQuizDone(false); }}
                className="gradient-bg text-white px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Nouveau quiz
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active quiz */}
      <AnimatePresence>
        {questions.length > 0 && !quizDone && current && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            {/* Progress */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Question {currentIndex + 1} sur {questions.length}
              </span>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {answers.filter((a, i) => a === questions[i]?.correctIndex).length} correctes
              </div>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
              <div
                className="h-full gradient-bg rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-4">
              <p className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                {current.question}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {current.options.map((option, i) => {
                  let style = "border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30";
                  if (selectedAnswer !== null) {
                    if (i === current.correctIndex) {
                      style = "border-green-400 bg-green-50 dark:bg-green-950/30";
                    } else if (i === selectedAnswer && selectedAnswer !== current.correctIndex) {
                      style = "border-red-400 bg-red-50 dark:bg-red-950/30";
                    }
                  } else if (selectedAnswer === i) {
                    style = "border-primary-400 bg-primary-50 dark:bg-primary-950/30";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${style} disabled:cursor-default`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0 ${
                          selectedAnswer !== null && i === current.correctIndex
                            ? "border-green-500 bg-green-500 text-white"
                            : selectedAnswer === i && i !== current.correctIndex
                            ? "border-red-500 bg-red-500 text-white"
                            : "border-slate-300 dark:border-slate-600 text-slate-500"
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">{option}</span>
                        {selectedAnswer !== null && i === current.correctIndex && (
                          <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto shrink-0" />
                        )}
                        {selectedAnswer === i && i !== current.correctIndex && (
                          <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {selectedAnswer !== null && current.explanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl"
                >
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Explication : </strong>{current.explanation}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Next button */}
            {selectedAnswer !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <button
                  onClick={handleNext}
                  className="w-full gradient-bg text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary-500/25"
                >
                  {currentIndex < questions.length - 1 ? "Question suivante →" : "Voir les résultats"}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
