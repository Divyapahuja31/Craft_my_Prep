"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { api } from "../../../lib/axios";

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

export default function GeneratePlan() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        skills: "",
        goal: "",
        duration: "",
        dailyTime: "",
        jobDescription: ""
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState(null);
    const [loadingStep, setLoadingStep] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    const [error, setError] = useState(null);

    const loadingMessages = [
        "Extracting Skills...",
        "Mapping Topics...",
        "Building Plan...",
        "Finalizing Your Roadmap..."
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenerate = async () => {
        if (!formData.skills.trim() || !formData.goal.trim() || !formData.jobDescription.trim()) return;

        setIsGenerating(true);
        setLoadingStep(0);
        setError(null);
        setGeneratedPlan(null);

        const interval = setInterval(() => {
            setLoadingStep(prev => {
                if (prev >= 3) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 1500);

        try {
            const response = await api.post('/plans/generate', formData);

            const data = response.data.preview;

            // Map backend response to UI structure
            const mappedData = {
                skills: data.skills || [],
                projects: (data.miniProjects || []).map(p => ({
                    title: p.title,
                    description: p.description,
                    icon: "✅" // Default icon
                })),
                questions: (data.practiceQuestions || []).map(q => ({
                    title: typeof q === 'string' ? q : q.question || "Question",
                    icon: "❓"
                })),
                resources: (data.resources || []).map(r => ({
                    title: r.title,
                    link: r.link,
                    icon: "📚"
                })),
                timeline: (data.timeline || []).map((t, index) => ({
                    day: t.day || (index + 1),
                    topic: t.topic,
                    title: `Day ${t.day || (index + 1)}: ${t.topic}`,
                    activities: t.activities,
                    icon: "📅",
                    completed: false
                }))
            };

            clearInterval(interval);

            setTimeout(() => {
                setIsGenerating(false);
                setGeneratedPlan(mappedData);
            }, 1000);

        } catch (error) {
            console.error('Error generating plan:', error);
            clearInterval(interval);
            setIsGenerating(false);
            setError(error.response?.data?.error || "Failed to generate plan. Please try again.");
        }
    };

    const handleSavePlan = async () => {
        if (!generatedPlan) return;
        setIsSaving(true);
        try {
            const payload = {
                jobDescription: formData.jobDescription,
                skills: generatedPlan.skills,
                miniProjects: generatedPlan.projects,
                practiceQuestions: generatedPlan.questions,
                resources: generatedPlan.resources,
                timeline: generatedPlan.timeline
            };

            await api.post('/plans', payload);
            router.push('/dashboard/my-plans');
        } catch (error) {
            console.error("Failed to save plan:", error);
            setError("Failed to save plan. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Generate Your Plan</h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700">AI-Powered Interview Preparation</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto mb-8 sm:mb-12"
            >
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#7ec4b6]/50">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Enter Your Details</h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center">
                            {error}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="text-sm font-medium text-gray-700 block mb-2">Job Description</label>
                        <div className="relative">
                            <textarea
                                name="jobDescription"
                                value={formData.jobDescription}
                                onChange={handleInputChange}
                                maxLength={100}
                                placeholder="Paste the job description here (max 100 characters)..."
                                className="w-full h-24 p-3 rounded-xl border-2 border-blue-200 focus:border-[#7ec4b6] focus:outline-none resize-none bg-white/90 backdrop-blur-sm transition-all shadow-sm text-gray-900"
                            />
                            <div className="text-right text-xs text-gray-500 mt-1">
                                {formData.jobDescription.length}/100
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Current Skills</label>
                            <input
                                name="skills"
                                value={formData.skills}
                                onChange={handleInputChange}
                                placeholder="e.g. React, JavaScript, HTML"
                                className="w-full p-3 rounded-xl border-2 border-blue-200 focus:border-[#7ec4b6] focus:outline-none bg-white/90 backdrop-blur-sm transition-all shadow-sm text-gray-900"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Target Goal</label>
                            <input
                                name="goal"
                                value={formData.goal}
                                onChange={handleInputChange}
                                placeholder="e.g. Frontend Developer at Google"
                                className="w-full p-3 rounded-xl border-2 border-blue-200 focus:border-[#7ec4b6] focus:outline-none bg-white/90 backdrop-blur-sm transition-all shadow-sm text-gray-900"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Duration</label>
                            <input
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                placeholder="e.g. 4 weeks"
                                className="w-full p-3 rounded-xl border-2 border-blue-200 focus:border-[#7ec4b6] focus:outline-none bg-white/90 backdrop-blur-sm transition-all shadow-sm text-gray-900"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Daily Time Commitment</label>
                            <input
                                name="dailyTime"
                                value={formData.dailyTime}
                                onChange={handleInputChange}
                                placeholder="e.g. 2 hours"
                                className="w-full p-3 rounded-xl border-2 border-blue-200 focus:border-[#7ec4b6] focus:outline-none bg-white/90 backdrop-blur-sm transition-all shadow-sm text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleGenerate}
                            disabled={!formData.skills.trim() || !formData.goal.trim() || !formData.jobDescription.trim() || isGenerating}
                            className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white font-semibold text-base sm:text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Generate My Plan
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isGenerating && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="max-w-3xl mx-auto mb-8 sm:mb-12"
                    >
                        <div className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-xl border border-white/80 text-center">
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
                                className="text-6xl sm:text-9xl mb-4 sm:mb-6"
                            >
                                🤖
                            </motion.div>

                            <div className="relative h-16 sm:h-24 mb-4 sm:mb-6">
                                <motion.div
                                    animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute left-1/4 top-0 text-2xl sm:text-4xl"
                                >
                                    🐍
                                </motion.div>
                                <motion.div
                                    animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                    className="absolute right-1/4 top-0 text-2xl sm:text-4xl"
                                >
                                    🗄️
                                </motion.div>
                                <motion.div
                                    animate={{ y: [-5, 15, -5], x: [10, -10, 10] }}
                                    transition={{ duration: 2.2, repeat: Infinity }}
                                    className="absolute left-1/2 top-0 text-2xl sm:text-4xl"
                                >
                                    ⚛️
                                </motion.div>
                            </div>

                            <motion.p
                                key={loadingStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-lg sm:text-2xl font-bold text-gray-800"
                            >
                                {loadingMessages[loadingStep]}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {generatedPlan && !isGenerating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        <div className="flex justify-end gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSavePlan}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg transition-all disabled:opacity-50"
                            >
                                <Save size={20} />
                                {isSaving ? "Saving..." : "Save & Start Plan"}
                            </motion.button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/80"
                            >
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Skill Tags</h3>
                                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    {generatedPlan.skills.map((skill, index) => (
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

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/80"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Mini Projects</h3>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    {generatedPlan.projects.map((project, index) => (
                                        <motion.div
                                            key={project.title}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                        >
                                            <ExpandableItem
                                                title={project.title}
                                                icon={project.icon}
                                                className="bg-pink-100/50 hover:bg-pink-100"
                                            >
                                                <p>{project.description || "No description available."}</p>
                                            </ExpandableItem>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/80"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Practice Questions</h3>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    {generatedPlan.questions.map((question, index) => (
                                        <motion.div
                                            key={question.title}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-cyan-100/50 hover:bg-cyan-100 transition-all cursor-pointer"
                                        >
                                            <span className="text-2xl">{question.icon}</span>
                                            <span className="text-sm font-medium text-gray-800">{question.title}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/80"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Resources / Links</h3>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    {generatedPlan.resources.map((resource, index) => (
                                        <motion.div
                                            key={resource.title}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                        >
                                            <ExpandableItem
                                                title={resource.title}
                                                icon={resource.icon}
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

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/80 md:col-span-2"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Timeline / Schedule</h3>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    {generatedPlan.timeline.map((item, index) => (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                        >
                                            <ExpandableItem
                                                title={item.title}
                                                icon={item.icon}
                                                className="bg-orange-100/50 hover:bg-orange-100"
                                            >
                                                {item.activities && item.activities.length > 0 ? (
                                                    <ul className="list-disc pl-4 space-y-1">
                                                        {item.activities.map((activity, i) => (
                                                            <li key={i}>{activity}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No activities listed.</p>
                                                )}
                                            </ExpandableItem>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
