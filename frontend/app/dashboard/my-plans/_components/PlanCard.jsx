"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MoreVertical, Play, CheckCircle, Clock, Trash2 } from "lucide-react";

export default function PlanCard({ plan, itemVariants, onDelete, ...props }) {
    const [showMenu, setShowMenu] = useState(false);

    const calculateProgress = (roadmap) => {
        if (!Array.isArray(roadmap) || roadmap.length === 0) return 0;
        const completed = roadmap.filter(step => step.completed).length;
        return Math.round((completed / roadmap.length) * 100);
    };

    const progress = calculateProgress(plan.roadmap);
    const isCompleted = progress === 100;

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            {...props}
            className={`group relative bg-white rounded-3xl p-6 border transition-all duration-300 ${isCompleted
                ? "border-emerald-100 shadow-sm hover:shadow-md"
                : "border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5"
                }`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-blue-50 text-blue-600"
                    }`}>
                    {isCompleted ? <CheckCircle size={24} /> : <Clock size={24} />}
                </div>
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowMenu(!showMenu);
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        <MoreVertical size={20} />
                    </button>

                    <AnimatePresence>
                        {showMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowMenu(false);
                                    }}
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden"
                                >
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setShowMenu(false);
                                            onDelete(plan.id);
                                        }}
                                        className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                        Delete Plan
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1" title={plan.jd}>
                {plan.jd}
            </h3>

            <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                {plan.skills && Array.isArray(plan.skills)
                    ? `Focus on ${plan.skills.join(", ")}`
                    : "Custom learning path"}
            </p>

            <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{progress}% Complete</span>
                    <span className="text-gray-500">{plan.roadmap?.length || 0} Steps</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${isCompleted ? "bg-emerald-500" : "bg-blue-500"
                            }`}
                    />
                </div>
            </div>

            <Link href={`/dashboard/my-plans/${plan.id}`}>
                <button className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${isCompleted
                    ? "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"
                    }`}>
                    {isCompleted ? (
                        <>View Details</>
                    ) : (
                        <>
                            <Play size={18} fill="currentColor" />
                            Resume Plan
                        </>
                    )}
                </button>
            </Link>
        </motion.div>
    );
}
