import Link from "next/link";
import { FileText, Brain, HelpCircle, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

const tools = [
  {
    href: "/dashboard/summary",
    icon: FileText,
    label: "Résumé",
    description: "Génère un résumé structuré de ton cours",
    color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    href: "/dashboard/flashcards",
    icon: Brain,
    label: "Flashcards",
    description: "Crée des cartes mémoire pour mémoriser",
    color: "bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400",
    border: "border-primary-200 dark:border-primary-800",
    gradient: "from-primary-500 to-primary-600",
  },
  {
    href: "/dashboard/quiz",
    icon: HelpCircle,
    label: "Quiz",
    description: "Teste tes connaissances avec un quiz",
    color: "bg-accent-50 dark:bg-accent-950/30 text-accent-600 dark:text-accent-400",
    border: "border-accent-200 dark:border-accent-800",
    gradient: "from-accent-500 to-accent-600",
  },
  {
    href: "/dashboard/chat",
    icon: MessageSquare,
    label: "Chat",
    description: "Pose des questions sur ton cours",
    color: "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
    gradient: "from-green-500 to-green-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome banner */}
      <div className="gradient-bg rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-white/80 text-sm font-medium">Prêt à apprendre ?</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Que veux-tu faire aujourd&apos;hui ?
          </h2>
          <p className="text-white/80 max-w-xl">
            Importe un PDF ou colle du texte, et Leo AI génère tes outils d&apos;étude en quelques secondes.
          </p>
        </div>
      </div>

      {/* Tools grid */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Outils disponibles
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group card-hover bg-white dark:bg-slate-900 border ${tool.border} rounded-2xl p-6 flex items-start gap-4`}
          >
            <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center shrink-0`}>
              <tool.icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{tool.label}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">{tool.description}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>

      {/* Quick stats */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Utilisation ce mois-ci
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Résumés", value: "0", max: "5", color: "bg-blue-500" },
          { label: "Flashcards", value: "0", max: "20", color: "bg-primary-500" },
          { label: "Quiz", value: "0", max: "3", color: "bg-accent-500" },
          { label: "Messages chat", value: "0", max: "10/j", color: "bg-green-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</span>
              <span className="text-sm text-slate-400 mb-0.5">/ {stat.max}</span>
            </div>
            <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
              <div className={`h-full ${stat.color} rounded-full`} style={{ width: "0%" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
