import React from "react";
import Divider from "../ui/Divider";

const Footer = () => {
  return (
    <footer className="bg-primary-900 border-t-4 border-orange relative overflow-hidden">
      {/* Batik pattern overlay on footer */}
      <div className="absolute inset-0 batik-bg opacity-30" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 relative z-10">
        <div className="flex justify-center mb-8">
          <Divider motif="floral" />
        </div>
        <div className="text-center">
          <p className="font-script text-4xl text-[#E8C84A] mb-4">
            Prerna & Arpit
          </p>
          <p className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-cream/60">
            April 24 — 25, 2026 · Nashik
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
