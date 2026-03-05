import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, Train, Car } from "lucide-react";
import content from "../data/content.json";
import Divider from "../components/ui/Divider";
import { trackPageView } from "../services/analytics";

const TravelPage = () => {
  useEffect(() => {
    trackPageView("Travel");
  }, []);

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
              TRAVEL INFORMATION
            </span>
            <h1 className="font-script text-7xl md:text-8xl lg:text-9xl tracking-tight mb-8 text-primary-500">
              Getting There
            </h1>
            <p className="lead">
              <em>Nashik, Maharashtra</em>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Transportation Options */}
      <section className="py-20 md:py-32">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-12"
          >
            {/* By Air */}
            <div className="border-l-4 border-orange bg-white p-8 border-t border-r border-b border-t-orange/20 border-r-orange/20 border-b-orange/20">
              <div className="flex items-start gap-4 mb-6">
                <Plane className="w-5 h-5 text-orange mt-0.5" strokeWidth={2} />
                <h3 className="text-label">BY AIR</h3>
              </div>
              <div className="ml-9 space-y-4">
                <p className="text-lg font-semibold leading-relaxed text-primary-500">
                  Nashik Airport (ISK) · 20km from city · 35km from venue
                </p>
                <p className="text-sm text-primary-400">
                  Direct IndiGo flights available from Delhi, Bangalore,
                  Ahmedabad, and Goa. Alternative option: Mumbai Airport
                  (180km).
                </p>
              </div>
            </div>

            {/* By Train */}
            <div className="border-l-4 border-orange bg-white p-8 border-t border-r border-b border-t-orange/20 border-r-orange/20 border-b-orange/20">
              <div className="flex items-start gap-4 mb-6">
                <Train className="w-5 h-5 text-orange mt-0.5" strokeWidth={2} />
                <h3 className="text-label">BY TRAIN</h3>
              </div>
              <div className="ml-9 space-y-4">
                <p className="text-lg font-semibold leading-relaxed text-primary-500">
                  Nashik Road Station · 8km from venue
                </p>
                <p className="text-sm text-primary-400">
                  Well-connected railway junction with direct trains from all
                  major cities. Frequent connectivity from Mumbai, Delhi, and
                  Bangalore.
                </p>
              </div>
            </div>

            {/* By Road */}
            <div className="border-l-4 border-orange bg-white p-8 border-t border-r border-b border-t-orange/20 border-r-orange/20 border-b-orange/20">
              <div className="flex items-start gap-4 mb-6">
                <Car className="w-5 h-5 text-orange mt-0.5" strokeWidth={2} />
                <h3 className="text-label">BY ROAD</h3>
              </div>
              <div className="ml-9 space-y-4">
                <p className="text-lg font-semibold leading-relaxed text-primary-500">
                  Mumbai-Nashik: 180 km · 3-4 hours
                </p>
                <p className="text-sm text-primary-400">
                  Well-connected by highways. Pune-Nashik: 210 km (4-5 hours).
                  Taxi and bus services readily available.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* From Major Cities */}
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
              From Major Cities
            </h2>

            <div className="space-y-12">
              {[
                {
                  city: "Delhi",
                  flight: {
                    info: "IndiGo 6E2036 · Direct · 2 hours",
                    time: "Daily at 06:55",
                  },
                  train: {
                    info: "Punjab Mail · CSMT Rajdhani",
                    time: "18-22 hours · 1355 km",
                  },
                },
                {
                  city: "Bangalore",
                  flight: {
                    info: "IndiGo 6E6547 · Direct · 1.5 hours",
                    time: "Daily at 14:30",
                  },
                  train: {
                    info: "Via Manmad Junction",
                    time: "24-26 hours · 7 trains available",
                  },
                },
                {
                  city: "Mumbai",
                  flight: {
                    info: "NH160 Highway · 180 km",
                    time: "3-4 hours drive",
                    label: "ROAD",
                  },
                  train: {
                    info: "Multiple daily trains",
                    time: "3-4 hours · Most frequent",
                  },
                },
                {
                  city: "Kanpur",
                  flight: {
                    info: "Via Delhi · 4-5 hours total",
                    time: "IndiGo connections",
                  },
                  train: {
                    info: "Direct & via Delhi",
                    time: "Multiple options available",
                  },
                },
              ].map((route) => (
                <motion.div
                  key={route.city}
                  className="border-2 border-orange/40 p-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-display font-semibold mb-6 text-[#E8C84A]">
                    {route.city}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8 text-sm">
                    <div>
                      <p className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-orange mb-3">
                        {route.flight.label || "FLIGHT"}
                      </p>
                      <p className="font-semibold leading-relaxed mb-2 text-cream">
                        {route.flight.info}
                      </p>
                      <p className="text-cream/60 mb-4">{route.flight.time}</p>
                    </div>
                    <div>
                      <p className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-orange mb-3">
                        TRAIN
                      </p>
                      <p className="font-semibold leading-relaxed mb-2 text-cream">
                        {route.train.info}
                      </p>
                      <p className="text-cream/60 mb-4">{route.train.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Notes */}
      <section className="py-20 md:py-32 border-t-4 border-orange">
        <div className="max-w-screen-sm mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-8"
          >
            <div>
              <p className="text-label text-xs mb-3">FLIGHT BOOKINGS</p>
              <p className="text-sm leading-relaxed text-primary-400">
                Schedules for April 2026 will be available from May-June 2025
              </p>
            </div>

            <div>
              <p className="text-label text-xs mb-3">TRAIN BOOKINGS</p>
              <p className="text-sm leading-relaxed text-primary-400">
                IRCTC bookings open 120 days in advance
              </p>
            </div>

            <div>
              <p className="text-label text-xs mb-3">LOCAL TRANSPORT</p>
              <p className="text-sm leading-relaxed text-primary-400">
                Taxis readily available. Uber and Ola operate in Nashik.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TravelPage;
