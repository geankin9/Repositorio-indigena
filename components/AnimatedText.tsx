"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedTextProps {
  text: string;
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delay = 0 }) => {
  // Dividimos el texto en palabras para animarlo y dejar los espacios limpios
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.h1
      className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-50 to-amber-200"
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}
    >
      {words.map((word, index) => (
        <span key={index} style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
          {word.split("").map((letter, index) => (
            <motion.span variants={child} key={index}>
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
};
