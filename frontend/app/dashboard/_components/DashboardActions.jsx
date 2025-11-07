import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardActions({ itemVariants }) {
    return (
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/dashboard/generate">
                <button className="px-6 py-3 bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white rounded-full font-medium shadow-md shadow-green-100 transition-all active:scale-95">
                    Generate New Plan
                </button>
            </Link>
            <Link href="/dashboard/test-api">
                <button className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-full font-medium shadow-sm transition-all active:scale-95">
                    Review Resources
                </button>
            </Link>
            <Link href="/dashboard/insights">
                <button className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-full font-medium shadow-sm transition-all active:scale-95">
                    Company Insights
                </button>
            </Link>
        </motion.div>
    );
}
