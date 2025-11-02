"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

/**
 * Preloader Component
 * Displays a paper-craft style loading animation with a robot character
 * and unfolding text letters.
 */
export default function Preloader({
    text = "LOADING",
    letterDelay = 80,
    unfoldDuration = 600,
    exitDuration = 500,
    minDisplayTime = 2000,
    onComplete,
}) {
    const [isVisible, setIsVisible] = useState(true);

    // Calculate total animation time to ensure smooth exit
    const totalAnimationTime = useMemo(() => {
        const letterCount = Math.max(0, (text?.length || 0) - 1);
        return (letterCount * letterDelay) + unfoldDuration;
    }, [text, letterDelay, unfoldDuration]);

    useEffect(() => {
        // Ensure the preloader stays visible for at least minDisplayTime
        // or until the animation completes, whichever is longer.
        const duration = Math.max(minDisplayTime, totalAnimationTime + 800);

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [totalAnimationTime, minDisplayTime]);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: exitDuration / 1000 }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={paperBackgroundStyle}
                    role="status"
                    aria-label="Loading"
                >
                    <div className="pointer-events-none select-none flex flex-col items-center gap-6 sm:gap-8">
                        <CharacterScene />
                        <TextTiles text={text} letterDelay={letterDelay} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function CharacterScene() {
    return (
        <div className="relative w-full max-w-[1100px] h-[45vh] sm:h-[50vh] flex items-center justify-center mx-auto">
            {/* Sparkle Effect */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-[8%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="h-16 w-px bg-white/60 blur-[0.3px]" />
            </motion.div>

            {/* Floating Elements */}
            <FloatingIcon className="left-[8%] top-[24%]" type="heart" delay={0} />
            <FloatingIcon className="right-[10%] top-[22%]" type="clipboard" delay={0.2} />
            <FloatingIcon className="right-[22%] top-[5%]" type="cap" delay={0.4} />
            <FloatingIcon className="left-[22%] top-[6%]" type="search" delay={0.6} />

            {/* Main Robot Character */}
            <motion.div
                className="relative"
                animate={{ y: [0, -10, 0], rotate: [0, -2, 0, 2, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
                <Image
                    src="/robot.png"
                    alt="Loading Character"
                    width={1200}
                    height={1200}
                    priority
                    className="w-[60vw] sm:w-[50vw] max-w-[700px] h-auto drop-shadow-2xl mx-auto"
                />
            </motion.div>
        </div>
    );
}

function FloatingIcon({ className = "", type = "clipboard", delay = 0 }) {
    return (
        <motion.div
            className={`absolute ${className}`}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
        >
            {type === "clipboard" && <ClipboardIcon className="w-16 sm:w-20 opacity-80" />}
            {type === "cap" && <CapIcon className="w-16 sm:w-20 opacity-80" />}
            {type === "search" && <SearchIcon className="w-14 sm:w-16 opacity-80" />}
            {type === "heart" && <HeartIcon className="w-16 sm:w-20 opacity-80" />}
        </motion.div>
    );
}

function TextTiles({ text, letterDelay = 120 }) {
    return (
        <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
            {Array.from(text).map((char, i) => (
                char === " " ? (
                    <span key={`space-${i}`} className="w-2 sm:w-3" />
                ) : (
                    <Tile key={`${char}-${i}`} char={char} index={i} delay={letterDelay} />
                )
            ))}
        </div>
    );
}

function Tile({ char, index, delay = 120 }) {
    const colors = [
        "#c7f0d8", // mint
        "#fde4c8", // peach
        "#dbeafe", // light blue
        "#e9d5ff", // lavender
        "#fff5cc", // pale yellow
        "#e2f2ff", // sky
    ];

    const backgroundColor = colors[index % colors.length];
    const delaySeconds = (index * Math.max(0, delay)) / 1000;

    return (
        <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl grid place-items-center"
            style={{
                backgroundColor,
                boxShadow: "0 12px 22px rgba(0,0,0,0.14), 0 4px 10px rgba(0,0,0,0.10), inset 0 0 0 1px rgba(0,0,0,0.05)",
            }}
            initial={{ y: -12, scale: 0.9, opacity: 0 }}
            animate={{ y: [-12, 0, -4, 0], scale: [0.9, 1.02, 1, 1], opacity: 1 }}
            transition={{
                duration: 1.8,
                delay: delaySeconds,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0.6,
                times: [0, 0.35, 0.65, 1]
            }}
        >
            <span className="font-bold text-gray-700 text-lg sm:text-xl md:text-2xl tracking-widest">
                {char}
            </span>
        </motion.div>
    );
}

// --- SVG Assets ---

function ClipboardIcon({ className = "" }) {
    return (
        <svg viewBox="0 0 64 64" className={className}>
            <rect x="14" y="10" width="36" height="48" rx="6" fill="#fff" stroke="#c7ced6" />
            <rect x="24" y="6" width="16" height="10" rx="4" fill="#ffd9a3" />
            <rect x="20" y="24" width="24" height="4" rx="2" fill="#c7ced6" />
            <rect x="20" y="32" width="20" height="4" rx="2" fill="#dbe2ea" />
        </svg>
    );
}

function CapIcon({ className = "" }) {
    return (
        <svg viewBox="0 0 64 64" className={className}>
            <path d="M8 28 L32 16 L56 28 L32 40 Z" fill="#bfe7a8" stroke="#8ac07a" />
            <rect x="20" y="40" width="24" height="6" rx="3" fill="#a8e6f0" />
        </svg>
    );
}

function SearchIcon({ className = "" }) {
    return (
        <svg viewBox="0 0 64 64" className={className}>
            <circle cx="28" cy="28" r="14" stroke="#7ccbd9" strokeWidth="6" fill="none" />
            <line x1="38" y1="38" x2="52" y2="52" stroke="#7ccbd9" strokeWidth="6" strokeLinecap="round" />
        </svg>
    );
}

function HeartIcon({ className = "" }) {
    return (
        <svg viewBox="0 0 64 64" className={className}>
            <rect x="8" y="12" width="48" height="40" rx="6" fill="#ffe9ed" stroke="#f7c6cf" />
            <path d="M32 40c8-6 12-10 12-16a6 6 0 0 0-12-2 6 6 0 0 0-12 2c0 6 4 10 12 16Z" fill="#ff9db1" />
        </svg>
    );
}

// --- Styles ---

const paperBackgroundStyle = {
    backgroundColor: "#efe7d1",
    backgroundImage: [
        "radial-gradient(1200px 800px at 50% 40%, rgba(0,0,0,0.08), rgba(0,0,0,0) 55%)",
        "radial-gradient(10px 8px at 20% 30%, rgba(0,0,0,0.03), transparent 60%)",
        "radial-gradient(12px 10px at 70% 65%, rgba(0,0,0,0.025), transparent 60%)",
        "radial-gradient(9px 9px at 40% 80%, rgba(0,0,0,0.02), transparent 60%)",
        "repeating-linear-gradient(135deg, rgba(255,255,255,0.35) 0 2px, rgba(255,255,255,0) 2px 8px)",
    ].join(","),
    backgroundBlendMode: "multiply, normal, normal, normal, screen",
};
