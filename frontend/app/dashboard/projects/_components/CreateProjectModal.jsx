"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function CreateProjectModal({ isOpen, onClose, onCreate, isGenerating }) {
    const [formData, setFormData] = useState({
        timeline: "",
        languages: "",
        difficulty: "Easy",
    });
    const [loadingStep, setLoadingStep] = useState(0);

    const loadingMessages = [
        "Analyzing Requirements...",
        "Designing Architecture...",
        "Generating Steps...",
        "Finalizing Project..."
    ];

    useEffect(() => {
        if (isGenerating) {
            const interval = setInterval(() => {
                setLoadingStep(prev => (prev + 1) % loadingMessages.length);
            }, 1500);
            return () => clearInterval(interval);
        } else {
            setLoadingStep(0);
        }
    }, [isGenerating]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(formData);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                    >
                        {isGenerating ? (
                            <div className="p-12 flex flex-col items-center justify-center text-center">
                                <motion.div
                                    animate={{
                                        rotate: [0, 10, -10, 10, 0],
                                        y: [0, -10, 0, -10, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="text-6xl mb-6"
                                >
                                    🤖
                                </motion.div>
                                <div className="relative h-16 w-full mb-6">
                                    <motion.div
                                        animate={{ y: [-5, 5, -5], x: [-5, 5, -5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute left-1/4 top-0 text-2xl"
                                    >
                                        ⚡
                                    </motion.div>
                                    <motion.div
                                        animate={{ y: [5, -5, 5], x: [5, -5, 5] }}
                                        transition={{ duration: 2.5, repeat: Infinity }}
                                        className="absolute right-1/4 top-0 text-2xl"
                                    >
                                        🛠️
                                    </motion.div>
                                </div>
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={loadingStep}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-xl font-bold text-gray-800 absolute"
                                    >
                                        {loadingMessages[loadingStep]}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
                                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Timeline</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 2 days"
                                            value={formData.timeline}
                                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-black"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Languages / Tech Stack</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Python, React"
                                            value={formData.languages}
                                            onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-black"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Difficulty</label>
                                        <select
                                            value={formData.difficulty}
                                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-black bg-white"
                                        >
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hard">Hard</option>
                                        </select>
                                    </div>

                                    <div className="pt-4 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg shadow-emerald-600/20 transition-all"
                                        >
                                            Generate Project
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
