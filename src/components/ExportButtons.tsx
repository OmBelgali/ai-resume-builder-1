"use client";

import { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { generatePlainText, validateResume } from "@/lib/export-utils";
import { Toast } from "@/components/Toast";

export function ExportButtons() {
  const { data } = useResume();
  const [copied, setCopied] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handlePrint = () => {
    const validation = validateResume(data);
    if (!validation.isValid) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    }

    // Show toast notification
    setShowToast(true);

    // Trigger browser print dialog
    window.print();
  };

  const handleCopyText = async () => {
    const validation = validateResume(data);
    if (!validation.isValid) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    }

    const plainText = generatePlainText(data);
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = plainText;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Ignore
      }
      document.body.removeChild(textArea);
    }
  };

  const validation = validateResume(data);

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handlePrint}
          className="flex-1 rounded-lg border border-[#2b2118] bg-[#f7f6f3] px-4 py-2.5 text-sm font-medium text-[#2b2118] hover:bg-[#8b0000]/5 transition print:hidden"
        >
          Print / Save as PDF
        </button>
        <button
          type="button"
          onClick={handleCopyText}
          className="flex-1 rounded-lg border border-[#2b2118] bg-[#f7f6f3] px-4 py-2.5 text-sm font-medium text-[#2b2118] hover:bg-[#8b0000]/5 transition print:hidden"
        >
          {copied ? "Copied!" : "Copy Resume as Text"}
        </button>
      </div>

      {showWarning && !validation.isValid && (
        <div className="rounded-lg border border-[#8b0000]/30 bg-[#8b0000]/5 px-3 py-2 text-xs text-[#8b0000] print:hidden">
          <p className="font-medium mb-1">Your resume may look incomplete.</p>
          <ul className="list-disc list-inside space-y-0.5 text-[#8b0000]/80">
            {validation.warnings.map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {showToast && (
        <Toast
          message="PDF export ready! Check your downloads."
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
