"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2">
      <div className="rounded-lg border border-[#2b2118] bg-[#f7f6f3] px-4 py-3 shadow-lg">
        <p className="text-sm font-medium text-[#2b2118]">{message}</p>
      </div>
    </div>
  );
}
