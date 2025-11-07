import { motion } from "framer-motion";

export default function MiniProjectsCard({ itemVariants }) {
    return (
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">🛠️ Mini Projects</h3>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">3 Active</span>
            </div>

            <div className="space-y-6">
                {[
                    { name: "Personal Portfolio", status: "Completed", progress: 100, color: "bg-green-500", text: "text-green-600" },
                    { name: "E-commerce Dashboard", status: "In Progress", progress: 65, color: "bg-yellow-500", text: "text-yellow-600" },
                    { name: "Task Management App", status: "To Do", progress: 0, color: "bg-gray-200", text: "text-gray-500" }
                ].map((project, i) => (
                    <div key={i} className="group">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <p className="font-semibold text-gray-800">{project.name}</p>
                                <p className={`text-xs font-medium ${project.text}`}>{project.status}</p>
                            </div>
                            <span className="text-xs font-bold text-gray-500">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${project.progress}%` }}
                                transition={{ duration: 1, delay: 0.2 * i }}
                                className={`h-full rounded-full ${project.color}`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                View All Projects
            </button>
        </motion.div>
    );
}
