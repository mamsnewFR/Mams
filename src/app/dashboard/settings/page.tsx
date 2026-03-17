"use client";

import { useState } from "react";
import { CreditCard, User, Bell, Zap, Check, Loader2 } from "lucide-react";
import { PLANS } from "@/lib/stripe";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      console.error("Error creating checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Paramètres</h1>

      {/* Profile */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-slate-900 dark:text-white">Profil</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Nom complet
            </label>
            <input
              type="text"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              placeholder="Jean Dupont"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Email
            </label>
            <input
              type="email"
              disabled
              className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-500 dark:text-slate-400 cursor-not-allowed transition-all"
              placeholder="jean@example.com"
            />
          </div>
          <button className="gradient-bg text-white px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm">
            Enregistrer les modifications
          </button>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-slate-900 dark:text-white">Abonnement</h2>
        </div>

        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl mb-4">
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Plan Gratuit</p>
            <p className="text-sm text-slate-500">5 résumés • 20 flashcards • 3 quiz par mois</p>
          </div>
        </div>

        <div className="border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950/30 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-semibold text-primary-700 dark:text-primary-300">Passer au Pro</p>
              <p className="text-sm text-primary-600 dark:text-primary-400">9,99€/mois • Annulation possible</p>
            </div>
            <span className="gradient-bg text-white text-xs px-2.5 py-1 rounded-full font-medium">Recommandé</span>
          </div>
          <ul className="space-y-1.5 mb-4">
            {PLANS.pro.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-primary-700 dark:text-primary-300">
                <Check className="w-3.5 h-3.5 text-primary-500" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full gradient-bg text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Passer au Pro
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-primary-500" />
          <h2 className="font-semibold text-slate-900 dark:text-white">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { label: "Nouveautés et mises à jour", sublabel: "Sois informé des nouvelles fonctionnalités" },
            { label: "Conseils d'utilisation", sublabel: "Reçois des astuces pour mieux utiliser Leo AI" },
          ].map((notif) => (
            <div key={notif.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{notif.label}</p>
                <p className="text-xs text-slate-400">{notif.sublabel}</p>
              </div>
              <button className="w-10 h-6 bg-primary-500 rounded-full relative transition-colors">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
