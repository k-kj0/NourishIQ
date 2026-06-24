"use client";

import { motion } from "framer-motion";

interface KawaiiCharacterProps {
  emotion?: "happy" | "excited" | "eating" | "sleepy" | "love" | "cool" | "chef" | "wave" | "thinking" | "surprised" | "dancing" | "sleeping";
  size?: number;
  className?: string;
  animate?: boolean;
}

export function KawaiiCharacter({ 
  emotion = "happy", 
  size = 80, 
  className = "",
  animate = true 
}: KawaiiCharacterProps) {

  const getFace = () => {
    switch (emotion) {
      case "happy":
        return (
          <>
            <motion.circle cx="32" cy="28" r="4" fill="#1a1a1a" 
              animate={{ cy: [28, 26, 28] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.circle cx="68" cy="28" r="4" fill="#1a1a1a"
              animate={{ cy: [28, 26, 28] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.path d="M 38 42 Q 50 52 62 42" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round"
              animate={{ d: ["M 38 42 Q 50 52 62 42", "M 38 44 Q 50 54 62 44", "M 38 42 Q 50 52 62 42"] }}
              transition={{ duration: 2, repeat: Infinity }} />
            <circle cx="26" cy="24" r="2" fill="#fbbf24" />
            <circle cx="74" cy="24" r="2" fill="#fbbf24" />
          </>
        );
      case "excited":
        return (
          <>
            <motion.circle cx="32" cy="26" r="5" fill="#1a1a1a"
              animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
            <motion.circle cx="68" cy="26" r="5" fill="#1a1a1a"
              animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} />
            <path d="M 35 42 Q 50 55 65 42" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <motion.path d="M 20 18 L 28 22" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
              animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <motion.path d="M 80 18 L 72 22" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
              animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
          </>
        );
      case "eating":
        return (
          <>
            <circle cx="32" cy="28" r="4" fill="#1a1a1a" />
            <circle cx="68" cy="28" r="4" fill="#1a1a1a" />
            <motion.ellipse cx="50" cy="45" rx="8" ry="5" fill="#1a1a1a"
              animate={{ rx: [8, 10, 8], ry: [5, 7, 5] }} transition={{ duration: 1, repeat: Infinity }} />
            <motion.path d="M 42 50 Q 50 58 58 50" stroke="#f97316" strokeWidth="3" fill="none" strokeLinecap="round"
              animate={{ d: ["M 42 50 Q 50 58 58 50", "M 42 52 Q 50 60 58 52", "M 42 50 Q 50 58 58 50"] }}
              transition={{ duration: 1, repeat: Infinity }} />
          </>
        );
      case "love":
        return (
          <>
            <motion.path d="M 28 24 C 28 18, 36 18, 36 24 C 36 18, 44 18, 44 24 C 44 30, 36 34, 36 34 C 36 34, 28 30, 28 24" fill="#ec4899"
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} />
            <motion.path d="M 56 24 C 56 18, 64 18, 64 24 C 64 18, 72 18, 72 24 C 72 30, 64 34, 64 34 C 64 34, 56 30, 56 24" fill="#ec4899"
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
            <path d="M 38 48 Q 50 56 62 48" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <motion.circle cx="24" cy="18" r="2" fill="#fbbf24" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.circle cx="76" cy="18" r="2" fill="#fbbf24" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
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
            <motion.circle cx="50" cy="0" r="3" fill="#ef4444" opacity="0.6"
              animate={{ cy: [0, -5, 0], opacity: [0.6, 0.3, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
          </>
        );
      case "wave":
        return (
          <>
            <circle cx="32" cy="28" r="4" fill="#1a1a1a" />
            <circle cx="68" cy="28" r="4" fill="#1a1a1a" />
            <path d="M 38 44 Q 50 52 62 44" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <motion.path d="M 75 20 Q 85 15 88 25" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round"
              animate={{ d: ["M 75 20 Q 85 15 88 25", "M 75 18 Q 87 12 90 22", "M 75 20 Q 85 15 88 25"] }}
              transition={{ duration: 0.8, repeat: Infinity }} />
            <circle cx="26" cy="22" r="2" fill="#fbbf24" />
          </>
        );
      case "thinking":
        return (
          <>
            <circle cx="32" cy="28" r="4" fill="#1a1a1a" />
            <circle cx="68" cy="28" r="4" fill="#1a1a1a" />
            <motion.ellipse cx="50" cy="45" rx="4" ry="6" fill="#1a1a1a"
              animate={{ ry: [6, 3, 6] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.circle cx="85" cy="15" r="8" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 2"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.circle cx="85" cy="15" r="4" fill="none" stroke="#9ca3af" strokeWidth="2"
              animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
          </>
        );
      case "surprised":
        return (
          <>
            <motion.circle cx="32" cy="26" r="5" fill="#1a1a1a"
              animate={{ r: [5, 6, 5] }} transition={{ duration: 0.5, repeat: Infinity }} />
            <motion.circle cx="68" cy="26" r="5" fill="#1a1a1a"
              animate={{ r: [5, 6, 5] }} transition={{ duration: 0.5, repeat: Infinity }} />
            <motion.ellipse cx="50" cy="48" rx="6" ry="8" fill="#1a1a1a"
              animate={{ ry: [8, 10, 8] }} transition={{ duration: 0.8, repeat: Infinity }} />
            <motion.circle cx="50" cy="10" r="3" fill="#ef4444" opacity="0.5"
              animate={{ cy: [10, 5, 10] }} transition={{ duration: 1, repeat: Infinity }} />
          </>
        );
      case "dancing":
        return (
          <>
            <circle cx="32" cy="28" r="4" fill="#1a1a1a" />
            <circle cx="68" cy="28" r="4" fill="#1a1a1a" />
            <path d="M 38 42 Q 50 52 62 42" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <motion.circle cx="20" cy="50" r="4" fill="#a3e635"
              animate={{ cy: [50, 40, 50] }} transition={{ duration: 0.5, repeat: Infinity }} />
            <motion.circle cx="80" cy="50" r="4" fill="#a3e635"
              animate={{ cy: [50, 40, 50] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }} />
          </>
        );
      case "sleeping":
        return (
          <>
            <motion.line x1="28" y1="28" x2="36" y2="28" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 3, repeat: Infinity }} />
            <motion.line x1="64" y1="28" x2="72" y2="28" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
            <path d="M 38 44 Q 50 48 62 44" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
            <motion.text x="75" y="15" fontSize="12" fill="#9ca3af" fontFamily="sans-serif"
              animate={{ opacity: [0, 1, 0], y: [15, 5, 15] }} transition={{ duration: 3, repeat: Infinity }}>z</motion.text>
            <motion.text x="82" y="10" fontSize="10" fill="#9ca3af" fontFamily="sans-serif"
              animate={{ opacity: [0, 1, 0], y: [10, 0, 10] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>z</motion.text>
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
      initial={animate ? { scale: 0, rotate: -10 } : false}
      animate={animate ? { scale: 1, rotate: 0 } : false}
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
          <linearGradient id="cheekGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>

        {/* Body */}
        <ellipse cx="50" cy="55" rx="35" ry="32" fill="url(#bodyGrad)" />
        <ellipse cx="50" cy="55" rx="28" ry="25" fill="#a3e635" opacity="0.5" />

        {/* Leaf on top */}
        <motion.path 
          d="M 50 23 Q 35 8 25 18 Q 35 5 50 15 Q 65 5 75 18 Q 65 8 50 23" 
          fill="url(#leafGrad)"
          animate={animate ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "50px 15px" }}
        />

        {/* Decorative circles */}
        <circle cx="50" cy="55" r="30" fill="none" stroke="#bef264" strokeWidth="1" opacity="0.4" />
        <circle cx="50" cy="55" r="24" fill="none" stroke="#bef264" strokeWidth="0.5" opacity="0.3" />

        {/* Small leaves on sides */}
        <motion.circle cx="18" cy="50" r="6" fill="#84cc16" opacity="0.6"
          animate={animate ? { y: [0, -3, 0] } : {}} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="82" cy="50" r="6" fill="#84cc16" opacity="0.6"
          animate={animate ? { y: [0, -3, 0] } : {}} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
        <circle cx="22" cy="45" r="3" fill="#a3e635" opacity="0.5" />
        <circle cx="78" cy="45" r="3" fill="#a3e635" opacity="0.5" />

        {/* Cheeks */}
        <ellipse cx="25" cy="38" rx="5" ry="3" fill="url(#cheekGrad)" opacity="0.6" />
        <ellipse cx="75" cy="38" rx="5" ry="3" fill="url(#cheekGrad)" opacity="0.6" />

        {getFace()}
      </svg>
    </motion.div>
  );
}
