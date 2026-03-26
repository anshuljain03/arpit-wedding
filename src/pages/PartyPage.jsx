import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const basePath = import.meta.env.BASE_URL || "/";

const PartyPage = () => {
  const [playing, setPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(`${basePath}clap-your-hands.mp3`);
    audio.loop = true;
    audio.volume = 0.5;
    audio.currentTime = 40;
    audioRef.current = audio;

    const tryPlay = () => {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {});
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("keydown", tryPlay);
      document.removeEventListener("scroll", tryPlay);
    };

    audio.play().then(() => {
      setPlaying(true);
    }).catch(() => {
      document.addEventListener("click", tryPlay, { once: false });
      document.addEventListener("touchstart", tryPlay, { once: false });
      document.addEventListener("keydown", tryPlay, { once: false });
      document.addEventListener("scroll", tryPlay, { once: false });
    });

    return () => {
      audio.pause();
      audio.src = "";
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("keydown", tryPlay);
      document.removeEventListener("scroll", tryPlay);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black text-white text-center mb-16 md:mb-24"
          style={{ fontFamily: "'Playfair Display', serif" }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        >
          Party Itirenary
        </motion.h1>

        {/* ===== DAY 1 ===== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl font-black mb-10"
            style={{ color: "#e91e90", fontFamily: "'Playfair Display', serif", fontWeight: 900 }}
          >
            Day 1 - 23<sup>rd</sup> April
          </h2>
        </motion.div>

        {/* Mehendi & Bhaat */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3
            className="text-2xl md:text-3xl font-black uppercase tracking-wide mb-3"
            style={{ color: "#2ecc40", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Mehendi & Bhaat - 1 PM
          </h3>
          <p
            className="text-lg md:text-xl"
            style={{ color: "#2ecc40", fontFamily: "'Inter', sans-serif" }}
          >
            Get Inked, Get Fed
          </p>
        </motion.div>

        {/* Party #1 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h3
            className="text-2xl md:text-3xl font-black uppercase tracking-wide"
            style={{ color: "#e53e3e", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Party #1
          </h3>
          <p
            className="text-xl md:text-2xl font-bold"
            style={{ color: "#5b21b6", fontFamily: "'Playfair Display', serif" }}
          >
            Welcome Drinks & Drags @ Arpit's suite
          </p>
        </motion.div>

        {/* Dance Practice */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 mt-8"
        >
          <p
            className="text-xl md:text-2xl"
            style={{ color: "#5b21b6", fontFamily: "'Inter', sans-serif" }}
          >
            Dance Practice - choreographed by Iron Man
          </p>
        </motion.div>

        {/* Party #2 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <h3
            className="text-2xl md:text-3xl font-black uppercase tracking-wide"
            style={{ color: "#e53e3e", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Party #2
          </h3>
          <h4
            className="text-xl md:text-2xl font-black uppercase tracking-wide mb-3"
            style={{ color: "#e67e22", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Sangeet & DJ Night - 7 PM
          </h4>
          <p
            className="text-lg md:text-xl"
            style={{ color: "#e67e22", fontFamily: "'Inter', sans-serif" }}
          >
            Party, perform, party, perform,
          </p>
          <p
            className="text-sm md:text-base"
            style={{ color: "#e67e22", fontFamily: "'Inter', sans-serif" }}
          >
            but with Naniji around
          </p>
        </motion.div>

        {/* Party #3 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 mt-10"
        >
          <h3
            className="text-2xl md:text-3xl font-black uppercase tracking-wide"
            style={{ color: "#e53e3e", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Party #3
          </h3>
          <p
            className="text-xl md:text-2xl font-bold"
            style={{ color: "#3b3bbe", fontFamily: "'Playfair Display', serif" }}
          >
            After Party @ Arpit's suite, No Naniji here
          </p>
        </motion.div>

        {/* ===== DAY 2 ===== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl font-black mb-10"
            style={{ color: "#e91e90", fontFamily: "'Playfair Display', serif", fontWeight: 900 }}
          >
            Day 2 - 24<sup>th</sup> April
          </h2>
        </motion.div>

        {/* Haldi */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3
            className="text-2xl md:text-3xl font-black uppercase tracking-wide mb-3"
            style={{ color: "#ecc94b", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Haldi - 11 AM
          </h3>
          <p
            className="text-lg md:text-xl"
            style={{ color: "#ecc94b", fontFamily: "'Inter', sans-serif" }}
          >
            Sober up, have some lemonade, and tear Arpit's kurta
          </p>
        </motion.div>

        {/* Party #4 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <h3
            className="text-2xl md:text-3xl font-black uppercase tracking-wide"
            style={{ color: "#e53e3e", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Party #4
          </h3>
          <p
            className="text-xl md:text-2xl font-bold mb-3"
            style={{ color: "#3b82f6", fontFamily: "'Playfair Display', serif" }}
          >
            Gentleman's (& woman's) drinks @ Arpit's suite
          </p>
          <p
            className="text-lg md:text-xl"
            style={{ color: "#7dd3fc", fontFamily: "'Inter', sans-serif" }}
          >
            Get ready for Baarat
          </p>
        </motion.div>

        {/* Party #5 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 mt-10"
        >
          <h3
            className="text-2xl md:text-3xl font-black uppercase tracking-wide"
            style={{ color: "#e53e3e", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Party #5
          </h3>
          <h4
            className="text-xl md:text-2xl font-black uppercase tracking-wide mb-3"
            style={{ color: "#ef4444", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Baarat - 5 PM
          </h4>
          <p
            className="text-lg md:text-xl"
            style={{ color: "#ef4444", fontFamily: "'Inter', sans-serif" }}
          >
            Dance till your legs fall off
          </p>
        </motion.div>

        {/* Jaimala, Reception & Pheras */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 mt-10"
        >
          <h3
            className="text-xl md:text-2xl font-black uppercase tracking-wide mb-3"
            style={{ color: "#7c3aed", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Jaimala, Reception & Pheras - 8 PM Onwards
          </h3>
          <p
            className="text-lg md:text-xl"
            style={{ color: "#7c3aed", fontFamily: "'Inter', sans-serif" }}
          >
            Summon your inner Sajjan
          </p>
        </motion.div>

        {/* Party #6 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3
            className="text-2xl md:text-3xl font-black uppercase tracking-wide"
            style={{ color: "#e53e3e", fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Party #6
          </h3>
          <p
            className="text-xl md:text-2xl"
            style={{ color: "#6b7280", fontFamily: "'Inter', sans-serif" }}
          >
            5 parties were enough, no?
          </p>
        </motion.div>

      </div>

      {/* Music toggle */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        onClick={toggle}
        className="fixed bottom-6 left-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md shadow-sm border border-white/20 flex items-center justify-center cursor-pointer"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.div
              key="playing"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-[3px]"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-[3px] bg-white rounded-full"
                  animate={{ height: [4, 12, 4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.svg
              key="paused"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M8 5v14l11-7z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default PartyPage;
