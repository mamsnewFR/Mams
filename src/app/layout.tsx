import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Leo AI - Assistant d'étude intelligent",
  description: "Leo AI est votre assistant d'étude alimenté par l'IA. Générez des résumés, des flashcards, des quiz et chattez avec votre contenu de cours.",
  keywords: "étude, IA, résumé, flashcards, quiz, étudiants, assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
