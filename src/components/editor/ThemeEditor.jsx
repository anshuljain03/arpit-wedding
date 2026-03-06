import React, { useState, useRef, useCallback } from "react";
import { X, RotateCcw, Save } from "lucide-react";
import {
  defaultTheme,
  getTheme,
  saveTheme,
  resetTheme,
  applyTheme,
} from "../../config/theme";

const tokenGroups = [
  {
    label: "Greens",
    tokens: [
      { key: "green", label: "Green (panels)" },
      { key: "greenLight", label: "Green Light (gradients)" },
      { key: "greenDark", label: "Green Dark (footer)" },
    ],
  },
  {
    label: "Golds",
    tokens: [
      { key: "gold", label: "Gold" },
      { key: "goldLight", label: "Gold Light" },
    ],
  },
  {
    label: "Accents",
    tokens: [
      { key: "orange", label: "Orange" },
      { key: "floralPink", label: "Pink" },
      { key: "floralBlue", label: "Blue" },
    ],
  },
  {
    label: "Backgrounds",
    tokens: [
      { key: "cream", label: "Cream" },
      { key: "creamLight", label: "Cream Light" },
      { key: "creamDark", label: "Cream Dark" },
    ],
  },
  {
    label: "Text",
    tokens: [
      { key: "textMuted", label: "Muted" },
      { key: "textDark", label: "Dark" },
    ],
  },
];

const ThemeEditor = ({ onClose }) => {
  const [theme, setTheme] = useState(getTheme);
  const [saved, setSaved] = useState(false);
  const [panelPos, setPanelPos] = useState({ x: null, y: null });
  const panelRef = useRef(null);

  const handleChange = (key, value) => {
    const updated = { ...theme, [key]: value };
    setTheme(updated);
    applyTheme(updated);
    setSaved(false);
  };

  const handleSave = () => {
    saveTheme(theme);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetTheme();
    setTheme({ ...defaultTheme });
    setSaved(false);
  };

  const handlePanelDragStart = useCallback(
    (e) => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startPanelX = panelPos.x ?? window.innerWidth - 304;
      const startPanelY = panelPos.y ?? 80;

      const handleMove = (moveEvent) => {
        setPanelPos({
          x: startPanelX + (moveEvent.clientX - startX),
          y: startPanelY + (moveEvent.clientY - startY),
        });
      };

      const handleUp = () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
      };

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
    },
    [panelPos],
  );

  return (
    <div
      ref={panelRef}
      className="fixed w-72 bg-white/95 backdrop-blur border border-gray-300 rounded-lg shadow-xl z-[300] text-xs"
      onClick={(e) => e.stopPropagation()}
      style={{
        left: panelPos.x != null ? panelPos.x : undefined,
        top: panelPos.y != null ? panelPos.y : undefined,
        right: panelPos.x == null ? 16 : undefined,
        ...(panelPos.x == null ? { top: 80 } : {}),
        maxHeight: "calc(100vh - 100px)",
      }}
    >
      {/* Drag handle */}
      <div
        className="flex items-center justify-center py-1.5 rounded-t-lg cursor-move bg-gray-200/60 hover:bg-gray-300/60 select-none"
        onMouseDown={handlePanelDragStart}
      >
        <div className="w-8 h-1 bg-gray-400 rounded-full" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1">
        <h3 className="font-bold text-sm text-gray-800">Theme Editor</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Scrollable content */}
      <div
        className="px-4 pb-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 220px)" }}
      >
        {tokenGroups.map((group) => (
          <div key={group.label} className="mt-3 first:mt-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.tokens.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border-0 p-0 shrink-0"
                  />
                  <span className="flex-1 text-gray-600 truncate">{label}</span>
                  <span className="font-mono text-gray-400 text-[10px]">
                    {theme[key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Actions */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[10px] font-semibold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <RotateCcw size={12} />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1 bg-gray-800 hover:bg-gray-900 text-white text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded transition-colors cursor-pointer"
          >
            <Save size={12} />
            {saved ? "Saved!" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeEditor;
