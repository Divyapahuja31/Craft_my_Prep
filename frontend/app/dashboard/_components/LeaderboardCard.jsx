import { motion } from "framer-motion";
import Link from "next/link";

export default function LeaderboardCard({ itemVariants }) {
    return (
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
                <span className="text-yellow-500">🏆</span> Leaderboard Snapshot
            </h3>
            <div className="mb-4">
                <p className="text-sm text-gray-600 font-medium">Current Rank:</p>
                <p className="text-4xl font-bold text-gray-900">#12</p>
                <p className="text-xs text-gray-500 mt-1">Next goal: Rank #9 - <span className="text-green-600 font-bold">+50XP</span></p>
            </div>
            <Link href="/dashboard/leaderboard" className="mt-auto">
                <button className="w-full bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white py-2 rounded-full font-medium text-sm transition-colors shadow-sm shadow-green-100">
                    View Full Leaderboard
                </button>
            </Link>
        </motion.div>
    );
}
