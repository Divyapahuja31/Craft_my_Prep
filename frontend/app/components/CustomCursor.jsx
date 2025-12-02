"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", updateMousePosition);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] bg-gradient-to-br from-[#a8d5e2] to-[#7ec4b6] shadow-sm shadow-emerald-100/50 border border-white/30 backdrop-blur-sm"
                animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
                transition={{ type: "tween", ease: "linear", duration: 0 }}
            />
        </>
    );
}
