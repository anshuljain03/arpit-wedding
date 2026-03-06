import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import content from "../../data/content.json";
import { trackCountdownView } from "../../services/analytics";

dayjs.extend(duration);

const basePath = import.meta.env.BASE_URL || "/";

// Flower image element with absolute positioning and CSS transforms
const FlowerImg = ({
  src,
  className = "",
  style = {},
  alt = "decorative flower",
}) => (
  <img
    src={`${basePath}florals/${src}`}
    alt={alt}
    className={`absolute pointer-events-none select-none ${className}`}
    style={{ ...style }}
    loading="eager"
    draggable={false}
  />
);

// Thin gold ornament with diamond motif
const GoldOrnament = ({ width = "200px", className = "" }) => (
  <svg
    viewBox="0 0 200 20"
    fill="none"
    style={{ width }}
    className={`mx-auto ${className}`}
  >
    <line x1="0" y1="10" x2="85" y2="10" stroke="#D4993D" strokeWidth="0.5" />
    <line
      x1="115"
      y1="10"
      x2="200"
      y2="10"
      stroke="#D4993D"
      strokeWidth="0.5"
    />
    <path d="M95 10 L100 5 L105 10 L100 15 Z" fill="#D4993D" />
  </svg>
);

const Hero = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = dayjs("2026-04-25 10:00:00");

    const updateCountdown = () => {
      const now = dayjs();
      const diff = weddingDate.diff(now);

      if (diff > 0) {
        const dur = dayjs.duration(diff);
        setCountdown({
          days: Math.floor(dur.asDays()),
          hours: dur.hours(),
          minutes: dur.minutes(),
          seconds: dur.seconds(),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    trackCountdownView(
      Math.floor(dayjs.duration(weddingDate.diff(dayjs())).asDays()),
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* === LIGHT BACKGROUND === */}
      <div className="absolute inset-0 bg-[#FFF5E6]" />

      {/* === BRIGHT GOLD BORDER === */}
      <div className="absolute inset-[clamp(10px,2vw,24px)] border-2 border-[#D4993D] z-[1]" />

      {/* === CREAM CENTER === */}
      <div
        className="absolute z-[2] overflow-hidden"
        style={{
          inset: "calc(clamp(10px, 2vw, 24px) + 2px)",
          background:
            "linear-gradient(180deg, #FFFAF2 0%, #FFF5E6 50%, #FFF0DC 100%)",
        }}
      >
        {/* ===== TOP FLORAL CLUSTER ===== */}
        <div className="absolute top-0 left-0 right-0 h-[30vh] md:h-[26vh] pointer-events-none">
          {/* Large anchors — corners */}
          <FlowerImg
            src="flower-coral.png"
            className="w-[40vw] md:w-[24vw] max-w-[360px]"
            style={{ top: "-10%", left: "-4%", transform: "rotate(-15deg)" }}
          />
          <FlowerImg
            src="flower-peach.png"
            className="w-[36vw] md:w-[22vw] max-w-[320px]"
            style={{
              top: "-8%",
              right: "-3%",
              transform: "scaleX(-1) rotate(10deg)",
            }}
          />
          {/* Medium — filling across the top */}
          <FlowerImg
            src="flower-orange.png"
            className="w-[24vw] md:w-[14vw] max-w-[200px] opacity-90"
            style={{ top: "-8%", left: "20%", transform: "rotate(12deg)" }}
          />
          <FlowerImg
            src="flower-red.png"
            className="w-[22vw] md:w-[13vw] max-w-[180px]"
            style={{
              top: "-6%",
              left: "42%",
              transform: "rotate(-8deg) scaleX(-1)",
            }}
          />
          <FlowerImg
            src="flower-purple.png"
            className="w-[20vw] md:w-[12vw] max-w-[170px] opacity-90"
            style={{ top: "-4%", right: "14%", transform: "rotate(-20deg)" }}
          />
          <FlowerImg
            src="flower-yellow.png"
            className="w-[22vw] md:w-[13vw] max-w-[180px]"
            style={{ top: "-10%", left: "8%", transform: "rotate(22deg)" }}
          />
          <FlowerImg
            src="flower-pink.png"
            className="w-[18vw] md:w-[11vw] max-w-[160px] opacity-85"
            style={{ top: "-5%", right: "30%", transform: "rotate(5deg)" }}
          />
          {/* Second row — edge fillers only */}
          <FlowerImg
            src="flower-cream.png"
            className="w-[18vw] md:w-[10vw] max-w-[140px] opacity-80"
            style={{ top: "2%", left: "2%", transform: "rotate(30deg)" }}
          />
          <FlowerImg
            src="flower-orange.png"
            className="w-[16vw] md:w-[9vw] max-w-[130px] opacity-80"
            style={{ top: "4%", right: "3%", transform: "rotate(18deg)" }}
          />
          <FlowerImg
            src="flower-peach.png"
            className="w-[14vw] md:w-[8vw] max-w-[120px] opacity-70"
            style={{ top: "-2%", left: "60%", transform: "rotate(15deg)" }}
          />
          <FlowerImg
            src="flower-coral.png"
            className="w-[12vw] md:w-[7vw] max-w-[100px] opacity-60"
            style={{ top: "8%", left: "12%", transform: "rotate(-18deg)" }}
          />
          <FlowerImg
            src="flower-purple.png"
            className="w-[12vw] md:w-[7vw] max-w-[100px] opacity-60"
            style={{ top: "6%", right: "8%", transform: "rotate(35deg)" }}
          />
        </div>

        {/* ===== BOTTOM FLORAL CLUSTER ===== */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] md:h-[26vh] pointer-events-none">
          {/* Large anchors — corners */}
          <FlowerImg
            src="flower-red.png"
            className="w-[40vw] md:w-[24vw] max-w-[360px]"
            style={{
              bottom: "-8%",
              right: "-3%",
              transform: "rotate(18deg)",
            }}
          />
          <FlowerImg
            src="flower-purple.png"
            className="w-[38vw] md:w-[23vw] max-w-[340px]"
            style={{
              bottom: "-6%",
              left: "-4%",
              transform: "scaleX(-1) rotate(-15deg)",
            }}
          />
          {/* Medium — filling across the bottom */}
          <FlowerImg
            src="flower-pink.png"
            className="w-[24vw] md:w-[14vw] max-w-[200px] opacity-90"
            style={{
              bottom: "-6%",
              left: "20%",
              transform: "rotate(-10deg)",
            }}
          />
          <FlowerImg
            src="flower-yellow.png"
            className="w-[22vw] md:w-[13vw] max-w-[180px] opacity-90"
            style={{
              bottom: "-8%",
              left: "40%",
              transform: "rotate(8deg) scaleX(-1)",
            }}
          />
          <FlowerImg
            src="flower-coral.png"
            className="w-[20vw] md:w-[12vw] max-w-[170px]"
            style={{
              bottom: "-4%",
              right: "14%",
              transform: "rotate(-12deg)",
            }}
          />
          <FlowerImg
            src="flower-peach.png"
            className="w-[22vw] md:w-[13vw] max-w-[180px]"
            style={{
              bottom: "-8%",
              right: "6%",
              transform: "rotate(14deg) scaleX(-1)",
            }}
          />
          <FlowerImg
            src="flower-cream.png"
            className="w-[18vw] md:w-[11vw] max-w-[160px] opacity-85"
            style={{
              bottom: "-5%",
              left: "58%",
              transform: "rotate(5deg)",
            }}
          />
          {/* Second row — edge fillers only */}
          <FlowerImg
            src="flower-orange.png"
            className="w-[18vw] md:w-[10vw] max-w-[140px] opacity-80"
            style={{
              bottom: "0%",
              right: "1%",
              transform: "rotate(28deg)",
            }}
          />
          <FlowerImg
            src="flower-red.png"
            className="w-[16vw] md:w-[9vw] max-w-[130px] opacity-80"
            style={{
              bottom: "2%",
              left: "3%",
              transform: "rotate(22deg)",
            }}
          />
          <FlowerImg
            src="flower-yellow.png"
            className="w-[14vw] md:w-[8vw] max-w-[120px] opacity-70"
            style={{
              bottom: "-2%",
              left: "34%",
              transform: "rotate(-15deg)",
            }}
          />
          <FlowerImg
            src="flower-pink.png"
            className="w-[12vw] md:w-[7vw] max-w-[100px] opacity-60"
            style={{
              bottom: "6%",
              right: "10%",
              transform: "rotate(15deg)",
            }}
          />
          <FlowerImg
            src="flower-coral.png"
            className="w-[12vw] md:w-[7vw] max-w-[100px] opacity-60"
            style={{
              bottom: "4%",
              left: "14%",
              transform: "rotate(-22deg) scaleX(-1)",
            }}
          />
        </div>
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center px-6 py-16 md:py-20">
          <div className="relative inline-block">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <GoldOrnament width="180px" className="mb-6" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="text-base md:text-lg text-[#8B6914] mb-8 tracking-[0.3em] uppercase"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                Save the Date
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="mb-6 md:mb-8"
              >
                <motion.h1
                  className="font-script text-5xl md:text-7xl lg:text-8xl text-[#2A5038] leading-none tracking-[0.12em] font-semibold"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  style={{
                    textShadow: "0 1px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  {content.wedding.brideName.split(" ")[0]}
                </motion.h1>

                <motion.div
                  className="my-3 md:my-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.7,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <span
                    className="text-2xl md:text-3xl text-[#D4993D] font-light"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                    }}
                  >
                    &amp;
                  </span>
                </motion.div>

                <motion.h1
                  className="font-script text-5xl md:text-7xl lg:text-8xl text-[#2A5038] leading-none tracking-[0.12em] font-semibold"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.6,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  style={{
                    textShadow: "0 1px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  {content.wedding.groomName.split(" ")[0]}
                </motion.h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.9,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <GoldOrnament width="140px" className="mb-5" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="font-sans text-[11px] md:text-xs font-medium tracking-[0.25em] uppercase text-[#5A5A5A] mb-2"
              >
                April 24 — 25, 2026
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="text-lg md:text-xl text-[#7A7A7A] italic mb-10"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                }}
              >
                Nashik, Maharashtra
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="flex justify-center gap-6 md:gap-10"
              >
                {[
                  { value: countdown.days, label: "Days" },
                  { value: countdown.hours, label: "Hours" },
                  { value: countdown.minutes, label: "Min" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="font-display text-3xl md:text-5xl font-medium text-[#8B6914]">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <p className="text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-[#999] mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#999] font-semibold">
            Scroll
          </span>
          <svg width="2" height="24" viewBox="0 0 2 24" fill="none">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="24"
              stroke="#999999"
              strokeWidth="2"
              strokeDasharray="4 3"
              strokeOpacity="0.5"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
