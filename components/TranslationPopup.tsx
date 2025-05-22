import React from "react";

interface TranslationPopupProps {
  word: string;
  translation: string;
  position: { x: number; y: number };
  onClose: () => void;
}

const TranslationPopup: React.FC<TranslationPopupProps> = ({
  word,
  translation,
  position,
  onClose,
}) => {
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={`Translation for ${word}`}
      className="fixed z-50 bg-white border border-blue-500 shadow-xl rounded-lg p-3 text-sm"
      style={{
        top: position.y + 10,
        left: position.x + 10,
        maxWidth: 220,
        wordWrap: "break-word",
      }}
    >
      <div className="font-semibold mb-1 text-gray-800">{word}</div>
      <div className="text-gray-700">{translation || "Translating..."}</div>
      <button
        onClick={onClose}
        className="mt-2 text-xs text-blue-600 hover:underline focus:outline-none"
      >
        Close
      </button>
    </div>
  );
};

export default TranslationPopup;