"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Code, Trophy, Trash2 } from "lucide-react";

export default function ProjectCard({ project, itemVariants, onDelete }) {
    // Helper to get difficulty color
    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case "easy": return "bg-green-100 text-green-700";
            case "medium": return "bg-yellow-100 text-yellow-700";
            case "hard": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/60 hover:shadow-xl transition-all group relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty}
                    </span>
                    {project.isCompleted && (
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Trophy size={12} /> Completed
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10">{project.description}</p>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} className="text-emerald-500" />
                        <span>{project.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Code size={16} className="text-emerald-500" />
                        <span className="truncate">{project.techStack}</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Link href={`/dashboard/projects/${project.id}`} className="flex-1">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-xl font-medium transition-colors group-hover:shadow-sm">
                            View Details
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </Link>
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            onDelete(project.id);
                        }}
                        className="px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                        title="Delete Project"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
