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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden batik-bg-dark">
      {/* Top-left floral - large roses with trailing leaves */}
      <div className="absolute top-0 left-0 w-48 h-48 md:w-80 md:h-80 opacity-80">
        <svg
          viewBox="0 0 280 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Large pink rose */}
          <path
            d="M60 70c-10-16 4-38 20-34 13 3 15 24 4 30-8 4-18-2-16-12 2-7 10-8 13-3"
            fill="#E8508A"
          />
          <path
            d="M50 58c-6-20 10-40 26-30 11 7 8 26-5 30-9 2-17-7-12-16 4-6 13-5 14 2"
            fill="#E84545"
            fillOpacity="0.8"
          />
          <path
            d="M72 50c-4-13 7-28 19-23 9 4 9 20-1 24-7 2-14-4-11-12 2-5 10-5 12 0"
            fill="#E8508A"
            fillOpacity="0.6"
          />
          {/* Large blue flower */}
          <path
            d="M35 150c-8-13 3-30 16-26 10 3 11 20 2 24-6 3-14-3-11-10 2-5 8-6 10-2"
            fill="#4A7EC8"
          />
          <path
            d="M28 140c-5-15 8-28 18-21 8 5 6 18-3 21-6 2-12-5-9-11 3-4 9-3 10 2"
            fill="#4A7EC8"
            fillOpacity="0.7"
          />
          <path
            d="M45 135c-2-10 5-20 14-16 6 3 6 15-1 18-5 1-10-4-8-9 2-4 7-4 8 0"
            fill="#3B5E94"
            fillOpacity="0.6"
          />
          {/* Small coral flower */}
          <path
            d="M120 40c-5-8 2-18 10-15 6 2 6 12 1 14-4 2-9-1-7-6 1-3 5-4 6-1"
            fill="#E87A4A"
          />
          <path
            d="M115 32c-3-10 5-18 13-13 5 3 4 12-2 14-4 1-9-3-6-8 2-3 6-3 7 0"
            fill="#E84545"
            fillOpacity="0.6"
          />
          {/* Trailing leaves - organic curves */}
          <path
            d="M40 90c15-6 35 2 42 18-12-3-32 1-42-18z"
            fill="#3A6B4A"
            fillOpacity="0.7"
          />
          <path
            d="M80 55c-6 14 1 32-16 40 3-11 2-30 16-40z"
            fill="#3A6B4A"
            fillOpacity="0.6"
          />
          <path
            d="M20 110c12-2 28 5 32 18-10-4-26 0-32-18z"
            fill="#3A6B4A"
            fillOpacity="0.55"
          />
          <path
            d="M55 160c10-8 28-5 35 8-10 0-27-2-35-8z"
            fill="#3A6B4A"
            fillOpacity="0.5"
          />
          {/* Small buds */}
          <path
            d="M140 85c-3-5 1-12 7-10 4 1 4 8 1 10-3 1-6-1-5-4 1-2 4-2 4 0"
            fill="#F5A0B8"
            fillOpacity="0.7"
          />
          <path
            d="M95 175c-2-4 1-10 5-8 3 1 3 7 0 8-2 1-5-1-4-3 1-2 3-2 3 0"
            fill="#E8508A"
            fillOpacity="0.6"
          />
          {/* Vine swirl */}
          <path
            d="M100 110c18 6 24 24 14 36s-30 6-34-10c-2-10 6-20 15-17 6 2 8 10 3 13"
            fill="none"
            stroke="#3A6B4A"
            strokeWidth="2"
            strokeOpacity="0.4"
          />
          {/* Gold dots */}
          <circle cx="160" cy="20" r="2" fill="#D4993D" fillOpacity="0.7" />
          <circle cx="170" cy="30" r="1.5" fill="#D4993D" fillOpacity="0.6" />
          <circle cx="25" cy="200" r="2" fill="#D4993D" fillOpacity="0.6" />
          <circle cx="130" cy="120" r="1.5" fill="#D4993D" fillOpacity="0.5" />
          <circle cx="80" cy="190" r="1.5" fill="#D4993D" fillOpacity="0.5" />
        </svg>
      </div>

      {/* Top-right floral - different arrangement, blue dominant */}
      <div className="absolute top-0 right-0 w-44 h-44 md:w-72 md:h-72 opacity-75">
        <svg
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Large blue peony */}
          <path
            d="M190 65c-12-18 5-42 22-37 14 4 16 26 5 32-8 4-20-3-17-13 2-7 11-9 14-3"
            fill="#4A7EC8"
          />
          <path
            d="M180 52c-7-20 11-38 28-28 12 7 9 28-6 32-10 2-19-8-14-17 4-6 14-5 15 2"
            fill="#3B5E94"
            fillOpacity="0.7"
          />
          <path
            d="M200 48c-3-12 8-24 18-20 8 4 7 18-2 22-6 2-13-5-10-12 3-5 10-4 11 1"
            fill="#4A7EC8"
            fillOpacity="0.5"
          />
          {/* Coral rose beside it */}
          <path
            d="M120 35c-7-11 2-26 14-22 9 3 10 16 2 20-5 3-13-2-11-9 2-5 8-5 10-1"
            fill="#E84545"
          />
          <path
            d="M112 26c-4-14 7-26 18-19 8 5 6 18-4 21-7 1-13-6-9-12 3-4 10-3 10 2"
            fill="#E8508A"
            fillOpacity="0.7"
          />
          {/* Small pink bud */}
          <path
            d="M230 100c-4-6 2-14 8-12 5 2 5 10 1 12-3 1-7-2-6-5 1-3 5-3 5 0"
            fill="#E8508A"
            fillOpacity="0.7"
          />
          {/* Organic leaves */}
          <path
            d="M160 80c14-4 30 5 34 20-11-4-28 0-34-20z"
            fill="#3A6B4A"
            fillOpacity="0.65"
          />
          <path
            d="M210 75c-8 12-2 30-18 38 4-10 2-28 18-38z"
            fill="#3A6B4A"
            fillOpacity="0.55"
          />
          <path
            d="M140 55c8-8 22-8 30 2-8 2-22 4-30-2z"
            fill="#3A6B4A"
            fillOpacity="0.5"
          />
          <path
            d="M95 50c6-5 16-3 20 5-6 0-15 0-20-5z"
            fill="#3A6B4A"
            fillOpacity="0.45"
          />
          {/* Hanging bud with stem */}
          <path
            d="M175 130c0 15 8 25 8 25"
            fill="none"
            stroke="#3A6B4A"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <path
            d="M180 158c-3-5 1-10 5-9 4 1 4 7 1 9-2 1-5-1-4-3"
            fill="#E87A4A"
            fillOpacity="0.6"
          />
          {/* Vine */}
          <path
            d="M230 120c-15 10-18 28-8 38s24 2 26-14c1-10-7-16-14-13-5 2-6 10-1 12"
            fill="none"
            stroke="#3A6B4A"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
          {/* Gold dots */}
          <circle cx="90" cy="15" r="2" fill="#D4993D" fillOpacity="0.7" />
          <circle cx="245" cy="45" r="1.5" fill="#D4993D" fillOpacity="0.6" />
          <circle cx="150" cy="110" r="1.5" fill="#D4993D" fillOpacity="0.5" />
          <circle cx="100" cy="80" r="1" fill="#D4993D" fillOpacity="0.5" />
        </svg>
      </div>

      {/* Bottom-left floral - sparser, trailing upward */}
      <div className="absolute bottom-0 left-0 w-36 h-48 md:w-60 md:h-72 opacity-65">
        <svg
          viewBox="0 0 220 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Coral rose at bottom */}
          <path
            d="M50 220c-8-12 3-30 16-26 10 3 11 18 3 22-6 3-14-2-12-9 2-5 8-6 10-2"
            fill="#E84545"
          />
          <path
            d="M42 210c-5-14 7-28 18-22 8 5 6 18-3 21-6 2-12-5-9-11 3-4 9-3 10 2"
            fill="#E87A4A"
            fillOpacity="0.7"
          />
          {/* Small blue flower */}
          <path
            d="M100 250c-4-6 2-16 10-13 6 2 6 12 1 14-4 2-9-2-7-6 1-3 5-4 6-1"
            fill="#4A7EC8"
            fillOpacity="0.7"
          />
          {/* Leaves trailing up */}
          <path
            d="M30 240c10-6 24 0 28 14-8-3-22 0-28-14z"
            fill="#3A6B4A"
            fillOpacity="0.6"
          />
          <path
            d="M65 195c-4 12 2 26-10 32 1-9 0-24 10-32z"
            fill="#3A6B4A"
            fillOpacity="0.5"
          />
          <path
            d="M40 180c8-3 18 3 22 14-7-3-18 0-22-14z"
            fill="#3A6B4A"
            fillOpacity="0.45"
          />
          {/* Vine going up */}
          <path
            d="M55 250c-5-20-15-35-10-55 8 5 15 25 10 55z"
            fill="none"
            stroke="#3A6B4A"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
          {/* Pink bud */}
          <path
            d="M85 185c-2-4 1-10 5-8 3 1 3 7 0 8-2 1-5-1-4-3"
            fill="#F5A0B8"
            fillOpacity="0.6"
          />
          {/* Gold dots */}
          <circle cx="120" cy="230" r="1.5" fill="#D4993D" fillOpacity="0.6" />
          <circle cx="20" cy="170" r="1.5" fill="#D4993D" fillOpacity="0.5" />
          <circle cx="75" cy="160" r="1" fill="#D4993D" fillOpacity="0.5" />
        </svg>
      </div>

      {/* Bottom-right floral - different, orange/gold tones */}
      <div className="absolute bottom-0 right-0 w-40 h-44 md:w-64 md:h-68 opacity-65">
        <svg
          viewBox="0 0 240 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Orange-pink rose */}
          <path
            d="M170 210c-9-14 4-32 18-28 11 3 12 20 3 24-6 3-15-2-13-10 2-5 9-6 11-2"
            fill="#E87A4A"
          />
          <path
            d="M162 200c-6-16 8-30 22-24 9 5 7 20-4 24-7 2-14-5-10-12 3-5 10-4 12 1"
            fill="#E8508A"
            fillOpacity="0.7"
          />
          <path
            d="M180 195c-3-10 5-20 14-16 7 3 6 15-1 18-5 1-10-4-8-9 2-3 7-4 8 0"
            fill="#E84545"
            fillOpacity="0.5"
          />
          {/* Small gold flower */}
          <path
            d="M100 240c-3-5 1-12 7-10 4 2 4 9 1 11-3 1-6-2-5-5 1-2 4-2 4 0"
            fill="#D4993D"
            fillOpacity="0.7"
          />
          <path
            d="M95 234c-2-6 3-12 8-9 4 2 3 9-1 10-3 1-6-2-4-5"
            fill="#E8C84A"
            fillOpacity="0.5"
          />
          {/* Leaves */}
          <path
            d="M150 230c12-5 28 2 32 16-10-4-26 0-32-16z"
            fill="#3A6B4A"
            fillOpacity="0.6"
          />
          <path
            d="M195 200c-5 14 0 28-14 34 2-10 1-26 14-34z"
            fill="#3A6B4A"
            fillOpacity="0.5"
          />
          <path
            d="M125 225c6-3 15 1 18 10-6-2-14 0-18-10z"
            fill="#3A6B4A"
            fillOpacity="0.45"
          />
          {/* Vine */}
          <path
            d="M140 260c8-18 2-35 10-50"
            fill="none"
            stroke="#3A6B4A"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
          {/* Tiny bud */}
          <path
            d="M130 195c-2-3 1-8 4-6 2 1 2 5 0 6-2 1-4-1-3-3"
            fill="#4A7EC8"
            fillOpacity="0.5"
          />
          {/* Gold dots */}
          <circle cx="80" cy="220" r="2" fill="#D4993D" fillOpacity="0.6" />
          <circle cx="210" cy="240" r="1.5" fill="#D4993D" fillOpacity="0.5" />
          <circle cx="160" cy="180" r="1" fill="#D4993D" fillOpacity="0.5" />
        </svg>
      </div>

      {/* Central green panel */}
      <div className="relative z-10 w-full max-w-screen-sm mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="hero-panel px-6 py-12 md:px-12 md:py-20 text-center relative overflow-hidden">
          {/* Top floral inside panel - organic rose/peony cluster */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 md:w-[28rem] h-28 md:h-36 opacity-85">
            <svg
              viewBox="0 0 450 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Center large pink rose */}
              <path
                d="M225 35c-10-15 4-35 18-30 11 3 13 22 3 27-7 3-16-3-14-10 2-6 9-7 11-2"
                fill="#E8508A"
              />
              <path
                d="M218 25c-6-18 9-35 23-26 10 6 7 24-5 27-8 2-16-6-12-14 3-5 12-4 12 2"
                fill="#E84545"
                fillOpacity="0.75"
              />
              <path
                d="M235 22c-3-10 6-22 16-18 8 3 7 17-1 20-6 2-12-4-9-10 2-4 8-4 9 0"
                fill="#E8508A"
                fillOpacity="0.55"
              />
              {/* Left coral rose */}
              <path
                d="M145 30c-7-11 3-26 14-22 9 3 10 17 2 20-5 3-13-2-11-9 2-5 8-6 10-2"
                fill="#E84545"
              />
              <path
                d="M138 22c-4-14 7-26 17-19 7 5 5 18-4 20-6 1-11-5-8-11 2-4 9-3 10 1"
                fill="#E87A4A"
                fillOpacity="0.65"
              />
              {/* Right blue flower */}
              <path
                d="M305 28c-6-10 3-24 14-20 8 3 8 16 0 18-5 2-12-3-9-9 2-4 7-4 8 0"
                fill="#4A7EC8"
              />
              <path
                d="M298 20c-4-12 6-22 15-17 6 4 5 16-3 18-5 1-10-4-7-9 2-3 7-3 7 1"
                fill="#3B5E94"
                fillOpacity="0.6"
              />
              {/* Far left small pink */}
              <path
                d="M80 45c-4-7 2-16 9-13 5 2 5 11 1 13-3 2-8-1-6-5 1-3 5-3 5 0"
                fill="#F5A0B8"
                fillOpacity="0.7"
              />
              {/* Far right small coral */}
              <path
                d="M370 42c-3-6 2-14 8-11 4 2 4 10 0 11-3 1-6-1-5-4 1-2 4-2 4 0"
                fill="#E87A4A"
                fillOpacity="0.6"
              />
              {/* Leaves draping down - organic curves */}
              <path
                d="M200 50c16-5 35 4 40 20-12-5-30 0-40-20z"
                fill="#3A6B4A"
                fillOpacity="0.6"
              />
              <path
                d="M250 50c-16-5-35 4-40 20 12-5 30 0 40-20z"
                fill="#3A6B4A"
                fillOpacity="0.55"
              />
              <path
                d="M160 45c10-6 24 1 28 14-8-3-22 0-28-14z"
                fill="#3A6B4A"
                fillOpacity="0.55"
              />
              <path
                d="M290 45c-10-6-24 1-28 14 8-3 22 0 28-14z"
                fill="#3A6B4A"
                fillOpacity="0.5"
              />
              <path
                d="M120 55c8-4 18 2 22 12-7-2-17 0-22-12z"
                fill="#3A6B4A"
                fillOpacity="0.45"
              />
              <path
                d="M330 52c-8-4-18 2-22 12 7-2 17 0 22-12z"
                fill="#3A6B4A"
                fillOpacity="0.4"
              />
              {/* Trailing leaf stems */}
              <path
                d="M105 65c-5 15 0 30 5 45"
                fill="none"
                stroke="#3A6B4A"
                strokeWidth="1.2"
                strokeOpacity="0.3"
              />
              <path
                d="M345 62c5 15 0 30-5 45"
                fill="none"
                stroke="#3A6B4A"
                strokeWidth="1.2"
                strokeOpacity="0.3"
              />
              <path
                d="M180 60c-2 12 2 25 5 40"
                fill="none"
                stroke="#3A6B4A"
                strokeWidth="1"
                strokeOpacity="0.25"
              />
              <path
                d="M270 60c2 12-2 25-5 40"
                fill="none"
                stroke="#3A6B4A"
                strokeWidth="1"
                strokeOpacity="0.25"
              />
              {/* Small dangling buds */}
              <path
                d="M108 112c-2-3 1-7 4-6 2 1 2 5 0 6"
                fill="#E8508A"
                fillOpacity="0.5"
              />
              <path
                d="M342 108c2-3-1-7-4-6-2 1-2 5 0 6"
                fill="#4A7EC8"
                fillOpacity="0.5"
              />
              <path
                d="M182 102c-1-3 1-6 3-5 2 1 2 4 0 5"
                fill="#F5A0B8"
                fillOpacity="0.4"
              />
              {/* Gold dots scattered */}
              <circle
                cx="60"
                cy="35"
                r="1.5"
                fill="#D4993D"
                fillOpacity="0.6"
              />
              <circle
                cx="390"
                cy="30"
                r="1.5"
                fill="#D4993D"
                fillOpacity="0.6"
              />
              <circle cx="225" cy="55" r="1" fill="#D4993D" fillOpacity="0.5" />
              <circle cx="170" cy="70" r="1" fill="#D4993D" fillOpacity="0.5" />
              <circle cx="280" cy="68" r="1" fill="#D4993D" fillOpacity="0.5" />
            </svg>
          </div>

          {/* Bright gold circle behind names */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] w-56 h-56 md:w-80 md:h-80 rounded-full bg-[#E8C84A] opacity-90" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] w-52 h-52 md:w-72 md:h-72 rounded-full border-2 border-[#D4993D] opacity-60" />

          {/* Date label - orange banner */}
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

          {/* Names */}
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

          {/* Countdown */}
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
          <svg width="2" height="30" viewBox="0 0 2 30" fill="none">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="30"
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
