"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../lib/axios";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Code, Trophy, CheckCircle } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import XPModal from "../../../components/XPModal";

export default function ProjectDetails() {
    const { slug } = useParams(); // Using slug as ID based on folder structure [slug] but likely ID in URL
    const router = useRouter();
    const { user, updateUser } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showXPModal, setShowXPModal] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                // Since the backend doesn't have a specific "get by ID" endpoint exposed in the routes file I saw earlier
                // (it only had get all, generate, and mark complete), I will fetch all and filter by ID for now.
                // Ideally, the backend should have a get by ID endpoint.
                const res = await api.get("/miniprojects");
                if (res.data.success) {
                    // slug is a string from URL, p.id is likely a number from DB
                    const foundProject = res.data.data.find(p => String(p.id) === String(slug));
                    if (foundProject) {
                        setProject(foundProject);
                    } else {
                        // Handle not found
                        console.error("Project not found. Slug:", slug, "Available IDs:", res.data.data.map(p => p.id));
                    }
                }
            } catch (error) {
                console.error("Error fetching project details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProject();
        }
    }, [slug]);

    const handleMarkComplete = async () => {
        try {
            const res = await api.patch(`/miniprojects/${slug}/mark-complete`);
            if (res.data.success) {
                setProject(res.data.data);
                // Update XP locally
                if (user) {
                    updateUser({ xp: user.xp + 50 });
                }
                setShowXPModal(true);
            }
        } catch (error) {
            console.error("Error marking project complete:", error);
            alert("Failed to update project status");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Project not found</h2>
                <button 
                    onClick={() => router.back()}
                    className="text-emerald-600 hover:underline"
                >
                    Go back
                </button>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto p-6 space-y-8"
        >
            {/* Header */}
            <div className="space-y-4">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Projects
                </button>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                    {project.isCompleted ? (
                        <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium flex items-center gap-2">
                            <Trophy size={18} />
                            Completed
                        </span>
                    ) : (
                        <button
                            onClick={handleMarkComplete}
                            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
                        >
                            <CheckCircle size={18} />
                            Mark as Complete
                        </button>
                    )}
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Calendar size={18} />
                        <span className="text-sm font-medium">Timeline</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{project.timeline}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Code size={18} />
                        <span className="text-sm font-medium">Languages</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{project.techStack}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Trophy size={18} />
                        <span className="text-sm font-medium">Difficulty</span>
                    </div>
                    <p className={`text-lg font-semibold ${
                        project.difficulty === 'Easy' ? 'text-green-600' :
                        project.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                        {project.difficulty}
                    </p>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Project Description</h2>
                <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                </div>
            </div>
            
            {/* Steps / Roadmap */}
            {project.steps && project.steps.length > 0 && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Implementation Steps</h2>
                    <div className="space-y-4">
                        {project.steps.map((step, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>
                                <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <XPModal 
                isOpen={showXPModal} 
                onClose={() => setShowXPModal(false)} 
                xpAmount={50} 
            />
        </motion.div>
    );
}
