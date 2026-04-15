"use client";

import { motion } from "framer-motion";
import React from "react";
import { AnimatedText } from "./AnimatedText";

interface HolaMundoProps {
  title: string;
  subtitle: string;
  description: string;
}

export const HolaMundo: React.FC<HolaMundoProps> = ({ title, subtitle, description }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto p-8 rounded-3xl overflow-hidden shadow-[0_0_80px_-15px_rgba(251,191,36,0.1)] bg-slate-900/50 backdrop-blur-sm border border-slate-700/50">
      
      {/* Background Glow effects */}
      <div className="absolute -top-[150px] -left-[150px] w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[150px] -right-[150px] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center justify-center text-center space-y-6">
        
        {/* Title */}
        <AnimatedText text={title} />
        
        {/* Decorator line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
        ></motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-lg md:text-2xl text-slate-300 font-medium tracking-wide font-secondary"
        >
          {subtitle}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-sm md:text-base text-slate-400 max-w-md mt-4 font-secondary leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
};
