"use client";

import { useState, useRef } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";

interface ContentInputProps {
  onContentReady: (content: string) => void;
  loading?: boolean;
  placeholder?: string;
  buttonLabel?: string;
}

export function ContentInput({
  onContentReady,
  loading = false,
  placeholder = "Colle le texte de ton cours ici...",
  buttonLabel = "Générer",
}: ContentInputProps) {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [tab, setTab] = useState<"text" | "upload">("text");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.text) {
        setText(data.text);
        setTab("text");
      }
    } catch {
      console.error("Error extracting text from PDF");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSubmit = () => {
    if (text.trim()) onContentReady(text.trim());
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("text")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            tab === "text"
              ? "gradient-bg text-white shadow-lg shadow-primary-500/25"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <FileText className="w-4 h-4" />
          Texte
        </button>
        <button
          onClick={() => setTab("upload")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            tab === "upload"
              ? "gradient-bg text-white shadow-lg shadow-primary-500/25"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <Upload className="w-4 h-4" />
          PDF
        </button>
      </div>

      {tab === "text" ? (
        <div>
          {fileName && (
            <div className="flex items-center gap-2 mb-3 text-sm text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30 px-3 py-2 rounded-lg">
              <FileText className="w-4 h-4" />
              <span className="flex-1 truncate">{fileName}</span>
              <button onClick={() => { setFileName(""); setText(""); }}>
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            rows={10}
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-slate-400">{text.length} caractères</span>
            <button
              onClick={handleSubmit}
              disabled={!text.trim() || loading}
              className="gradient-bg text-white px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-primary-500/25"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {buttonLabel}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploadLoading}
            className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-12 flex flex-col items-center gap-4 hover:border-primary-400 hover:bg-primary-50/30 dark:hover:bg-primary-950/10 transition-all group"
          >
            {uploadLoading ? (
              <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
            ) : (
              <Upload className="w-12 h-12 text-slate-400 group-hover:text-primary-500 transition-colors" />
            )}
            <div className="text-center">
              <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">
                {uploadLoading ? "Extraction en cours..." : "Clique pour importer"}
              </p>
              <p className="text-sm text-slate-400">PDF, TXT, DOC, DOCX — Max 50MB</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
