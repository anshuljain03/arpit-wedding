import React, { useEffect } from "react";
import { motion } from "framer-motion";
import content from "../data/content.json";
import Divider from "../components/ui/Divider";
import { trackPageView } from "../services/analytics";

const CeremoniesPage = () => {
  useEffect(() => {
    trackPageView("Ceremonies");
  }, []);

  const ceremonies = Object.values(content.ceremonies || {}).map(
    (ceremony) => ({
      name: ceremony.title,
      sanskrit_name: ceremony.titleHindi,
      description: ceremony.whatToExpect || ceremony.significance,
      significance: ceremony.significance,
    }),
  );

  const traditions = content.traditions || [
    {
      name: "Mehndi",
      description:
        "Traditional henna ceremony where intricate designs are applied to the bride's hands and feet.",
    },
    {
      name: "Saptapadi",
      description:
        "The seven sacred vows taken while walking around the holy fire.",
    },
    {
      name: "Kanyadaan",
      description: "The ceremonial giving away of the bride by her parents.",
    },
  ];

  return (
    <div className="min-h-screen bg-batik-cream">
      {/* Header */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 batik-bg" />
        <div className="max-w-screen-lg mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-center"
          >
            <span className="text-label tracking-[0.3em] mb-12 block">
              WEDDING TRADITIONS
            </span>
            <h1 className="font-script text-7xl md:text-8xl lg:text-9xl tracking-tight mb-8 text-primary-500">
              Rituals
            </h1>
            <p className="lead">
              <em>Understanding our ceremonies</em>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ceremonies */}
      <section className="py-20 md:py-32">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <Divider motif="floral" className="mb-8" />
            <h2 className="font-script text-4xl lg:text-5xl tracking-tight mb-16 text-center text-primary-500">
              Wedding Ceremonies
            </h2>

            <div className="space-y-8">
              {ceremonies.map((ceremony, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-l-4 border-orange bg-white p-8 border-t border-r border-b border-t-orange/20 border-r-orange/20 border-b-orange/20"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-display font-semibold mb-2 text-primary-500">
                      {ceremony.name}
                    </h3>
                    <p className="font-script text-2xl text-orange">
                      {ceremony.sanskrit_name}
                    </p>
                  </div>

                  <p className="text-base text-primary-400 leading-relaxed mb-6">
                    {ceremony.description}
                  </p>

                  {ceremony.significance &&
                    ceremony.significance !== ceremony.description && (
                      <div className="mt-6 pt-6 border-t-2 border-orange/20">
                        <p className="text-label text-xs mb-3">SIGNIFICANCE</p>
                        <p className="text-sm text-primary-400 leading-relaxed">
                          {ceremony.significance}
                        </p>
                      </div>
                    )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Traditions */}
      <section className="py-20 md:py-32 hero-panel relative overflow-hidden">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <Divider motif="diamond" className="mb-8" />
            <h2 className="font-script text-4xl lg:text-5xl tracking-tight mb-16 text-center text-[#E8C84A]">
              Traditions & Customs
            </h2>

            <div className="space-y-8">
              {traditions.map((tradition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center border-2 border-orange/40 p-8"
                >
                  <h3 className="text-xl font-display font-semibold mb-4 text-[#E8C84A]">
                    {tradition.name}
                  </h3>
                  <p className="text-sm text-cream/80 leading-relaxed max-w-lg mx-auto">
                    {tradition.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guest Guidelines */}
      <section className="py-20 md:py-32 border-t-4 border-orange">
        <div className="max-w-screen-sm mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-center"
          >
            <h2 className="font-script text-3xl tracking-tight mb-12 text-primary-500">
              For Our Guests
            </h2>

            <div className="space-y-8">
              <div>
                <p className="text-label text-xs mb-3">PARTICIPATION</p>
                <p className="text-sm text-primary-400 leading-relaxed">
                  We warmly invite you to participate in our ceremonies. Our
                  families will guide you through each ritual.
                </p>
              </div>

              <div>
                <p className="text-label text-xs mb-3">PHOTOGRAPHY</p>
                <p className="text-sm text-primary-400 leading-relaxed">
                  Feel free to capture moments, but please be respectful during
                  the sacred ceremonies.
                </p>
              </div>

              <div>
                <p className="text-label text-xs mb-3">QUESTIONS</p>
                <p className="text-sm text-primary-400 leading-relaxed">
                  Don't hesitate to ask our family members about any tradition
                  you'd like to understand better.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CeremoniesPage;
