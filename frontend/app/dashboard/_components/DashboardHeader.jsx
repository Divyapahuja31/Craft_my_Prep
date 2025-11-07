import { motion } from "framer-motion";

export default function DashboardHeader({ user, itemVariants }) {
    return (
        <motion.div variants={itemVariants} className="flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Hello, {user?.name?.split(" ")[0] || "Divya"}!</h1>
                <p className="text-gray-600 text-lg">Welcome back to your personalized interview journey.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">G</div>
                <span className="font-semibold text-gray-800 text-lg">XP: {user?.xp || 1250}</span>
            </div>
        </motion.div>
    );
}
