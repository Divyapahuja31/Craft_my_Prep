"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
// import { useSession, signOut } from "next-auth/react"; // Auth disabled temporarily

export default function Sidebar() {
    const pathname = usePathname();
    // const { data: session } = useSession(); // Auth disabled
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { icon: "🔍", label: "My Plans", href: "/dashboard" },
        { icon: "🤖", label: "Generate Plan", href: "/generate" },
        { icon: "🚀", label: "New Features", href: "/features" },
        { icon: "🧪", label: "Test APIs", href: "/test-api" },
        { icon: "📊", label: "Progress", href: "/progress" },
        { icon: "📝", label: "Notes", href: "/notes" },
        { icon: "🏆", label: "Leaderboard", href: "/leaderboard" },
        { icon: "💡", label: "Company Insights", href: "/insights" },
        { icon: "⚡", label: "Mini Projects", href: "/projects" },
        { icon: "ℹ️", label: "About", href: "/about" },
    ];

    return (
        <>
            {/* Mobile & Tablet Menu Button - Hidden only on desktop (xl screens) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden fixed top-4 left-4 z-[100] p-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/80 shadow-lg hover:bg-white transition-all active:scale-95 touch-manipulation cursor-pointer"
                type="button"
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                <svg className="w-6 h-6 text-gray-700 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Overlay for mobile & tablet */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="xl:hidden fixed inset-0 bg-black/50 z-40"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar - Always visible on desktop (xl), slide-in on mobile/tablet */}
            <aside
                className={`${isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
                    } fixed xl:sticky top-0 left-0 w-[280px] sm:w-72 max-w-[85vw] min-h-screen bg-gradient-to-b from-[#a8d5e2]/95 to-[#c7f0d8]/95 xl:from-[#a8d5e2]/30 xl:to-[#c7f0d8]/30 backdrop-blur-md border-r border-white/30 p-4 sm:p-6 pt-20 xl:pt-6 z-[45] overflow-y-auto transition-transform duration-300 ease-in-out shadow-2xl xl:shadow-none`}
            >
                {/* Logo */}
                <Link href="/" onClick={() => setIsOpen(false)}>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="mb-6 sm:mb-8 flex items-center gap-3 cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7ec4b6] to-[#6eb4a6] flex items-center justify-center shadow-lg">
                            <span className="text-xl">✨</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Craft My Prep</h1>
                    </motion.div>
                </Link>

                {/* Navigation */}
                <nav className="space-y-3">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    className={`flex items-center gap-4 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl transition-all cursor-pointer ${isActive
                                            ? "bg-white/70 shadow-md border border-white/80"
                                            : "bg-white/40 hover:bg-white/60"
                                        }`}
                                >
                                    <span className="text-lg sm:text-xl">{item.icon}</span>
                                    <span className="font-medium text-sm sm:text-base text-gray-800">{item.label}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section - Disabled until next-auth is installed */}
                {/* 
        {session && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 sm:mt-8 p-3 sm:p-4 bg-white/50 backdrop-blur-sm rounded-2xl"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3">
              <img 
                src={session.user.image} 
                alt={session.user.name}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">{session.user.name}</p>
                <p className="text-xs text-gray-600 truncate">{session.user.email}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signOut()}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all"
            >
              Sign Out
            </motion.button>
          </motion.div>
        )}
        */}

                {/* Mascot Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-auto pt-6 sm:pt-8 pb-4"
                >
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 text-center">
                        <div className="text-5xl sm:text-6xl mb-2">🤖</div>
                        <p className="text-xs sm:text-sm text-gray-700 font-medium">
                            Your AI buddy Vibe is here to help!
                        </p>
                    </div>
                </motion.div>
            </aside>
        </>
    );
}
