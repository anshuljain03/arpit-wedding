import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Hero from "../components/sections/Hero";
import Divider from "../components/ui/Divider";
import { trackPageView, trackClick } from "../services/analytics";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView("Home");
  }, []);

  return (
    <>
      <Hero />

      {/* Essential Information - Green Section */}
      <section className="hero-panel py-32 relative overflow-hidden">
        <div className="absolute inset-0 batik-bg opacity-20" />
        <div className="max-w-screen-md mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-6xl font-script text-[#E8C84A] mb-20">
              Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="border-2 border-orange/40 p-6">
                <p className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-orange mb-3">
                  Venue
                </p>
                <p className="text-lg font-semibold text-cream">
                  Radisson Nashik
                </p>
              </div>

              <div className="border-2 border-orange/40 p-6">
                <p className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-orange mb-3">
                  When
                </p>
                <p className="text-lg font-semibold text-cream">
                  April 24 — 25, 2026
                </p>
              </div>

              <div className="border-2 border-orange/40 p-6">
                <p className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-orange mb-3">
                  Where
                </p>
                <p className="text-lg font-semibold text-cream">
                  Nashik, Maharashtra
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => {
                trackClick("Details RSVP Button");
                navigate("/rsvp");
              }}
              className="mt-20 bg-orange hover:bg-orange-dark text-white font-sans text-sm font-bold tracking-[0.2em] uppercase px-12 py-4 border-2 border-[#E8C84A] transition-all duration-300 hover:shadow-lg hover:shadow-orange/40 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              RSVP Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="bg-batik-cream py-32">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12 text-center">
          <Divider motif="floral" className="mb-12" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-script text-4xl text-[#D4993D] mb-6">
              With Love
            </p>
            <p className="text-2xl lg:text-3xl font-display font-semibold leading-relaxed text-primary-500">
              Your presence at our wedding
              <br />
              is the greatest gift of all
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
