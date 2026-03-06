import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { initAnalytics } from "./services/analytics";
import { applyTheme } from "./config/theme";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import DevShortcuts from "./components/common/DevShortcuts";
import ThemeEditor from "./components/editor/ThemeEditor";
import Loading from "./components/ui/Loading";

const HomePage = lazy(() => import("./pages/HomePage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const RSVPPage = lazy(() => import("./pages/RSVPPage"));
const TravelPage = lazy(() => import("./pages/TravelPage"));
const GiftRegistryPage = lazy(() => import("./pages/GiftRegistryPage"));
const GiftRegistryEditPage = lazy(() => import("./pages/GiftRegistryEditPage"));

const isInputFocused = () => {
  const tag = document.activeElement?.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
};

function App() {
  const [themeEditorOpen, setThemeEditorOpen] = useState(false);

  useEffect(() => {
    applyTheme();
    initAnalytics();
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (isInputFocused()) return;
    if (e.key.toLowerCase() === "t" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      setThemeEditorOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Router basename="/wedding">
      <div className="min-h-screen bg-batik-cream">
        <Header />

        <Suspense fallback={<Loading fullScreen message="Loading page..." />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/schedule" element={<EventsPage />} />
            <Route path="/rsvp" element={<RSVPPage />} />
            <Route path="/travel" element={<TravelPage />} />
            <Route path="/gift/edit" element={<GiftRegistryEditPage />} />
            <Route path="/gift" element={<GiftRegistryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <Footer />
        <DevShortcuts />
        {themeEditorOpen && (
          <ThemeEditor onClose={() => setThemeEditorOpen(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;
