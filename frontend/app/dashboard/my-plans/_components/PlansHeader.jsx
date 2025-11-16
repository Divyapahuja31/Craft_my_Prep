"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function PlansHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Plans</h1>
                <p className="text-gray-500 mt-1">Manage and track your learning progress</p>
            </div>
            <Link href="/dashboard/generate">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium shadow-lg shadow-emerald-600/20 transition-all"
                >
                    <Plus size={20} />
                    Create New Plan
                </motion.button>
            </Link>
        </div>
    );
}
