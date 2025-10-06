import React from "react";

interface TranslationPopupProps {
  word: string;
  translation: string;
  position: { x: number; y: number };
  onClose: () => void;
  loading?: boolean;
}

const TranslationPopup: React.FC<TranslationPopupProps> = ({
  word,
  translation,
  position,
  onClose,
  loading = false,
}) => {
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={`Translation for ${word}`}
      className="fixed z-50 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm shadow-xl shadow-slate-300/40"
      style={{
        top: position.y + 16,
        left: position.x + 16,
        maxWidth: 280,
        wordWrap: "break-word",
      }}
    >
      <div className="mb-3">
        <div className="text-xs uppercase tracking-wide text-slate-400">Word</div>
        <div className="text-lg font-semibold text-slate-900">{word}</div>
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
        {loading ? "Translating…" : translation || "No translation available."}
      </div>
      <button
        onClick={onClose}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
      >
        <span className="inline-flex h-2 w-2 items-center justify-center">
          <span className="inline-block h-2 w-2 rounded-full bg-slate-500" aria-hidden="true" />
        </span>
        Close
      </button>
    </div>
  );
};

export default TranslationPopup;
