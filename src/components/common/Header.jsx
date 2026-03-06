import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { trackClick } from "../../services/analytics";

const navItems = [
  { id: "home", label: "Home", path: "/" },
  { id: "schedule", label: "Schedule", path: "/schedule" },
  { id: "rsvp", label: "RSVP", path: "/rsvp" },
  { id: "travel", label: "Travel", path: "/travel" },
  { id: "gift", label: "Gift", path: "/gift" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "";

  useEffect(() => {
    if (!isHome) {
      setShowNav(true);
      return;
    }

    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight * 0.8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Desktop floating pill */}
      <motion.nav
        initial={{ x: "-50%", y: 60, opacity: 0 }}
        animate={{ x: "-50%", y: showNav ? 0 : 60, opacity: showNav ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="fixed bottom-6 left-1/2 z-50 hidden md:flex items-center gap-8 bg-white/80 backdrop-blur-md rounded-full px-8 py-2.5 shadow-sm border border-[var(--theme-gold)]/20"
      >
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => trackClick("Navigation", { section: item.id })}
            className="relative"
          >
            <span
              className={`
                text-[11px] font-sans font-semibold uppercase tracking-[0.2em] transition-colors duration-300
                ${location.pathname === item.path ? "text-[var(--theme-gold)]" : "text-primary-600 hover:text-[var(--theme-gold)]"}
              `}
            >
              {item.label}
            </span>
            {location.pathname === item.path && (
              <motion.div
                layoutId="activePill"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--theme-gold)] rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </motion.nav>

      {/* Mobile floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: showNav ? 1 : 0,
          opacity: showNav ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="fixed bottom-6 right-4 z-50 md:hidden w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-[var(--theme-gold)]/20 flex items-center justify-center cursor-pointer"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMobileMenuOpen ? (
            <X size={18} strokeWidth={2} className="text-primary-600" />
          ) : (
            <Menu size={18} strokeWidth={2} className="text-primary-600" />
          )}
        </motion.div>
      </motion.button>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-64 bg-white/95 backdrop-blur-md shadow-lg z-40 md:hidden"
            >
              <div className="pt-20 px-8">
                <div className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() =>
                          trackClick("Navigation", { section: item.id })
                        }
                        className={`
                          block text-base font-sans font-semibold tracking-wide
                          ${location.pathname === item.path ? "text-[var(--theme-gold)]" : "text-primary-600"}
                          transition-all duration-300 hover:translate-x-1 hover:text-[var(--theme-gold)]
                        `}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
