import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/sections/Hero";
import Divider from "../components/ui/Divider";
import { trackPageView, trackClick } from "../services/analytics";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView("Home");
  }, []);

  const sections = [
    {
      number: "01",
      title: "Schedule",
      subtitle: "Two days of celebration",
      path: "/events",
      description: "Sangeet, Ceremony & Reception",
    },
    {
      number: "02",
      title: "RSVP",
      subtitle: "Confirm your attendance",
      path: "/rsvp",
      description: "Let us know you'll be there",
      highlight: true,
    },
    {
      number: "03",
      title: "Travel",
      subtitle: "Plan your journey",
      path: "/travel",
      description: "Flights, Hotels & Transport",
    },
    {
      number: "04",
      title: "Guide",
      subtitle: "Ceremony traditions",
      path: "/ceremonies",
      description: "Understanding our rituals",
    },
  ];

  const handleSectionClick = (section) => {
    trackClick("Section Card", { title: section.title, path: section.path });
    navigate(section.path);
  };

  return (
    <>
      <Hero />

      {/* Section Navigation */}
      <section className="bg-batik-cream py-32 batik-bg">
        <div className="max-w-screen-lg mx-auto px-6 lg:px-12">
          <div className="space-y-4">
            {sections.map((section, index) => (
              <motion.div
                key={section.path}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onClick={() => handleSectionClick(section)}
                className={`
                  group bg-white border-l-4 border-orange py-8 px-8 cursor-pointer transition-all duration-300
                  hover:pl-10 hover:bg-primary-500 hover:text-cream
                  ${section.highlight ? "border-l-[6px]" : ""}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-8">
                    <span className="text-orange font-bold text-sm">
                      {section.number}
                    </span>
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-primary-500 group-hover:text-cream mb-1 transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-primary-400 group-hover:text-cream/70 font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className="text-orange group-hover:text-[#E8C84A] transition-all duration-300 group-hover:translate-x-2"
                    size={20}
                    strokeWidth={2}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Information - Deep Green Section */}
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
      <section className="bg-batik-cream py-32 border-t-4 border-orange">
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
