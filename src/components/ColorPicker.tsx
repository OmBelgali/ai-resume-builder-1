"use client";

import { useColorTheme, colorThemes, type ColorTheme } from "@/context/ColorThemeContext";

const colorOptions: { id: ColorTheme; label: string }[] = [
  { id: "teal", label: "Teal" },
  { id: "navy", label: "Navy" },
  { id: "burgundy", label: "Burgundy" },
  { id: "forest", label: "Forest" },
  { id: "charcoal", label: "Charcoal" },
];

export function ColorPicker() {
  const { color, setColor } = useColorTheme();

  return (
    <div className="mb-4">
      <p className="text-xs font-medium text-[#2b2118] mb-2">Color Theme</p>
      <div className="flex gap-2">
        {colorOptions.map((option) => {
          const isActive = color === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setColor(option.id)}
              className={`relative w-10 h-10 rounded-full border-2 transition ${
                isActive ? "border-blue-500 scale-110" : "border-[#2b2118]/30 hover:border-[#2b2118]/60"
              }`}
              style={{ backgroundColor: colorThemes[option.id] }}
              aria-label={option.label}
              title={option.label}
            >
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
