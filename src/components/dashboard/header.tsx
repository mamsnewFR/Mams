import { createClient } from "@/lib/supabase/server";
import { Bell } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export async function DashboardHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Étudiant";
  const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-sm text-slate-500 dark:text-slate-400">Bonjour,</h1>
        <p className="font-semibold text-slate-900 dark:text-white">{name} 👋</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        <button className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
        </button>
        <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold shadow-sm">
          {initials}
        </div>
      </div>
    </header>
  );
}
