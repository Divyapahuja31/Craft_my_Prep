import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MiniProjectsCard({ projects, itemVariants }) {
    const router = useRouter();

    return (
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-100 min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">🛠️ Mini Projects</h3>
                {projects && projects.length > 0 && (
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{projects.length} Active</span>
                )}
            </div>

            {projects && projects.length > 0 ? (
                <div className="space-y-6 flex-1">
                    {projects.slice(0, 3).map((project, i) => {
                        const isCompleted = project.isCompleted;
                        const status = isCompleted ? "Completed" : "In Progress";
                        const progress = isCompleted ? 100 : 50; // Simple logic for now, can be improved if steps are tracked
                        const color = isCompleted ? "bg-green-500" : "bg-yellow-500";
                        const textColor = isCompleted ? "text-green-600" : "text-yellow-600";

                        return (
                            <div key={project.id || i} className="group cursor-pointer" onClick={() => router.push(`/dashboard/projects/${project.id}`)}>
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <p className="font-semibold text-gray-800">{project.title}</p>
                                        <p className={`text-xs font-medium ${textColor}`}>{status}</p>
                                    </div>
                                    <span className="text-xs font-bold text-gray-500">{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, delay: 0.2 * i }}
                                        className={`h-full rounded-full ${color}`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
                    <p className="text-gray-500 mb-4">No mini projects found.</p>
                    <Link href="/dashboard/projects">
                        <button className="px-4 py-2 bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white rounded-xl text-sm font-medium transition-colors shadow-sm">
                            Generate Project
                        </button>
                    </Link>
                </div>
            )}

            <Link href="/dashboard/projects">
                <button className="w-full mt-6 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                    View All Projects
                </button>
            </Link>
        </motion.div>
    );
}
