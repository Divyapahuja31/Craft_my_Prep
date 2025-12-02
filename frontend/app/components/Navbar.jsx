"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    const { user } = useAuth();
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [showResourcesMenu, setShowResourcesMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="sticky top-0 z-50 px-4 sm:px-8 py-4"
            onMouseLeave={() => {
                setShowMegaMenu(false);
                setShowResourcesMenu(false);
            }}
        >
            <div className="max-w-4xl mx-auto relative">
                <div className="relative rounded-full">
                    {/* Animated Background */}
                    <motion.div
                        className="absolute inset-0 opacity-20 rounded-full bg-gradient-to-br from-white/40 to-white/10"
                        animate={{
                            background: [
                                "linear-gradient(135deg, rgba(168, 213, 186, 0.2) 0%, rgba(123, 168, 212, 0.2) 100%)",
                                "linear-gradient(135deg, rgba(123, 168, 212, 0.2) 0%, rgba(212, 197, 169, 0.2) 100%)",
                                "linear-gradient(135deg, rgba(212, 197, 169, 0.2) 0%, rgba(168, 213, 186, 0.2) 100%)",
                            ],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Glass Container */}
                    <div className="relative px-5 py-3 border border-white/60 rounded-full bg-white/70 backdrop-blur-xl shadow-lg">
                        <div className="flex justify-between items-center relative z-10">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2 group">
                                <motion.div
                                    className="w-12 h-12 flex items-center justify-center"
                                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                >
                                    <img 
                                        src="/profile-pic.png" 
                                        alt="Logo" 
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                                <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight group-hover:text-gray-900 transition-colors">
                                    Craft My Prep
                                </h1>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-1">
                                <NavButton onMouseEnter={() => { setShowMegaMenu(true); setShowResourcesMenu(false); }}>
                                    Features
                                </NavButton>
                                <NavButton onMouseEnter={() => { setShowResourcesMenu(true); setShowMegaMenu(false); }}>
                                    Resources
                                </NavButton>
                                <NavLink href="/blog">Blog</NavLink>
                                <NavLink href="/about">About</NavLink>
                            </nav>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-white/40 transition-colors text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>

                            {/* Action Buttons */}
                            <div className="hidden md:flex items-center gap-2">
                                {user ? (
                                    <div className="flex items-center gap-3">
                                        <Link href="/dashboard" className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-700 bg-white/50 border border-white/80 hover:bg-white/80 transition-colors shadow-sm">
                                            Dashboard
                                        </Link>
                                        <Link href="/dashboard/profile">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold overflow-hidden shadow-md border-2 border-white/80 hover:scale-105 transition-transform">
                                                <img
                                                    src={user.avatar || `https://robohash.org/${user.name || 'user'}.png`}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-800 bg-white/50 border border-white/80 hover:bg-white/80 transition-colors shadow-sm"
                                            >
                                                Login
                                            </motion.button>
                                        </Link>

                                        <Link href="/dashboard/generate">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gray-900 hover:bg-gray-800 shadow-md transition-colors"
                                            >
                                                Try Free
                                            </motion.button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mega Menus */}
                    <AnimatePresence>
                        {showMegaMenu && (
                            <MegaMenu onClose={() => setShowMegaMenu(false)}>
                                <MegaMenuItem icon="🤖" title="Generate Plan" desc="Create your custom prep plan" href="/dashboard/generate" color="#a8d5ba" />
                                <MegaMenuItem icon="📊" title="My Plans" desc="View your saved roadmaps" href="/dashboard/my-plans" color="#7ba8d4" />
                                <MegaMenuItem icon="⚡" title="Mini Projects" desc="Build real-world projects" href="/dashboard/projects" color="#ffd9a3" />
                                <MegaMenuItem icon="�" title="Daily Challenge" desc="Solve a new problem every day" href="/dashboard" color="#ff9999" />
                                <MegaMenuItem icon="�" title="Company Questions" desc="Practice company-specific Qs" href="/dashboard/company-questions" color="#c9b5ff" />
                                <MegaMenuItem icon="🏆" title="Leaderboard" desc="Compete with others" href="/dashboard/leaderboard" color="#ffd700" />
                            </MegaMenu>
                        )}

                        {showResourcesMenu && (
                            <MegaMenu onClose={() => setShowResourcesMenu(false)}>
                                <MegaMenuItem icon="📚" title="Documentation" desc="Complete guides and tutorials" href="/dashboard/resources" color="#ffd9a3" />
                                <MegaMenuItem icon="🎥" title="Video Tutorials" desc="Step-by-step video guides" href="/dashboard/resources" color="#ff9999" />
                                <MegaMenuItem icon="📝" title="Blog & Articles" desc="Latest tips and insights" href="/blog" color="#b8e0d2" />
                                <MegaMenuItem icon="💡" title="Interview Tips" desc="Expert advice and strategies" href="/dashboard/company-questions" color="#c9b5ff" />
                                <MegaMenuItem icon="💻" title="Coding Challenges" desc="Practice problems" href="/dashboard/projects" color="#ffb6c1" />
                                <MegaMenuItem icon="💬" title="Community Forum" desc="Connect with learners" href="/dashboard/leaderboard" color="#ffd700" />
                            </MegaMenu>
                        )}
                    </AnimatePresence>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 mt-2 md:hidden"
                            >
                                <div className="rounded-2xl border border-white/50 p-4 bg-white/95 backdrop-blur-xl shadow-xl">
                                    <nav className="space-y-2">
                                        <MobileNavLink href="/dashboard/generate">Features</MobileNavLink>
                                        <MobileNavLink href="/dashboard/resources">Resources</MobileNavLink>
                                        <MobileNavLink href="/blog">Blog</MobileNavLink>
                                        <MobileNavLink href="/about">About</MobileNavLink>
                                        <div className="border-t border-gray-200 my-2 pt-2 space-y-2">
                                            {user ? (
                                                <Link href="/dashboard" className="flex items-center gap-3 w-full px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            user.name?.charAt(0).toUpperCase() || "U"
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-800">Go to Dashboard</span>
                                                </Link>
                                            ) : (
                                                <>
                                                    <Link href="/login" className="block w-full px-4 py-3 text-center text-sm font-medium text-gray-800 bg-gray-100 rounded-lg">
                                                        Login
                                                    </Link>
                                                    <Link href="/generate" className="block w-full px-4 py-3 text-center text-sm font-semibold text-white bg-gray-900 rounded-lg">
                                                        Try Free
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </nav>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.header>
    );
}


function NavButton({ children, onMouseEnter }) {
    return (
        <button
            onMouseEnter={onMouseEnter}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 rounded-full hover:bg-white/40 transition-colors"
        >
            {children}
        </button>
    );
}

function NavLink({ href, children }) {
    return (
        <Link href={href} className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 rounded-full hover:bg-white/40 transition-colors">
            {children}
        </Link>
    );
}

function MobileNavLink({ href, children }) {
    return (
        <Link href={href} className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            {children}
        </Link>
    );
}

function MegaMenu({ children, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2"
            onMouseEnter={() => { }}
            onMouseLeave={onClose}
        >
            <div className="rounded-2xl border border-white/50 p-6 bg-white/95 backdrop-blur-xl shadow-2xl">
                <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

function MegaMenuItem({ icon, title, desc, href, color }) {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-4 rounded-xl transition-all group h-full"
                style={{ backgroundColor: `${color}10` }}
            >
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-sm" style={{ backgroundColor: color }}>
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:opacity-80 transition-opacity">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
