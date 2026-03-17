"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Brain, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary-400/10 rounded-full blur-2xl animate-float" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          Propulsé par Claude Sonnet
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
        >
          Étudie plus{" "}
          <span className="gradient-text">intelligemment</span>
          {" "}avec l&apos;IA
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Leo AI transforme tes cours en résumés, flashcards et quiz en quelques secondes.
          Apprends plus vite, retiens plus longtemps, réussis tes examens.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/auth/signup"
            className="group gradient-bg text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition-all duration-200 shadow-xl shadow-primary-500/30 flex items-center gap-2"
          >
            Commencer gratuitement
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
          >
            Voir comment ça marche
          </a>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {[
            { icon: BookOpen, text: "Résumés automatiques" },
            { icon: Brain, text: "Flashcards intelligentes" },
            { icon: Zap, text: "Quiz personnalisés" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-full text-sm text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <item.icon className="w-4 h-4 text-primary-500" />
              {item.text}
            </div>
          ))}
        </motion.div>

        {/* App preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="glass rounded-3xl p-1 shadow-2xl shadow-primary-500/10">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-lg py-1 px-3 text-sm text-slate-500 dark:text-slate-400 text-center">
                  app.leoai.fr/dashboard
                </div>
              </div>
              {/* Dashboard preview */}
              <div className="p-6 grid grid-cols-3 gap-4 min-h-64">
                <div className="col-span-2 space-y-3">
                  <div className="h-4 bg-gradient-to-r from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded-full w-3/4" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-5/6" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-4/5" />
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                        <div className="h-2 bg-primary-200 dark:bg-primary-800 rounded mb-2 w-1/2" />
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                    <div className="h-2 bg-accent-200 dark:bg-accent-800 rounded mb-2" />
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                  </div>
                  <div className="bg-primary-500 rounded-xl p-3 text-white">
                    <div className="h-2 bg-white/40 rounded mb-2" />
                    <div className="h-2 bg-white/30 rounded w-3/4" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-2xl -z-10" />
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400"
        >
          <div className="flex -space-x-2">
            {["#6172f3", "#cc52ec", "#3f3fce", "#9428aa"].map((color, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: color }}
              >
                {["A", "B", "C", "D"][i]}
              </div>
            ))}
          </div>
          <span>+2 000 étudiants déjà inscrits</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
          </div>
          <span>4.9/5</span>
        </motion.div>
      </div>
    </section>
  );
}
