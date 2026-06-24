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
            <circle cx="32" cy="28" r="4" fill="#1a1a1a" />
            <circle cx="68" cy="28" r="4" fill="#1a1a1a" />
            <path d="M 38 42 Q 50 52 62 42" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="26" cy="24" r="2" fill="#fbbf24" />
          </>
        );
      case "excited":
        return (
          <>
            <circle cx="32" cy="26" r="5" fill="#1a1a1a" />
            <circle cx="68" cy="26" r="5" fill="#1a1a1a" />
            <path d="M 35 42 Q 50 55 65 42" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 20 18 L 28 22" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
            <path d="M 80 18 L 72 22" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case "eating":
        return (
          <>
            <circle cx="32" cy="28" r="4" fill="#1a1a1a" />
            <circle cx="68" cy="28" r="4" fill="#1a1a1a" />
            <ellipse cx="50" cy="45" rx="8" ry="5" fill="#1a1a1a" />
            <path d="M 42 50 Q 50 58 58 50" stroke="#f97316" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "love":
        return (
          <>
            <path d="M 28 24 C 28 18, 36 18, 36 24 C 36 18, 44 18, 44 24 C 44 30, 36 34, 36 34 C 36 34, 28 30, 28 24" fill="#ec4899" />
            <path d="M 56 24 C 56 18, 64 18, 64 24 C 64 18, 72 18, 72 24 C 72 30, 64 34, 64 34 C 64 34, 56 30, 56 24" fill="#ec4899" />
            <path d="M 38 48 Q 50 56 62 48" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="24" cy="18" r="2" fill="#fbbf24" />
            <circle cx="76" cy="18" r="2" fill="#fbbf24" />
          </>
        );
      case "chef":
        return (
          <>
            <circle cx="32" cy="28" r="4" fill="#1a1a1a" />
            <circle cx="68" cy="28" r="4" fill="#1a1a1a" />
            <path d="M 38 42 Q 50 50 62 42" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <rect x="30" y="8" width="40" height="12" rx="4" fill="#f97316" />
            <rect x="35" y="4" width="30" height="8" rx="3" fill="#fff" stroke="#f97316" strokeWidth="2" />
          </>
        );
      case "wave":
        return (
          <>
            <circle cx="32" cy="28" r="4" fill="#1a1a1a" />
            <circle cx="68" cy="28" r="4" fill="#1a1a1a" />
            <path d="M 38 44 Q 50 52 62 44" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 75 20 Q 85 15 88 25" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="26" cy="22" r="2" fill="#fbbf24" />
          </>
        );
      default:
        return (
          <>
            <circle cx="32" cy="28" r="4" fill="#1a1a1a" />
            <circle cx="68" cy="28" r="4" fill="#1a1a1a" />
            <path d="M 38 42 Q 50 52 62 42" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <motion.div
      className={className}
      style={{ width: size, height: size }}
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="55" rx="35" ry="32" fill="url(#bodyGrad)" />
        <ellipse cx="50" cy="55" rx="28" ry="25" fill="#a3e635" opacity="0.5" />
        <path d="M 50 23 Q 35 8 25 18 Q 35 5 50 15 Q 65 5 75 18 Q 65 8 50 23" fill="url(#leafGrad)" />
        <circle cx="50" cy="55" r="30" fill="none" stroke="#bef264" strokeWidth="1" opacity="0.4" />
        <circle cx="50" cy="55" r="24" fill="none" stroke="#bef264" strokeWidth="0.5" opacity="0.3" />
        <circle cx="18" cy="50" r="6" fill="#84cc16" opacity="0.6" />
        <circle cx="82" cy="50" r="6" fill="#84cc16" opacity="0.6" />
        <circle cx="22" cy="45" r="3" fill="#a3e635" opacity="0.5" />
        <circle cx="78" cy="45" r="3" fill="#a3e635" opacity="0.5" />
        {getFace()}
      </svg>
    </motion.div>
  );
}
