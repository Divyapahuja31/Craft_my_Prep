import { motion } from "framer-motion";

export default function DashboardHeader({ user, itemVariants }) {
    return (
        <motion.div variants={itemVariants} className="flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Hello, {user?.name?.split(" ")[0] || "Divya"}!</h1>
                <p className="text-gray-600 text-lg">Welcome back to your personalized interview journey.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm flex items-center gap-2 border border-yellow-100">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl shadow-inner border border-yellow-200">
                    🏆
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total XP</span>
                    <span className="font-bold text-gray-900 text-lg leading-none">{user?.xp || 0}</span>
                </div>
            </div>
        </motion.div>
    );
}
