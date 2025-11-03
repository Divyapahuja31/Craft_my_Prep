"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showContent, setShowContent] = useState(false);

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
          <Navbar />

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

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <input
                        type="text"
                        className="flex-1 p-3 sm:p-4 rounded-xl border-2 border-blue-200 focus:border-[#7ec4b6] focus:outline-none bg-white/90 backdrop-blur-sm shadow-sm text-sm sm:text-base text-gray-900"
                        placeholder="Analyse"
                        readOnly
                        value={isAnalyzing ? "Analyzing skills, requirements, and creating your plan..." : ""}
                      />
                      <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !jobDescription.trim()}
                        className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#7ec4b6] hover:bg-[#6eb4a6] transition-all hover:scale-105 text-white font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg w-full sm:w-auto"
                      >
                        {isAnalyzing ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                          </span>
                        ) : "Analyse"}
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

function QuickLink({ href, icon, children }) {
  return (
    <Link href={href} className="px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-sm font-medium text-gray-700 hover:bg-white/90 transition-all shadow-md flex items-center gap-2">
      <span>{icon}</span> {children}
    </Link>
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
