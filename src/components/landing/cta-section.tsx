"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative gradient-bg rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Rejoins 2000+ étudiants
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Prêt à transformer
              <br />
              tes études ?
            </h2>

            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Inscris-toi gratuitement aujourd&apos;hui et commence à étudier plus intelligemment dès ce soir.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="group bg-white text-primary-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/90 transition-colors shadow-xl flex items-center gap-2"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/auth/login"
                className="text-white/90 hover:text-white font-semibold px-8 py-4 transition-colors"
              >
                J&apos;ai déjà un compte
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
