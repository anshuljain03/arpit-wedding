import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { trackPageView } from "../services/analytics";

const GuestBookPage = () => {
  useEffect(() => {
    trackPageView("GuestBookPage");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen bg-batik-cream relative overflow-hidden"
    >
      <div className="absolute inset-0 batik-bg" />
      <div className="max-w-screen-lg mx-auto px-6 lg:px-12 py-20 text-center relative z-10">
        <h1 className="font-script text-5xl md:text-6xl text-primary-500 text-center mb-8">
          Guest Book
        </h1>
        <p className="text-center text-primary-400 font-semibold">
          Coming soon...
        </p>
      </div>
    </motion.div>
  );
};

export default GuestBookPage;
