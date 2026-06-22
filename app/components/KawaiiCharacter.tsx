"use client";

import { motion } from "framer-motion";

interface KawaiiCharacterProps {
  emotion?: "happy" | "excited" | "eating" | "sleepy" | "love" | "cool" | "chef" | "wave";
  size?: number;
  className?: string;
}

export function KawaiiCharacter({ emotion = "happy", size = 80, className = "" }: KawaiiCharacterProps) {
  const getFace = () => {
    switch (emotion) {
      case "happy":
        return (
          <>
            <ellipse cx="35" cy="38" rx="5" ry="7" fill="#1a1a1a" />
            <ellipse cx="65" cy="38" rx="5" ry="7" fill="#1a1a1a" />
            <path d="M 42 48 Q 50 55 58 48" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="28" cy="42" rx="3" ry="2" fill="#ffb6c1" opacity="0.6" />
            <ellipse cx="72" cy="42" rx="3" ry="2" fill="#ffb6c1" opacity="0.6" />
          </>
        );
      case "excited":
        return (
          <>
            <ellipse cx="35" cy="36" rx="6" ry="8" fill="#1a1a1a" />
            <ellipse cx="65" cy="36" rx="6" ry="8" fill="#1a1a1a" />
            <path d="M 40 50 Q 50 60 60 50" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="28" cy="40" rx="3" ry="2" fill="#ffb6c1" opacity="0.6" />
            <ellipse cx="72" cy="40" rx="3" ry="2" fill="#ffb6c1" opacity="0.6" />
            <path d="M 25 28 L 30 32" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            <path d="M 75 28 L 70 32" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case "eating":
        return (
          <>
            <ellipse cx="35" cy="38" rx="5" ry="7" fill="#1a1a1a" />
            <ellipse cx="65" cy="38" rx="5" ry="7" fill="#1a1a1a" />
            <circle cx="50" cy="52" r="6" fill="#1a1a1a" />
            <ellipse cx="28" cy="42" rx="3" ry="2" fill="#ffb6c1" opacity="0.6" />
            <ellipse cx="72" cy="42" rx="3" ry="2" fill="#ffb6c1" opacity="0.6" />
            <path d="M 62 52 Q 68 48 72 52" stroke="#84cc16" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case "love":
        return (
          <>
            <path d="M 30 38 Q 35 32 40 38 Q 35 44 30 38" fill="#ef4444" />
            <path d="M 60 38 Q 65 32 70 38 Q 65 44 60 38" fill="#ef4444" />
            <path d="M 42 50 Q 50 58 58 50" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="28" cy="44" rx="3" ry="2" fill="#ffb6c1" opacity="0.6" />
            <ellipse cx="72" cy="44" rx="3" ry="2" fill="#ffb6c1" opacity="0.6" />
          </>
        );
      case "chef":
        return (
          <>
            <ellipse cx="35" cy="38" rx="5" ry="7" fill="#1a1a1a" />
            <ellipse cx="65" cy="38" rx="5" ry="7" fill="#1a1a1a" />
            <path d="M 42 48 Q 50 55 58 48" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <rect x="25" y="8" width="50" height="12" rx="6" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" />
            <rect x="30" y="4" width="40" height="8" rx="4" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" />
          </>
        );
      case "wave":
        return (
          <>
            <ellipse cx="35" cy="38" rx="5" ry="7" fill="#1a1a1a" />
            <ellipse cx="65" cy="38" rx="5" ry="7" fill="#1a1a1a" />
            <path d="M 42 48 Q 50 55 58 48" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="28" cy="42" rx="3" ry="2" fill="#ffb6c1" opacity="0.6" />
            <ellipse cx="72" cy="42" rx="3" ry="2" fill="#ffb6c1" opacity="0.6" />
            <motion.g
              animate={{ rotate: [0, -15, 0, 15, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ originX: "85", originY: "60" }}
            >
              <ellipse cx="85" cy="60" rx="8" ry="5" fill="#84cc16" />
            </motion.g>
          </>
        );
      default:
        return (
          <>
            <ellipse cx="35" cy="38" rx="5" ry="7" fill="#1a1a1a" />
            <ellipse cx="65" cy="38" rx="5" ry="7" fill="#1a1a1a" />
            <path d="M 42 48 Q 50 55 58 48" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      animate={{ y: [0, -5, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <ellipse cx="50" cy="65" rx="35" ry="28" fill="#84cc16" />
      <ellipse cx="50" cy="65" rx="30" ry="22" fill="#a3e635" />
      <circle cx="50" cy="40" r="28" fill="#fef9f0" />
      <circle cx="50" cy="40" r="24" fill="#ffffff" />
      <path d="M 50 14 Q 45 8 42 12 Q 48 16 50 14" fill="#16a34a" />
      <path d="M 50 14 Q 55 8 58 12 Q 52 16 50 14" fill="#84cc16" />
      {getFace()}
      <ellipse cx="22" cy="62" rx="8" ry="5" fill="#84cc16" transform="rotate(-20 22 62)" />
      <ellipse cx="78" cy="62" rx="8" ry="5" fill="#84cc16" transform="rotate(20 78 62)" />
      <ellipse cx="38" cy="88" rx="6" ry="4" fill="#84cc16" />
      <ellipse cx="62" cy="88" rx="6" ry="4" fill="#84cc16" />
      <motion.circle cx="15" cy="25" r="2" fill="#fbbf24" animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.circle cx="85" cy="20" r="1.5" fill="#a855f7" animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      <motion.circle cx="12" cy="70" r="1.5" fill="#f97316" animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
    </motion.svg>
  );
}
