import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Hero from "../components/sections/Hero";
import Divider from "../components/ui/Divider";
import { trackPageView } from "../services/analytics";

const HomePage = () => {
  const [riddleAnswer, setRiddleAnswer] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView("Home");
  }, []);

  return (
    <>
      <Hero />

      {/* Riddle Section */}
      <section className="hero-panel py-32 relative overflow-hidden">
        <div className="absolute inset-0 batik-bg opacity-20" />
        <div className="max-w-screen-md mx-auto px-6 lg:px-12 text-center relative z-10">
          <Divider motif="floral" className="mb-12" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-script text-4xl text-[var(--theme-gold-light)] mb-6">
              A Little Riddle
            </p>
            <p className="text-xl lg:text-2xl font-display font-semibold leading-relaxed text-white/80 mb-10 italic">
              This is the answer to the Universe,
              <br />
              add a 0 and it becomes nice
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (riddleAnswer.trim() === "420") {
                  navigate("/party");
                } else {
                  setShake(true);
                  setTimeout(() => setShake(false), 500);
                }
              }}
              className="flex flex-col items-center gap-4"
            >
              <motion.input
                type="text"
                value={riddleAnswer}
                onChange={(e) => setRiddleAnswer(e.target.value)}
                placeholder="Answer here"
                className="w-48 text-center px-4 py-3 bg-transparent border-b-2 border-[var(--theme-gold)] text-white font-display text-2xl font-semibold focus:outline-none focus:border-[var(--theme-gold-light)] transition-colors placeholder-white/40"
                animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
              />
              <button
                type="submit"
                className="mt-2 bg-[var(--theme-gold)] text-white font-sans text-xs font-bold tracking-[0.2em] uppercase px-8 py-3 border-2 border-[var(--theme-gold-light)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--theme-gold)]/40 cursor-pointer"
              >
                Enter
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
