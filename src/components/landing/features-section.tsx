"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, HelpCircle, MessageSquare, Upload, Zap } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Import facile",
    description: "Importe ton PDF ou colle du texte directement. Leo AI s&apos;occupe du reste en quelques secondes.",
    color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    icon: BookOpen,
    title: "Résumés automatiques",
    description: "Obtiens des résumés clairs et structurés de tes cours. Garde l&apos;essentiel, gagne du temps.",
    color: "bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400",
    border: "border-primary-200 dark:border-primary-800",
  },
  {
    icon: Brain,
    title: "Flashcards intelligentes",
    description: "Des cartes mémoire générées automatiquement basées sur les concepts clés de ton cours.",
    color: "bg-accent-50 dark:bg-accent-950/30 text-accent-600 dark:text-accent-400",
    border: "border-accent-200 dark:border-accent-800",
  },
  {
    icon: HelpCircle,
    title: "Quiz personnalisés",
    description: "Teste tes connaissances avec des quiz générés à partir de ton contenu de cours.",
    color: "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
  },
  {
    icon: MessageSquare,
    title: "Chat avec ton cours",
    description: "Pose des questions sur ton cours et obtiens des réponses précises instantanément.",
    color: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-800",
  },
  {
    icon: Zap,
    title: "Ultra rapide",
    description: "Propulsé par Claude Sonnet, le modèle le plus avancé d&apos;Anthropic. Résultats en quelques secondes.",
    color: "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-200 dark:border-yellow-800",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3 uppercase tracking-wide text-sm">
            Fonctionnalités
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Tout ce dont tu as besoin
            <br />
            <span className="gradient-text">pour réussir</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Leo AI combine les dernières avancées en intelligence artificielle pour révolutionner ta façon d&apos;étudier.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card-hover bg-white dark:bg-slate-900 border ${feature.border} rounded-2xl p-6`}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p
                className="text-slate-600 dark:text-slate-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: feature.description }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
