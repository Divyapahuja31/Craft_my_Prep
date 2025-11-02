"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Parallax effects for background elements
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    // Simulate analysis process
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  const handlePreloaderComplete = () => {
    setShowContent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a8d5e2] via-[#e8f4f8] to-[#fef5e7]">
      <Preloader text="LOADING" onComplete={handlePreloaderComplete} />

      {showContent && (
        <>
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
                        className="w-7 h-7 rounded-lg flex items-center justify-center shadow-sm relative overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#7ba8d4]"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      >
                        <span className="text-sm relative z-10">✨</span>
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
                      <Link href="/login">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-800 bg-white/50 border border-white/80 hover:bg-white/80 transition-colors shadow-sm"
                        >
                          Login
                        </motion.button>
                      </Link>

                      <Link href="/generate">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gray-900 hover:bg-gray-800 shadow-md transition-colors"
                        >
                          Try Free
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Mega Menus */}
                <AnimatePresence>
                  {showMegaMenu && (
                    <MegaMenu onClose={() => setShowMegaMenu(false)}>
                      <MegaMenuItem icon="🎯" title="AI Interview Prep" desc="Personalized practice sessions" href="/generate" color="#a8d5ba" />
                      <MegaMenuItem icon="📊" title="Skill Assessment" desc="Track your progress" href="/leaderboard" color="#7ba8d4" />
                      <MegaMenuItem icon="🎤" title="Mock Interviews" desc="Real-time feedback" href="/generate" color="#d4c5a9" />
                      <MegaMenuItem icon="📄" title="Resume Builder" desc="ATS-optimized templates" href="/generate" color="#ffd9a3" />
                      <MegaMenuItem icon="🗺️" title="Career Roadmap" desc="Personalized learning path" href="/generate" color="#c7f0d8" />
                      <MegaMenuItem icon="👥" title="Community" desc="Connect with peers" href="/leaderboard" color="#e9d5ff" />
                    </MegaMenu>
                  )}

                  {showResourcesMenu && (
                    <MegaMenu onClose={() => setShowResourcesMenu(false)}>
                      <MegaMenuItem icon="📚" title="Documentation" desc="Complete guides and tutorials" href="/about" color="#ffd9a3" />
                      <MegaMenuItem icon="🎥" title="Video Tutorials" desc="Step-by-step video guides" href="/generate" color="#ff9999" />
                      <MegaMenuItem icon="📝" title="Blog & Articles" desc="Latest tips and insights" href="/about" color="#b8e0d2" />
                      <MegaMenuItem icon="💡" title="Interview Tips" desc="Expert advice and strategies" href="/generate" color="#c9b5ff" />
                      <MegaMenuItem icon="💻" title="Coding Challenges" desc="Practice problems" href="/projects" color="#ffb6c1" />
                      <MegaMenuItem icon="💬" title="Community Forum" desc="Connect with learners" href="/leaderboard" color="#ffd700" />
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
                          <MobileNavLink href="/generate">Features</MobileNavLink>
                          <MobileNavLink href="/about">Resources</MobileNavLink>
                          <MobileNavLink href="/blog">Blog</MobileNavLink>
                          <MobileNavLink href="/about">About</MobileNavLink>
                          <div className="border-t border-gray-200 my-2 pt-2 space-y-2">
                            <Link href="/login" className="block w-full px-4 py-3 text-center text-sm font-medium text-gray-800 bg-gray-100 rounded-lg">
                              Login
                            </Link>
                            <Link href="/generate" className="block w-full px-4 py-3 text-center text-sm font-semibold text-white bg-gray-900 rounded-lg">
                              Try Free
                            </Link>
                          </div>
                        </nav>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.header>

          <main>
            {/* Hero Section */}
            <section ref={heroRef} className="px-4 sm:px-6 md:px-12 pt-8 pb-12 sm:pt-12 sm:pb-16 md:pb-24 relative overflow-hidden">
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <QuickLink href="#why" icon="❓">Why It Matters</QuickLink>
                <QuickLink href="#demo" icon="📋">Live Demo</QuickLink>
                <QuickLink href="/about" icon="ℹ️">About</QuickLink>
                <QuickLink href="#projects" icon="📁">Mini Projects</QuickLink>
              </div>

              {/* Background Decorations */}
              <div className="absolute top-20 left-10 w-40 h-20 bg-white/40 rounded-full blur-2xl" />
              <div className="absolute top-40 right-20 w-60 h-24 bg-white/30 rounded-full blur-3xl" />

              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                    Unlock Your<br />Dream Tech Role
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-lg">
                    AI-Powered Interview Prep, Made Just For You. Practice smarter, not harder.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/generate'}
                    className="px-8 py-4 rounded-full bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white font-semibold text-lg shadow-xl transition-colors w-full sm:w-auto"
                  >
                    Generate My Plan
                  </motion.button>
                </motion.div>

                <motion.div
                  className="relative flex justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full max-w-lg"
                  >
                    <Image
                      src="/hero.png"
                      alt="Interview Prep Hero"
                      width={600}
                      height={600}
                      priority
                      className="w-full h-auto drop-shadow-2xl"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Why It Matters */}
            <section id="why" className="px-4 sm:px-12 py-16 relative overflow-hidden">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl border border-white/80"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Why It Matters</h3>
                  <div className="space-y-6">
                    <FeatureRow
                      title="Overwhelmed by job postings?"
                      desc="Without guidance, prep is chaotic. We give you a structured path."
                    />
                    <FeatureRow
                      title="Stop wasting time on generic prep"
                      desc="Our AI creates a roadmap tailored to your target role and skills."
                    />
                    <FeatureRow
                      title="Stand out in interviews"
                      desc="Practice with real scenarios and get instant feedback to improve."
                    />
                  </div>
                </motion.div>
              </div>

              {/* Parallax Elements */}
              <motion.div style={{ y: parallaxY1 }} className="absolute top-40 left-20 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl" />
              <motion.div style={{ y: parallaxY2 }} className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-200/10 rounded-full blur-3xl" />
            </section>

            {/* Live Demo */}
            <section id="demo" className="px-4 sm:px-12 py-16 relative">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/90"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Live Demo</h3>
                    <p className="text-lg text-gray-700">Paste a job description to see our AI in action</p>
                  </div>

                  <div className="space-y-6">
                    <textarea
                      className="w-full h-40 p-4 rounded-xl border-2 border-blue-200 focus:border-[#7ec4b6] focus:outline-none resize-none bg-white/90 transition-all shadow-sm text-gray-900"
                      placeholder="Example: We're looking for a Senior Full Stack Developer with 3+ years experience..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 p-4 rounded-xl border-2 border-blue-200 bg-white/50 text-gray-500 italic">
                        {isAnalyzing ? "Analyzing skills and requirements..." : "Analysis results will appear here..."}
                      </div>
                      <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !jobDescription.trim()}
                        className="px-8 py-4 rounded-xl bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 sm:w-auto w-full"
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze"}
                      </button>
                    </div>

                    <AnimatePresence>
                      {isAnalyzing && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-[#a8d5ba]/20 rounded-xl p-6 border border-[#a8d5ba]/50 overflow-hidden"
                        >
                          <h4 className="font-semibold text-gray-900 mb-3">Detected Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {["React", "Node.js", "PostgreSQL", "REST APIs", "Git"].map((skill, i) => (
                              <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </section>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

// --- Subcomponents for cleaner code ---

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

function QuickLink({ href, icon, children }) {
  return (
    <a href={href} className="px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-sm font-medium text-gray-700 hover:bg-white/90 transition-all shadow-md flex items-center gap-2">
      <span>{icon}</span> {children}
    </a>
  );
}

function FeatureRow({ title, desc }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full bg-[#7ec4b6] flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-white font-bold text-sm">✓</span>
      </div>
      <div>
        <p className="text-lg text-gray-800 font-medium mb-1">{title}</p>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  );
}

function MegaMenu({ children, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 mt-2"
      onMouseEnter={() => { }} // Keep open on hover
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
        style={{ backgroundColor: `${color}10` }} // 10% opacity hex
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

function Footer() {
  return (
    <footer className="px-4 sm:px-12 py-12 border-t border-blue-200/30 bg-gradient-to-b from-transparent to-blue-100/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a8d5ba] to-[#7ba8d4] flex items-center justify-center shadow-lg">
                <span className="text-lg">🚀</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">Craft My Prep</span>
            </div>
            <p className="text-gray-600 max-w-sm">
              Empowering tech professionals to land their dream roles through AI-powered interview preparation.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
              <li><Link href="/dashboard" className="hover:text-gray-900">Dashboard</Link></li>
              <li><Link href="/generate" className="hover:text-gray-900">Generate Plan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/about" className="hover:text-gray-900">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
              <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-300/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© 2025 Craft My Prep. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-gray-900">Contact</Link>
            <Link href="/support" className="hover:text-gray-900">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
