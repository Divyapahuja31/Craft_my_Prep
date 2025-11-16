"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../lib/axios";
import { ArrowLeft, CheckCircle, Circle, Save } from "lucide-react";

const ExpandableItem = ({ title, icon, children, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-xl p-3 cursor-pointer transition-colors ${className}`}
        >
            <div className="flex items-center gap-3">
                <span className="text-xl">{icon}</span>
                <span className="font-medium text-gray-800 flex-1">{title}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-gray-500 text-xs"
                >
                    ▼
                </motion.span>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3 pl-10 text-sm text-gray-600">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function PlanDetails() {
    const { planId } = useParams();
    const router = useRouter();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const res = await api.get(`/plans/${planId}`);
                setPlan(res.data.plan);
            } catch (err) {
                console.error("Error fetching plan:", err);
                setError("Failed to load plan details.");
            } finally {
                setLoading(false);
            }
        };

        if (planId) {
            fetchPlan();
        }
    }, [planId]);

    const handleToggleStep = async (stepDay, currentStatus) => {
        if (currentStatus) return; // Prevent unmarking

        // Optimistic update
        const updatedRoadmap = plan.roadmap.map((step, index) => {
            const currentStepId = step.day || (index + 1);
            // Loose comparison in case types differ
            return (String(currentStepId) === String(stepDay)) ? { ...step, completed: true } : step;
        });
        setPlan({ ...plan, roadmap: updatedRoadmap });

        try {
            await api.patch(`/plans/${planId}/steps/${stepDay}/complete`);
        } catch (err) {
            console.error("Error updating step:", err);
            // Revert on error
            const revertedRoadmap = plan.roadmap.map(step =>
                step.day === stepDay ? { ...step, completed: false } : step
            );
            setPlan({ ...plan, roadmap: revertedRoadmap });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (error || !plan) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-red-500 text-lg">{error || "Plan not found"}</p>
                <button
                    onClick={() => router.back()}
                    className="px-6 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const calculateProgress = () => {
        if (!plan.roadmap || plan.roadmap.length === 0) return 0;
        const completed = plan.roadmap.filter(step => step.completed).length;
        return Math.round((completed / plan.roadmap.length) * 100);
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 p-6">
            {/* Header */}
            <div className="space-y-6">
                <button
                    onClick={() => router.push('/dashboard/my-plans')}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to My Plans
                </button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{plan.jd}</h1>
                        <p className="text-gray-500 mt-2">Created on {new Date(plan.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Progress</p>
                            <p className="text-xl font-bold text-emerald-600">{calculateProgress()}%</p>
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-emerald-100 flex items-center justify-center">
                            <div className="w-full h-full rounded-full border-4 border-emerald-500 border-t-transparent animate-spin-slow" style={{ transform: `rotate(${calculateProgress() * 3.6}deg)` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid Layout matching Generate Plan Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

                {/* Skill Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/80"
                >
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Skill Tags</h3>
                    <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {plan.skills && plan.skills.map((skill, index) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 text-gray-800 font-medium text-sm"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Mini Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/80"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Mini Projects</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {plan.projects && plan.projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                <ExpandableItem
                                    title={project.title}
                                    icon="✅"
                                    className="bg-pink-100/50 hover:bg-pink-100"
                                >
                                    <p>{project.description || "No description available."}</p>
                                </ExpandableItem>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Practice Questions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/80"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Practice Questions</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {plan.questions && plan.questions.map((question, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="flex items-center gap-3 p-3 rounded-xl bg-cyan-100/50 hover:bg-cyan-100 transition-all cursor-pointer"
                            >
                                <span className="text-2xl">❓</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {typeof question === 'string' ? question : (question.title || question.question || "Question")}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Resources / Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/80"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Resources / Links</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {plan.resources && plan.resources.map((resource, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <ExpandableItem
                                    title={resource.title}
                                    icon="📚"
                                    className="bg-green-100/50 hover:bg-green-100"
                                >
                                    {resource.link ? (
                                        <a
                                            href={resource.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline break-all"
                                        >
                                            {resource.link}
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">No link available</span>
                                    )}
                                </ExpandableItem>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Timeline / Schedule */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/80 md:col-span-2"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Timeline / Schedule</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {plan.roadmap && plan.roadmap.map((step, index) => (
                            <motion.div
                                key={step.day || index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                            >
                                <ExpandableItem
                                    title={step.day ? `Day ${step.day}: ${step.topic}` : step.title}
                                    icon={step.completed ? "✅" : "📅"}
                                    className={`bg-orange-100/50 hover:bg-orange-100 ${step.completed ? 'border-l-4 border-emerald-500' : ''}`}
                                >
                                    {step.activities && step.activities.length > 0 ? (
                                        <ul className="list-disc pl-4 space-y-1 mb-4">
                                            {step.activities.map((activity, i) => (
                                                <li key={i}>{activity}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="mb-4">No activities listed.</p>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!step.completed) {
                                                handleToggleStep(step.day || (index + 1), step.completed);
                                            }
                                        }}
                                        disabled={step.completed}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${step.completed
                                            ? "bg-emerald-100 text-emerald-700 cursor-default"
                                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                                            }`}
                                    >
                                        <CheckCircle size={16} className={step.completed ? "fill-emerald-700 text-emerald-100" : ""} />
                                        {step.completed ? "Completed" : "Mark as Complete"}
                                    </button>
                                </ExpandableItem>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
