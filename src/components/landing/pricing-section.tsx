"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Gratuit",
    price: 0,
    period: "",
    description: "Pour commencer et découvrir Leo AI",
    badge: null,
    features: [
      "5 résumés par mois",
      "20 flashcards par mois",
      "3 quiz par mois",
      "10 messages de chat par jour",
      "Fichiers jusqu'à 5MB",
    ],
    cta: "Commencer gratuitement",
    href: "/auth/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 9.99,
    period: "/mois",
    description: "Pour les étudiants sérieux",
    badge: "Le plus populaire",
    features: [
      "Résumés illimités",
      "Flashcards illimitées",
      "Quiz illimités",
      "Chat illimité",
      "Fichiers jusqu'à 50MB",
      "Export PDF des résumés",
      "Support prioritaire",
    ],
    cta: "Commencer avec Pro",
    href: "/auth/signup?plan=pro",
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/50">
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
            Tarifs
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Simple et{" "}
            <span className="gradient-text">transparent</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Commence gratuitement, passe au Pro quand tu es prêt. Annule à tout moment.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative rounded-3xl p-8 ${
                plan.highlighted
                  ? "gradient-bg text-white shadow-2xl shadow-primary-500/30 scale-105"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-primary-600 text-sm font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-slate-900 dark:text-white"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-8">
                <span className={`text-5xl font-bold ${plan.highlighted ? "text-white" : "text-slate-900 dark:text-white"}`}>
                  {plan.price === 0 ? "Gratuit" : `${plan.price}€`}
                </span>
                {plan.period && (
                  <span className={`text-lg mb-2 ${plan.highlighted ? "text-white/70" : "text-slate-500"}`}>
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      plan.highlighted ? "bg-white/20" : "bg-primary-100 dark:bg-primary-900/30"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.highlighted ? "text-white" : "text-primary-600 dark:text-primary-400"}`} />
                    </div>
                    <span className={`text-sm ${plan.highlighted ? "text-white/90" : "text-slate-700 dark:text-slate-300"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.href}
                className={`block text-center py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-white text-primary-600 hover:bg-white/90 shadow-lg"
                    : "gradient-bg text-white hover:opacity-90 shadow-lg shadow-primary-500/25"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 dark:text-slate-400 mt-10 text-sm"
        >
          Aucune carte de crédit requise pour le plan gratuit. Annulation possible à tout moment.
        </motion.p>
      </div>
    </section>
  );
}
