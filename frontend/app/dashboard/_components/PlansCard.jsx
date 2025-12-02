import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PlansCard({ plans, itemVariants }) {
    const router = useRouter();

    const calculateProgress = (roadmap) => {
        if (!Array.isArray(roadmap) || roadmap.length === 0) return 0;
        const completed = roadmap.filter(step => step.completed).length;
        return Math.round((completed / roadmap.length) * 100);
    };

    return (
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-100 min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">📊 My Plans</h3>
                {plans && plans.length > 0 && (
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{plans.length} Active</span>
                )}
            </div>

            {plans && plans.length > 0 ? (
                <div className="space-y-6 flex-1">
                    {plans.map((plan, i) => {
                        const progress = calculateProgress(plan.roadmap);
                        let status = "In Progress";
                        let color = "bg-yellow-500";
                        let text = "text-yellow-600";

                        if (progress === 100) {
                            status = "Completed";
                            color = "bg-green-500";
                            text = "text-green-600";
                        } else if (progress === 0) {
                            status = "Not Started";
                            color = "bg-gray-200";
                            text = "text-gray-500";
                        }

                        return (
                            <div key={plan.id || i} className="group cursor-pointer" onClick={() => router.push(`/dashboard/my-plans/${plan.id}`)}>
                                <div className="flex justify-between items-end mb-2">
                                    <div className="flex-1 mr-4">
                                        <p className="font-semibold text-gray-800 truncate" title={plan.jd}>{plan.jd.substring(0, 30)}{plan.jd.length > 30 ? "..." : ""}</p>
                                        <p className={`text-xs font-medium ${text}`}>{status}</p>
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
                    <p className="text-gray-500 mb-4">No plans found.</p>
                    <Link href="/dashboard/generate">
                        <button className="px-4 py-2 bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white rounded-xl text-sm font-medium transition-colors shadow-sm">
                            Create New Plan
                        </button>
                    </Link>
                </div>
            )}

            {plans && plans.length > 0 && (
                <Link href="/dashboard/my-plans">
                    <button className="w-full mt-6 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        View All Plans
                    </button>
                </Link>
            )}
        </motion.div>
    );
}
