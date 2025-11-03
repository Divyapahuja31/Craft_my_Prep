"use client";

import { motion } from "framer-motion";
import Link from "next/link";
// import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function About() {
    return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#a8d5e2] via-[#e8f4f8] to-[#fef5e7]">
            {/* <Sidebar /> */}
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-4 sm:p-8 overflow-hidden">
                    <div className="max-w-5xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">About Craft My Prep</h1>
                        </div>

                        {/* Origin Story */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/80 mb-8"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    <span className="font-semibold text-gray-900">Craft My Prep</span> was born from a simple observation:
                                    interview preparation is broken. Generic study materials, one-size-fits-all approaches, and overwhelming
                                    amounts of information leave candidates confused and underprepared.
                                </p>
                                <p>
                                    During a hackathon in 2025, our team of passionate developers and educators came together with a bold idea:
                                    What if AI could analyze any job description and create a personalized study plan tailored to each candidate's
                                    unique needs?
                                </p>
                                <p>
                                    After countless late nights, iterations, and feedback from real job seekers, <span className="font-semibold text-gray-900">Craft My Prep</span> was
                                    born. Today, we're proud to help thousands of professionals prepare smarter, not harder.
                                </p>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/80"
                            >
                                <div className="text-5xl mb-4">🎯</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    To empower tech professionals with AI-driven, personalized interview preparation that adapts to their unique career goals and learning style. We believe everyone deserves a fair shot at landing their dream role.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/80"
                            >
                                <div className="text-5xl mb-4">🚀</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    To become the world's most trusted AI-powered interview preparation platform, helping millions of professionals unlock their potential and achieve career success through intelligent, adaptive learning.
                                </p>
                            </motion.div>
                        </div>

                        {/* Features Highlight */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/80 mb-8"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">What Makes Us Different</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { icon: "🧠", title: "AI-Powered Analysis", desc: "Our AI analyzes job descriptions to extract key skills and requirements" },
                                    { icon: "🎯", title: "Personalized Plans", desc: "Every study plan is tailored to your target role and current skill level" },
                                    { icon: "💬", title: "Interactive Mentor", desc: "Chat with Vibe, your AI companion, for guidance and motivation" },
                                    { icon: "🏆", title: "Gamified Learning", desc: "Earn XP, unlock achievements, and track your progress" },
                                    { icon: "💻", title: "Hands-On Practice", desc: "Code real projects and get instant feedback" },
                                    { icon: "📊", title: "Company Insights", desc: "Learn what specific companies look for in candidates" },
                                ].map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all border border-blue-100"
                                    >
                                        <div className="text-3xl">{feature.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                                            <p className="text-sm text-gray-700">{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="bg-gradient-to-br from-[#7ec4b6] to-[#6eb4a6] rounded-3xl p-8 shadow-xl border border-white/80 text-white"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-center">Our Impact</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                                {[
                                    { number: "10,000+", label: "Active Users" },
                                    { number: "95%", label: "Success Rate" },
                                    { number: "50,000+", label: "Plans Generated" },
                                    { number: "24/7", label: "AI Support" },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                    >
                                        <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                                        <div className="text-sm opacity-90">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                            className="mt-8 text-center pb-8"
                        >
                            <Link href="/generate">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 rounded-full bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white font-semibold text-lg shadow-xl cursor-pointer transition-colors"
                                >
                                    Start Your Journey Today
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
}
