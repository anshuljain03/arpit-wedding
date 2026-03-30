import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const basePath = import.meta.env.BASE_URL || "/";

const EASE = [0.23, 1, 0.32, 1];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, ease: EASE } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const NEON_COLORS = ["#ff71ce", "#ff4466", "#fffb96", "#05ffa1", "#b967ff", "#01cdfe", "#ffb86c", "#818cf8"];

// Vaporwave palette — shifted for max vibrancy on dark purple
const V = {
  pink: "#ff71ce",
  green: "#05ffa1",
  red: "#ff4466",
  cyan: "#01cdfe",
  orange: "#ffb86c",   // sunset peach — matches vapor-sun gradient
  purple: "#b967ff",
  yellow: "#fffb96",
  blue: "#818cf8",     // electric indigo — vaporwave, not corporate
  muted: "#7a7a9e",    // lavender-tinted gray
  // Secondary text — lavender-tinted whites, never pure white
  textSoft: "rgba(200,180,255,0.4)",
  textBody: "rgba(220,210,255,0.75)",
};

const softGlowMap = {
  pink: "neon-soft-pink", green: "neon-soft-green", red: "neon-soft-red",
  cyan: "neon-soft-cyan", orange: "neon-soft-orange", purple: "neon-soft-purple",
  yellow: "neon-soft-yellow", blue: "neon-soft-blue", muted: "",
};

// Beat sync (~128 BPM)
const BEAT_MS = 60000 / 128;
const useBeat = (playing) => {
  const [beat, setBeat] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setBeat(true);
      setTimeout(() => setBeat(false), 100);
    }, BEAT_MS);
    return () => clearInterval(interval);
  }, [playing]);
  return beat;
};

// --- Event data ---
const DAYS = [
  {
    label: "Day 1",
    date: <>23<sup style={{ fontSize: "0.5em", verticalAlign: "super" }}>rd</sup> April</>,
    events: [
      { type: "event", name: "Mehendi & Bhaat", time: "1 PM", tagline: "Get Inked, Get Fed", color: "green" },
      { type: "party", number: 1, subtitle: "Welcome Drinks & Drags @ Arpit's suite", color: "cyan" },
      { type: "note", tagline: "Dance Practice — choreographed by Iron Man", color: "cyan" },
      { type: "party", number: 2, name: "Sangeet & DJ Night", time: "7 PM", tagline: "Party, perform, party, perform,", aside: "but with Naniji around", color: "orange" },
      { type: "party", number: 3, subtitle: "After Party @ Arpit's suite, No Naniji here", color: "purple" },
    ],
  },
  {
    label: "Day 2",
    date: <>24<sup style={{ fontSize: "0.5em", verticalAlign: "super" }}>th</sup> April</>,
    events: [
      { type: "event", name: "Haldi", time: "11 AM", tagline: "Sober up, have some lemonade, and tear Arpit's kurta", color: "yellow" },
      { type: "party", number: 4, subtitle: "Gentleman's (& woman's) drinks @ Arpit's suite", tagline: "Get ready for Baarat", color: "cyan" },
      { type: "party", number: 5, name: "Baarat", time: "5 PM", tagline: "Dance till your legs fall off", color: "red" },
      { type: "event", name: "Jaimala, Reception & Pheras", time: "8 PM Onwards", tagline: "Summon your inner Sajjan", color: "purple" },
      { type: "party", number: 6, tagline: "5 parties were enough, no?", color: "muted", joke: true },
    ],
  },
];

// --- Neon ruled line between events ---
const NeonRule = () => <div className="neon-rule my-5" />;

// --- Event block ---
const EventBlock = ({ type, number, name, subtitle, tagline, aside, time, color, joke, isFirst }) => {
  const c = V[color] || "#fff";
  const softGlow = softGlowMap[color] || "";

  if (type === "note") {
    return (
      <motion.div variants={itemVariants}>
        {!isFirst && <NeonRule />}
        <div className="py-3">
          <p className={`font-sans ${softGlow}`}
             style={{ color: c, fontSize: "var(--party-type-sub)", marginBottom: 0 }}>
            {tagline}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants}>
      {!isFirst && <NeonRule />}
      <div className={`py-5 ${joke ? "opacity-35" : ""}`}>
        {/* Time */}
        {time && (
          <p className="font-techno tracking-[0.3em] uppercase"
             style={{ color: V.textSoft, fontSize: "0.6875rem", marginBottom: "0.5rem" }}>
            {time}
          </p>
        )}

        {/* PARTY # */}
        {type === "party" && (
          <p className="font-techno tracking-[0.35em] uppercase neon-soft-red"
             style={{ color: V.red, fontSize: "var(--party-type-body)", marginBottom: "0.25rem" }}>
            {joke ? <span className="line-through">Party #{number}</span> : `Party #${number}`}
          </p>
        )}

        {/* Event name — techno font for parties, serif for ceremony */}
        {name && (
          <h3 className={`font-bold ${softGlow}`}
              style={{
                color: c,
                fontSize: "var(--party-type-xl)",
                lineHeight: 1.15,
                marginBottom: "0.375rem",
                fontFamily: type === "party" ? "'Bebas Neue', Impact, sans-serif" : "'Playfair Display', serif",
                letterSpacing: type === "party" ? "0.05em" : "normal",
              }}>
            {name}
          </h3>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className={`font-serif italic ${softGlow}`}
             style={{ color: c, fontSize: "var(--party-type-lg)", lineHeight: 1.35, marginBottom: 0 }}>
            {subtitle}
          </p>
        )}

        {/* Tagline */}
        {tagline && (
          <p className="font-sans"
             style={{
               color: joke ? V.muted : V.textBody,
               fontSize: "var(--party-type-body)",
               fontStyle: joke ? "italic" : "normal",
               marginTop: "0.25rem",
               marginBottom: 0,
             }}>
            {tagline}
          </p>
        )}

        {/* Aside */}
        {aside && (
          <p className="font-sans italic"
             style={{ color: V.textSoft, fontSize: "var(--party-type-body)", marginTop: "0.125rem", marginBottom: 0 }}>
            {aside}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// --- Main ---
const PartyPage = () => {
  const [playing, setPlaying] = useState(true);
  const [beatDrop, setBeatDrop] = useState(false);
  const audioRef = useRef(null);
  const beatTimerRef = useRef(null);
  const beat = useBeat(playing);

  // Audio setup
  useEffect(() => {
    const audio = new Audio(`${basePath}clap-your-hands.mp3`);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const START_TIME = 55;
    const BEAT_DROP_TIME = 75; // 1:15 in the song

    const startPlayback = () => {
      return audio.play().then(() => {
        // Set currentTime AFTER play resolves — mobile browsers ignore it before
        audio.currentTime = START_TIME;
        setPlaying(true);
        // Beat drop timer: time from our start position to the beat drop
        const delay = (BEAT_DROP_TIME - START_TIME) * 1000;
        beatTimerRef.current = setTimeout(() => {
          setBeatDrop(true);
        }, delay);
      });
    };

    // When song loops, reset to START_TIME and restart beat timer
    const handleTimeUpdate = () => {
      // Song looped back to beginning — jump to our start point
      if (audio.currentTime < START_TIME - 1 && !audio.paused) {
        audio.currentTime = START_TIME;
        // Reset beat drop for next cycle
        setBeatDrop(false);
        if (beatTimerRef.current) clearTimeout(beatTimerRef.current);
        beatTimerRef.current = setTimeout(() => {
          setBeatDrop(true);
        }, (BEAT_DROP_TIME - START_TIME) * 1000);
      }
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);

    const tryPlay = () => {
      startPlayback().catch(() => {});
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("keydown", tryPlay);
      document.removeEventListener("scroll", tryPlay);
    };

    startPlayback().catch(() => {
      document.addEventListener("click", tryPlay, { once: false });
      document.addEventListener("touchstart", tryPlay, { once: false });
      document.addEventListener("keydown", tryPlay, { once: false });
      document.addEventListener("scroll", tryPlay, { once: false });
    });

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.src = "";
      if (beatTimerRef.current) clearTimeout(beatTimerRef.current);
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("keydown", tryPlay);
      document.removeEventListener("scroll", tryPlay);
    };
  }, []);

  // Fireworks on beat drop
  useEffect(() => {
    if (!beatDrop) return;

    const isMobile = window.innerWidth < 768;
    let rafId;
    let intervalId;
    let stopped = false;

    const frame = () => {
      if (stopped) return;
      confetti({ particleCount: isMobile ? 2 : 3, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: NEON_COLORS, zIndex: 9999 });
      confetti({ particleCount: isMobile ? 2 : 3, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: NEON_COLORS, zIndex: 9999 });
      if (!isMobile) {
        rafId = requestAnimationFrame(frame);
      }
    };

    // Big burst first
    confetti({ particleCount: isMobile ? 80 : 150, spread: 100, origin: { y: 0.5 }, colors: NEON_COLORS, zIndex: 9999 });

    if (isMobile) {
      intervalId = setInterval(frame, 200);
    } else {
      frame();
    }

    const fireworkDuration = 161000;
    const beatDropOffset = 35000;
    const stopAndLoop = () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);

      setTimeout(() => {
        stopped = false;
        confetti({ particleCount: isMobile ? 80 : 150, spread: 100, origin: { y: 0.5 }, colors: NEON_COLORS, zIndex: 9999 });
        if (isMobile) {
          intervalId = setInterval(frame, 200);
        } else {
          frame();
        }
        setTimeout(stopAndLoop, fireworkDuration);
      }, beatDropOffset);
    };
    const loopTimeout = setTimeout(stopAndLoop, fireworkDuration);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
      clearTimeout(loopTimeout);
    };
  }, [beatDrop]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  // 4-level beat-reactive title glow
  const titleShadow = beat
    ? beatDrop
      ? "0 0 10px #fff, 0 0 20px #fff, 0 0 40px #ff71ce, 0 0 80px #ff71ce, 0 0 120px #b967ff, 0 0 200px #b967ff"
      : "0 0 7px #fff, 0 0 15px #fff, 0 0 30px #ff71ce, 0 0 60px #ff71ce, 0 0 100px #b967ff"
    : beatDrop
      ? "0 0 4px #fff, 0 0 11px #fff, 0 0 22px #ff71ce, 0 0 50px #ff71ce, 0 0 80px #b967ff"
      : "0 0 4px #fff, 0 0 10px #fff, 0 0 20px #ff71ce, 0 0 40px #b967ff";

  // Beat-reactive background pulse
  const bgPulse = beat && beatDrop
    ? { boxShadow: "inset 0 0 200px 40px rgba(255,113,206,0.04)" }
    : {};

  return (
    <div className="min-h-screen party-bg" style={{ ...bgPulse, transition: "box-shadow 0.1s ease-out" }}>
      {/* Retro grid floor */}
      <div className="retro-grid" />

      {/* CRT scanline overlay */}
      <div className="scanlines" />

      <div className="max-w-lg mx-auto px-6 md:px-10 relative z-10">

        {/* ====== HERO ====== */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center pt-24 md:pt-36 pb-16 md:pb-24"
        >
          <motion.p
            variants={itemVariants}
            className="font-techno tracking-[0.5em] uppercase"
            style={{ color: V.cyan, fontSize: "0.625rem", marginBottom: "2rem", opacity: 0.8 }}
          >
            // The Schedule
          </motion.p>

          {/* Vaporwave sun */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <div className="vapor-sun" />
          </motion.div>

          {/* Title with glow layer */}
          <motion.div variants={itemVariants} style={{ position: "relative" }}>
            <h1
              className="font-serif font-black"
              style={{
                fontSize: "var(--party-type-hero)",
                lineHeight: 1.05,
                marginBottom: 0,
                background: `linear-gradient(135deg, ${V.pink} 0%, #fff 50%, ${V.cyan} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: beat ? "brightness(1.3)" : "brightness(1)",
                transition: "filter 0.1s ease-out",
              }}
            >
              Party Itinerary
            </h1>

            {/* Glow layer — perfectly overlaps the h1 */}
            <div
              aria-hidden="true"
              className="font-serif font-black pointer-events-none select-none"
              style={{
                fontSize: "var(--party-type-hero)",
                lineHeight: 1.05,
                color: "transparent",
                textShadow: titleShadow,
                transition: "text-shadow 0.1s ease-out",
                position: "absolute",
                inset: 0,
                zIndex: -1,
              }}
            >
              Party Itinerary
            </div>
          </motion.div>

          {/* Ruled line under title */}
          <motion.div variants={itemVariants} className="mt-8">
            <div className="neon-rule mx-auto" style={{ maxWidth: "10rem" }} />
          </motion.div>
        </motion.header>

        {/* ====== DAYS ====== */}
        {DAYS.map((day, dayIdx) => (
          <React.Fragment key={dayIdx}>
            {/* Day divider */}
            {dayIdx > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="my-14 md:my-20"
              >
                <div className="neon-rule" />
                <p className="font-techno tracking-[0.5em] uppercase text-center mt-2"
                   style={{ color: V.cyan, fontSize: "0.5rem", opacity: 0.5, marginBottom: 0 }}>
                  ▼
                </p>
              </motion.div>
            )}

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={sectionVariants}
              className="mb-10 md:mb-14"
            >
              {/* Day heading */}
              <motion.div variants={itemVariants} className="text-center mb-10 md:mb-12">
                <p className="font-techno tracking-[0.4em] uppercase"
                   style={{ color: V.pink, fontSize: "0.625rem", marginBottom: "0.375rem", opacity: 0.6 }}>
                  {day.label}
                </p>
                <h2 className="font-serif font-bold"
                    style={{
                      color: V.pink,
                      fontSize: "var(--party-type-2xl)",
                      lineHeight: 1.1,
                      marginBottom: 0,
                      textShadow: `0 0 20px rgba(255,113,206,0.4), 0 0 40px rgba(185,103,255,0.2)`,
                    }}>
                  {day.date}
                </h2>
              </motion.div>

              {/* Events */}
              <div className="text-center">
                {day.events.map((event, idx) => (
                  <EventBlock key={idx} {...event} isFirst={idx === 0} />
                ))}
              </div>
            </motion.section>
          </React.Fragment>
        ))}

        {/* Bottom spacer */}
        <div className="h-24 md:h-32" />
      </div>

      {/* Music toggle — neon glow */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        onClick={toggle}
        className="fixed bottom-6 left-4 z-[60] w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: "rgba(10,0,18,0.7)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${V.pink}40`,
          boxShadow: playing ? `0 0 12px ${V.pink}30, 0 0 24px ${V.pink}15` : "none",
          transition: "box-shadow 0.3s ease",
        }}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.div key="playing" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-[3px]">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} className="w-[3px] rounded-full"
                  style={{ background: V.pink }}
                  animate={{ height: [4, 14, 4] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.svg key="paused" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              width="14" height="14" viewBox="0 0 24 24" fill={V.pink}>
              <path d="M8 5v14l11-7z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default PartyPage;
