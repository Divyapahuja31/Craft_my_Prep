import { motion } from "framer-motion";

export default function RecentActivityCard({ itemVariants }) {
    return (
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex-1">
            <h3 className="font-bold text-gray-800 mb-4">🕒 Recent Activity</h3>
            <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Completed "Array Basics" Quiz (+20 XP)
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Updated "Personal Portfolio" Project
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Added a new Sticky Note
                </li>
            </ul>
        </motion.div>
    );
}
