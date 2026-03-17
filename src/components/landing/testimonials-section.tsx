"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sophie M.",
    role: "Étudiante en médecine, Paris",
    avatar: "SM",
    color: "#6172f3",
    rating: 5,
    text: "Leo AI a transformé ma façon de réviser. En 10 minutes, j'avais un résumé complet de mon cours d'anatomie. J'ai économisé des heures de travail !",
  },
  {
    name: "Théo B.",
    role: "Master en droit, Lyon",
    avatar: "TB",
    color: "#cc52ec",
    rating: 5,
    text: "Les flashcards générées automatiquement sont incroyables. Elles couvrent exactement les points clés du cours. Je comprends mieux et retiens plus longtemps.",
  },
  {
    name: "Léa C.",
    role: "BTS comptabilité, Bordeaux",
    avatar: "LC",
    color: "#3f3fce",
    rating: 5,
    text: "Le chat avec le cours est ma fonctionnalité préférée. Je pose mes questions et j'obtiens des réponses précises sur mon contenu. C'est comme avoir un prof disponible 24h/24.",
  },
  {
    name: "Antoine R.",
    role: "Licence informatique, Toulouse",
    avatar: "AR",
    color: "#9428aa",
    rating: 5,
    text: "Les quiz générés m'ont aidé à identifier mes lacunes avant l'examen. J'ai eu 16/20 alors que j'espérais à peine 10. Leo AI est un game-changer !",
  },
  {
    name: "Camille D.",
    role: "Prépa CPGE, Nantes",
    avatar: "CD",
    color: "#6172f3",
    rating: 5,
    text: "Interface super intuitive et résultats vraiment utiles. Je l'utilise pour tous mes cours maintenant. L'abonnement Pro vaut chaque centime.",
  },
  {
    name: "Hugo P.",
    role: "DUT génie civil, Strasbourg",
    avatar: "HP",
    color: "#cc52ec",
    rating: 5,
    text: "Je peux enfin uploader mes gros PDFs de TD et avoir un résumé structuré en secondes. Leo AI comprend vraiment le contenu technique.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24">
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
            Témoignages
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Ce que disent nos{" "}
            <span className="gradient-text">étudiants</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Rejoins des milliers d&apos;étudiants qui réussissent mieux grâce à Leo AI.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-hover bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: testimonial.color }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
