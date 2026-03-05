import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import content from "../../data/content.json";
import { trackCountdownView, trackClick } from "../../services/analytics";

dayjs.extend(duration);

const Hero = () => {
  const navigate = useNavigate();
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-batik-cream">
      {/* Visible batik pattern background - high opacity */}
      <div className="absolute inset-0 batik-bg" />

      {/* Colorful corner floral decorations - VISIBLE */}
      <div className="absolute top-0 left-0 w-40 h-40 md:w-64 md:h-64 opacity-70">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="30" fill="#E8508A" />
          <circle cx="80" cy="25" r="20" fill="#E84545" />
          <circle cx="25" cy="80" r="22" fill="#4A7EC8" />
          <circle cx="60" cy="65" r="16" fill="#E87A4A" />
          <circle cx="100" cy="55" r="14" fill="#E8508A" fillOpacity="0.8" />
          <circle cx="55" cy="100" r="12" fill="#D4993D" />
          <ellipse
            cx="30"
            cy="55"
            rx="18"
            ry="10"
            fill="#3A6B4A"
            transform="rotate(-30 30 55)"
          />
          <ellipse
            cx="70"
            cy="45"
            rx="16"
            ry="8"
            fill="#3A6B4A"
            transform="rotate(20 70 45)"
          />
          <ellipse
            cx="45"
            cy="85"
            rx="14"
            ry="7"
            fill="#3A6B4A"
            fillOpacity="0.8"
            transform="rotate(-15 45 85)"
          />
          <circle cx="120" cy="15" r="10" fill="#F5A0B8" />
          <circle cx="15" cy="120" r="10" fill="#F5A0B8" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 opacity-70 scale-x-[-1]">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="30" fill="#E8508A" />
          <circle cx="80" cy="25" r="20" fill="#E84545" />
          <circle cx="25" cy="80" r="22" fill="#4A7EC8" />
          <circle cx="60" cy="65" r="16" fill="#E87A4A" />
          <circle cx="100" cy="55" r="14" fill="#E8508A" fillOpacity="0.8" />
          <circle cx="55" cy="100" r="12" fill="#D4993D" />
          <ellipse
            cx="30"
            cy="55"
            rx="18"
            ry="10"
            fill="#3A6B4A"
            transform="rotate(-30 30 55)"
          />
          <ellipse
            cx="70"
            cy="45"
            rx="16"
            ry="8"
            fill="#3A6B4A"
            transform="rotate(20 70 45)"
          />
          <ellipse
            cx="45"
            cy="85"
            rx="14"
            ry="7"
            fill="#3A6B4A"
            fillOpacity="0.8"
            transform="rotate(-15 45 85)"
          />
          <circle cx="120" cy="15" r="10" fill="#F5A0B8" />
          <circle cx="15" cy="120" r="10" fill="#F5A0B8" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-36 h-36 md:w-56 md:h-56 opacity-60 rotate-180">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="25" fill="#4A7EC8" />
          <circle cx="75" cy="30" r="18" fill="#E8508A" />
          <circle cx="25" cy="70" r="20" fill="#E84545" />
          <circle cx="60" cy="60" r="14" fill="#D4993D" />
          <ellipse
            cx="35"
            cy="50"
            rx="16"
            ry="8"
            fill="#3A6B4A"
            transform="rotate(-20 35 50)"
          />
          <ellipse
            cx="60"
            cy="40"
            rx="14"
            ry="7"
            fill="#3A6B4A"
            transform="rotate(15 60 40)"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-36 h-36 md:w-56 md:h-56 opacity-60 rotate-180 scale-x-[-1]">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="25" fill="#4A7EC8" />
          <circle cx="75" cy="30" r="18" fill="#E8508A" />
          <circle cx="25" cy="70" r="20" fill="#E84545" />
          <circle cx="60" cy="60" r="14" fill="#D4993D" />
          <ellipse
            cx="35"
            cy="50"
            rx="16"
            ry="8"
            fill="#3A6B4A"
            transform="rotate(-20 35 50)"
          />
          <ellipse
            cx="60"
            cy="40"
            rx="14"
            ry="7"
            fill="#3A6B4A"
            transform="rotate(15 60 40)"
          />
        </svg>
      </div>

      {/* Central green panel - the poster's main element */}
      <div className="relative z-10 w-full max-w-screen-sm mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="hero-panel px-6 py-12 md:px-12 md:py-20 text-center relative overflow-hidden">
          {/* Top floral decoration inside panel */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 md:w-96 h-24 md:h-32 opacity-80">
            <svg
              viewBox="0 0 400 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="200" cy="30" r="22" fill="#E8508A" />
              <circle cx="160" cy="20" r="16" fill="#E84545" />
              <circle cx="240" cy="20" r="16" fill="#4A7EC8" />
              <circle cx="130" cy="35" r="12" fill="#F5A0B8" />
              <circle cx="270" cy="35" r="12" fill="#F5A0B8" />
              <circle cx="180" cy="45" r="10" fill="#E87A4A" />
              <circle cx="220" cy="45" r="10" fill="#D4993D" />
              <circle
                cx="100"
                cy="50"
                r="10"
                fill="#4A7EC8"
                fillOpacity="0.7"
              />
              <circle
                cx="300"
                cy="50"
                r="10"
                fill="#E8508A"
                fillOpacity="0.7"
              />
              <ellipse
                cx="150"
                cy="40"
                rx="20"
                ry="8"
                fill="#3A6B4A"
                fillOpacity="0.6"
                transform="rotate(-25 150 40)"
              />
              <ellipse
                cx="250"
                cy="40"
                rx="20"
                ry="8"
                fill="#3A6B4A"
                fillOpacity="0.6"
                transform="rotate(25 250 40)"
              />
              <ellipse
                cx="200"
                cy="55"
                rx="16"
                ry="6"
                fill="#3A6B4A"
                fillOpacity="0.5"
              />
              <ellipse
                cx="120"
                cy="55"
                rx="14"
                ry="6"
                fill="#3A6B4A"
                fillOpacity="0.5"
                transform="rotate(-15 120 55)"
              />
              <ellipse
                cx="280"
                cy="55"
                rx="14"
                ry="6"
                fill="#3A6B4A"
                fillOpacity="0.5"
                transform="rotate(15 280 55)"
              />
            </svg>
          </div>

          {/* Bright gold circle behind names */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] w-56 h-56 md:w-80 md:h-80 rounded-full bg-[#E8C84A] opacity-90" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] w-52 h-52 md:w-72 md:h-72 rounded-full border-2 border-[#D4993D] opacity-60" />

          {/* Date label - orange banner style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 mb-6 md:mb-10 mt-16 md:mt-20"
          >
            <div className="inline-block bg-orange px-6 py-2 md:px-8 md:py-3">
              <span className="font-sans text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white">
                APRIL 24 — 25, 2026
              </span>
            </div>
          </motion.div>

          {/* Names - big, bold script */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 mb-4 md:mb-8"
          >
            <motion.h1
              className="font-script text-6xl md:text-8xl lg:text-9xl text-cream leading-none"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {content.wedding.brideName.split(" ")[0]}
            </motion.h1>

            <motion.div
              className="my-2 md:my-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
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
              transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {content.wedding.groomName.split(" ")[0]}
            </motion.h1>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 mb-8 md:mb-12"
          >
            <p className="font-serif text-lg md:text-xl text-cream/90 italic">
              Nashik, Maharashtra
            </p>
          </motion.div>

          {/* Countdown - inside the green panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 flex justify-center gap-6 md:gap-10 mb-8 md:mb-12"
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

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
          >
            <button
              onClick={() => {
                trackClick("Hero RSVP Button");
                navigate("/rsvp");
              }}
              className="bg-orange hover:bg-orange-dark text-white font-sans text-xs md:text-sm font-bold tracking-[0.2em] uppercase px-8 py-3 md:px-10 md:py-4 border-2 border-[#E8C84A] transition-all duration-300 hover:shadow-lg hover:shadow-orange/40 cursor-pointer w-full sm:w-auto"
            >
              Confirm Attendance
            </button>

            <button
              onClick={() => {
                trackClick("Hero View Details Button");
                navigate("/events");
              }}
              className="bg-transparent text-cream font-sans text-xs md:text-sm font-bold tracking-[0.2em] uppercase px-8 py-3 md:px-10 md:py-4 border-2 border-orange hover:bg-orange/20 transition-all duration-300 cursor-pointer w-full sm:w-auto"
            >
              View Schedule
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
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
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-primary-600 font-semibold">
            Scroll
          </span>
          <svg width="2" height="30" viewBox="0 0 2 30" fill="none">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="30"
              stroke="#3A6B4A"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
