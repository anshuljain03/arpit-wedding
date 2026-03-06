import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const shortcuts = [
  { key: "1", label: "Home", path: "/" },
  { key: "2", label: "Schedule", path: "/schedule" },
  { key: "3", label: "RSVP", path: "/rsvp" },
  { key: "4", label: "Travel", path: "/travel" },
  { key: "5", label: "Gift", path: "/gift" },
  { key: "E", label: "Gift Editor", path: "/gift/edit" },
];

const isInputFocused = () => {
  const tag = document.activeElement?.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
};

const DevShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = useCallback(
    (e) => {
      if (isInputFocused()) return;

      if (e.key === "?") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        return;
      }

      // Skip shortcut matching when modifier keys are held (e.g. Ctrl+Shift+E)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const shortcut = shortcuts.find(
        (s) => s.key.toLowerCase() === e.key.toLowerCase(),
      );
      if (shortcut) {
        setIsOpen(false);
        navigate(shortcut.path);
      }
    },
    [isOpen, navigate],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] bg-white/95 backdrop-blur-md border border-[var(--theme-gold)]/20 shadow-lg p-8 w-80"
          >
            <h2
              className="text-2xl text-[var(--theme-gold)] mb-6 text-center"
              style={{
                fontFamily: "'Cormorant SC', serif",
                fontWeight: 600,
              }}
            >
              Keyboard Shortcuts
            </h2>

            <div className="space-y-3">
              {shortcuts.map((s) => (
                <div key={s.key} className="flex items-center justify-between">
                  <span className="text-sm text-primary-500">{s.label}</span>
                  <kbd className="inline-block min-w-[28px] text-center px-2 py-0.5 text-xs font-mono font-bold bg-primary-50 border border-primary-200 text-primary-600 rounded">
                    {s.key}
                  </kbd>
                </div>
              ))}
              <div className="border-t border-primary-100 pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-500">Theme Editor</span>
                  <kbd className="inline-block min-w-[28px] text-center px-2 py-0.5 text-xs font-mono font-bold bg-primary-50 border border-primary-200 text-primary-600 rounded">
                    T
                  </kbd>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-primary-500">
                    Flower Editor (Home)
                  </span>
                  <kbd className="inline-block text-center px-2 py-0.5 text-xs font-mono font-bold bg-primary-50 border border-primary-200 text-primary-600 rounded">
                    Ctrl+Shift+E
                  </kbd>
                </div>
              </div>
              <div className="border-t border-primary-100 pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-400">
                    Toggle this menu
                  </span>
                  <kbd className="inline-block min-w-[28px] text-center px-2 py-0.5 text-xs font-mono font-bold bg-primary-50 border border-primary-200 text-primary-600 rounded">
                    ?
                  </kbd>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-primary-400">Close</span>
                  <kbd className="inline-block min-w-[28px] text-center px-2 py-0.5 text-xs font-mono font-bold bg-primary-50 border border-primary-200 text-primary-600 rounded">
                    Esc
                  </kbd>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DevShortcuts;
