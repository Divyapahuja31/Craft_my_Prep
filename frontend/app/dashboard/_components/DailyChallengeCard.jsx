import { motion } from "framer-motion";
import Link from "next/link";

export default function DailyChallengeCard({ dailyChallenge, itemVariants }) {
    return (
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-2">
                        <span className="text-xl">🚀</span> Daily Challenge
                    </h3>
                    <p className="font-semibold text-lg text-gray-900 mb-1">Start Today's Challenge: 🕒</p>
                    <p className="text-gray-600 font-medium">
                        {dailyChallenge ? dailyChallenge.question.substring(0, 40) + "..." : "Data Structures Quiz"}
                    </p>
                </div>
                <Link href="/dashboard/features">
                    <button className="bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white px-6 py-2 rounded-full font-medium transition-colors shadow-sm shadow-green-100">
                        Start Now
                    </button>
                </Link>
            </div>
        </motion.div>
    );
}
