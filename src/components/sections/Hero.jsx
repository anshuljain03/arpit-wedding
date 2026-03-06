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
      {/* === MAROON BORDER FRAME === */}
      <div className="absolute inset-0 batik-bg-dark" />

      {/* === ORANGE BORDER === */}
      <div className="absolute inset-[clamp(20px,4vw,48px)] border-4 border-orange z-[1]">
        <div className="absolute inset-2 border border-[#D4993D]/40" />
      </div>

      {/* === GREEN CENTER === */}
      <div
        className="absolute z-[2] overflow-hidden"
        style={{
          inset: "calc(clamp(20px, 4vw, 48px) + 4px)",
          background: "linear-gradient(180deg, #3A6B4A 0%, #2A5038 100%)",
        }}
      >
        {/* ===== TOP FLORAL CLUSTER (heavier on left) ===== */}
        <div className="absolute top-0 left-0 right-0 h-[35vh] md:h-[30vh] pointer-events-none">
          {/* 1. Large hibiscus — anchor left */}
          <FlowerImg
            src="hibiscus.svg"
            className="w-[45vw] md:w-[28vw] max-w-[380px]"
            style={{ top: "-8%", left: "-5%", transform: "rotate(-15deg)" }}
          />
          {/* 2. Large rose — anchor right */}
          <FlowerImg
            src="rose-2.svg"
            className="w-[35vw] md:w-[22vw] max-w-[300px]"
            style={{
              top: "-4%",
              right: "-3%",
              transform: "scaleX(-1) rotate(12deg)",
            }}
          />
          {/* 3. Tropical accent — mid-left */}
          <FlowerImg
            src="tropical-flower.svg"
            className="w-[16vw] md:w-[10vw] max-w-[130px]"
            style={{ top: "2%", left: "18%", transform: "rotate(8deg)" }}
          />
          {/* 4. Rose — center-left overlap */}
          <FlowerImg
            src="rose-2.svg"
            className="w-[24vw] md:w-[15vw] max-w-[200px]"
            style={{ top: "-6%", left: "40%", transform: "rotate(-5deg)" }}
          />
          {/* 5. Blue rose — right accent */}
          <FlowerImg
            src="rose-1-blue.svg"
            className="w-[18vw] md:w-[10vw] max-w-[140px]"
            style={{ top: "1%", right: "16%", transform: "rotate(-22deg)" }}
          />
          {/* 6. Small tropical — right gap filler */}
          <FlowerImg
            src="tropical-flower.svg"
            className="w-[12vw] md:w-[7vw] max-w-[90px]"
            style={{ top: "16%", right: "26%", transform: "rotate(20deg)" }}
          />
          {/* 7. Small tropical — left low */}
          <FlowerImg
            src="tropical-flower.svg"
            className="w-[10vw] md:w-[6vw] max-w-[75px]"
            style={{ top: "24%", left: "8%", transform: "rotate(35deg)" }}
          />
          {/* 8. Blue hibiscus — center overlap */}
          <FlowerImg
            src="hibiscus-blue.svg"
            className="w-[22vw] md:w-[14vw] max-w-[200px] opacity-85"
            style={{ top: "-10%", left: "34%", transform: "rotate(5deg)" }}
          />
          {/* 9. Dark rose — far left filler */}
          <FlowerImg
            src="rose-1.svg"
            className="w-[15vw] md:w-[9vw] max-w-[120px]"
            style={{ top: "10%", left: "1%", transform: "rotate(-40deg)" }}
          />
          {/* 10. Blue rose — right edge */}
          <FlowerImg
            src="rose-1-blue.svg"
            className="w-[14vw] md:w-[8vw] max-w-[110px] opacity-80"
            style={{
              top: "20%",
              right: "4%",
              transform: "rotate(-15deg) scaleX(-1)",
            }}
          />
        </div>

        {/* ===== BOTTOM FLORAL CLUSTER (heavier on right) ===== */}
        <div className="absolute bottom-0 left-0 right-0 h-[35vh] md:h-[30vh] pointer-events-none">
          {/* 1. Large hibiscus — anchor RIGHT */}
          <FlowerImg
            src="hibiscus.svg"
            className="w-[42vw] md:w-[26vw] max-w-[360px]"
            style={{
              bottom: "-6%",
              right: "-4%",
              transform: "rotate(20deg) scaleY(-1)",
            }}
          />
          {/* 2. Large rose — anchor LEFT */}
          <FlowerImg
            src="rose-2.svg"
            className="w-[36vw] md:w-[22vw] max-w-[300px]"
            style={{
              bottom: "-5%",
              left: "-6%",
              transform: "scaleX(-1) rotate(-18deg) scaleY(-1)",
            }}
          />
          {/* 3. Pink hibiscus — left-center */}
          <FlowerImg
            src="hibiscus-pink.svg"
            className="w-[24vw] md:w-[15vw] max-w-[200px] opacity-85"
            style={{
              bottom: "-1%",
              left: "24%",
              transform: "rotate(-8deg) scaleY(-1)",
            }}
          />
          {/* 4. Blue hibiscus — center overlap */}
          <FlowerImg
            src="hibiscus-blue.svg"
            className="w-[26vw] md:w-[16vw] max-w-[220px] opacity-85"
            style={{
              bottom: "-10%",
              left: "36%",
              transform: "rotate(8deg) scaleY(-1)",
            }}
          />
          {/* 5. Blue rose — right accent */}
          <FlowerImg
            src="rose-1-blue.svg"
            className="w-[20vw] md:w-[12vw] max-w-[160px]"
            style={{
              bottom: "2%",
              right: "20%",
              transform: "rotate(-12deg) scaleY(-1)",
            }}
          />
          {/* 6. Tropical — left gap filler */}
          <FlowerImg
            src="tropical-flower.svg"
            className="w-[13vw] md:w-[8vw] max-w-[95px]"
            style={{
              bottom: "18%",
              left: "12%",
              transform: "rotate(-30deg) scaleY(-1)",
            }}
          />
          {/* 7. Tropical — right small */}
          <FlowerImg
            src="tropical-flower.svg"
            className="w-[10vw] md:w-[6vw] max-w-[75px]"
            style={{
              bottom: "22%",
              right: "9%",
              transform: "rotate(40deg) scaleY(-1)",
            }}
          />
          {/* 8. Small rose — far right */}
          <FlowerImg
            src="rose-2.svg"
            className="w-[16vw] md:w-[10vw] max-w-[130px]"
            style={{
              bottom: "8%",
              right: "2%",
              transform: "rotate(25deg) scaleY(-1)",
            }}
          />
          {/* 9. Dark rose — far left */}
          <FlowerImg
            src="rose-1.svg"
            className="w-[14vw] md:w-[8vw] max-w-[110px]"
            style={{
              bottom: "14%",
              left: "2%",
              transform: "rotate(35deg) scaleY(-1)",
            }}
          />
          {/* 10. Tropical — center filler */}
          <FlowerImg
            src="tropical-flower.svg"
            className="w-[12vw] md:w-[7vw] max-w-[95px] opacity-70"
            style={{
              bottom: "22%",
              left: "46%",
              transform: "rotate(5deg) scaleY(-1)",
            }}
          />
        </div>
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center px-6 py-16 md:py-20">
          <div className="relative inline-block">
            {/* Gold circle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[38%] w-56 h-56 md:w-80 md:h-80 rounded-full bg-[#E8C84A] opacity-90" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[38%] w-52 h-52 md:w-72 md:h-72 rounded-full border-2 border-[#D4993D] opacity-60" />

            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="font-script text-2xl md:text-3xl text-[#E8C84A] mb-4"
              >
                Save the Date
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="mb-6 md:mb-8"
              >
                <div className="inline-block bg-orange px-6 py-2 md:px-8 md:py-3">
                  <span className="font-sans text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white">
                    APRIL 24 — 25, 2026
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.4,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="mb-4 md:mb-6"
              >
                <motion.h1
                  className="font-script text-6xl md:text-8xl lg:text-9xl text-cream leading-none"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  {content.wedding.brideName.split(" ")[0]}
                </motion.h1>

                <motion.div
                  className="my-2 md:my-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.9,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <span className="font-display text-3xl md:text-4xl text-[#E8C84A] font-light">
                    &
                  </span>
                </motion.div>

                <motion.h1
                  className="font-script text-6xl md:text-8xl lg:text-9xl text-cream leading-none"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.7,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  {content.wedding.groomName.split(" ")[0]}
                </motion.h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="font-serif text-lg md:text-xl text-cream/90 italic mb-8 md:mb-10"
              >
                Nashik, Maharashtra
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.2,
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
                    <div className="font-display text-3xl md:text-5xl font-semibold text-[#E8C84A]">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <p className="text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-cream/70 mt-1">
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
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-cream/70 font-semibold">
            Scroll
          </span>
          <svg width="2" height="24" viewBox="0 0 2 24" fill="none">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="24"
              stroke="#FFF5E6"
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
